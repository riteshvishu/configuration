/**
 * Util class for common ExtJs operations. This file needs to be included before other ExtJs files.
 */
gw.ext.Util = function() {
  /**
   * Evaluates flags based of checkbox state
   * @param {Ext.data.Model[]} checkedItems an array of checked items
   * @param flags flags
   */
  function evalCheckboxFlags(checkedItems, flags, grid) {
    var totalFlags = checkedItems.length;
    var conditions = flags.split(',');
    for (var i = 0; i < conditions.length; i++) {
      var condition = conditions[i];
      while (condition.substr(0, 1) == ' ') { // Remove initial space
        condition = condition.substr(1);
      }
      var parts = condition.split(' ');
      var countFlags = countCheckedFlags(checkedItems, parts[1], parts[0] == 'exists', grid);
      if (parts[0] == 'one' && (countFlags != 1 || totalFlags != 1) ||
        parts[0] == 'two' && (countFlags != 2 || totalFlags != 2) ||
        parts[0] == 'any' && countFlags == 0 ||
        parts[0] == 'no' && countFlags > 0 ||
        parts[0] == 'all' && (countFlags != totalFlags || countFlags == 0) ||
        parts[0] == 'exists' && countFlags == 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Counts checked flags
   * @param checkedItems an array of checked items
   * @param flagName
   * @param includeUnchecked
   */
  function countCheckedFlags(checkedItems, flagName, includeUnchecked, grid) {
    var count = 0;

    function _recContainsFlag(item) {
      var flagsProp = gw.ext.Util.getFlagsProperty();
      var flags = item.get ? item.get(flagsProp) : item[flagsProp];
      return flags && (Ext.Array.indexOf(flags, flagName) != -1);
    }

    if (includeUnchecked) {
      grid.store.queryBy(function(record) {
        if (_recContainsFlag(record)) {
          // If we find just one record with this flag defined, we are done.
          count++
          return false
        }
      })
    } else {
      Ext.each(checkedItems, function(item) {
        if (_recContainsFlag(item)) {
          count++
        }
      });
    }
    return count;
  }

  function eachDescendentRec(id, fn, depth) {
    if (id) {
      if (!fn(id, depth)) {
        return false;
      }

      if (id.children) {
        for (var i = 0; i < id.children.length; i++) {
          var child = id.children[i];
          if (!eachDescendentRec(child, fn, depth + 1)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * check whether the menuitems are loaded to the menu yet.
   * ExtJs sometimes still renders the items as containers even the menuitem is not loaded to the menu.
   *
   * @param owner
   * @return {Boolean}
   */
  function hasMenuItem(owner) {
    var hasMenuItem = false;
    Ext.each(owner.menu.items.items, function (item) {
      if (item.xtype == 'gmenuitem' || item.xtype == 'menu') {
        hasMenuItem = true;
        return false;
      }
    });
    return hasMenuItem;
  }

  return {
    getTabBarLinksId : function() {
      return ':tblinks';
    },

    getTabsId : function() {
      return ':tabs';
    },

    getInfoBarId : function() {
      return 'infoBar';
    },

    /**
     * appends an item and child items under its menu to the array
     * @param item item with menu
     * @param to an array
     */
    appendAndFlattenMenu : function(item, to) {
      to.push(item)
      if (item.menu) {
        var subMenu = Ext.isArray(item.menu) ? item.menu : item.menu.items;
        if (subMenu) {
          Ext.each(subMenu, function(sub) {
            to.push(sub)
          })
          delete item.menu
          item.menu = undefined

          // apply header style to "componentCls", to avoid overriding default "cls" at Class level which indicates server action
          if (item.componentCls) {
            item.componentCls += ' g-menu-header'
          } else {
            item.componentCls = 'g-menu-header'
          }
          if (item.noaction) {
            item.canActivate = false; // do not active an item that does not have submenu or server action
          }
        }
      }
    },

    /**
     * fetches menu content when expanding for the first time
     * @param owner owner of the menu
     */
    createAndShowOnDemandMenuIfNeeded : function(owner) {
      // if there is any item has xtype=='gmenuitem', it means menuItems are already loaded.
      if (!(owner.ondemandmenu && owner.menu &&
        (owner.menu.items == null || owner.menu.items.length == 0 || !hasMenuItem(owner) ))) {
        return; // no ondemand menu
      }

      var menu = owner.menu;
      if (menu.el && menu.el.hasCls(gw.app.getPanelLoadingCls()) ||
        menu.cls && menu.cls.indexOf(gw.app.getPanelLoadingCls()) >= 0) {
        return;
      }
      // Add a container, this is used for menupanel,
      // it's essentially removed in other cases because
      // we reconstruct the menu.
      menu.add({xtype:'container'})
      var p = menu.items.get(0)
      p.addCls(gw.app.getPanelLoadingCls())

      // AHK - 1/31/2013 - Once an on-demand menu has been opened, we need to invalidate the checksum so that
      // it will be re-rendered on future requests.  Otherwise, the menu items will be cached client-side, even
      // if they should be changed
      owner.checksum = 'checksumInvalidated';
      gw.app.requestViewRoot(owner.id, undefined, undefined, {callback:function(options, success, response) {
        p.removeCls(gw.app.getPanelLoadingCls())
        var props = Ext.decode(response.responseText)
        if (owner.deferHideMenu) {
          owner.deferHideMenu(); // hide the fake sub menu, before override it with real content
        }

        // Need to construct the menu because the initComponent
        // logic in the menu override determines the layout.
        owner.menu = Ext.applyIf(Ext.menu.MenuMgr.get(menu.cloneConfig({
          items : props.items || [{text:'(Empty)', disabled:true}] //TODO: localize
        })), {openerId: owner.menu.openerId});

        var opener = owner.menuOpener || owner;

        if (opener.showMenu) {
          if (owner.menuOpener && owner.menuOpener.cmp) {
            // this menu created by helperitem, so call with the right scope
            opener.showMenu.call(owner.menuOpener.cmp);
          } else {
            opener.showMenu();
          }
        } else if (owner.expandMenu) {
          owner.expandMenu(0);
        }
      }}, /*bChildrenOnly*/true)
    },
    /**
     * Get the field value in the display format.
     * This function gets called for UI string display and client reflection.
     * @param comp extjs component
     */
    getFieldValue : function(comp) {
      // TODO PL-18534: It seems that the client display format is also the posted server format (though not
      // by calling this function). For instance, the submitted date is 11/23/2011 for 23 Nov 2011.
      // The server should communicate in a canonical data format, for instance the ISO 8601 date format would be
      // a sensible choice for canonical date formats: 2011-11-23
      var value = comp.getValue();
      if (value) {
        if (comp instanceof Ext.form.CheckboxGroup) {
          value = comp.id in value ? value[comp.id] : ''; // unbox
//        if (comp.xtype == 'radiogroup') { // radio group
//          value = value.inputValue // unbox
//        } else if (comp.xtype == 'checkboxgroup') { // checkbox group
//          for (var i = 0; i < value.length; i ++) {
//            value[i] = value[i].inputValue // unbox
//          }
        } else if (value instanceof Date) {
          value = comp.getRawValue(); // to avoid date being formatted using browser's default format
        } else if (comp.xtype == 'multiselect' || comp.toMultiselect) { // shuttle
          if (Ext.isString(value)) {
            value = Ext.JSON.decode(value);
          }
        }
      }
      return value === null ? '' : value;
    },

    /**
     * Decode the value from string to object
     * @param value
     * @returns decoded value as an object
     */
    decodeValue : function(value) {
      if(value && Ext.isString(value)) {
        value = Ext.JSON.decode(value)
      }
      return value;
    },

    /**
     * Replaces content of a component.  The callers of this method are responsible for wrapping calls to this
     * method with suspendLayouts()/resumeLayouts() appropriately
     * @param comp component
     * @param props new properties of the component
     */
    replaceItems : function(comp, props) {
      // Replace all items.
      var removedComponents = comp.removeAll();

      // If there are items to add, add them
      if (props.items) {
        comp.add(props.items);
      }

      // Then update other properties
      gw.ext.Util.updateProp(comp, props);
    },

    /**
     * Updates component properties and force layout
     * @param comp component
     * @param props properties
     */
    updateProp : function(comp, props) {
      // Process non-children attributes which may depend on new child items:
      if (comp.updateProps) {
        comp.updateProps(props) // the comp wishes to process all props in a certain order
      } else {
        Ext.iterate(props, function(key, value) {
          if (key != "items") {
            // capitalize the first char, but retain case of rest of the string:
            var setter = comp['set' + key.charAt(0).toUpperCase() + key.substr(1)];
            if (Ext.isFunction(setter)) {
              setter.apply(comp, [value])
            }
          }
        })
      }

      if (!comp.isVisible()) {
        comp.show();
        if (comp.height && comp.height != comp.getHeight()) {
          comp.setHeight(comp.height)
        }
      }
    },

    /**
     * Walk each descendent (child and grand children) of the given element
     * @param {String/Element/HTMLElement} id locator string id, element or dom node.
     * @param {Function} fn function to call: fn(dom, depth): boolean. Return false to
     * stop iteration, true to keep iterating
     * @param {HTMLElement} fn.dom is the currently visited dom node
     * @param {Integer} depth the current depth to root node
     */
    eachDescendent: function(id, fn) {
      if (!fn) {
        return;
      }

      if (Ext.isString(id)) {
        id = Ext.ComponentManager.get(id);
      }
      if (id && id.el) {
        id = id.el;
      }
      if (id && id.dom) {
        id = id.dom;
      }

      if (id) {
        eachDescendentRec(id, fn, 0);
      }
    },

    /**
     * Clears all gw- style classes from the given element
     * @param {Element/HTMLElement} element
     */
    clearStyleClasses: function(element) {
      if (element && element.el) {
        element = element.el;
      }
      if (element && element.dom) {
        var styles = element.dom.className;
        if (styles) {
          styles = styles.split(" ");
        }
        for (var i = 0; i < styles.length; i++) {
          var style = styles[i];
          if (style.indexOf("gw-") == 0) {
            element.removeCls(style);
          }
        }
      }
    },

    /**
     * Clear all gw- style classes from the given element and its descendents
     * @param {Element/HTMLElement} element
     */
    clearDescendentStyleClasses: function(element) {
      var self = this;
      this.eachDescendent(element, function(descendent, depth) {
        descendent = Ext.Element.get(descendent);
        self.clearStyleClasses(descendent);
        return true;
      });
    },

    getValueByIds : function(ids) {
      var values = []
      Ext.each(ids, function(id) {
        var comp = Ext.ComponentManager.get(id)
        values.push(gw.ext.Util.getFieldValue(comp))
      })
      return values
    },

    /**
     * Sets the value for the component, and fires change event if value changes
     * @param {Ext.Component} comp the component to set the value to
     * @param {Object/String} value the simple display value or complex value object to set.
     * The simple value should be available as value.value
     */
    setValue : function(comp, value) {
      var complexValue = value;
      if (value && value.value != undefined) {
        value = value.value;
      }

      if (comp.toField) { // shuttle
        // remove all selected items:
        var toList = comp.toField.boundList;
        var fromList = comp.fromField.boundList;

        toList.getSelectionModel().selectAll();
        comp.onRemoveBtnClick();
        // items removed from toList still remained selected in fromList. so need to deselect from fromList
        fromList.getSelectionModel().deselectAll();
        // add new values:
        var indexes = [];
        for (var i = 0; i < value.length; i ++) {
          indexes.push(fromList.getStore().find(comp.valueField, value[i]));
        }
        for (var i = 0; i < indexes.length; i ++) {
          fromList.getSelectionModel().select(indexes[i], true, true);
        }
        comp.onAddBtnClick();

      } else {
        // Change the component style if any. Clear any gw- styles that have been set
        if (comp instanceof Ext.form.field.Display && comp.inputEl) {
          // Clear also all styles from the full form field, not just the input element
          this.clearDescendentStyleClasses(comp);
          if (complexValue && complexValue.cls) {
            comp.inputEl.addCls(complexValue.cls);
          }
        }

        // Update editValue if it has already been set.
        // editValue represents the modal value (smoke test value).
        // All other fields like text, value, rawValue are variations on the display value (smoke test display text)
        if (comp.editValue != null) {
          comp.editValue = value;
        }

        if (comp instanceof Ext.form.field.Date && Ext.isString(value) && comp.valueToRaw(value) != value) {
          comp.setRawValue(value); // bypass validation to allow invalid user value
        } else if (comp instanceof Ext.form.RadioGroup && Ext.isString(value)) { //RadioGroup setValue is expecting an object in 'id:value' form
          var radioValue = {};
          radioValue[comp.id] = value;
          comp.setValue(radioValue);
        } else {
          comp.setValue(value); // fires change event
        }
      }
    },

    /**
     * Gets HTML markup for a link within a grid cell. We don't generate component for cell links for perf reason.
     * @param linkConfig config
     * @param options additional attributes for the the html element
     * @return html
     */
    markupCellLink : function(linkConfig, options) {
      var position,
        config;

      config = Ext.apply(
        linkConfig.text ? {tag: linkConfig.disabled ? 'span' : 'a', html:linkConfig.text + (linkConfig.html || '')} :
        {tag:'img', src:(linkConfig.icon ? linkConfig.icon : Ext.BLANK_IMAGE_URL)},
        options)

      // css classes:
      var cls = []
      if (!linkConfig.disabled) {
        cls.push( linkConfig.menu ? gw.ext.CELL_MENU_CLS : gw.app.getEventSourceCls() ) // cls to indicate action or menu
      }
      if (linkConfig.cls) {
        cls.push(linkConfig.cls) // other cls from base config
      }
      if (cls.length > 0) {
        config.cls = cls.join(' ')
      }

      Ext.copyTo(config, linkConfig, ['id']);
      if (linkConfig.tooltip) {
        config['title'] = linkConfig.tooltip;
      }

      if (linkConfig.hidden) {
        config.style = 'display:none';
      }

      if (linkConfig.handler) {
        config.onclick = linkConfig.handler
      }
      return Ext.core.DomHelper.markup(config)
    },

    /**
     * Instantiates menu of the owner object into Ext Menu Component,
     * and remembers the menu on the record to be destroyed later.
     * (NOTE: This method is called to instantiate menu during rendering,
     *  in order for SmokeTest to be able to find menu item.)
     * @param owner owner object
     * @param openerId id of the HTML element that will open the menu
     * @param record store record backing the cell
     */
    instantiateCellMenu : function(owner, openerId, record) {
      if (owner.menu) {
        record.menus = record.menus || {};

        if (record.menus[openerId] && record.menus[openerId].menu) {
          // Destroy any menus that have been created already to avoid double creation of menu entry components.
          // TODO Refactor: Optimize: See whether it is more efficient to create the menus over if they have changed.
          record.menus[openerId].menu.destroy();
          delete record.menus[openerId];
        }

        record.menus[openerId] = {
          id: owner.id,
          menu: Ext.apply(this.getOrCreateFieldMenu(openerId, owner.menu), {openerId: openerId}),
          showMenu: function() {
            gw.ext.Util.createAndShowOnDemandMenuIfNeeded(this);
            this.menu.showAt(Ext.fly(this.menu.openerId).getAnchorXY('bl'));
          }
        };

        if (owner.ondemandmenu) {
          record.menus[openerId].ondemandmenu = owner.ondemandmenu;
        }
      }
    },

    /**
     * Given the menu opener id (for instance helper icon), get a stable id for a dependable menu in a field
     * @param {String} openerId the menu opener id (owning menu component id)
     * @return {String} stable menu id based on the opener id
     */
    getFieldMenuId: function(openerId) {
      return openerId + "-fieldMenu";
    },

    /**
     * Get or create a dependent field menu given the menu's owner component's id. If there is no menu
     * for the matching menu, one is created from the given menu configuration
     * @param {String} openerId the menu owner's id
     * @param {Object} menuCfg the menu configuration object
     * @return {Ext.menu.Menu} existing or newly created Ext.menu.Menu component
     */
    getOrCreateFieldMenu: function(openerId, menuCfg) {
      var menuId = this.getFieldMenuId(openerId);
      var menu = Ext.ComponentManager.get(menuId);

      if (!menu) {
        menuCfg.id = menuId;
        menu = new Ext.menu.Menu(menuCfg);
      }

      return menu;
    },

    /**
     * Updates store data and options
     * TODO: ExtJs upgrade4: This method mimics the onProxyLoad() method of the store.
     * @param store store
     * @param value data
     * @param operation [optional] the data operation
     */
    updateStore : function (store, value, operation) {
      var cmp = Ext.ComponentManager.get(store.storeId);

      // apply options from server
      if (!store.lastOptions) {
        store.lastOptions = {params:{}}
      }
      Ext.apply(store.lastOptions.params, value.options)

      // load data and retain options
      if (store.root && !value[store.root]) {
        value[store.root] = []
      }

      //todo: extjs upgrade4 passing in value, double check for issues
      var r = store.getProxy().getReader().readRecords(value)
      // @SenchaUpgrade force sync up sort state from server before load records (in case sort changed by server):
      if (store.remoteSort && value.options && value.options.sort) {
        var oldSorters = store.sorters;
        store.sorters = new Ext.util.MixedCollection();
        Ext.Array.each(value.options.sort, function(sort) {
          // if an altProperty exists in the old sorters, use it to override the property:
          if (sort.altProperty) {
            if (store.sorters) {
              oldSorters.each(function(oldSort) {
                if (oldSort.property == sort.altProperty) {
                  sort.property = sort.altProperty;
                  return false;
                }
              });
            }
            delete sort.altProperty;
          }

          store.sorters.add(new Ext.util.Sorter(sort));
        });
      }

      var bTreeStore = store.fillNode != null; // Is this a TreeStore?

      if (bTreeStore) {
        var treePanel = Ext.ComponentManager.get(store.storeId);
        var node = operation ? operation.node : treePanel.getRootNode();
        if (store.clearOnLoad) { // entire tree loaded from the server:
          node.removeAll();
        }
        node.set('loading', false);
        r.records = store.fillNode(node, r.records)
        store.fireEvent('read', store, node, r.records, true);
        store.fireEvent('load', store, node, r.records, true);
        if (!operation) {
          // clear client toggle state when entire RowTree is updated from server.
          // perform this after firing events.
          treePanel.clearFoldersToggled();
        }
      } else {
        // TODO: Redesign: Card 371: Summary data
        // todo: extjs upgrade4 transforming summary data from old JSON structure to new
        // todo: extjs upgrade4 enable summary column such as no group totals

        if (store.proxy.reader.rawData && store.proxy.reader.rawData.summaryData) {
          var _formatSummaryData = function(summaryData) {
            var summaryText = null;
            if (Ext.isString(summaryData.cls)) {
              summaryText = '<A class="'+ summaryData.cls + '" id="' + summaryData.id + '">' + summaryData.text + '</A>';
            } else {
              summaryText = summaryData.text;
            }
            return summaryText;
          };

          var sumData = store.proxy.reader.rawData.summaryData;
          var fakeFld = sumData[''] != null ? ':noGrp' : ':grp';
          var newSummaryData = [];
          for (var grpItem in sumData) {
            var summary = {};
            summary[fakeFld] = grpItem;
            for (var columnName in sumData[grpItem]) {
              var s = sumData[grpItem][columnName];
              var summaryText = _formatSummaryData(s);
              var summaryValue = {};
              summaryValue.text = summaryText;
              if (s.align) {
                summaryValue.align = s.align;
              }
              summary[columnName] = summaryValue;
            }
            newSummaryData.push(summary);
          }
          store.proxy.reader.rawData.summaryData = newSummaryData;
          store.proxy.reader.rawData.origSummaryData = sumData;
        }

        // PL-23558 When there is no summary data, do not show footer
        if (cmp && cmp.xtype == 'simplegrid') {
          if (cmp.view.getFeature('ggroup') != undefined) {
            cmp.view.getFeature('ggroup').showSummaryRow = !!newSummaryData;
          }
        }

        store.totalCount = r.total
        store.loadRecords(r.records, store.lastOptions, true);
        store.loading = false;
        store.fireEvent('load', store, r.records, true);
        store.fireEvent('read', store, r.records, true);
      }

      // additional handling after loading data from the server:
      if (operation) {
        Ext.callback(operation.callback, operation.scope || store, [r.records, operation, true]);
      }
    },

    /**
     * Properties to extend Ext stores
     */
    getStoreExtension : function() {
      return {
        autoDestroy:true,
        remoteSort:true, // sort at server side
        pruneModifiedRecords:true, // do not remember modified records after load from server
//          proxy: Ext.create('gw.ext.ModelProxy', {url:'dummy2'}),
        //Todo: extjs upgrade4 proxy moved to constructor from config
        constructor: function(config) {
          this.callParent([Ext.apply(config, {
            proxy: Ext.create('gw.ext.ModelProxy', {
              url:'dummy2',
              reader:{
                root: 'root'
              }
            })
          })]);
        },

        /**
         * Registers the store using the model id, and make sure to pass model id when requesting data from server
         * @param id store id
         * @param argIds ids of other widgets, the value of which needs to be passed to server when fetching store data
         */
        setModelId : function(id, argIds) {
          this.storeId = id
          Ext.data.StoreManager.register(this)
          //Todo: extjs upgrade4 convert setBaseParam to Proxy
          //this.setBaseParam('viewRootId', id)
          this.proxy.extraParams = {'viewRootId': id};

          if (argIds) {
            Ext.apply(this.proxy.extraParams, {'argIds': argIds});
          }
        }
      }
    },

    /**
     * @return Returns the property name for the row offset field
     */
    getRowOffsetProperty : function() {
      return ':offset'
    },

    /**
     * @return Returns the property name for if the row only contains a single cell which spans all columns
     */
    getRecordSpanProperty : function() {
      return ':span'
    },

    /**
     * @return Returns the property name for the flags field
     */
    getFlagsProperty : function() {
      return ':flags'
    },

    getFlaggedProperty : function() {
      return ':flagged'
    },

    getSelectedRowProperty : function() {
      return ':selected'
    },

    getAltValueClass : function() {
      return 'altVal'
    },


    // Grid related utilities

    getFQRowOffset: function(fqRowOffsetRepr) {
      var cm = fqRowOffsetRepr.split('#');
      var offsetAndIndex = {};
      offsetAndIndex.offset = cm[0]; // Identifies the column map entry for the matching column configuration for the given row
      offsetAndIndex.index = (cm[1] ? Number(cm[1]) : 0); // Identifies the cell column config entry for the row
      offsetAndIndex.getRepr = function() {
        var repr = this.offset;
        if (this.index) {
          repr = repr + "#" + this.index;
        }
        return repr;
      };
      return offsetAndIndex;
    },

    getFQRowOffsetFromRow: function(row) {
      var fqRowOffsetRepr = gw.ext.Util.getFQRowOffsetReprFromRow(row);
      return gw.ext.Util.getFQRowOffset(fqRowOffsetRepr);
    },

    getFQRowOffsetReprFromRow: function(row) {
      return row.get(gw.ext.Util.getRowOffsetProperty());
    },

    getRowOffset: function(fqRowOffsetRepr) {
      return gw.ext.Util.getFQRowOffset(fqRowOffsetRepr).offset;
    },

    getRowOffsetFromRow: function(row) {
      return gw.ext.Util.getFQRowOffsetFromRow(row).offset;
    },

    getIterationInsensitiveRowOffset : function(rOffset) {
      return rOffset.replace(/:[0-9]+/g, ':$').replace(/^[0-9]+(:*)/, '$$$1'); // replace number with '$'
    },

    getModeInsensitiveRowOffset : function (rOffset) {
      return rOffset ? rOffset.replace(/\([^\(]+\)/g, '') : rOffset
    },

    getGridById: function(gridId) {
      var grid = Ext.isString(gridId) ? Ext.ComponentManager.get(gridId) : gridId;

      // Check whether this is a valid grid component
      if (grid && (!grid.xtype || grid.xtype != "simplegrid")) {
        grid = null;
      }

      return grid;
    },

    /**
     * Get data grid information for the given cell id. It is assumed that the id is a fully qualified cell id
     * into the grid. The lvId is the component id for the candidate grid component (or other component) to test
     * the cell id against. If the component is not a grid component or not a matching LV id, then no grid information
     * object is sent back.
     * @param cellId fully qualified cell id identifying a cell in a grid
     * @param gridId component id for grid id to test the cellId against
     * @return the grid information object or null if this is not a cell id or the lvId is not a matching grid component.
     */
    getGridInfoByCellId: function(cellId, gridId) {
      var grid = gw.ext.Util.getGridById(gridId);

      // Check whether the base id matches, otherwise the given grid component is not matching
      if (!grid || cellId.indexOf(grid.gwBaseId) != 0) {
        grid = null;
      }

      if (grid) {
        // Parse the fq cell id: <LV base id>:<row offset>:<data index / cell id>
        var lastDel = cellId.lastIndexOf(":");
        var dataIndex = cellId.substring(lastDel + 1);
        var rowOffset = cellId.substring(grid.gwBaseId.length + 1, lastDel);

        grid = gw.ext.Util.getGridInfo(grid.gwBaseId, rowOffset, dataIndex, gridId);
      }

      return grid;
    },

    /**
     * Get the grid info object for the LV id that matches the given component grid id. The LV id may be
     * a parent container id or a named row iterator id if the LV id has a render id only (has no explicit LV id).
     * The grid id is the component id as registered in the browser component registry.
     * The rowOffset and dataIndex are needed to get the right LV match. Anonymous LV ids that share
     * the same parent container id can only be disambiguated by a row offset / data index.
     * @param lvId LV id or cell id part identifying a part of an LV (like parent naming container id)
     * @param rowOffset row offset or null if header cell
     * @param dataIndex data index (cell id part) or null if row offset only
     * @param gridId component id to match against
     * @return grid info or null if lvId, rowOffset and dataIndex do not match the given component grid id.
     */
    getGridInfo: function(lvId, rowOffset, dataIndex, gridId) {
      var grid = gw.ext.Util.getGridById(gridId);

      // If no grid found or component may not be a grid (no gwBaseId)
      if (!grid || grid.gwBaseId == undefined) {
        return null;
      }

      // Check whether the base id matches, otherwise the given grid component is not matching
      // Check by splitting the base id by : id parts. A toolbar for an LV with id 'foo' has id 'foo_tb'.
      var lvIdParts = lvId.split(':');
      var gwBaseIdParts = grid.gwBaseId.split(':');
      if (gwBaseIdParts.length > lvIdParts.length) {
        return null;
      }
      for (var i = 0; i < gwBaseIdParts.length; i++) {
        if (i < lvIdParts.length && gwBaseIdParts[i] != lvIdParts[i]) {
          return null;
        }
      }

      // Get the matching fully qualified row offset from the grid
      var fqRowOffset = null;
      var fqRowOffsetRepr = null;
      var idx = -1;

      // If there is no rowOffset, then check for a header cell
      if (rowOffset == null) {
        // No matching column found for data index
        if (!gw.ext.Util.getColumnById(grid, dataIndex)) {
          return null;
        }

      } else {
        idx = gw.ext.Util.getRowIdxForRowOffset(grid, rowOffset);

        // No matching record could be found in the grid.
        if (idx == -1) {
          return null;

        } else {
          var record = grid.store.getAt(idx);
          fqRowOffsetRepr = gw.ext.Util.getFQRowOffsetReprFromRow(record);
          fqRowOffset = gw.ext.Util.getFQRowOffset(fqRowOffsetRepr);
        }

        // The cell id is the original field id as specified in PCF. The dataIndex will be normalized to
        // a grid component data index (c1, ..., cn).
        var cellId = dataIndex;

        // Update the data index if the row offset matches a different row iterator than the dominant row iterator
        // indicated by the data index
        if (dataIndex != null) {
          // If the dataIndex matches a specific cell id, get its column definition and normalized column id
          var record = grid.store.getAt(idx);
          var cId = gw.ext.Util.getColumnIdForCellId(record, cellId);
          if (cId != null) {
            dataIndex = cId;
          }
        }
      }

      // Set up the grid info object
      var gridInfo = {};

      // The fully qualified cell element id based on PCF naming/id.
      gridInfo.eventParam = (rowOffset == null) ?
        lvId + ":" + cellId :
        lvId + ":" + rowOffset + ":" + cellId;

      gridInfo.grid = grid;

      gridInfo.recIdx = idx;
      gridInfo.row = fqRowOffsetRepr;
      gridInfo.dataIndex = dataIndex;

      gridInfo.getGrid = function() {
        return gridInfo.grid;
      };

      gridInfo.getColumn = function() {
        return gw.ext.Util.getColumnById(gridInfo.grid, gridInfo.dataIndex);
      };

      gridInfo.getRecord = function() {
        return gridInfo.recIdx == -1 ? null : gridInfo.grid.store.getAt(gridInfo.recIdx);
      };

      gridInfo.getCellValue = function () {
        var rec = gridInfo.getRecord();
        return rec ? rec.get(gridInfo.dataIndex) : gridInfo.getColumn().titleContainer.dom;
      };

      gridInfo.getCellValueText = function () {
        var value = gridInfo.getCellValue();
        return (value && value.text != undefined) ? value.text : value;
      };

      gridInfo.setCellValue = function (value) {
        var record = gridInfo.getRecord();
        if (record) {
          record.beginEdit();
          record.set(gridInfo.dataIndex, value);
          record.endEdit();
        }
      };

      return gridInfo;
    },

    /**
     *
     * @param {gw.simplegrid} grid the grid component
     * @param {String} rowOffset The row offset declaration (relative row iteration declaration with iterated indices)
     * @return {Integer} the row index or -1 if none
     */
    getRowIdxForRowOffset:function (grid, rowOffset) {
      return grid.store.findBy(function (record) {
        var fqRowOffsetRepr = gw.ext.Util.getFQRowOffsetReprFromRow(record);
        var fqRowOffset = gw.ext.Util.getFQRowOffset(fqRowOffsetRepr);
        if (gw.ext.Util.getModeInsensitiveRowOffset(fqRowOffset.offset) === rowOffset) {
          return true;
        }
      });
    },

    /**
     * Get the column id for the matching cell id. This assumes that the cell data in the record explicitly
     * declares a cell id with gwCellId. The column id is the grid's canonical column identifier c0|c1...cn
     * @param {Ext.data.Model} record the grid's row record
     * @param {String} cellId
     * @return {String} the column id or null if none
     */
    getColumnIdForCellId: function(record, cellId) {
      var data = record.data;
      if (data) {
        for (var columnId in data) {
          if (data.hasOwnProperty(columnId)) {
            var cellData = data[columnId];
            if (cellData && cellData.gwCellId && cellData.gwCellId === cellId) {
              return columnId;
            }
          }
        }
      }

      return null;
    },

    getGetSumHTML : function() {
      return '<span class="' +gw.app.getEventSourceCls()+ '">' +
        gw.app.localize('Java.ListView.GetSum') +
        '</span>'
    },

    getPrivacyFieldMenuItems : function() {
      return [
        gw.app.localize('Button.Delete'),
        gw.app.localize('Button.EnterNew')
      ]
    },

    getFullIdForCell:function (store, record, fieldName) {
      var offsetAndIndex = gw.ext.Util.getFQRowOffset(record.get(gw.ext.Util.getRowOffsetProperty()));
      var rOffset = offsetAndIndex.offset;
      var rI = offsetAndIndex.index;

      // @SenchaUpgrade Call base get method to get the entire object so we can retrieve cell id's for boolean types
      var value = Ext.data.Model.prototype.get.$previous.call(record, fieldName);

      var templateCell = gw.ext.Util.getTemplateCell(value)
      if (templateCell) {
        return templateCell.items[0].id
      }

      var rowId = gw.ext.Util.getModeInsensitiveRowOffset(rOffset);
      if (rowId == null) {
        rowId = store.indexOf(record)
      }

      var colName = fieldName;
      var serverId = store.storeId;

      var grid = Ext.ComponentManager.get(store.storeId);

      // The serverId is the base id for the fully qualified cell id.
      // The storeId for an LV is typically the component id that is not part of the fully qualified cell id
      // in particular if the LV  does not have an explicit id defined.
      if (grid && grid.gwBaseId) {
        serverId = grid.gwBaseId;
      }

      // The relative cell id is given explicitly by the cell id configuration
      if (value && value.gwCellId) {
        colName = value.gwCellId;
      } else {
        // fix the Id to be posted to server for RowTree checkbox
        // TODO: ExtJs4 upgrade - should we fix server response to simplify client logic?
        if (fieldName == 'checked' && record.fields.get(fieldName).mapping == '_Checkbox') {
          colName = '_Checkbox';
        }
      }

      return (rowId ? [serverId, rowId, colName] : [serverId, colName]).join(':');
    },

    // TODO: Refactor: Move to Ext Grid.
    // TODO: Redesign: Card 372: Make grid editor processing easier
    processGridEditor : function(store, fqRowOffsetRepr, column, callback, inclEmptyEditor, scope) {

        // e.g.: summary row
        if (fqRowOffsetRepr === -1) {
            return false;
        }

      if (store && store.proxy && store.proxy.reader && store.proxy.reader.rawData) {
        var editorInfo = store.proxy.reader.rawData.editors;
        if (editorInfo) {
          var editors = editorInfo[column.mapping || column.dataIndex];
          if (editors) { // if the column has dynamic editors
            if (Ext.isNumeric(fqRowOffsetRepr)) {
              fqRowOffsetRepr = gw.ext.Util.getFQRowOffsetReprFromRow(store.getAt(parseInt(fqRowOffsetRepr)));
            }
            Ext.each(editors, function(editorByRow) {
              if (Ext.Array.indexOf(editorByRow[1], fqRowOffsetRepr) >= 0) {
                if (inclEmptyEditor || editorByRow[0]) {
                  callback.apply(scope || this, [editorByRow, editors])
                }
                //TODO: when an iteration contains multiple row configs, all of them have the same rowOffset?
                return false; // break out of the loop
              }
            })
          }
        }
      }
    },

    isGridEditorDisabled:function (colIndex, rowIndex, store, view) {
      var column = view.headerCt.getHeaderAtIndex(colIndex);
      var disabled = true;
      gw.ext.Util.processGridEditor(store, rowIndex, column, function (editorByRow) {
        if (!editorByRow[0].disabled) {
          disabled = false;
        }
      });
      return disabled;
    },

    /**
     * Returns the value of the Cell that comes from a template widget.
     */
    // TODO: Refactor: Move to ExtGrid
    getTemplateCell:function (value) {
      if (value && value.xtype == 'templatevaluepanel') {
        return value
      }
      return undefined
    },

    // TODO: Refactor: Move to ExtGrid. Revisit column grid editors: Card 372
    renderRegularContent: function(column, value, store, record, rowIndex, colIndex, fieldName, metaData, skipFurtherRendering, view, outerIndex) {
      var htmlArray = [];
      var links;
      var ret = '';

      if (value == undefined) {
        return ret;
      }

      function _spanColumns(column, value, record, colIndex, fieldName, metaData, view) {
        var strColSpan;
        var colSpan = value.colspan;
        var columnIdx;
        var nCols = 0;

        // summary record has no raw data
        if (!record.raw) {
          return;
        }

        if (record.get(gw.ext.Util.getRecordSpanProperty()) == true) {
          strColSpan = ' colSpan=' + view.headerCt.getGridColumns().length;
        } else if (colSpan > 0) {
          nCols = Math.min(view.headerCt.getGridColumns().length, colSpan + colIndex);
          strColSpan = ' colSpan=' + colSpan;

          for (var i = colIndex + 1; i < nCols; i++) {
            columnIdx = view.headerCt.getHeaderAtIndex(i);
            //colSpan columns need to be hidden
            record.raw[columnIdx.dataIndex] = view.id + '_hide';
          }
        }

        if (strColSpan) {
          metaData.tdAttr = metaData.tdAttr ? metaData.tdAttr + strColSpan : strColSpan;
        } else if (record.raw[fieldName] === (view.id + '_hide')) {
          metaData.tdAttr = 'style="display:none;"';
          record.raw[fieldName] = '';
        }
      }

      _spanColumns(column, value, record, colIndex, fieldName, metaData, view);

      if (Ext.isArray(value)) {
        var itemIndexPrefix = (outerIndex !== undefined ? outerIndex + ':' : '');
        // multiple links under a content cell
        for (var i = 0; i < value.length; i++) {
          htmlArray.push(gw.ext.Util.markupCellLink(value[i], {itemIndex:itemIndexPrefix+i}));
        }
        ret = htmlArray.join('&nbsp;&nbsp;');

      } else {
        var cellValue = (value && value.text != undefined) ? value.text : value;

        if (value && value.align) {
          //TODO: Sencha ticket pending: column-level align overrides cell-level align by default
          metaData.style += 'text-align:' + value.align + ' !important';
        }
        if (value && value.fontColor) {
          var colorStyle = 'color:' + value.fontColor;
          metaData.style = (metaData.style) ? metaData.style + '; ' + colorStyle : colorStyle;
        }
        if (value && value.invalid && !record.isModified(fieldName)) { // invalid cell
          metaData.tdCls += ' g-invalid-cell';
        }
        if (value && value.editable) {
          metaData.tdCls += ' g-cell-edit'; // mark cell editable
        }

        // Get the current default column editor
        var editor;
        if (column.getEditor) {  //todo:  need to find a better way to check for a editor
          editor = column.getEditor();
        }

        // Process row sensitive row editors that may be different than the current column editor
        gw.ext.Util.processGridEditor(store, rowIndex, column, function (editorByRow) {
          // Combo box cell editor
          if (editorByRow[0].xtype == 'simplecombo') {
            if (editorByRow[0] instanceof Ext.form.Field) {
              editor = editorByRow[0];
            } else {
              editor = null;
              Ext.each(editorByRow[0].store, function (data) {
                if (data[0] == cellValue) {
                  cellValue = Ext.String.htmlEncode(data[1]);
                  return false;
                }
              });
            }

            // Multiselect control
          } else if (editorByRow[0].xtype == 'multiselect') {
            // TODO tpollinger: Fix for PL-21897. Need to change the server cell value handling:
            // model value is sent as text. It should send in 'text' the display string and in 'value' the model value.
            // The display string is displayed if the editor is not instantiated yet, the model value is the editor's
            // current selection. With that, there is no need to do client side display string processing.
            // Formatting cell value to a display value
            // We need also to redesign the way complex dv column edits work (here multi select list box):
            // See: PL-22069
            var cellValueObj = Ext.JSON.decode(cellValue, true);
            if (cellValueObj != null && Ext.isArray(cellValueObj)) {
              cellValue = "";
              for (var i = 0; i < cellValueObj.length; i++) {
                cellValue += cellValueObj[i];
                if (i + 1 < cellValueObj.length) {
                  cellValue += ", ";
                }
              }
            }

            // Privacy cell editor: Obfuscate the cell value
          } else if (editorByRow[0].xtype == 'privacy') {
            if (value && !record.isModified(fieldName)) { // encrypt non-empty value from server
              if (Ext.isString(value)) {
                value = {text:value}; // box simple text
              }

              // Deletes the server value and starts editing the cell. The privacy field should now be visible.
              function deletePrivacyCellValue() {
                // @SenchaUpgrade: Call base get method. TODO Refactor inheritance
                Ext.data.Model.prototype.set.$previous.call(record, fieldName,
                    gw.ext.Util.getRecordUpdateValue(record, fieldName, '', {xtype: "textfield", privacyEdited: "true"},
                            ["gwCellId"], null));
                var grid =  Ext.ComponentManager.get(store.storeId);
                // TODO: PL-23617: Ext JS Mode: Privacy cell rendering in edit mode is not consistent for modal cells
                grid.getCellEditingPlugin().startEdit(record, grid.view.headerCt.getHeaderAtIndex(colIndex));
              }

              // TODO: @SenchaUpgrade: Check whether the menu gets destroyed when the containing grid is destroyed
              // Add a cell menu to allow the user clearing the privacy field value.
              // Do not add menu items if this privacy field has already been edited.
              if (!value.privacyEdited) {
                var menuId = gw.ext.Util.getFullIdForCell(store, record, fieldName) + '_MENU';
                var items = [];
                Ext.each(gw.ext.Util.getPrivacyFieldMenuItems(), function(itemText, index) {
                  items.push({
                    text:itemText,
                    handler:deletePrivacyCellValue,
                    id: index==0 ? menuId+':edit': undefined
                  });
                });
                value.item = [{
                  icon: "images/app/drop_button.png",
                  xtype: "button",
                  id: menuId,
                  width: 16,
                  height: 16,
                  menu: {items:items}
                }];
              }
            }

            // update record field, without firing events
            record.data[fieldName] =
                gw.ext.Util.getRecordUpdateValue(record, fieldName, value, null, ["gwCellId"], null);

          // Radio group in a cell: Render the radio group as editable control
          } else if (editorByRow[0].xtype == 'radiogroup') {
            cellValue = gw.ext.Util.getTextForRadioGroupCell(editorByRow[0], value);
          }

          // TODO: @SenchaUpgrade: We should check the disabled check for all editor types, not just checkboxes
          if (!editorByRow[0].disabled) {
            if (!metaData.tdCls || metaData.tdCls.indexOf('g-cell-edit') == -1) {
              metaData.tdCls += ' g-cell-edit'; // mark cell editable

              if (editorByRow[0].xtype == 'checkbox' && column.getEditor) {
                column.setEditor(editorByRow[0]);
                editor = column.getEditor();

                //@SenchaUpgrade: based on Ext.grid.column.CheckColumn
                var cssPrefix = Ext.baseCSSPrefix,
                    cls = [cssPrefix + 'grid-checkcolumn'],
                    checkedValue = record.get(fieldName);

                // TODO tpollinger Ensure display values like Yes/No, "X"/"" don't creep into the checking logic.
                // A canonical true/false should be used for these cases.
                if (checkedValue === 'Yes' || checkedValue === 'true' || checkedValue.cb === true || checkedValue === true) {
                  cls.push(cssPrefix + 'grid-checkcolumn-checked');
                }

                ret = '<img class="' + cls.join(' ') + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
                return ret;
              }
            }
          }
        });

        // PL-22644 xtype is checkbox only denotes default editor, other editors can exist in this column
        if (editor && editor.xtype == 'checkbox' && ret != '') {
          return ret;
        }

        if (editor && editor.displayField) { // lookup display text for combo field
          var idx = editor.store.findExact(editor.valueField, cellValue);
          // Autocomplete are combos, but there may not be an exact match.
          if (idx != -1) {
            cellValue = editor.store.getAt(idx).get(editor.displayField);
          }
        }

        ret = cellValue;
        if (!skipFurtherRendering) {
          ret = cellValue;
        }
      }

      if (!skipFurtherRendering && value) {
        if (!Ext.isEmpty(value.text)) { // show prefix/suffix if value not blank
          if (value.prefix) {
            ret = value.prefix + ret;
          }
          if (value.suffix) {
            ret += value.suffix;
          }
        }

        ret = gw.ext.Util.wrapCellContent(value, metaData, store, record, fieldName, ret);

        // insert cell checkbox, if any:
        // TODO: @SenchaUpgrade: Refactor: See there is similar code under if (!editorByRow[0].disabled) {...}
        if (value.cb != null) {

            //@SenchaUpgrade: based on Ext.grid.column.CheckColumn
            var cssPrefix = Ext.baseCSSPrefix,
                cls = [cssPrefix + 'grid-checkcolumn'],
                checkedValue = record.get(fieldName);

            if (value == 'Yes' || value.cb === true) {
                cls.push(cssPrefix + 'grid-checkcolumn-checked');
            }
            cls = cls.join (' ');

//            ret = Ext.String.format(
//                '<img class="' + cls + '" src="' + Ext.BLANK_IMAGE_URL + '" id="{0}/><span>'+ ret +'</span>',
//                gw.ext.Util.getFullIdForCell(store, record, fieldName) + 'CB'
//            );

            ret = Ext.String.format(
              '<div style="width:15px; float:left;" class="' + cls + '" id="{0}">&#160;</div><span>'+ ret +'</span>',
              gw.ext.Util.getFullIdForCell(store, record, fieldName) + 'CB');
        }

        // append helper icons, if any
        var items = value.item;
        var links = '';
        if (items) {
          Ext.each(items, function(item, i) {
            gw.ext.Util.instantiateCellMenu(item, item.id, record);
            links += gw.ext.Util.markupCellLink(item, {itemIndex:i});
          });
          ret = '<div class="g-helper-cell-icon">' + links + '</div>' + '<div class="g-helper-cell-text">' + ret + '</div>';
        }

        if (value.altVal) {
          ret += Ext.core.DomHelper.markup({
            tag: 'div', cls: gw.ext.Util.getAltValueClass(),
            html: value.altVal.text,
            value: value.altVal.value
          });
        }
      }

      return ret;
    },

    /**
     * Evaluate the new record model value based on the existing value.
     * If the new value is a simple type and the existing value is an object type, then
     * the updated value will keep the existing object value meta properties like id.
     * If the new value is an object type, then they take precedence over the old ones.
     * @param record the record to base the new update value on. The record will not be modified.
     * @param fieldName the record field name (cell value)
     * @param newValue the new value to evaluate. This object will not be modified.
     * @param newValueProps object with key/value pairs to add to the final object or null if nothing to add
     * @param keepValuePropsOnly optional: if indicated as array of property strings, keep old value properties only.
     * If not indicated, all old value properties are kept
     * @param removeValueProps optional: if indicated, remove the given value properties from the old value object
     * @return the new value as a record object or simple value based on the existing record value
     */
    getRecordUpdateValue:function (record, fieldName, newValue, newValueProps, keepValuePropsOnly, removeValueProps) {
      // Leave the original newValue object the same
      var updateValue = Ext.isObject(newValue) ? Ext.apply({}, newValue) : newValue;

      // If the old value is an object, merge the new value object properties in.
      var oldValue = record.get(fieldName);
      if (Ext.isObject(oldValue) && (oldValue.hasOwnProperty("value") || oldValue.hasOwnProperty("text"))) {
        // Convert new value to object value if it is a simple value
        if (!Ext.isObject(updateValue)) {
          // The value property has precedence over text property
          var valueProp = "value";
          if (!oldValue.hasOwnProperty("value")) {
            valueProp = "text";
          }

          updateValue = {};
          updateValue[valueProp] = newValue;
        }

        if (keepValuePropsOnly && Ext.isArray(keepValuePropsOnly)) {
          Ext.copyTo(updateValue, oldValue, keepValuePropsOnly);

        } else {
          // Remove specific properties from the old value object
          if (Ext.isArray(removeValueProps) && Ext.isObject(updateValue)) {
            var updatedOldValue = Ext.apply({}, oldValue);
            Ext.Array.forEach(removeValueProps, function (removeValueProp) {
              delete updatedOldValue[removeValueProp];
            });
            oldValue = updatedOldValue;
          }

          // Copy only value properties that are not declared in the new value yet.
          updateValue = Ext.applyIf(updateValue, oldValue);
        }
      }

      // Mix in new properties
      if (newValueProps && Ext.isObject(newValueProps)) {
        if (!Ext.isObject(updateValue)) {
          updateValue = {value:updateValue};
        }
        Ext.apply(updateValue, newValueProps);
      }

      return updateValue;
    },

    // TODO: Refactor: Move to ExtGrid
    wrapCellContent:function (value, metaData, store, record, fieldName, ret) {
      // wrap cell content inside an action or menu button, if needed
      var menu = value.menu;

      var cellCls = value.cls ? value.cls.split(' ') : [];
      var oldLength = cellCls.length;
      Ext.Array.remove(cellCls, gw.app.getEventSourceCls()); // remove marker cls
      if (cellCls.length > 0) {
        metaData.tdCls += ' ' + cellCls.join(' ');
      }

      if (menu || oldLength > cellCls.length/*value cls contains event source cls*/) {
        var linkId = value.id || gw.ext.Util.getFullIdForCell(store, record, fieldName);
        gw.ext.Util.instantiateCellMenu(value, linkId, record);
        return gw.ext.Util.markupCellLink({id:linkId, menu:menu, text:ret, disabled:value.disabled});
      }

      if (value.id) {
        // renders id for the cell:
        return Ext.core.DomHelper.markup({tag:'span', id:value.id, html:ret});
      }

      return ret;
    },

    /**
     * Given a (possibly null) list of child items, appends the HTML for them
     * to the ret value passed in.
     */
    appendHtmlForChildItems : function(childItems, record, ret) {
      if (childItems) {
        Ext.each(childItems, function(childItem, i) {
          gw.ext.Util.instantiateCellMenu(childItem, childItem.id, record);
          ret += gw.ext.Util.markupCellLink(childItem, {itemIndex:i});
        });
      }
      return ret;
    },

    // TODO: Refactor: Move to ExtGrid
    unboxCellValue:function (value) {
      var item = gw.ext.Util.getFirstInputInTemplateCell(value)
      if (item) {
        value = item['value']
      }

      if (value) {
        // unbox composite value
        if (value.editValue !== undefined) {
          return value.editValue; // use editValue if any
        } else if (value.text !== undefined) {
          return value.text;
        }
      }
      return value
    },

    // TODO: Refactor: Move to ExtGrid
    getFirstInputInTemplateCell:function (value) {
      var templateCell = gw.ext.Util.getTemplateCell(value);
      if (templateCell) {
        var items = templateCell.items;
        if (items && items.length == 1) {
          return items[0];
        }
      }

      return null;
    },

    // TODO: Refactor: Move to ExtGrid
    processCellClick:function (column, grid, record, rowIndex, columnId, clickCallback) {
      var field = {};
      var editor;
      if (column.getEditor) {
        editor = column.getEditor();
      }
      Ext.apply(field, editor);
      field.eventParam = gw.ext.Util.getFullIdForCell(grid.getStore(), record, columnId)
      field.completeEdit = clickCallback
      gw.app.handleChange(field)
    },


    resetExtraValueForStoreWithGroupName : function(group) {
      Ext.data.StoreManager.each(function(store) {
        if (store.extraValues && store.extraValues[group]) {
          delete store.extraValues[group];
        }
      })
    },

    // TODO: Refactor: Move to ExtGrid
    processRadioCellClick: function(radioCheckStatus, column, grid, record, rowIndex, columnId) {
      var store = grid.getStore();

      // Check that this field is a radio input. Do not update if this is not a radio input field
      var editorCfg = null;
      var radioGroup = null;
      gw.ext.Util.processGridEditor(store, rowIndex, column, function(editorByRow) {
        editorCfg = editorByRow[0];
        radioGroup = editorCfg.group;
      });

      if (editorCfg && editorCfg.xtype == 'radio') {
        var oldValue = record.get(columnId);
        if (oldValue != radioCheckStatus) {
          // Update the record for the radio input field and handle the change event
          record.set(columnId, radioCheckStatus);

          if (radioCheckStatus) {
            // A radio input field does not have an editor. Handle the change event
            // The change event only needs to tell which radio input is now checked in the same radio group
            var radioField = {};
            Ext.apply(radioField, {postOnChange: editorCfg.postOnChange}, null);
            radioField.eventParam = gw.ext.Util.getFullIdForCell(store, record, columnId);
            var extraParams = {};
            if (radioCheckStatus && radioGroup) {
              // Add the check box id for the group for which the radio input has been checked
              extraParams[radioGroup] = radioField.eventParam;
              store.extraValues = store.extraValues || {};
              store.extraValues[radioGroup] = radioField.eventParam;
            }
            gw.app.handleChange(radioField, radioCheckStatus, oldValue, null, extraParams);

            // Update all radio input fields for the same group in the same column if this column has been checked.
            var len = store.getCount();
            for (var i = 0; i < len; i++) {
              if (i != rowIndex) {
                var groupRecord = store.getAt(i);
                // Uncheck radio input fields in the same group
                gw.ext.Util.processRadioCellClick(false, column, grid, groupRecord, i, columnId);
              }
            }
          }
        }
      }
    },

    // TODO: Refactor: Move to ExtGrid
    getTextForRadioGroupCell : function(editor, value) {
      var text
      var items = editor instanceof Ext.form.Field ? editor.initialConfig.items : editor.items;
      Ext.each(items, function(i) {
        if (i.inputValue == value) {
          text = i.boxLabel
          return false
        }
      })
      return text
    },

    /**
     * Update button state based on checked items
     * @param {String[]} flagged an array of button IDs
     * @param {Ext.data.Model[]} checkedItems an array of checked items
     * @param {Ext.grid.Panel} grid the grid
     */
    // TODO: Refactor: Move to grid
    updateFlaggedButtons: function(flagged, checkedItems, grid) {
      Ext.each(flagged, function(btnId) {
        var btn = Ext.ComponentManager.get(btnId);
        if (btn && !btn.initialConfig.disabled) {
          var buttonFlags = btn.buttonFlags;
          var enabled;
          if (buttonFlags) {
            enabled = evalCheckboxFlags(checkedItems, buttonFlags, grid);
          } else {
            enabled = checkedItems.length > 0;
          }
          if (enabled) {
            btn.enable();
          } else {
            btn.disable();
          }
        }
      })
    },

    /**
     * Updates state for buttons flagged only to this record.
     * @param record data record
     * @return Returns true, if the record contains cell-iterator flags
     */
    // TODO: Refactor: Move to grid
    updateFlaggedButtonsForRecord:function (record) {
      var recordFlagged = record.get(gw.ext.Util.getFlaggedProperty());
      if (recordFlagged) { // the record contains cell-iterator
        // find all "checked" fields of the same record:
        var checkedCells = [];
        record.fields.eachKey(function (key) {
          var cellValue = record.get(key);
          if (cellValue && cellValue.cb == true) {
            checkedCells.push(cellValue)
          }
        });
        gw.ext.Util.updateFlaggedButtons(recordFlagged, checkedCells, Ext.ComponentManager.get(record.stores[0].storeId));
        return true;
      }
      return false;
    },

    renderTemplateValuePanel:function (column, complexItem, store, record, rowIndex, colIndex, fieldName, metaData, view) {
      var htmlArray = []
      // We are assuming a read-only composite field.
      for (var i = 0; i < complexItem.items.length; i++) {
        var compositeItem = complexItem.items[i]
        var compositeVal;
        if (compositeItem == '-') {
          compositeVal = '<br>'
        } else {
          compositeVal = gw.ext.Util.renderRegularContent(column, compositeItem, store, record, rowIndex, colIndex,
            fieldName, metaData, undefined, view);
        }
        htmlArray.push(compositeVal)
      }
      return htmlArray.join('&nbsp;&nbsp;')
    },

    /**
     * Addes filters to bottom toolbar for the panel
     */
    addFiltersToPanel:function (panel, filters) {
      if (!panel.tbar) {
        panel.tbar = {xtype:'gtoolbar'}
      }
      panel.tbar.items = filters.concat(['-']).concat(panel.tbar.items || []);
    },

    /**
     * Calculate the width of the element
     * @param element element to get the width
     */
    getElementWidth:function (element) {
      if (element.dom.nodeName !== "IMG") {
        return Ext.util.TextMetrics.measure(element, element.dom.innerHTML).width + 5;
      } else {
        // image, return the default image size if width is not defined
        return (element.dom.width && element.dom.width > 0) ? element.dom.width : gw.ext.Util.getDefaultImageSize();
      }
    },

    /**
     * @Return the default size for image which is rendered next to the value widget
     */
    getDefaultImageSize:function () {
      return 30;
    },

    /**
     * Toggles the availability of the field
     */
    setDisabled:function (field, disabled) {
      if (field instanceof Ext.form.Field) {
        field.setDisabled(disabled)
      } else {
        field.disabled = disabled
      }

      // show or hide helper icons:
      if (field.item && field.item.el) {
        // Use "visibility" instead of "display", so that it will not shift the page layout:
        field.item.el.setVisible(!disabled);
      }
    },

    // TODO: Refactor: Move to ExtGrid
    getColumnIndexByDataIndex:function (grid, dataIndex) {
      var columns = grid.view.headerCt.getGridColumns();
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].dataIndex && columns[i].dataIndex == dataIndex) {
          return i;
        }
      }
      return -1;
    },

    // TODO: Refactor: Move to ExtGrid
    getColumnById:function (grid, dataIndex) {
      var cols = grid.view.headerCt.getGridColumns();
      for (var i = 0; i < cols.length; i++) {
        if (dataIndex == cols[i].dataIndex) {
          return cols[i];
        }
      }
    },

    // TODO: Refactor: Move to ExtGrid
    isCellEditable:function (colIdx, rowIdx, column, grid) {
      var disabled = null;
      var bPrivacy = false;

      var record = grid.store.getAt(rowIdx);
      var cellValue = record.get(column.dataIndex);
      var fieldValue = cellValue;
      var dvInput = gw.ext.Util.getFirstInputInTemplateCell(fieldValue)
      if (dvInput) {
        return dvInput.editable
      }
      if (fieldValue && fieldValue.text != undefined) {
        fieldValue = fieldValue.text;
      }

      gw.ext.Util.processGridEditor(grid.store, rowIdx, column, function (editorByRow) {
        if (editorByRow[0]) {
          disabled = editorByRow[0].disabled || false;
          bPrivacy = (editorByRow[0].xtype == 'privacy');
        } else {
          disabled = true;
        }
      }, true);
      if (disabled != null) {
        if (!disabled && bPrivacy && fieldValue && Ext.isObject(cellValue) && cellValue.hasOwnProperty("item")) {
          disabled = true;
        }
        return !disabled;
      }

      if (column.getEditor && column.getEditor() != null && column.getEditor().disabled) {
        return false;
      }
    },

    /**
     * Gets the inner text for an element. Works for IE and Firefox
     */
    getInnerText:function (e) {
      return Ext.String.trim(e.innerText != undefined ? e.innerText : e.textContent);
    },

    /**
     * Get the outer HTML for the given element. This works around the missing field outerHTML in Firefox.
     * @param {HTMLElement} e HTML element
     * @return {String} outer HTML representation of element
     *
     */
    getOuterHTML:function (e) {
      if (e.outerHTML) {
        return e.outerHTML;
      }
      if (e.parentNode) {
        return e.parentNode.innerHTML;
      }
      // Rarely is the outer most element asked for, so sending back "<ROOT>" in this case.
      // One could construct a temporary outer div and add e as child, however this is rarely needed.
      return "<ROOT>...</ROOT>";
    },

    renderBarInput:function (value) {
      var tpl = new Ext.XTemplate(
        '<div>',
          '<div class="gbarinput-wrap" id="{id}" title="{title}">',
          '<tpl if="styleoverride">',
            '<div class="{styleclass}" style="{styleoverride}; height:100%;"></div>',
          '<tpl else>',
            '<div class="{styleclass}" style="width:0%; height:100%;"></div>',
          '</tpl>',
        '</div>',
          '<tpl if="status">',
            '<div style="display:inline;">{status}</div>',
          '</tpl>',
        '</div>');

      return tpl.apply(value);
    },

    hasEditor: function invokeEditor(editorType) {
      return !(editorType == 'radiogroup' ||
           editorType == 'checkbox' ||
           editorType == 'radio');
    },

    /**
     * Commits Grid cell editor to the model, without dismissing the editor (otherwise it may break tabbing and focus behavior).
     * @SenchaUpgrade: mimic private method of ExtJs.
     * @param ed: if specified, only commit the editor that matches this one
     */
    commitGridEditorValue: function(ed) {
      Ext.ComponentManager.each(function(id, comp) {
        if (comp instanceof gw.simplegrid) {
          var cellEditingPlugin = comp.getCellEditingPlugin();
          var activeEd = cellEditingPlugin.getActiveEditor();
          if (activeEd) {
            if (!ed || ed === activeEd ) {

              var context = cellEditingPlugin.context;
              var record = context.record;
              var value = activeEd.getValue();
              context.value = value;
              if (!cellEditingPlugin.validateEdit()) {
                return false;
              }

              // Only update the record if the new value is different than the
              // startValue. When the view refreshes its el will gain focus
              if (!record.isEqual(value, activeEd.startValue)) {
                var activeColumn = cellEditingPlugin.getActiveColumn();
                record.set(activeColumn.dataIndex, value);
                activeEd.startValue = value;
              }
            }
            return false;
          }
        }
      });
    },

    getLabelableRenderTpl: function() {
        return [
            // body row. If a heighted Field (eg TextArea, HtmlEditor, this must greedily consume height.
            '<tr id="{id}-inputRow" <tpl if="inFormLayout">id="{id}"</tpl>>',

                // Label cell
                '<tpl if="labelOnLeft">',
                    '<td id="{id}-labelCell" style="{labelCellStyle}" {labelCellAttrs}>',
                        '{beforeLabelTpl}',
                        '<label id="{id}-labelEl" {labelAttrTpl}<tpl if="inputId"> for="{inputId}"</tpl> class="{labelCls}"',
                            '<tpl if="labelStyle"> style="{labelStyle}"</tpl>',
                            // Required for Opera
                            ' unselectable="on"',
                        '>',
                            '{beforeLabelTextTpl}',
                            '<tpl if="fieldLabel">{fieldLabel}{labelSeparator}</tpl>',
                            '{afterLabelTextTpl}',
                        '</label>',
                        '{afterLabelTpl}',
                    '</td>',
                '</tpl>',

                // Body of the input. That will be an input element, or, from a TriggerField, a table containing an input cell and trigger cell(s)
                '<td class="{baseBodyCls} {fieldBodyCls}" id="{id}-bodyEl" colspan="{bodyColspan}" role="presentation">',
                    '{beforeBodyEl}',

                    // Label just sits on top of the input field if labelAlign === 'top'
                    '<tpl if="labelAlign==\'top\'">',
                        '{beforeLabelTpl}',
                        '<div id="{id}-labelCell" style="{labelCellStyle}">',
                            '<label id="{id}-labelEl" {labelAttrTpl}<tpl if="inputId"> for="{inputId}"</tpl> class="{labelCls}"',
                                '<tpl if="labelStyle"> style="{labelStyle}"</tpl>',
                                // Required for Opera
                                ' unselectable="on"',
                            '>',
                                '{beforeLabelTextTpl}',
                                '<tpl if="fieldLabel">{fieldLabel}{labelSeparator}</tpl>',
                                '{afterLabelTextTpl}',
                            '</label>',
                        '</div>',
                        '{afterLabelTpl}',
                    '</tpl>',

                    //  Begin Override
                    //  Overrode following 3 lines by wrapping them on a table to create prefix/suffix
                    // '{beforeSubTpl}',
                    // '{[values.$comp.getSubTplMarkup(values)]}',
                    // '{afterSubTpl}',

                    '<table id="{id}-inputWrap" class="' + Ext.baseCSSPrefix + 'form-input-wrap" cellpadding="0" cellspacing="0"><tbody><tr>',
                    '<td class="x-before-input-cell">{beforeSubTpl}</td>',
                    '<td class="x-input-cell">{[values.$comp.getSubTplMarkup(values)]}</td>',
                    '<td class="x-after-input-cell">{afterSubTpl}</td></tr>',
                    '<tpl if="altVal"><tr><td></td><td colspan="2"><span class="x-form-altVal" id="{altId}" value="{altVal.value}">{altVal.text}</span></td></tr></tpl>',
                    '</tbody></table>',
                    // End Override

                // Final TD. It's a side error element unless there's a floating external one
                '<tpl if="msgTarget===\'side\'">',
                    '{afterBodyEl}',
                    '</td>',
                    '<td id="{id}-sideErrorCell" vAlign="{[values.labelAlign===\'top\' && !values.hideLabel ? \'bottom\' : \'middle\']}" style="{[values.autoFitErrors ? \'display:none\' : \'\']}" width="{errorIconWidth}">',
                        '<div id="{id}-errorEl" class="{errorMsgCls}" style="display:none"></div>',
                    '</td>',
                '<tpl elseif="msgTarget==\'under\'">',
                    '<div id="{id}-errorEl" class="{errorMsgClass}" colspan="2" style="display:none"></div>',
                    '{afterBodyEl}',
                    '</td>',
                '</tpl>',

            '</tr>',
            {
                disableFormats: true
            }
      ]
      }
  }
}();
