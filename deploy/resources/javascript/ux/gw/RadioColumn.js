/**
 * A grid plugin which renders a radio column, which does not allow more than one row to be selected.
 */
Ext.namespace('Ext.ux.gw');

// @SenchaUpgrade Is the radioColumn generic enough to request Sencha enhancement?
Ext.define('Ext.ux.gw.RadioColumn', {
  alias: 'widget.radiocolumn',
  extend: 'Ext.grid.column.Column',
  field : null, //@SenchUpgrade "field" is deprecated since 4.0.5. Do we still need to set it to null?

  getFullIdForRadio : function (rIndex) {
    return gw.ext.Util.getFullIdForCell(this.gridStore,this.gridStore.getAt(rIndex),this.dataIndex)
  },

  /**
   * Registers events to track initial checked row using "extraValues" under the grid store.
   */
  initComponent : function() {
    this.callParent(arguments);
    this.gridStore = Ext.getStore(this.storeId);

    function initRadioState() {
      this.gridStore.extraValues = this.gridStore.extraValues || {};
      var cellID = this.dataIndex;
      var rIndex = this.gridStore.data.findIndexBy(function(record){
          var radioBtnValue = record.data[cellID];
          return radioBtnValue && radioBtnValue["text"];
      });
      if (rIndex >= 0) {
        this.gridStore.extraValues[this.group] = this.getFullIdForRadio(rIndex);
        // forgets the initial state, but don't mark the record dirty
        // TODO tpollinger not sure why this is done, commenting out. See other TODOs here to get rid of extraValues.
        // @SenchaUpgrade If the following line is commented out, how would the last selected radio state get cleared, when
        //                a new radio is selected? I wonder if it's a bug, for radio column which don't postOnChange.
        //this.gridStore.getAt(rIndex).data[this.dataIndex] = false;
      }
    }

    // TODO tpollinger In Selenium tests, the beforerender and/or afterrender/beforerefresh is not being called.
    // The store.extraValues is null in this cases. Run the test ListViewTest#testListBackedELV and notice that
    // an empty table is rendered with the store.extraValues in render as undefined.
    this.renderer = Ext.bind(this.renderer, this);
    // @SenchaUpgrade TODO Override protected method, instead of registering event here:
    this.on("boxready", initRadioState, this);
    this.on('afterrender', function() {
      var grid = Ext.ComponentManager.get(this.storeId);
      grid.view.panel.on("beforerefresh", initRadioState, this); // wait till view is ready before set up view event
      //@SenchaUpgrade Is it redundant to initRadioState on both view "beforerefresh" and store "load"?
      this.gridStore.on("load", initRadioState, this);
    }, this);
  },

  /**
   * Updates "extraValues" of the grid store when checked row changes
   */
   //@SenchaUpgrade overriding private method
   processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
     var group = this.group;

     if (type == 'mousedown' || (type == 'keydown' && (e.getKey() == e.ENTER || e.getKey() == e.SPACE))) {
       var store = view.getStore(),
       dataIndex = this.dataIndex,
       grid = view.ownerCt;

       // Note: Disable the cell click if the cell is not editable.
       var disabled = gw.ext.Util.isGridEditorDisabled(cellIndex, recordIndex, store, view);
       if (!disabled) {
         gw.ext.Util.processCellClick(this, grid, record, recordIndex, dataIndex, function() {
           // TODO this should not be null, can be null in Selenium tests, see note above
           gw.ext.Util.resetExtraValueForStoreWithGroupName(group);
           store.extraValues = store.extraValues || {};
           store.extraValues[group] = gw.ext.Util.getFullIdForCell(store,record,dataIndex);
           // notify all records updated, after a short timeout
           store.each(function(rec) {
             if (rec.get(dataIndex) === true) {
               rec.set(dataIndex, false);
             }
           })
           record.set(dataIndex, true);
         });
       }
     }
     return false;
  },

  /***
   * Renders the check row differently
   */
  renderer : function(value, p, record, rowIndex, colIndex, store, view) {
    //@SenchaUpgrade AHK - 4/2/2013 - It seems that sometimes (always?) we get passed in something like the GroupingSummary
    // that contains the store, rather than the store itself, as the store parameter.  That seems like it's probably a bug
    // on the ExtJS side.
    store = view.getStore();

    // TODO tpollinger: Hack: Row sensitive editors need to be disabled if no editor is defined in the editors
    // section. This needs to get simplified and consolidated with general cell editing
    var disabled = gw.ext.Util.isGridEditorDisabled(colIndex, rowIndex, store, view);
    if (!disabled) {
      //@SenchaUpgrade CSS naming convention:
      p.tdCls += ' x-grid3-radio-col-td';
      // TODO tpollinger store.extraValues should not be null
      // It seems extraValues not yet setup before initial rendering of the cells in some cases
      var v = false;
      if (store.extraValues) {
        v = store.extraValues[this.group] == this.getFullIdForRadio(rowIndex);
      } else {
        v = record.get(this.dataIndex);
// TODO: Do we want to work around extraValues missing by set it up here?
// The difference is as such: When the radio column is mis-configured such that multiple radio buttons
// are checked at the same time:
//   1. if the rendering is based on each record value, multiple radio buttons will appear checked;
//   2. if the rendering is based on a single extraValues item, only one of the checked radio buttons
// from server side will appear checked.
//
// The current logic is based on (#1), and it makes the mis-configuration apparent to the user;
// Uncommenting the following will switch to (#2).
//        if (v) {
//          store.extraValues = {};
//          store.extraValues[this.group] = this.getFullIdForRadio(rowIndex);
//        }
      }
      return '<div class="x-grid3-radio-col' + (v ? '-on' : '') + ' x-grid3-cc-' + this.id + '">&#160;</div>';

    } else {
      return '<div></div>';
    }
  }
});
