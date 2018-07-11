/**
 * Override default implementation to unbox field value
 */
Ext.define('gw.override.Ext.util.Grouper', {
  override: 'Ext.util.Grouper',

  getGroupString: function(instance) {
        var value = instance.get(this.property);
        return (value && value.text != undefined) ? value.text : value;
    }
});


// constants
gw.ext.CELL_MENU_CLS = 'g-cell-menu'; // css class to indicate menu button in a cell

// TODO: Think about clearly naming methods that deal with config objects vs. runtime objects

/**
 * Ext extensions for Grid
 */
;(function() {


  // TODO: Refactor: Card 371: View UI logic, calls to server, logic all mixed up. Very specialized for handling sums.
  function _updateSum(grid, field, record) {
    var colIndex = gw.ext.Util.getColumnIndexByDataIndex(grid, field);
    var column =  colIndex !== -1 ? grid.view.headerCt.getHeaderAtIndex(colIndex) : undefined;

    if (column && column.summaryType && column.summaryType.indexOf('reflect') >= 0) {
      var store = grid.getStore();
      var grp = record.get(store.groupField)
      var fieldMapping = column.mapping || column.dataIndex;
      var summaryFeature = grid.view.getFeature('ggroup');

      if (column.summaryType == 'noreflect') {
        // do not call server
        var getSumHTML = gw.ext.Util.getGetSumHTML();
        var oldSum = store.proxy.reader.rawData.summaryData[0][fieldMapping];
        oldSum = oldSum.text || oldSum;
        if (oldSum.match('^<div[^>]+altVal')) {
          getSumHTML = ['<div class="' + gw.ext.Util.getAltValueClass() + '">', getSumHTML, '</div>'].join('')
        }
        var data = {}
        data[fieldMapping] = {};
        data[fieldMapping].text = getSumHTML;
        summaryFeature.updateSummaryData(grp, data);

      } else {
        // calculate new sum value at server side:
        var params = {}
        var fullId;
        store.each(function(record) {
          if (record.get(store.groupField) == grp && record.isModified(field)) {
            var value = record.get(field);
            if (value && value.text !== undefined) {
              value = value.text // unbox composite value
            }
            fullId = gw.ext.Util.getFullIdForCell(store, record, field)
            params[fullId] = value;
          }
        })
        gw.app.requestViewRoot(fullId.replace(/(^.+:)[0-9]+:(.+)$/, '$1$2Footer'),
          {calSum:params},
          'NO_MASK_ELEM',
          {gridId:store.storeId, group:grp, fieldMapping:fieldMapping})
      }
    }
  }

  /**
   * Format the summary data and apply style classes if given
   * @param {Object} summaryData summary data
   * @param {String} summaryData.id optional summary data id, mandatory if cls given
   * @param {String} summaryData.text summary data text
   * @param {String} summaryData.cls optional summary data style classes
   * @private
   */
  function _formatSummaryData(summaryData) {
    var summaryText = null;
    if (Ext.isString(summaryData.cls)) {
      summaryText = '<A class="'+ summaryData.cls + '" id="' + summaryData.id + '">' + summaryData.text + '</A>';
    } else {
      summaryText = summaryData.text;
    }
    return summaryText;
  }

  function formatRadioGroup(items) {
    var ret = '<table><tr>';
    var sChecked;
    var id;

    for (var i=0; i< items.length; i++) {
      id = Ext.id();

      sChecked = items[i].checked ? 'class="x-form-cb-checked"' : '';
      ret += Ext.String.format('<td style="padding:0 4px;" {0}><input id="{3}" inputValue="{1}" class="x-from-field x-form-radio " type="button">' +
        '<label for="{3}" style="margin:0 2px;">{2}</label></td>', sChecked, items[i].inputValue, items[i].boxLabel, id);
    }

    ret += '</tr></table>';
    return ret;
  }

  function formatSingleRadioInGroup(checked, groupName) {
    var sChecked = checked ? 'class="x-form-cb-checked"' : '';

    return Ext.String.format('<div style="text-align: center" {0}><input class="x-form-field x-form-radio" type="button">&#160;</div>', sChecked);
  }

  function createGroupHeaders(columns, headerRows){
    var numHeaderRows = headerRows.length;
    for(var i=0; i < numHeaderRows - 1; i++){
      var groupHeader = headerRows[i];
      var subHeader = headerRows[i+1];
      var subHeaderIndex=0;
      for(var groupHeaderIndex=0; groupHeaderIndex < groupHeader.length; groupHeaderIndex++){
        var groupColumn = groupHeader[groupHeaderIndex];
        var count=0;
        while(groupColumn.colspan > 0){
          var subColSpan = subHeader[subHeaderIndex].colspan;
          groupColumn.colspan -= subColSpan;
          count++;
          subHeaderIndex++;
        }
        groupColumn.colspan = count;
      }
    }

    var col = columns;
    var sourceColumns;
    for(var i = numHeaderRows - 1; i >= 0; i--){
      var groupHeader = headerRows[i];
      sourceColumns = col;
      col = [];
      var sourceColCount = 0;
      for(var colIndex = 0; colIndex < groupHeader.length; colIndex++){
        var colObj = {};
        var tmpColumns = [];
        var groupHeaderColumn = groupHeader[colIndex];
        if(groupHeaderColumn.colspan===1 && !groupHeaderColumn.header){
          //spacer header
          colObj = sourceColumns[sourceColCount];
          sourceColCount++;
        } else{
          while(groupHeaderColumn.colspan > 0){
            tmpColumns.push(sourceColumns[sourceColCount]);
            sourceColCount++;
            groupHeaderColumn.colspan--;
          }
          Ext.apply(colObj, {
            menuDisabled:true, // IMPORTANT: Do not allow menu for column group header
            hideable:false, // IMPORTANT: Do not allow hiding group header
            draggable:false, // IMPORTANT: Do not allow moving group header
            'text': groupHeaderColumn.header,
            'cls': groupHeaderColumn.cls,
            'columns': tmpColumns,
            'tooltip':groupHeaderColumn.tooltip
          });
        }

        col.push(colObj);
      }
    }
    return col;
  }

  function renderDVCell(column, items, store, record, rowIndex, colIndex, fieldName, metaData, view) {
    var htmlArray = [];
    // TODO - AHK - Move these templates out of this function so we don't re-create them every time
    var inputTpl = new Ext.Template(
          '<tr>',
          '<td>',
          '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{fieldLabel}</label>',
          '</td>',
          '<td>',
          '<div class="x-form-item-cell {itemCls}" id="x-form-el-{id}" style="{fieldStyle}">{itemValue}</div>',
          '</td>',
          '</tr>'
        );
    var noLabelInputTpl = new Ext.Template(
          '<tr><td colspan="2">',
          '<div class="x-form-item-cell {itemCls}" id="x-form-el-{id}" style="{fieldStyle}">{itemValue}</div>',
          '</td></tr>'
        );
    var labelAboveInputTpl = new Ext.Template(
          '<tr><td colspan="2">',
          '<label for="{id}" style="{labelStyle}" class="x-form-item-label">{fieldLabel}</label>',
          '</tr></td>',
          '<tr><td colspan="2">',
          '<div class="x-form-item-cell {itemCls}" id="x-form-el-{id}" style="{fieldStyle}">{itemValue}</div>',
          '</td>',
          '</tr></td>'
        );
    var labeltpl = new Ext.Template(
          '<tr><td colspan="2">',
          '<div class="x-form-item-cell {itemCls}" tabIndex="-1">',
          '<label style="{labelStyle}" class="x-form-item-label">{html}</label>',
          '</div>',
          '</td></tr>'
        );

    Ext.iterate(items, function (item, index) {
      if (item.html) {
        htmlArray.push(labeltpl.apply(item))
      } else {
        var itemValue;
        if (item.xtype == 'fieldcontainer' && item.defaultType == 'glink'){
          itemValue = item.items;
        } else {
          itemValue = item.value;
        }

        if (item.xtype == 'templatevaluepanel') {
          itemValue = gw.ext.Util.renderTemplateValuePanel(column, item, store, record, rowIndex, colIndex, fieldName, metaData, view)
        }
        itemValue = gw.ext.Util.renderRegularContent(column, itemValue, store, record, rowIndex, colIndex, fieldName, metaData, true, view, index);
        itemValue = gw.ext.Util.appendHtmlForChildItems(item.item, record, itemValue);
        item.itemValue = itemValue;
        if (item.hideLabel) {
          htmlArray.push(noLabelInputTpl.apply(item));
        } else if (item.labelAlign == "top") {
          htmlArray.push(labelAboveInputTpl.apply(item));
        } else {
          htmlArray.push(inputTpl.apply(item));
        }
      }
    });
    var tableContents = htmlArray.join('');
    return '<table>' + tableContents + '</table>'
  }

  Ext.define('gw.override.Ext.grid.feature.GroupingSummary', {
    override: 'Ext.grid.feature.GroupingSummary',

    /**
     * Update the summary data store with summary details from data.<br/>
     * The data needs to follow the following structure:
     * <pre>
     * {
     *   c&lt;i&gt;: {
     *     text: &lt;Display value&gt;
     *     cls: &lt;Style class to apply for summary data value&gt;
     *     ... (other summary data properties)
     *   }
     * }
     * </pre>
     * where i is the index into the column index (c1, c2, c3, ...)
     * @param {String} groupValue the summary group value key
     * @param {Object} data the summary data to update
     */
    updateSummaryData : function(groupValue, data) {
      var store = this.grid.store;

      var summaryData = this.view.store.proxy.reader.rawData.summaryData;
      for (var i = 0; i < summaryData.length; i++) {
        if (summaryData[i][":grp"] == groupValue || summaryData[i][":noGrp"] == groupValue) {

          Ext.Object.each(data, function(columnName, value) {
            var record = store.last(false); // any record in the store
            summaryData[i][columnName].text = _formatSummaryData(value);

            //
            // Force updating the summary row, by fake an edit event on the trigger data cell.
            // @SenchaUpgrade TODO: Any better way to update the summary row?
            //
            var fldName = record.fields.findBy(function(item){
              if (item.mapping==columnName) {
                return true
              }
            }).name;

            if (summaryData[i][":grp"] == groupValue) {
              record = store.findRecord(':grp', groupValue); // find a record in this group
            }
            store.fireEvent('update', store, record, Ext.data.Model.EDIT, [fldName]);

          }, store);

          break;
        }
      }
    }
  });

  Ext.define('gw.override.Ext.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    initComponent: function() {
      this.groupable = this.sortable; // disallow group-by-this-column if the column is not sortable
      if (this.sortable) {
        this.addCls('g-header-sort');
      }
      if (this.required) { // add required column indicator
        this.addCls('requiredcolumnindicator');
      }
      this.callParent(arguments);
    },

    /**
     * Adds row-sensitive cell content.
     * IMPORTANT: Avoid creating Ext Component in cell, which will be very expensive.
     * <ul>
     * <li>Adds row-sensitive style class and id before rendering the cell
     * <li>Appends helper icon or menu
     * </ul>
     */
    renderer: function(value, metaData, record, rowIndex, colIndex, dataSource, view) {
      // Note: 'this' in this context is the grid object, not the column or header object
      // Work with the header variable below for referring to the column object.

      var header = view.headerCt.getHeaderAtIndex(colIndex);
      var fieldName = header.dataIndex;
      var ret = '';
      var complexItem = gw.ext.Util.getTemplateCell(value);

      var store = view.ownerCt.getStore();
      var formatCell = (value.xtype === 'gfieldset') ? value : null;

      if(formatCell != null){
        ret = renderDVCell(header, formatCell.items, store, record, rowIndex, colIndex, fieldName, metaData, view);
        return ret;
      }

      if (complexItem == undefined) {
        if(value && value.xtype === 'gbarinput'){
          ret = gw.ext.Util.renderBarInput(value);
        } else if (value && value.xtype == 'radiogroup') {
            ret = formatRadioGroup(value.items);
        } else {
          if (header.xtype != 'radiocolumn') {
            // Render an inline radio input field if this is a mixed grid column configuration
            gw.ext.Util.processGridEditor(store, rowIndex, header, function(editorByRow) {
              var editorCfg = editorByRow[0];
              if (!editorCfg.disabled && editorCfg.xtype == 'radio') {
                ret = formatSingleRadioInGroup(record.get(fieldName), editorCfg.group);
              }
            });
          }

          if (ret == '') {
            ret = gw.ext.Util.renderRegularContent(header, value, store, record, rowIndex, colIndex, fieldName, metaData, undefined, view)
          }
        }

      }else {
        ret = gw.ext.Util.renderTemplateValuePanel(header, complexItem, store, record, rowIndex, colIndex, fieldName, metaData, view);
     }

      return ret;
    },

    // Override for Selenium browser testing purpose, Selenium click will not send correct mouse position
    // Resulting in the OnLeftEdge or OnRightEdge test to fail and hence, skipping the header click
    // TODO PL-18764: tpollinger Upgrade to latest Selenium. Patch Selenium if pointer coordinates are not supported.
    // @SenchaUpgrade
    onTitleElClick: function(e, t) {
      // The grid's docked HeaderContainer.
      var me = this,
        ownerHeaderCt = me.getOwnerHeaderCt();

      var xy = e.getXY();
      var pt = new Ext.util.Point(xy[0],xy[1]);

      if (ownerHeaderCt && !ownerHeaderCt.ddLock) {
        // Firefox doesn't check the current target in a within check.
        // Therefore we check the target directly and then within (ancestors)
        if (me.triggerEl && (e.target === me.triggerEl.dom || t === me.triggerEl.dom || e.within(me.triggerEl))) {
          ownerHeaderCt.onHeaderTriggerClick(me, e, t);
          // if its not on the left hand edge, sort
        } else if (e.getKey() || this.el.getRegion().isOutOfBound(pt) || (!me.isOnLeftEdge(e) && !me.isOnRightEdge(e))) {
          me.toggleSortState();
          ownerHeaderCt.onHeaderClick(me, e, t);
        }
      }
    }
  });

  /**
   * Key config parameters for gw grid:
   * <li> id - The ExtJs component id, i.e., the server renderId of the corresponding ListView widget
   * <li> gwBaseId - Id of the nearest naming container of the server ListView widget (may be the ListView
   *                   itself or a containing widget)
   * <li> dataUrl - the fully qualified id (i.e., server renderId) of the dominant RowIterator widget, used
   *                   for pagination, sorting, etc.
   */
  Ext.define('gw.simplegrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.simplegrid',
    requires: [
      'Ext.grid.plugin.CellEditing',
      'Ext.grid.feature.GroupingSummary'
    ],

    disableSelection: true,
    deferRowRender  : false, // do not defer row rendering, because we need to resize columns based on their content
//    enableColumnHide : false, // do not allow hide columns
    columnLines: true,
    shrinkWrap:true,  // IMPORTANT: to avoid grid content being cut off without a scroll bar in ExtJS 4.2
    shrinkWrapDock:true,  // IMPORTANT: to avoid grid content being cut off without a scroll bar in ExtJS 4.2

    viewConfig : {
      loadMask: false,
      stripeRows : true, // alternate row style
      getRowClass: function(record) {
        return record.get(':css');
      }
    },

    getCellEditingPlugin: function() {
      return this.getPlugin('gridCellEditing');
    },

    getClickedCellButton: function(evt) {
      return evt.getTarget('.' + gw.app.getEventSourceCls(), 4, true);
    },

    getClickedCellMenu: function(evt) {
      return evt.getTarget('.' + gw.ext.CELL_MENU_CLS, 4, true);
    },

    getGridTotalCount: function() {
      var store = this.getStore();
      var count = 0;

      // There seems to be a bug in the Ext JS data store. The totalCount variable is not initialized if there
      // are no records loaded. This happens if the store is empty, see Ext.data.Store#onProxyLoad.
      // Calling getCount() in this instance.
      count = store.getTotalCount();
      if (count == undefined) {
        count = store.getCount();
      }

      return count;
    },

    getGridPageSize: function() {
      var store = this.getStore();
      var totalCount = this.getGridTotalCount();

      return Math.ceil(totalCount / store.pageSize);
    },

    /**
     * Updates row selections, if the grid has been rendered.
     */
    updateRowSelections : function() {
      if (this.hasSelection && this.rendered) {
        var selectedIndex = this.store.findBy(function(record) {
          if (record.get(gw.ext.Util.getSelectedRowProperty()) == true) {
            return true;
          }
        });
        if (selectedIndex >= 0) {
          var sm = this.getSelectionModel();
          // Suspend events in order to avoid a server callback. The server has this already selected
          sm.suspendEvents(false);
          sm.select(selectedIndex, false);
          sm.resumeEvents();
        }
      }
    },

    /**
     * Updates state for buttons depending row selection
     */
    updateFlagged : function() {
      if (this[gw.ext.Util.getFlaggedProperty()]) {
        //todo: extjs upgrade4 check this implementation for bRowCB. Commented out looks wrong: _Checkbox is in
        // the row object, not the grid object.
        //var bRowCB = this.store.data.containsKey('_Checkbox');
        // TODO: Redesign: Card 372: CB and _Checkbox will be removed from the JSON format. Use Ext JS' selection model
        var bRowCB = false;
        var fields = this.store.model.prototype.fields.items; //this.store.getProxy().getReader().fields;
        for (var i=0; i < fields.length; i++) {
          if (fields[i] == '_Checkbox' || fields[i].name == '_Checkbox') {
            bRowCB = true;
            break;
          }
        }
        var checkedRows = this.store.queryBy(function(record) {
          if (bRowCB) { // the record has a row checkbox column:
            return record.get('_Checkbox') == true;
          } else { // the record doesn't have a record-level checkbox:
            var cellWithCheckbox = record.fields.findBy(function(fld, key) {
              var value = record.get(key);
              return value && value.cb != null;
            });
            return cellWithCheckbox != null && record.get(cellWithCheckbox.name).cb == true;
          }
        });

        gw.ext.Util.updateFlaggedButtons(this[gw.ext.Util.getFlaggedProperty()], checkedRows.getRange(), this);
      }
    },

    storeLoaded : function() {
      if (this.hasSelection) {
        // update row selection
        this.updateRowSelections()
      }

      // update button state
      this.updateFlagged(); // grid level
      this.store.each(gw.ext.Util.updateFlaggedButtonsForRecord); // cell level

      // TODO: @SenchaEnhancement: Ext Grid does not support an initial sorting direction configuration.
      // The JSON configuration from the server can only indicate whether a column is sortable or not.
      // We need to ask Sencha to add support for a configuration property to indicate the initial row selection.
      // Update the sort state. The sort state can get out of sync if a sort action is canceled
      // by the server while sorting during a validation error in the page
      if (this.store.sorters && this.store.sorters.items) {
        for (var i = 0; i < this.store.sorters.items.length; i++) {
          var sorter = this.store.sorters.items[i];
          var colIdx = gw.ext.Util.getColumnIndexByDataIndex(this, sorter.property);
          var col = this.headerCt.getHeaderAtIndex(colIdx);
          if (col) {
            var serverSortDir = sorter.direction;
            var currentSortDir = col.sortState;
            // Do not set a sorting direction if non has been selected yet on the client.
            // By default, the sorting shows as not sorted and the server rows may be in any order.
            // The client will initiate a particular sort order, typically ascending first.
            if (currentSortDir && currentSortDir != serverSortDir) {
              col.setSortState(serverSortDir);
            }
          }
        }

        // Update the pager control values
        // TODO: Refactor: Card XXX: We might want to redesign the pager control:
        // Bind the pager store to the grid store and have
        // the server send the current page number ready for the client.
        if (this.gwPagingId) {
          var pager = Ext.ComponentManager.get(this.gwPagingId);
          // TODO: Try not to use rawData
          var gridOptions = this.view.store.proxy.reader.rawData.options;
          // If there is no paging, put the default paging option to none
          if (!gridOptions || gridOptions.limit == undefined) {
            gridOptions = {
              start: 1,
              limit: 0
            };
          }
          if (pager && gridOptions) {
            var start = gridOptions.start;
            var limit = gridOptions.limit;
            var page = start / limit + 1;

            // Update the toolbar store (pager's owning component)
            if (pager.ownerCt) {
              pager.ownerCt.store.pageSize = limit;
              pager.ownerCt.store.currentPage = page;
              pager.ownerCt.store.totalCount = this.getGridTotalCount();
            }

            // Update the drop down pager if it has already been updated before the grid store is loaded
            pager.suspendEvents(false);
            pager.setValue(page);
            pager.resumeEvents();
          }
        }
      }
    },

    initComponent : function() {
      var store;
      var me = this;

      // Remember the LV grid column resize state from the local cookie store:
      if (!this.stateId)  {
        this.stateId = this.id;
      }
      if (this.stateId) {
        this.stateful = true;
      }

      if (this.gStripeRows === false) {
        var newViewConfig = {};
        newViewConfig.getRowClass = this.viewConfig.getRowClass;
        newViewConfig.loadMask = this.viewConfig.loadMask;
        newViewConfig.stripeRows = false;
        this.viewConfig = newViewConfig;
      }

      // auto generate all possible store fields:
      // Note that some code may be refactored here, but is left
      // as is to easily allow support for column level editor.

      // Add default row fields: offset, flags & css field:
      // TODO: @SenchaUpgrade: Use an ext.data.Model declaration for gw specific fields
      // TODO: Refactor: Update to new JSON server model (like :offset will be gwRowCfgIdx)
      var fields = [
        gw.ext.Util.getRowOffsetProperty(),
        {name: gw.ext.Util.getRecordSpanProperty(), type: 'boolean'},
        gw.ext.Util.getFlagsProperty(),
        gw.ext.Util.getFlaggedProperty(),
        ':css'
      ];

      for (var i = 0; i < this.columns.length; i++) {
        var col = this.columns[i];
        var editor = col.editor;


        // TODO: Refactor: Card 372: Support row sensitive editors: The editor is only considered for the first row.
        // This does not work if there are different editors on rows or some rows are not editable at all
        // New model: Editor configuration will be in the column definition
        var editors = null;
        if (!editor && col.editable) {
          // Find the editor.
          // TODO tpollinger: Hack: Finding the first non empty editor for row sensitive editors. Does not work
          // for heterogeneous editor types.
          editors = this.initialConfig.data.editors[col.mapping || col.dataIndex];
          for (var ei = 0; ei < editors.length; ei++) {
            var editorByRow = editors[ei];
            //if (editorByRow[0].xtype == 'checkbox') {
            editor = editorByRow[0];
            //}
            if (editor) {
              break;
            }
          }
        }

        // sortable defaults to true, explicitly configure non-sortable columns
        if (!col.sortable) {
          col.sortable = false;
        }

        // TODO: Refactor: Card 372: Server code: Add a radiocolumn xtype
        if (editor) { // radio column
          var radioColumn = false;
          if( editor.xtype == 'radio' && col.dataType !== 'complexType') {
            // TODO: tpollinger: Workaround for PX ListViews > Formatted LVs > Grid LV (H-flow):
            // A radio column can only be set if ALL rows in a column are configured with a radio column editor
            // Otherwise, a radio cell needs to be rendered according to which row has a radio editor configured
            // TODO: tpollinger: Check whether there is still a need for a radio column cfg
            radioColumn = true;
            for (var ei = 0; ei < editors.length; ei++) {
              var editorCfgByRow = editors[ei];
              if (!editorCfgByRow[0] || editorCfgByRow[0].xtype != 'radio') {
                radioColumn = false;
                break;
              }
            }
          }

          if (radioColumn) {
            Ext.apply(col, {
              xtype: 'radiocolumn',
              group: editor.group,
              editor: editor,
              storeId : this.id
            });

          } else {
            Ext.apply(col, {
              editor: editor
            });
          }
        }

        if (!this.plugins) {
          this.plugins = [];
          var cellEditingPlugin =  new Ext.grid.plugin.CellEditing({
                      pluginId: 'gridCellEditing',
                      clicksToEdit: 1 // single click to activate editor
                    });
          this.plugins.push(cellEditingPlugin);
        }

        // TODO: Refactor: Consider moving into a model extension declaration
        fields.push({name:col.dataIndex, mapping: col.mapping})
      }

      // Hookup selection change listener
      if (!this.selModel) {
        this.selModel = {
          listeners: {select: this.rowSelectHandler, scope: this}
        }
      }

      // When disableSelection is true, user can't change selected row;
      // However, server may still mark some rows as pre-selected (i.e., hasSelection will be true).
      this.trackMouseOver = !this.disableSelection
      if (this.hasSelection) {
        fields.push({name:gw.ext.Util.getSelectedRowProperty(), type:'bool'})
      }

      // set up store config
      this.store = {
        fields: fields,
        remoteSort: true, // sort at server side
        remoteGroup: true, // group at server side
        storeId: this.id,
        listeners: {
          load: this.storeLoaded,
          scope: this
        }
      };

      if (this.data) {
        this.store.root = 'root'; // root property

        // remember initial sorting and paging info:
        if (this.data.options) {
          // Paging option. Set the pageSize if limit is set
          if (this.data.options.limit != undefined) {
            this.store.pageSize = this.data.options.limit;
          }

          // Sorting options
          // TODO: Refactor: Card XXX: Paging Control And Sorting Update
          if (this.data.options.sort) {
            this.store.sorters = this.data.options.sort;
          }

          if (this.data.options.group) {
            this.store.groupers = Ext.Array.map(this.data.options.group, function(group) {
              // @SenchaUpgrade it's important to explicitly set direction to null, otherwise it'll mess up sort spec
              return {property:group.property, direction:null};
            })
          }

          // Store the original configuration options as last options
          // TODO: Refactor: Do we still need access to lastOptions? We should only need the current options
          this.store.lastOptions = {params: this.data.options};
        }

        // Set the pageSize to 0 if no paging has been configured. The default for paging configuration is no paging
        if (this.store.pageSize == undefined) {
          this.store.pageSize = 0;
        }

        // TODO: Refactor: Card 371: JSON Format Refactoring: Summary Data
        // The whole of grid grouping needs to be refactored and aligned with Ext JS's grouping configuration model
        var hasSummary = false;
        if (this.data.summaryData) {
          hasSummary = true;

          var fakeFld = this.data.summaryData[''] != null ? ':noGrp' : ':grp';

          fields.push(fakeFld); // fake store field
          this.columns.push({dataIndex:fakeFld, hideable:false}); // fake column, and disallow users from toggling its visibility

          // add summary type for each column with sum:
          Ext.iterate(this.data.summaryData, function(key, sum) {
            Ext.each(this.columns, function(column) {
              var sumValue = sum[column.mapping || column.dataIndex];
              if (sumValue != null) {
                if (sumValue.text != null) {
                  sumValue = sumValue.text;
                }
                var match = sumValue.match("<([^<]+)/>$");
                column.summaryType = match ? match[1] : 'no-op';
              }
            });
            return false; // only look into the first summary item, because all items have the same format
          }, this);

          // css to hide the fake group
          this.columns[this.columns.length - 1].hidden = true;
          this.cls = (this.cls || '') + ' g-no-group';

          // create a fake grouping, which is required for displaying summary row:
          Ext.apply(this.store, { groupField: fakeFld });
        }

        if (!this.features) {
          this.features = [];
        }

        this.features.push({
          id: 'ggroup',
          ftype: 'groupingsummary',
          showSummaryRow: hasSummary,
          enableGroupingMenu: !hasSummary && this.enableGrouping, // allow users to toggle the grouping only when no summary row
          hideGroupedHeader: false,
          remoteRoot: 'summaryData',
          groupHeaderTpl: '{name}'
        });

      }

      // TODO: Refactor: Card 372: JSON Format Refactoring: Row and Editor Configurations
      // The checkbox selection model JSON will change on the server side to realign with the client
      // checkbox selection model
      if (this.cb) {
        var checkCol = {
          xtype: 'rowcheckcolumn',
          dataIndex: '_Checkbox',
          stateId: '_Checkbox',
          menuDisabled: true,
          sortable: false,
          width: 40
        };

        // TODO: The server should send the right canonical value
        fields.push({name:'_Checkbox',
          // load a 3-state (unset/true/false) boolean field:
          convert: function(v) {
            if (Ext.isBoolean(v)) {
              return v;
            }

            if(Ext.isObject(v)){
              return v.editValue.toUpperCase() === 'TRUE' ? true : false;
            }

            return (v === null || v === '') ? '' : v === 'true';
          }
        });

        this.columns = [checkCol].concat(this.columns);
      }

      // TODO: Refactor: Card 372: JSON Format Refactoring: Row and Editor Configurations
      // Use explicit row picker config from server
      // insert row picker column at the beginning:
      if (this.picker) {
        var pickerField = {name:':picker', mapping:'c0'};
        fields.push(pickerField);
        this.columns = [{
          dataIndex: pickerField.name,
          mapping: pickerField.mapping,
          width: 80,
          stateId: pickerField.name
        }].concat(this.columns);
      }


      //-------------------------------------------------------------------------
      // Instantiates the store here:
      //-------------------------------------------------------------------------
      this.store = Ext.create('gw.ModelStore', this.store);
      store = this.store;

      Ext.apply(this.store.proxy, {
        extraParams: {
          viewRootId : this.dataUrl || this.id,
          updateData : true
        }
      });

      // Add paging control to grid, if needed. Don't add a paging control if the grid does not page
      if (this.data && this.data.options && this.data.options.limit != undefined) {
        if (this.data.total || this.displayInfo) {
          var dominantRowIteratorId = (this.id == this.gwBaseId ? this.id : this.dataUrl);
          this.tbar = Ext.apply(this.tbar || {}, {
            store: this.store,
            gridId: this.id,
            // The paging/record count display id is <lvId>:_ListPaging.
            // This id is needed for testing and updating the LV page count. lvId is the grid's LV
            // id or the dataUrl (dominant row iterator) if the LV has a render id only (no explicit id)
            pagingId: dominantRowIteratorId + ':_ListPaging',
            recordCountId: dominantRowIteratorId + ':_RecordCount',
            pagingDisabled: this.data.options.pagingDisabled,
            displayInfo: this.displayInfo,
            prependButtons: true, // add other buttons before the pagination
            plugins: {ptype:'gtbconfig'}, // default config for gw toolbar
            xtype: 'gpaging'
          });

          if (this.tbar.items) {
            this.tbar.items.push('-'); // a divider between pagination and other controls
          }

          // TODO: Refactor:  The servers should send these ids.
          this.gwPagingId = this.tbar.pagingId;
          this.gwRecordCountId = this.tbar.recordCountId;
        }
      }

      // add filters to panel toolbar
      if (this.filters) {
        gw.ext.Util.addFiltersToPanel(this, this.filters);
        delete this.filters;
      }

      // column filters
      // TODO: Refactor: Card 370: Send the column filter configuration as Ext JS 4.1 expects it. Enable column filters.
      if (this.columnFilters) {
        Ext.each(this.columnFilters, function(filter) {
          Ext.apply(filter, {type:'list', single:true});
        });

        var colFilters = {
          ftype: 'filters',
          encode: true,
          updateBuffer: 1,
          local: false,
          filters: this.columnFilters
        };

        if (!this.features) {
          this.features = [];
        }
        this.features.push(colFilters);

        delete this.columnFilters;
      }

      // Setup grouped columns
      // TODO: Refactor: Card 370: PL-17423: Refactor server side to normalize header rows
      if (this.headerRows && !this.hideHeaders) {
        this.columns = createGroupHeaders(this.columns, this.headerRows);
      }

      this.callParent(arguments);

      /**
       * Cancels mousedown to stop row-section, if a button or menu in cell is clicked
       */
      this.view.on('beforeitemmousedown', function( gridview, record, item, index, e, eOpts ) {
        if ('mousedown' === e.type && ( gridview.panel.getClickedCellButton(e) ||  gridview.panel.getClickedCellMenu(e))) {
          return false;
        }
      });

      this.view.on({
        /**
         * @SenchaUpgrade It's problematic to update store data when the grid has an active editor.
         * For example, when tabbing off a data-only PostOnChange cell after change, and the data or data range
         * the next cell is changed due to POC. Keeping the old editor around could show stale data and cause subsequent
         * problem.
         * The workaround is to dismiss editor before refresh, and reactivate the editor after the refresh.
         */
        beforerefresh: function (view) {
          var comp = view.ownerCt;
          var editingPlugin = comp.getCellEditingPlugin();

          if (editingPlugin.editing && editingPlugin.context) {
            var gPosition = {
              row: editingPlugin.context.rowIdx,
              column: editingPlugin.context.colIdx
            };

            // cancel editor
            editingPlugin.cancelEdit();

            // restore editor:
            function restoreEditor() {
              comp.getCellEditingPlugin().startEditByPosition(gPosition);
            }

            if (Ext.AbstractComponent.layoutSuspendCount) {
              Ext.globalEvents.on('afterlayout', restoreEditor, undefined, {single: true})
            } else {
              view.on('refresh', restoreEditor, undefined, {single: true})
            }
          }
        }
      });

      /**
       * @SenchaUpgrade A temp workaround for PL-26839. Waiting for Sencha for the real fix (ticket filed).
       * With this workaround, at least the Grid will not disappear, but the user may need to click back
       * into a cell editor again before the next change.
       *
       * Dismiss the editor if the Grid size has changed.
       */
      this.view.on('resize', function(view) {
          var comp = view.ownerCt;
          var editingPlugin = comp.getCellEditingPlugin();

          if (editingPlugin.editing) {
            editingPlugin.cancelEdit();
          }
      });

      this.view.on('viewready', function() {
        this.updateRowSelections();

        // @SenchaUpgrade Work around an ExtJs bug that view.isGrouping is true even before Grouping is enabled for the first time
        this.view.isGrouping = this.view.isGrouping && this.store.isGrouped();

        // load data after toolbars are rendered and paging toolbar is bound to the store, to update toolbar state
        if (this.data && this.data.root) {
          gw.ext.Util.updateStore(this.store, this.data);
          delete this.data;
        }
      }, /*grid*/this);

      /**
       * Handle open-menu or action inside a cell
       */
      this.on('cellclick', function(gridView, td, cellIndex, record, tr, rowIndex, evt) {
        var store = gridView.getStore();
        var fieldName = gridView.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var t = evt.getTarget();

        // cell checkbox:
        // TODO: Refactor: Card 372: Need to clean up the CB with row check and cell check
        if (fieldName != '_Checkbox' && t.className.indexOf(Ext.baseCSSPrefix + 'grid-checkcolumn') != -1) {
          evt.stopEvent();
          // Clone the data, so that the new value will differ from old value during set()
          var val = record.get(fieldName);
          var newData;
          if (Ext.isObject(val)) {
            //val is an object when the cell has a value AND a checkbox
            if (val.cb !== undefined) {
              newData = {};
              Ext.apply(newData, record.get(fieldName));
              newData.cb = !val.cb;
            }
          } else {
            newData = !val;
          }

          gw.ext.Util.processCellClick(gridView.headerCt.getHeaderAtIndex(cellIndex), gridView.panel, record, rowIndex, fieldName,
            function() {
              record.set(fieldName, newData)
            }
          );

          // update flagged buttons:
          var bCellLevelCB = gw.ext.Util.updateFlaggedButtonsForRecord(record);
          if (!bCellLevelCB) {
            // this checkbox is associated with the containing gridView:
            gridView.panel.updateFlagged();
          }

        } else if (t.type == 'button') {
          //evt.stopEvent();

          // TODO tpollinger: Card 372: The whole of the radio group needs to be refactored and consolidated with
          // gw.ext.Util.processRadioCellClick. That latter utility does some of the unchecking of grouped
          // radio controls too (although they are not cell radio groups), but it would be good to unify this a bit.
          // Refactor: Create a Radio Group, Checkbox Group, Radio column, checkbox column class and delegate
          // rendering and click processing from ExtGrid to these classes.
          // Refactor: Normalize server JSON response to one type for a given radio/checkbox group control
          var radioGroup = record.get(fieldName);
          if (radioGroup && radioGroup.xtype != 'radiogroup') {
            // Is there a DV input group with a radio group?
            var radioGroup = gw.ext.Util.getFirstInputInTemplateCell(radioGroup);
            if (radioGroup && radioGroup.xtype != 'radiogroup') {
              radioGroup = null;
            }
          }

          // Handle a radio group cell: Get the currently selected radio (for instance ask for change confirmation),
          // handle the change and update the store.
          if (radioGroup) {
            var processRadioClick = function(column, grid, record, rowIndex, columnId, oldValue, value, clickCallback) {
              if (!me.radioField) {
                me.radioField = new Ext.form.field.Base();
              }
              me.radioField.eventParam = gw.ext.Util.getFullIdForCell(grid.getStore(), record, columnId);
              me.radioField.completeEdit = clickCallback;
              Ext.apply(me.radioField, {postOnChange: radioGroup.postOnChange, confirm: radioGroup.confirm});
              gw.app.handleChange(me.radioField, value, oldValue, clickCallback);
            }

            var oldValue = record.get(fieldName);
            var value = t.attributes['inputValue'].value;

            processRadioClick(this, gridView.panel, record, rowIndex, fieldName, oldValue, value, function() {
              for (var i = 0; i < radioGroup.items.length; i++) {
                radioGroup.items[i].checked = (radioGroup.items[i].inputValue == value);
              }
              record.set(fieldName, value);
            });

          } else {
            var grid = gridView.panel;
            var colIndex = gw.ext.Util.getColumnIndexByDataIndex(gridView.panel, fieldName);
            var column = gridView.headerCt.getHeaderAtIndex(colIndex);

            // Handle the change event for this radio input field. Don't handle if this is a radio column configuration
            if (column.xtype != 'radiocolumn') {
              gw.ext.Util.processRadioCellClick(true, column, grid, record, rowIndex, fieldName);
            }
          }

        } else {
          // TODO: Refactor: Card 372: dvInput are not declared in the editor section
          // The column editor is set here as otherwise "beforeedit" is not being called. startEdit
          // checks whether a column editor is set and will terminate if none is available.
          var column = gridView.headerCt.getHeaderAtIndex(cellIndex);
          if (!column.getEditor()) {
            var editorCfg = null;
            var grid = gridView.panel;
            gw.ext.Util.processGridEditor(grid.getStore(), rowIndex, column, function(editorByRow) {
              if (editorByRow[0]) {
                editorCfg = editorByRow[0];
                return false;
              }
            });
            // Editor configurations may be declared in an inputDV
            if (!editorCfg) {
              var fieldValue = grid.getStore().getAt(rowIndex).get(column.dataIndex);
              editorCfg = gw.ext.Util.getFirstInputInTemplateCell(fieldValue);
            }
            if (editorCfg) {
              grid.setRowEditor(editorCfg, rowIndex, column.dataIndex);
            }
          }

          var cellButton = gridView.panel.getClickedCellButton(evt);
          var cellMenu = gridView.panel.getClickedCellMenu(evt);

          if (cellButton || cellMenu) {
            // TODO tpollinger: stopEvent does not hinder an event propagation to activate a combo box next to
            // a menu opener. Added evt.suspendEvents(false) below.
            // Reproduction steps:
            // Start PX | Administration | Under Organization Tree, select: Org Tree > Default Org > Western Auto Group >
            //    Auto - Level1 > Auto - TeamA > Edit > Click on the menu opener next to Betty Baker for instance. Notice
            //    that both the menu opens and the combo box is set in edit mode. The Ext JS handleEvents still keeps
            //    the second listener for the beforeedit Ext Grid method, event though stopEvent below has been called.
            // TODO tpollinger: Not adding the stop event will fail the following:
            // Start PX | Editable LV | Click the toggle date button in the cell.
            // Notice that when removing stop event, two toggle events are sent to the server cancelling the first toggle.
            evt.stopEvent();

            // look up button config from the record:
            var btnConfig = record.get(fieldName);

            // look up the child item, if any
            // Menu button
            if (cellMenu) {
              record.menus[cellMenu.getAttribute('id')].showMenu();
            } else {
              var itemIndex = cellButton.getAttribute('itemIndex');
              if (itemIndex) {
                var nestedIndices = itemIndex.split(':');

                if(nestedIndices.length > 1){
                  for(var i=0; i < nestedIndices.length; i++){
                    itemIndex = nestedIndices[i];
                    btnConfig = btnConfig.items[itemIndex];
                  }
                } else{
                  if (btnConfig.xtype == 'templatevaluepanel' || btnConfig.xtype === 'gfieldset') {
                    //FormatCell render items
                    btnConfig = record.get(fieldName).items;
                  }
                  btnConfig = (Ext.isArray(btnConfig) ? btnConfig : btnConfig.item)[itemIndex];
                }
              }
              gw.app.handleCompAction(btnConfig || {}, evt, cellButton);
            }

            // TODO tpollinger: stopEvent: see comment above under stopEvent
            // Call suspendEvents only if it is defined. Seems some events (browser click) don't have this defined
            if (evt.suspendEvents) {
              evt.suspendEvents(false);
            } else {
              // TODO @SenchaUpgrade: One particular test with combobox and menu in a cell would activate the combobox
              // when trying to open the menu. See test: withTest("gw.smoketest.px.webb.TemplateWidgetTest", "testTemplateWidgetInLVCell")
              // Forcing further event processing to end.
              return false;
            }
          }
        }
      });
    },

    rowSelectHandler: function(sm, record, rowIndex) {
      gw.app.requestViewRoot(gw.ext.Util.getFullIdForCell(this.getStore(), record, '_ViewDetail'),
        {updateData:true});
    },

    /**
     * @SenchaUpgrade
     * Do not save state for store. This will lead to extra Ajax requests since we have
     * remoteSort, remoteGroup and etc
     */
    getState: function() {
        var state = this.callParent(arguments);
        delete state.storeState;
        return state;
    },
    applyState: function(state) {
        delete state.storeState;
        this.callParent(arguments);
    },

    /**
     * Set the row editor or editor configuration.
     * @param {Object} editor editor component or editor configuration
     * @param {String} rowIndex row index for a row sensitive editor
     * @param {String} dataIndex data index for the grid column
     *
     * TODO: Refactor: Card 372: Editors should be uniformly set in the grid's editor section.
     * Complex dvInput sections are not declared in the editor column section, hence a column editor will not
     * be set if a cell is activated for editing.
     *
     * TODO: Rename this to setEditorCfg. row editors is an Ext JS full row span editor and has nothing to do
     * with the column editor configuration. The name below is confusing.
     */
    setRowEditor: function(editor, rowIndex, dataIndex) {
      var colIndex = gw.ext.Util.getColumnIndexByDataIndex(this, dataIndex);
      var column =  this.view.headerCt.getHeaderAtIndex(colIndex);

      // See whether the current column editor is the same as the passed in editor
      var editorCfg = editor;
      editor = column.getEditor();
      if (editor && editor.id == editorCfg.id) {
        return;
      }

      // Strip the editor configuration from non editor related configurations
      // TODO: Card 372/PL-22651: Possible memory leak: The combobox editor config id needs to have its id cleared
      if (!(editorCfg instanceof Ext.Component)) {
        // Remove menu opener and other auxiliary editor decorators
        // TODO: Card 372: Redesign how complex cell editors should be shown: For instance
        // fly-out editors that have more real estate than the small cell.
        if (editorCfg.item || editorCfg.id) {
          editorCfg = Ext.apply({}, editorCfg);
          delete editorCfg.item;
          delete editorCfg.id;
        }
      }

      // Set the new editor. If the editor is a configuration object, a new editor component is created
      column.setEditor(editorCfg);
    }
  });

  /**
   * Extends Ext PagingToolbar
   */
  Ext.define('gw.paging', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.gpaging',
    /**
     * Gets the standard paging items in the toolbar
     * @private
     */
    getPagingItems: function() {
      var me = this;

      return [{
          ui: 'plain',
        itemId: 'first',
        tooltip: me.firstText,
        overflowText: me.firstText,
        iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
        disabled: true,
        handler: me.moveFirst,
        scope: me,
        noaction: 1
      },{
          ui: 'plain',
        itemId: 'prev',
        tooltip: me.prevText,
        overflowText: me.prevText,
        iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
        disabled: true,
        handler: me.movePrevious,
        scope: me,
        noaction: 1
      },
        '-',
        me.beforePageText,
        {
          xtype: 'numberfield',
          id: me.pagingId,
          itemId: 'inputItem',
          name: 'inputItem',
          cls: Ext.baseCSSPrefix + 'tbar-page-number',
          allowDecimals: false,
          minValue: 1,
          hideTrigger: true,
          enableKeyEvents: true,
          keyNavEnabled: false,
          selectOnFocus: true,
          submitValue: false,
          // mark it as not a field so the form will not catch it when getting fields
          isFormField: false,
          width: me.inputItemWidth,
          margins: '-1 2 3 2',
          listeners: {
            scope: me,
            keydown: me.onPagingKeyDown,
            blur: me.onPagingBlur
          }
        },{
          xtype: 'tbtext',
          itemId: 'afterTextItem',
          text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            ui: 'plain',
          itemId: 'next',
          tooltip: me.nextText,
          overflowText: me.nextText,
          iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
          disabled: true,
          handler: me.moveNext,
          scope: me,
          noaction: 1
        },{
            ui: 'plain',
          itemId: 'last',
          tooltip: me.lastText,
          overflowText: me.lastText,
          iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
          disabled: true,
          handler: me.moveLast,
          scope: me,
          noaction: 1
        },
        '-',
        {
            ui: 'plain',
          itemId: 'refresh',
          tooltip: me.refreshText,
          overflowText: me.refreshText,
          iconCls: Ext.baseCSSPrefix + 'tbar-loading',
          handler: me.doRefresh,
          scope: me
        }];
    },

    showHidePagingControls: function () {
      var inputItem = this.child('#inputItem');
      this.inputItem = inputItem;
      var inputIndex = this.items.indexOf(this.inputItem);

      this.first = this.getComponent('first');
      this.prev = this.getComponent('prev');
      this.next = this.getComponent('next');
      this.last = this.getComponent('last');

      // TODO: Refactor: Card XXX: Revisit the logic below for showing paging toolbar controls
      // Depends on Sencha toolbar implementation
      var otherItems = [this.first, this.prev, this.next, this.last];

      if (this.store.pageSize < this.store.getTotalCount()) { // currently paged
        Ext.each(this.items.getRange(inputIndex - 2, inputIndex + 2), function(item) {
          item.show();
        });
        Ext.each(otherItems, function(item) {
          item.show();
        });
      } else { // not yet paged
        Ext.each(this.items.getRange(inputIndex - 2, inputIndex + 2), function(item) {
          item.hide();
        });
        Ext.each(otherItems, function(item) {
          item.hide();
        });
      }

      if (this.pagingDisabled) {
        this.inputItem.disable();

        Ext.each(otherItems, function(item) {
          item.disable();
        });
      }
    },

    showOrHideToolbar : function() {
      var allHidden = true;
      this.items.each(function(item) {
        if (!item.hidden) {
          allHidden = false;
        }
      });

      if (allHidden) {
        this.hide();
      } else {
        this.show();
      }
    },

    // TODO: Refactor listener registration
    listeners: {

      change: function(pbar) {
        this.showHidePagingControls();
        this.showOrHideToolbar();
      },

      add : function(pbar, component) {
        if (this.hidden) {
          this.showOrHideToolbar();
        }
      }
    },

    /**
     * Overrides super to do special handling for child items
     */
    initComponent: function() {
      this.callParent(arguments);

      // set id for the grid record count
      var displayItem = this.child('#displayItem');
      if (displayItem && this.recordCountId) {
        displayItem.id = this.recordCountId;
      }

      var refreshItem = this.child('#refresh');
      refreshItem.hide();
      refreshItem.previousSibling().hide();
    }
  });

  Ext.define('gw.override.Ext.Editor', {
    override: 'Ext.Editor',
    completeOnEnter: false, // Do not dismiss editor or lose focus on ENTER key

    initComponent: function(){

      /** Do not complete edit yet, if we need to confirm the value change */
      this.on ('beforecomplete', function(editor, value, startValue) {

        var field = editor.field;
        if (field.skipConfirm) {
          return; // it has been confirmed already
        }

        // show confirmation dialog, if value has changed:
        if (field.confirm && value !== startValue) {
          gw.app.confirm('', field.confirm, function(btn) {
            if (btn == 'yes' || btn == 'ok') { // confirmed

              field.skipConfirm = true; // do not confirm again for this change
              editor.completeEdit();
              field.fireEvent('blurchange', field, value, startValue);
              delete field.skipConfirm;

            } else { // cancelled:
              editor.cancelEdit();
            }
          });

          return false;
        }
      });

      //
      // When click to edit a bounded dropdown cell, open menu
      // When tab to edit a text cell, select all text.
      //
      this.on('startedit', function(ed) {
        // @SenchaUpgrade what's the best way to distinguish "clicking" vs "tabbing" into a cell editor?
        if (Ext.EventObject.type == 'click') { // click to edit

          if (ed.field instanceof gw.ext.SimpleCombo) {
            ed.field.on('focus', function () { // wait till the field gets focus
              ed.field.selectText();
              ed.field.onTriggerClick();
            }, null, {single:true})
          }

        } else if (Ext.EventObject.type == 'blur'){ // tab to edit

          if (ed.field instanceof Ext.form.field.Text) {
            ed.field.on('focus', function () { // wait till the field gets focus
              ed.field.selectText();
            }, null, {single:true});
          }
        }
      });

      this.callParent(arguments);
    },

    /**
     * Extends base implementation to remember editor on the field
     */
    onRender : function() {
      this.callParent(arguments);
      this.field.editor = this;
    },

    /**
     * Overrides super to only edit the "text" part of a composite field
     */
    startEdit: function(el, value) {
      // Do not start extjs editor for radiogroup, radiogroups use custom rendering
      var type = this.field.xtype;

      if (!gw.ext.Util.hasEditor(type)) {
        return false;
      }

      // TODO: Refactor: Card 372: Edit value should be a uniform value.
      this.callOverridden([el, gw.ext.Util.unboxCellValue(value)]);
      // extra checking to un-register the tooltip if the field is invalid so the error message doesn't overlap with tooltip.
      // Event fired was suspended during cell start edit so validitychange event didn't get fired.
      if (this.field.tooltip) {
        if (this.field.isValid()) {
          this.field.setTooltip(this.field.tooltip, /*initial*/true);
        } else {
          this.field.clearTip();
        }
      }
    },

    /**
     * Overrides original to returns raw value which is always a string.
     * To preserve the date format after editing (TODO: any better way?).
     */
    getValue : function() {
      return gw.ext.Util.getFieldValue(this.field);
    },

    // TODO: Refactor: HACK!!  This is to temporarily work around radiogroup inconsistency,
    // in IE, blur is triggered, in FF, blur is not triggered.
    // We may replace radiogroup composite field, so for now, will live with this
    // workaround.
    onBlur: function() {
      if (this.field.xtype =='radiogroup') {
        gw.Debug.log('Ignoring onBlur for radiogroups' + this.field.eventParam);

      } else {
        this.callOverridden(arguments);
      }
    },

    // Need to do this otherwise we get an error in IE when the panel is destroyed.
    // Error is in insertAfter:  'parentNode is null or not an object'
    beforeDestroy : function() {

        //@SenchaUpgrade
        // TODO: assigning items to null might prevent their proper destroy() process.
        // Revisit this "IE bug" and see if there's a better solution.
        // by Sencha, April 9 2013
        if (this.field.items) {
            this.field.items = null;
        }

        this.callOverridden(arguments);
    }
  });

  // TODO: Refactor: Ext.data.Model.oldBehaviors.set is called from other places as a static call.
  // We should examine if this is still needed and have this overridden function below here treat the
  // particular exception cases where the parent method is being called.

  Ext.define('gw.override.Ext.data.Model', {
    override: 'Ext.data.Model',

    get: function(fieldName){
        var result = this.callParent(arguments);
        if(Ext.isObject(result) && (result.xtype === 'checkbox' || result.xtype === 'radio')){
            return result.editValue.toUpperCase() === 'TRUE' ? true : false;
        }
        return result;
    } ,

    set: function(fieldName, value) {
      // TODO: Redesign: Card 372: PL-22069: Normalize cell value for dvcolumn and other complex cell values possibly on the
      // server to remove below cell data processing complexity: Once this is removed, the override is not needed
      // any more.
      /*
       * If we're passed an object, iterate over that object. NOTE: we pull out fields with a convert function and
       * set those last so that all other possible data is set before the convert function is called
       */
      if (!(arguments.length == 1 && Ext.isObject(fieldName))) {
        var oldValue = this.data[fieldName];
        var dvInput = gw.ext.Util.getFirstInputInTemplateCell(oldValue);
        if ((oldValue && oldValue.text !== undefined && oldValue.cb == undefined) || dvInput) {
          if(oldValue.xtype === 'checkbox' || oldValue.xtype === 'radio'){
            value = (value ? 'true' : 'false');
          }

          if (value && value.value != undefined) {
            value.text = value.value;
            delete value.value;
            value = Ext.apply({}, value, oldValue);
          } else {
            value = Ext.apply({}, {text: value}, oldValue);
          }
          if (oldValue.editValue != undefined) {
            value.editValue = value.text; // update editValue if needed
          }
        }
        // For single dv input in cell.
        var item = gw.ext.Util.getFirstInputInTemplateCell(value)
        if (item && value.text != undefined) {
          // TODO: fix for PL-18609: check if setting item['text'] is the correct fix
          item['value'] = item['text'] = value.text;
        }
      }

      // update record field:
      this.callOverridden(arguments);

      // TODO: Refactor: Card 371: This could be tied into the store on an update event and then call the server update.
      // TODO tpollinger: The alt footer value and the update sum should not get called when the model/record
      // gets initialized. One of the only ways to check this reliably is to override the model's constructor
      // and add an initialization flag. Check that the flag is not set for calling server updates. This ensures
      // that no unneeded calls to the server are made.
      if (this.store && this.store.storeId) {
        if (value && value.altVal) {
          // update alt footer value, which may cause updating record field again:
          gw.app.requestViewRoot(gw.ext.Util.getFullIdForCell(this.store, this, fieldName),
            {calcAltModelValue: (value && value.text !== undefined) ? value.text : value},
            'NO_MASK_ELEM',
            {altValRec:[this, fieldName]});
        }
        var grid = Ext.ComponentMgr.get(this.store.storeId);
        if (grid) {
            _updateSum(grid, fieldName, this);
        }
      }
    },

    unjoin: function(store) {
        if (this.menus) {
            Ext.iterate(this.menus, function(mId, item) {
               item.menu.destroy();
            });
            delete this.menus;
        }

        this.callOverridden(arguments);
    }
  });

})();

Ext.define('gw.ext.RowCheckColumn', {
    extend: 'Ext.ux.CheckColumn',
    alias: 'widget.rowcheckcolumn',
    text: '',

    initComponent: function() {
      this.baseHdCheckboxCls = 'x-grid-checkcolumn';
      this.checkedHdCheckboxClsCls = this.baseHdCheckboxCls + '-checked';
      this.hdCheckboxText = '<img class="'+ this.baseHdCheckboxCls +'" src="' + Ext.BLANK_IMAGE_URL + '"/>';

      this.on({
        /**
         * Update row checkboxes when the header checkbox is clicked
         */
        headerclick: function(ct, column) {
        // toggle header checkbox:
        var headerIcon = column.el.down('img');
        headerIcon.toggleCls(column.checkedHdCheckboxClsCls);
        var checked = headerIcon.hasCls(column.checkedHdCheckboxClsCls);

        // check (or uncheck) all rows
        var grid = ct.ownerCt;
        grid.store.each(function(record, recordIndex) {
          column.updateCheckedState(grid, recordIndex, checked);
          return true;
        });

          // update button state:
          grid.updateFlagged();
        },

        /**
         * register event to show or hide header checkbox when store data changes
         * @param column
         */
        beforerender: function(column) {
          var store = column.ownerCt.ownerCt.store;

          store.on('load', function() {
            //Only displays the header checkbox when there is at least one row-level checkbox:
            var store = this.ownerCt.ownerCt.store;
            var showHeaderCB = store.findBy(function(record) { return record.get(column.dataIndex) !== ''; }) >= 0;

            var text = showHeaderCB ? this.hdCheckboxText : '';
            if (text != this.text) {
              this.setText(text);
            }
          }, column);
        }
      });

      this.callParent(arguments);
    },

    renderer: function(value, p) {
        if(value === ''){
          return '';
        } else {
          p.tdCls += ' g-no-bg-img'; //disable dirty indicator
          return this.callParent(arguments);
        }
    },

  /**
   * @return {Boolean} true, if the checked state is changed
   */
    updateCheckedState: function(grid, recordIndex, checked) {
      var dataIndex = this.dataIndex;
      var record = grid.store.getAt(recordIndex);
      var value = record.get(dataIndex);
      if (value === '') {
        return false; // checkbox n/a
      }

      if (checked != value) {
        record.set(dataIndex, checked);
        this.fireEvent('checkchange', this, recordIndex, checked);
        return true;
      }

      return false;
    },

    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        if (type == 'mousedown' || (type == 'keydown' && (e.getKey() == e.ENTER || e.getKey() == e.SPACE))) {
            var record = view.panel.store.getAt(recordIndex),
                dataIndex = this.dataIndex;

            // toggle checked state
            if (!this.updateCheckedState(view.panel, recordIndex, !record.get(dataIndex))) {
              return false;
            }

            // update CheckValues buttons
            view.panel.updateFlagged();

            // cancel selection.
            return false;

        } else {
            return this.callParent(arguments);
        }
    }
});


Ext.define('gw.override.Ext.grid.plugin.CellEditing', {
  override: 'Ext.grid.plugin.CellEditing',

  init: function() {
    this.callParent(arguments);

    this.on('beforeedit', function(editor, editEvt){

      // Do not allow editing a new field, if a confirmation dialog is open for the previous field:
      if (Ext.Msg.isVisible() || // confirmation dialog
           editor.activeEditor && editor.activeEditor.editing) { // previous editor still active
//        console.log('Do not start editing while confirmation is present');
        return false;
      }

      var column = editEvt.column;

      if (!gw.ext.Util.isCellEditable(editEvt.colIdx, editEvt.rowIdx, column, editEvt.grid)) {
        return false;
      }

      // If this is a single dv input.
      // TODO: Card 372: Server refactor for DV editors
      var fieldValue = editEvt.record.get(editEvt.field);
      var dvInput = gw.ext.Util.getFirstInputInTemplateCell(fieldValue);
      if (dvInput) {
        editEvt.grid.setRowEditor(dvInput, editEvt.rowIdx, editEvt.column.dataIndex);

        // Stop normal Ext JS editor processing if the editor is a radio cell and the column is not configured as
        // a radio column.
      } else if (column.xtype != 'radiocolumn') {
        var beginEdit = true;

        gw.ext.Util.processGridEditor(editor.grid.store, editEvt.rowIdx, column, function(editorByRow) {
          var editorCfg = editorByRow[0];
          var editorType = editorCfg.xtype;

          // If the editor is a radio input, don't add an editor configuration as an implicit
          // editor has already been created. Stop the normal Ext JS editor processing
          if (!gw.ext.Util.hasEditor(editorType)) {
            beginEdit = false;

            // TODO: Redesign: Card 372: Look into making field container editors (if any) as flyouts.
          } else if (!(editorCfg.xtype == 'fieldcontainer')) {
            editorCfg.eventParam = gw.ext.Util.getFullIdForCell(editor.grid.store, editEvt.record, editEvt.field);
            if (!(editorCfg instanceof Ext.form.Field)) {
              column.setEditor(editorCfg);
              return false;
            }
          }
        });

        if (!beginEdit) {
          return false;
        }
      }
    })
  },

  /**
   * Special handling for ENTER key on cell editor - Some LVs are configured to navigate through rows/cells on ENTER key.
   * @SenchaUpgrade: override private method
   */
  onSpecialKey: function(ed, field, e) {
    if (e.getKey() === e.ENTER) {
      var grid = this.getCmp(),
           view = grid.getView(),
           record = this.getActiveRecord(),
           position = view.getPosition(record, this.getActiveColumn()),
           bQuickAdd = grid.gQuickAdd,
           bCellNav = bQuickAdd || grid.gCellNavOnEnter,
           bRowNav = bCellNav || grid.gRowNavOnEnter,
           bForceRowNav,
           cellData;

      var direction = bCellNav ? (e.shiftKey ? 'left' : 'right') : // navigate horizontally
           bRowNav ? (e.shiftKey ? 'up' : 'down') : // navidate vertically
                null;

      if (direction) {
        e.stopEvent();

        // @SenchaUpgrade mimic the "Tab" behavior in super class, by calling non-public methods:
        do {
          if (bCellNav &&
               (cellData = grid.getStore().getAt(position.row).get(view.headerCt.getHeaderAtIndex(position.column).dataIndex)) &&
               cellData.endOfCellNav) { // if this cell is marked as end of cell-nav, force wrapping to the next row:
            position.column = grid.headerCt.getGridColumns().length - 1;
          }

          position  = view.walkCells(position, direction, e, /*preventWrap*/false);
        } while(position && (!view.headerCt.getHeaderAtIndex(position.column).getEditor(grid.getStore().getAt(position.row)) || !this.startEditByPosition(position)));

        if (position) {
          return; // we have navigated to a different row or cell
        }
      }

      if (bQuickAdd) { // No more cell to navigate to, add a new row:
        // TODO: optimize to not post form data or update entire store during quickAdd?
        gw.app.requestViewRoot(grid.id, {quickAdd:true, updateData:true}, undefined, {postCallback: function() {
          // start at the beginning of the last row:
          var position = view.getPosition(grid.getStore().last(), grid.headerCt.getGridColumns()[0]);

          while(position && (!view.headerCt.getHeaderAtIndex(position.column).getEditor(grid.getStore().getAt(position.row)) || !this.startEditByPosition(position))) {
            position  = view.walkCells(position, 'right', e, /*preventWrap*/false);
          }
        }, postCallbackScope:this});

        return; // we are done
      }
    }

    return this.callParent(arguments);
  },

  showEditor: function(ed, context, value) {
    /**
     * AHK - 4/10/2013 - We want text areas to expand to fill the entire cell, while using the configured
     * number of rows as a minimum size.  The best way that I've found to do that is to override the code
     * that shows the editor so that we explicitly set the height on the textarea at that time.
     * See PL-23772
     * @SenchaUpgrade Ideally there would be some more supported way of doing this
     */
    if (ed.field && ed.field.xtype == 'textarea') {
      var configuredHeight = (ed.field.rows * 17) + 8; // AHK - line-height is 17, vertical padding is 6px total, cell border is 2px total
      var rowHeight = context.row.offsetHeight;
      ed.field.height = (rowHeight > configuredHeight ? rowHeight : configuredHeight);
    }
    // AHK - 5/30/2013
    // In some odd cases involving check boxes, the call to showEditor will fail in Table.getCell (Table.js line 522)
    // because the row can't be found.  So as a total hack, if we know the parent call will fail, just don't make it,
    // since right now the only cases it fails in are cases where we don't even have an editor to show
    // @SenchaUpgrade
    var row = this.grid.getView().getNode(context.record, true);
    if (row) {
      this.callParent(arguments);
    }
  },

  /**
   * @SenchaUpgrade workaround ExtJs4.2.1 bug to restore context after "beforeedit" returns false
   * https://support.sencha.com/index.php#ticket-12906
   */
  startEdit: function(record, columnHeader, /* private */ context) {
    var originalContext = this.context;
    var val = this.callParent(arguments);
    if (val === false ) {
      this.context = originalContext; // restore old context
    }
    return val;
  }
});

Ext.define('gw.override.Ext.grid.plugin.Editing', {
  override: 'Ext.grid.plugin.Editing'
});


//
// Grid shrinkWrap bug fixes
//

/**
 * @SenchaUpgrade
 *
 * Added on 06/12/13 by Bruno Tavares for Ext 4.2.1
 * Support Ticket ticket-12521
 * Sencha Jira Ticket EXTJSIV-7923
 *
 * To solve our layouts we leave grids without any layout… it won't have a width and it will fit 100%…
 * PLUS we add shrinkWrap, so the columns push the grid further 100%…
 * PLUS set gridview position: relative; so it has at least 100%… if the columns are < 100% it doesn't matter… the gridview has 100%
 */

/**
 * First part, make sure position is relative. So it's always at least 100%.
 * (that's the way <divs> work)
 */
Ext.define('ViewOverride', {
  override: 'Ext.grid.View',
  style: 'position: relative'
});

/**
 * @SenchaUpgrade
 * Second part, change
 *
 *      invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize < horzSize,
 *      invalidateVert = vert.shrinkWrapDock && vert.maxChildSize < vertSize,
 * to
 *      invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize <= horzSize,
 *      invalidateVert = vert.shrinkWrapDock && vert.maxChildSize <= vertSize,
 *
 * This will be fixed in the framework probably for 4.2.2, so remove it once it's ready.
 * This makes docked titles move along with the body
 */
Ext.define('DockOverride', {
  override: 'Ext.layout.component.Dock',

  invalidateAxes: function(ownerContext, horz, vert){
    var before = this.beforeInvalidateShrinkWrapDock,
         after = this.afterInvalidateShrinkWrapDock,
         horzSize = horz.end - horz.begin,
         vertSize = vert.initialSize,
         invalidateHorz = horz.shrinkWrapDock && horz.maxChildSize <= horzSize,
         invalidateVert = vert.shrinkWrapDock && vert.maxChildSize <= vertSize,
         dockedItems, len, i, itemContext, itemSize, isHorz, axis, sizeProp;

    if (invalidateHorz || invalidateVert) {
      if (invalidateVert) {
        // For vertical, we need to reset the initial position because they are affected
        // by the horizontally docked items
        vert.begin = vert.initialBegin;
        vert.end = vert.begin + vert.initialSize;
      }
      dockedItems = ownerContext.dockedItems;
      for (i = 0, len = dockedItems.length; i < len; ++i) {
        itemContext = dockedItems[i];
        isHorz = itemContext.horizontal;
        axis = null;
        if (invalidateHorz && isHorz) {
          sizeProp = horz.sizeProp;
          itemSize = horzSize;
          axis = horz;
        } else if (invalidateVert && !isHorz) {
          sizeProp = vert.sizeProp;
          itemSize = vertSize;
          axis = vert;
        }

        if (axis) {
          // subtract any margins
          itemSize -= itemContext.getMarginInfo()[sizeProp];
          if (itemSize !== itemContext.props[sizeProp]) {
            itemContext.invalidate({
              before: before,
              after: after,
              axis: axis,
              ownerContext: ownerContext,
              layout: this
            });
          }
        }
      }
    }
  }
});

/**
 * @SenchUpgrade Referencing private ExtJS method
 * Override the default behavior to allow flex column to work when LV has shrinkWrap=true.
 */
Ext.define('Override.view.TableLayout', {
  override: 'Ext.view.TableLayout',

  finishedLayout: function() {
    var me = this;

    if (me.ownerContext.widthModel.shrinkWrap) {
      me.setColumnWidths(me.ownerContext);
    }

    me.callParent(arguments);
  }
});
