//----------------------------------------------------------------------------------------------------------------------
//   Ext Component Extensions:
//----------------------------------------------------------------------------------------------------------------------
Ext.define('gw.override.Ext.Component', {
  override: 'Ext.Component',

    /**
     * Disables state persistence by default
     */
    stateful: false,

    initComponent: function() {
        this.on({
            /**
             * Records field/button focus
             */
            focus: function(comp) {
                var id = comp.hiddenName || comp.id;
                gw.Debug.log('onFocus ' + id);
                gw.app.onFocus(id);
            },

            /**
             * Records field/button blur
             */
            blur: function(comp) {
                var id = comp.hiddenName || comp.id;
                gw.Debug.log('onBlur ' + id);
                gw.app.onBlur(id);
            }
        });

        this.callParent(arguments);
    },

  /**
   * Un-registers shortcut keys
   */
  removeKeyMaps: function() {
      var me = this;

      if (me.scKeyMap) {
        me.removeKeyMap(me.shortcut, me.scKeyMap);
      }
      if (me.enterKeyMap) {
        me.removeKeyMap('enter', me.enterKeyMap);
      }
    },
    /**
     * Processes keymap before rendering and adjust component 
     * text if valid (button, menu items, etc).
     * 
     * It's important to adjust text on before render to avoid
     * unnecessary layouts
     */
    beforeRender: function() {
        var me = this,
            shortcut = me.shortcut;

        if (!me.autoGenId && // @SenchaUpgrade Use a private ExtJS API to detect if this is an auto-generated overflow menuitem. Do not create shortcut for overflow menu to avoid conflict with the original button.
             (shortcut || me.isDefault)) {
            var matches, bShift, k;

            if (shortcut) {
                me.shortcut = shortcut = shortcut.toLowerCase();

                matches = shortcut.match(/(shift)*(.+)/i); // checks for "shift" prefix
                bShift = matches[1] ? true : false;
                k = gw.app.stringToKeyCodes(matches[2]);

                me.scKeyMapConfig = {
                    defaultEventAction: 'stopEvent',
                    key     : k,
                    shift   : bShift,
                    alt     : true,
                    scope   : me,
                    fn      : me.onShortcutActivated
                };
                
                me.showShortcutInButonText(bShift, k);
            }

            if (me.isDefault) {
                me.enterKeyMapConfig = {
                    key     : Ext.EventObject.ENTER,
                    scope   : me,
                    alt     : false,
                    shift   : false,
                    fn      : me.onEnterShortcutActivated
                };
            }
        }
        
        me.callParent(arguments);
    },
    
    /**
     * Registers keymap during onRender to wait till all containing 
     * components get rendered
     */
    afterRender: function() {
        var me = this;

        me.callParent(arguments);
        
        if (me.scKeyMapConfig || me.enterKeyMapConfig) {
            var shortcut    = me.shortcut,
                scopeElem   = me.shortcutScope ? Ext.ComponentManager.get(me.shortcutScope).getEl() : Ext.getDoc();
            
            if (me.scKeyMapConfig) {
                me.scKeyMap = me.addKeyMap(shortcut, scopeElem, me.scKeyMapConfig, me);
                delete me.scKeyMapConfig;
            }
            
            if (me.enterKeyMapConfig) {
                me.enterKeyMap = me.addKeyMap('enter', scopeElem, me.enterKeyMapConfig, me);
                delete me.enterKeyMapConfig;
            }
        }
    },

    /**
     * Inovokes keyMap clean up
     */
    onDestroy: function () {
      var me = this;
      if (Ext.AbstractComponent.layoutSuspendCount) { // wait till resume layout:
        Ext.on({
          resumelayouts:function () {
            me.removeKeyMaps();
          },
          single:true
        });
      } else { // do it now:
        me.removeKeyMaps();
      }

      me.callParent(arguments);
    },
    
    onShortcutActivated: function(key, evt) {
        var me = this;
        
        if (me.menu) {
            me.showMenu();
        } 
        else if (me.xtype == 'quickjump') {
            me.focus();
        } 
        else if (me instanceof Ext.button.Button) {
            if (!me.isDisabled()) {
                me.fireEvent('click', me, evt);
            }
        } 
        else {
            gw.app.handleAction(null, me.id);
        }
    },
    
    onEnterShortcutActivated: function(key, evt) {
        var tagName = evt.getTarget().tagName;
        if (tagName == 'TEXTAREA' || tagName == 'BUTTON' || tagName == 'A') {
            return; // do not invoke default ENTER handler, if the target has its own action
        }
        gw.app.handleAction(null, this.id);
    },
    
    /**
     * Registers a shortcut key. This function detects duplicate keys registered on the same scope.
     * @param key the key
     * @param scopeEl the scope element (e.g., the document or the worksheet)
     * @param config key config
     * @param comp target component
     *
     * @return an ExtJs KeyMap object
     */
    addKeyMap: function(key, scopeEl, config, comp) {
        config.target = scopeEl;
        
        var old, oldComp, textChanged,
            keyMap      = new Ext.util.KeyMap(config),
            allMaps     = scopeEl.gKeyMaps || (scopeEl.gKeyMaps = {}),
            mapsPerKey  = allMaps[key] || (allMaps[key] = []);
            
        if (mapsPerKey.length > 0) {
            old = mapsPerKey[mapsPerKey.length - 1];
            old.disable();

            // remove shortcut indicator from button text
            oldComp = old.comp;
            if (oldComp.origText !== oldComp.text) {
                textChanged = true;
                oldComp.setText(oldComp.origText);
            }
            gw.Debug.log('Ignored dup shortcut: ' + key + ' for ' + oldComp.id);
        }
        
        mapsPerKey.push(keyMap);
        keyMap.comp = comp;
        
        if (textChanged) {
            this.showShortcutInButonText(config.shift, config.key);
        }

        gw.Debug.log('Added shortcut: ' + key + ' for ' + comp.id);
        return keyMap;
    },

    /**
     * Unregisters a shortcut key. This function handles duplicate keys registered on the same scope.
     * @param key shortcut
     * @param keyMap an ExtJs KeyMap object
     */
    removeKeyMap: function(key, keyMap) {
        keyMap.disable();

        var el = keyMap.target,
            values = el.gKeyMaps[key];
            
        Ext.Array.remove(values, keyMap);
        
        if (values.length === 0) {
            delete el.gKeyMaps[key];
        } 
        else {
            // restore shortcut indicator of the next button:
            var top = values[values.length - 1],
                topComp = top.comp;
            
            if (!topComp.isDestroyed && !topComp.destroying) {
                top.enable();
                if (topComp.fixedText && topComp.fixedText !== topComp.text) {
                    topComp.setText(topComp.fixedText);
                }
            }
        }
    },

    /**
     * Underlines the shortcut key in the button text
     * @param comp button component
     * @param bShift Is shiftKey needed?
     * @param key shortcut key
     */
    showShortcutInButonText: function(bShift, key) {
        var me = this;
        
        // only init original text once
        me.origText = me.origText||me.text;
        
        // start with the original
        text = me.origText;
        
        if (text) {
            
            // convert charCode array back to letter
            // special handling for < and >
            if (Ext.isArray(key) && key.length === 1) { 
                key =   key[0] === 190 ? '>' : 
                        key[0] === 188 ? '<' : String.fromCharCode(key[0]);
            }
            
            var css = (bShift && key !== '<' && key !== '>') ? 'g-double-underlined' : 'g-underlined';
            me.fixedText = text.replace(new RegExp('(' + key + ')', "i"), '<span class="' + css + '">$1</span>');
            me.setText(me.fixedText);
        }
    }
});

Ext.define('gw.override.Ext.layout.container.boxOverflow.Menu', {
  override: 'Ext.layout.container.boxOverflow.Menu',

  /**
   * @SenchaUpgrade override private API: specify default child type for overflow menu
   * Passes along config info to the overflown item, in order to attach action handler properly
   */
  createMenuConfig: function(component) {
    var id = component.initialConfig.id;
    var config = this.callOverridden(arguments);
    Ext.applyIf(config, {xtype:'gmenuitem', eventId:id});
    return config;
  }
});

/**
 * @SenchaUpgrade override private API: Does not fire selectionChange event while doing deselect all.
 * Need to remove this override once sencha bug EXTJSIV-8186 is closed.
 * The corresponding sencha support ticket is https://support.sencha.com/login.php?tid=10611&r=index.php%23ticket-10611
 */
Ext.define('gw.override.Ext.selection.Model', {
  override: 'Ext.selection.Model',

  doMultiSelect:function (records, keepExisting, suppressEvent) {
    var me = this,
            selected = me.selected,
            change = false,
            i = 0,
            len, record;

    if (me.locked) {
      return;
    }


    records = !Ext.isArray(records) ? [records] : records;
    len = records.length;
    if (!keepExisting && selected.getCount() > 0) {
      //  suppressEvent for deDeselect
      if (me.doDeselect(me.getSelection(), true) === false) {
        return;
      }
      // TODO - coalesce the selectionchange event in deselect w/the one below...
    }

    function commit() {
      selected.add(record);
      change = true;
    }

    for (; i < len; i++) {
      record = records[i];
      if (keepExisting && me.isSelected(record)) {
        continue;
      }
      me.lastSelected = record;

      me.onSelectChange(record, true, suppressEvent, commit);
    }
    if (!me.preventFocus) {
      me.setLastFocused(record, suppressEvent);
    }
    // fire selchange if there was a change and there is no suppressEvent flag
    me.maybeFireSelectionChange(change && !suppressEvent);
  }
});

Ext.define('gw.gmenuitem', {
  extend: 'Ext.menu.Item',
  alias: 'widget.gmenuitem',

  /**
   * Registers the handler on each item, because menu item does not bubble click event to the global handler.
   */
  initComponent :  function() {
    if (!this.handler) {
      this.setHandler(gw.app.onCompAction);
    } else if (Ext.isString(this.handler)) { // convert string to JS function
      this.ghandler = this.handler;
      this.handler = function() {eval(this.ghandler)}
    }

    // menu item created by overflow toolbar doesn't have a predictable ID, use eventId for action:
    if (this.eventId) {
      this.on('render', function(item) {
        item.getEl().dom.setAttribute('eventId', this.eventId)
      })
    }
    // remove the empty menu if there is no items inside so it doesn't render the arrow
    if (this.menu && !this.menu.items && !this.ondemandmenu ) {
      delete this.menu;
    }

    // @SenchaUpgrade TODO: use Ext.menu.CheckItem?
    // "checked" indicator:
    if (this.checked) {
      this.cls = (this.cls ? (this.cls + ' ') : '') + Ext.baseCSSPrefix + 'menu-item-checked';
    }

    this.callParent(arguments);
  },
  
  // @SenchaUpgrade override private API: menu onDemand
  doExpandMenu : function() {
    gw.ext.Util.createAndShowOnDemandMenuIfNeeded(this);
    this.callParent(arguments);
  }
});

Ext.define('gw.override.Ext.button.Button', {
  override: 'Ext.button.Button',

  showMenu : function(){
    gw.ext.Util.createAndShowOnDemandMenuIfNeeded(this);
    return this.callOverridden(arguments);
  }
});

//TODO: extjs upgrade4 - the effort to support a labelable Button seems too high, and there's some layout issue
Ext.define('gw.ext.Button', {
    extend: 'Ext.button.Button',
    alias: 'widget.gbutton',
    
    // Allows button to be delegate of click event by default:
    listeners : { click : gw.app.onCompAction},
    initComponent : function() {
      var imgText;

      if (this.icon && !this.text) {
        // for icon only button, use nested image instead of background image, in order to auto size the image
        this.cls = (this.cls ? this.cls + ' ' : '') + 'g-icon-button'
        imgText = '<img src="'+this.icon;
        if (this.iconWidth) {
          imgText = imgText + ' width="' + this.iconWidth + '" height="' + this.iconHeight + '"'
        }
        imgText = imgText + '"/>';
        this.text = imgText;
        delete this.icon
      }

      if (Ext.isString(this.handler)) { // convert string to JS function
        this.ghandler = this.handler;
        this.handler = function() {eval(this.ghandler)}
      }

      this.callParent(arguments);

      if (this.buttonFlags) {
        this.disable();
      }
    }
});

Ext.define('gw.ext.gsplitbutton', {
  extend: 'Ext.button.Split',
  alias: 'widget.gsplitbutton',

  initComponent: function() {
    if (this.menu && !this.menu.items && !this.ondemandmenu ) {
      delete this.menu;
      this.split = false;   // hide the arrow.  @SenchaUpgrade this.split is private
    }
    this.callParent(arguments);
  },

  listeners : { click : gw.app.onCompAction }
});

Ext.define('gw.plugin.Toolbar', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.gtbconfig',

  /**
   * Overrides the owner container layout, before initComponent is invoked on the owning container.
   */
  constructor:function(config) {
    Ext.apply(config.cmp, {
      enableOverflow:true, // do not cut off toolbar content
      defaultType : 'gbutton'
    });

    this.callParent(arguments);
  }
});

Ext.define('gw.ext.gtoolbar', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.gtoolbar',
  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype:'gtbconfig'});
    return this.callParent(arguments);
  }
});

/**
 * A paging component for iterator which doesn't have a store associated to it.
 */
// TODO : see if we can create a store and use extjs paging
Ext.define('gw.gpanelpaging', {
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.gpanelpaging',
  requires:['Ext.toolbar.TextItem', 'Ext.form.field.Number'],
  beforePageText:'Page',
  afterPageText:'of {0}',
  firstText:'First Page',
  prevText:'Previous Page',
  nextText:'Next Page',
  lastText:'Last Page',
  inputItemWidth:30,
  currentPage:1,
  pageSize:undefined,
  total:undefined,
  viewRootId: undefined,


  getPagingItems:function () {
    var me = this;

    return [
      {
          ui: 'plain',
        itemId:'first',
        tooltip:me.firstText,
        overflowText:me.firstText,
        iconCls:Ext.baseCSSPrefix + 'tbar-page-first',
        disabled:true,
        handler:me.moveFirst,
        scope:me
      },
      {
          ui: 'plain',
        itemId:'prev',
        tooltip:me.prevText,
        overflowText:me.prevText,
        iconCls:Ext.baseCSSPrefix + 'tbar-page-prev',
        disabled:true,
        handler:me.movePrevious,
        scope:me
      },
      '-',
      me.beforePageText,
      {
        xtype:'numberfield',
        itemId:'inputItem',
        name:'inputItem',
        id: me.pagingId,
        cls:Ext.baseCSSPrefix + 'tbar-page-number',
        allowDecimals:false,
        minValue:1,
        hideTrigger:true,
        enableKeyEvents:true,
        keyNavEnabled:false,
        selectOnFocus:true,
        submitValue:false,
        // mark it as not a field so the form will not catch it when getting fields
        isFormField:false,
        width:me.inputItemWidth,
        margins:'-1 2 3 2',
        listeners:{
          scope:me,
          keydown:me.onPagingKeyDown,
          blur:me.onPagingBlur
        }
      },
      {
        xtype:'tbtext',
        itemId:'afterTextItem',
        text:Ext.String.format(me.afterPageText, 1)
      },
      '-',
      {
          ui: 'plain',
        itemId:'next',
        tooltip:me.nextText,
        overflowText:me.nextText,
        iconCls:Ext.baseCSSPrefix + 'tbar-page-next',
        disabled:true,
        handler:me.moveNext,
        scope:me
      },
      {
          ui: 'plain',
        itemId:'last',
        tooltip:me.lastText,
        overflowText:me.lastText,
        iconCls:Ext.baseCSSPrefix + 'tbar-page-last',
        disabled:true,
        handler:me.moveLast,
        scope:me
      }
    ];
  },

  initComponent:function () {
    var me = this,
            pagingItems = me.getPagingItems(),
            userItems = me.items || me.buttons || [];

    if (me.prependButtons) {
      me.items = userItems.concat(pagingItems);
    } else {
      me.items = pagingItems.concat(userItems);
    }
    delete me.buttons;

    if (me.displayInfo) {
      me.items.push('->');
      me.items.push({xtype:'tbtext', itemId:'displayItem'});
    }

    me.callParent();
    me.on('beforerender', me.onLoad, me, {single:true});
  },
  
  onLoad:function () {
    var me = this,
            isEmpty,
            afterText,
            pageCount,
            isDisable;
    isEmpty = (this.total === undefined || this.total === 0);
    isDisable = (this.pagingDisabled == true || isEmpty);
    if (!isEmpty) {
      pageCount = Math.ceil(me.total / me.pageSize);
      afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
    }
    Ext.suspendLayouts();
    me.child('#afterTextItem').setText(afterText);
    me.child('#inputItem').setDisabled(isDisable).setValue(me.currentPage);
    me.child('#first').setDisabled(me.currentPage === 1 || isDisable);
    me.child('#prev').setDisabled(me.currentPage === 1 || isDisable);
    me.child('#next').setDisabled(me.currentPage === pageCount || isDisable);
    me.child('#last').setDisabled(me.currentPage === pageCount || isDisable);
    Ext.resumeLayouts(true);
  },
  moveFirst:function () {
    this.loadPage(1);
  },

  /**
   * Move to the previous page, has the same effect as clicking the 'previous' button.
   */
  movePrevious:function () {
    var me = this,
        prev = me.currentPage - 1;
    if (prev > 0) {
      me.loadPage(prev);
    }
  },

  moveNext:function () {
    var me = this,
        next = me.currentPage + 1;
    if (next <= me.getPageCount()) {
      me.loadPage(next);
    }
  },

  moveLast:function () {
    var me = this,
        last = me.getPageCount();
    this.loadPage(last);
  },

  // @private
  readPageFromInput:function () {
    var v = this.child('#inputItem').getValue(),
            pageNum = parseInt(v, 10);

    if (!v || isNaN(pageNum)) {
      this.child('#inputItem').setValue(this.currentPage);
      return false;
    }
    return pageNum;
  },

  onPagingFocus:function () {
    this.child('#inputItem').select();
  },

  onPagingKeyDown:function (field, e) {
    var me = this,
            k = e.getKey(),
            increment = e.shiftKey ? 10 : 1,
            pageNum,
            pageCount = me.getPageCount();

    if (k == e.RETURN) {
      e.stopEvent();
      pageNum = me.readPageFromInput();
      if (pageNum !== false) {
        pageNum = Math.min(Math.max(1, pageNum), pageCount);
        if (me.fireEvent('beforechange', me, pageNum) !== false) {
          this.loadPage(pageNum);
        }
      }
    } else if (k == e.HOME || k == e.END) {
      e.stopEvent();
      pageNum = k == e.HOME ? 1 : pageCount;
      field.setValue(pageNum);
    } else if (k == e.UP || k == e.PAGE_UP || k == e.DOWN || k == e.PAGE_DOWN) {
      e.stopEvent();
      pageNum = me.readPageFromInput();
      if (pageNum) {
        if (k == e.DOWN || k == e.PAGE_DOWN) {
          increment *= -1;
        }
        pageNum += increment;
        if (pageNum >= 1 && pageNum <= pageCount) {
          field.setValue(pageNum);
        }
      }
    }

  },

  onPagingBlur:function (e) {
    var curPage = this.currentPage;
    this.child('#inputItem').setValue(curPage);
  },

  getPageCount: function() {
      var me = this;
      return Math.ceil(me.total / me.pageSize);
  },

  loadPage:function (page, options) {
    var me = this;
    me.currentPage = page;
    options = Ext.apply({
      start:(page - 1) * me.pageSize,
      limit:me.pageSize
    }, options);
    // TODO : remove the last undefined argument
    gw.app.requestViewRoot(me.viewRootId, options, undefined);
  }
})

/**
 * A container which render the paging control in the title bar.
 */
Ext.define('gw.ext.PagingPanel', {
  extend:'Ext.panel.Panel', // TODO: use container to reduce overhead, when there's no pagination
  alias:'widget.gpagingpanel',
  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype:'glayout'});
    return this.callParent(arguments);
  },

  initComponent:function () {
    if (this.options) {
      var currPage = this.options.start / this.options.limit + 1;
      this.tbar = {
        pageSize:this.options.limit,
        total:this.options.total,
        currentPage:currPage,
        viewRootId:this.id,
        // This id is needed for testing and updating the page count.
        pagingId:this.id + ':_ListPaging',
        recordCountId:this.id + ':_RecordCount',
        pagingDisabled: this.options.pagingDisabled,
        xtype:'gpanelpaging'
      };
    }
    this.callParent(arguments);
  }
});

/**
 * A table layout panel, it also support pagination
 */
Ext.define('gw.ext.TablePanel', {
  extend: 'gw.ext.PagingPanel',
  alias: 'widget.gtablepanel',

  initComponent:function () {
    var gEqualWidth =  this.gEqualWidth;
    if (this.columns !== null) {
      this.layout.columns = this.columns;
    }
    Ext.apply(this.layout, {
           tdAttrs: {
             style : {
               padding: '5px',
               'vertical-align' : 'top'
             }
           }}
    );
    this.layout.tableAttrs.border = this.hasBorder === true ? 1 : 0; // draw border for each table cell if border is true
    // adding empty components to the end of the table if elements in the last row is less than the number of columns
    var totalFieldCount = 0;
    if (this.columns && this.columns > 1 && this.items) {
      var tdWidth = 100 / this.columns;
      var tdWidthPercent =  tdWidth.toFixed(0) + "%";
      Ext.each(this.items, function (item) {
        if (!item.hidden) {
          if (item.colspan) {
            totalFieldCount += item.colspan;
          } else {
            if (gEqualWidth == true) {
              item.tdAttrs = {width : tdWidthPercent};
            }
            totalFieldCount++;
          }
        }
      });
      var elementsInLastRow = totalFieldCount % this.columns;
      if (elementsInLastRow > 0) {
        var elementToAdd = this.columns - elementsInLastRow;
        var addItem = (gEqualWidth == true) ?  {xtype:'component', tdAttrs: {width : tdWidthPercent}} :
                                               {xtype:'component'};
        for(var i = 0; i < elementToAdd; i++) {
          this.items.push(addItem);
        }
      }
    }
    this.callParent(arguments);
  }
});

/** Override default label width */
//Ext.define('gw.override.Ext.form.Labelable', {
//  override: 'Ext.form.Labelable',
//  labelWidth: 150,
//  hideEmptyLabel: true,
//  labelSeparator: ''
//})

Ext.define('gw.override.Ext.tab.Tab', {
  override: 'Ext.tab.Tab',

  initComponent : function() {
    this.callOverridden(arguments);

    // TODO: rename to gTabId. Set GW tab id, so that it'll be rendered into HTML
    if (this.card && this.card.tabId) {
      this.id = this.card.tabId;
    }
  },

  listeners: {
    /**
     * Fetch new tab content when user clicks on a different tab
     */
    click: function() {
      if (this.active == false && this.card.tabId) {
        gw.app.handleAction(null, this.card.tabId);
      }
    }
  }
})

/**
 * A http proxy that delegates to gw.app
 */
Ext.define('gw.ext.ModelProxy', {
  extend: 'Ext.data.proxy.Ajax',
  alias: 'proxy.gw',
  url: 'dummy',

  /**
   * Let gw.app handle the request
   * @SenchaUpgrade need to keep in sync with super class implementation
   */
  doRequest: function(operation, callback, scope) {
    //
    // remove the fake-group-field from sort and group spec:
    // TODO: refactor to not use grouping for summary row of the entire LV?
    //
    function removeFackGroupField(sorters) {
      return Ext.Array.filter(sorters, function(sorter) {
        return !(Ext.isString(sorter.property) && sorter.property.charAt(0) == ":");
      }, this);
    }
    if (operation.sorters) {
      operation.sorters = removeFackGroupField(operation.sorters);
    }
    if (operation.groupers) {
      operation.groupers = removeFackGroupField(operation.groupers);
    }

    var writer  = this.getWriter(),
         request = this.buildRequest(operation);

    if (operation.allowWrite()) {
      request = writer.write(request);
    }

    Ext.apply(request, {
      binary        : this.binary,
      headers       : this.headers,
      timeout       : this.timeout,
      scope         : this,
      callback      : this.createRequestCallback(request, operation, callback, scope),
      method        : this.getMethod(request),
      disableCaching: false // explicitly set it to false, ServerProxy handles caching
    });

    var params = request.params;
    if (params.argIds) { // collect arg values
      var ids = params.argIds.split(',')
      var argValues = []
      for (var i = 0; i < ids.length; i++) {
        var argId = ids[i];
        var comp = argId ? Ext.ComponentManager.get(argId) : null;
        argValues[i] = comp ? gw.ext.Util.getFieldValue(comp) : ''
      }
      params.additionalArgs = argValues
    }
    if (params.node == 'root') {
      delete params.node; // remove id for the "invisible root" node
    }

    gw.app.requestViewRoot(params.viewRootId, params, undefined,
        { operation:Ext.apply(operation, {viewRootId : params.viewRootId}) }); // attach the data operation to be used during callback

    return request;
  }
});

/**
 * A store that communicates to server thru gw.app
 */
//Ext.extend(Ext.data.JsonStore, gw.ext.Util.getStoreExtension())
Ext.define('gw.ModelStore', Ext.apply(gw.ext.Util.getStoreExtension(), {

  extend: 'Ext.data.JsonStore',
  alias: 'store.modelstore',

  getGroupString: function(instance) {
    var group = this.groupers.first();
    if (group) {
      var value = instance.get(group.property);
      return (value && value.text != undefined) ? value.text : value;
    }
    return '';
  },

  // @SenchaUpgrade work around bugs in store destruction and implicit model cleanup
  // also removes proxy listeners that ExtJs does not know to remove.
  destroyStore: function() {
    var me = this;

    if (!me.isDestroyed) {
      me.clearListeners();

      // @Guidewire : remove listeners from proxy
      if(me.proxy) {
        me.proxy.clearListeners();
      }

      if (me.storeId) {
        Ext.data.StoreManager.unregister(me);
      }
      me.clearData();
      me.data = me.tree = me.sorters = me.filters = me.groupers = null;
      if (me.reader) {
        me.reader.destroyReader();
      }
      me.proxy = me.reader = me.writer = null;
      me.isDestroyed = true;

      // @Guidewire : cleanup reader inside model proxy
      var modelProxy = me.model.proxy
      if(modelProxy && modelProxy.reader) {
        modelProxy.reader.destroyReader();
        modelProxy.reader = null;
      }

      if (me.implicitModel) {
        // @Guidewire : clean up the classmanager & modelmanager references
        // Can't call Ext.destroy() because me.model was not created with the required destroy method
        var modelName = me.model.modelName;
        me.undefineModel(modelName);
        Ext.ModelManager.unregister(modelName);
        delete Ext.ModelManager.types[modelName];
      } else {
        me.model = null;
      }
    }
  },

  // @SenchaUpgrade : Modified version of ClassManager.undefine() which is unavailable for non-debug
  undefineModel: function(name) {
    var MGR = Ext.ClassManager;

    var classes = MGR.classes,
        maps = MGR.maps,
        aliasToName = maps.aliasToName,
        nameToAliases = maps.nameToAliases,
        alternateToName = maps.alternateToName,
        nameToAlternates = maps.nameToAlternates,
        aliases = nameToAliases[name],
        alternates = nameToAlternates[name],
        parts, partCount, namespace, i;

    delete nameToAliases[name];
    delete nameToAlternates[name];
    delete classes[name];

    if (aliases) {
      for (i = aliases.length; i--;) {
        delete aliasToName[aliases[i]];
      }
    }

    if (alternates) {
      for (i = alternates.length; i--; ) {
        delete alternateToName[alternates[i]];
      }
    }

    parts = MGR.parseNamespace(name);
    // @Guidewire : don't clear the parse cache until after we've split the namespace.
    delete MGR.namespaceParseCache[name];

    partCount = parts.length - 1;
    namespace = parts[0];

    for (i = 1; i < partCount; i++) {
      namespace = namespace[parts[i]];
      if (!namespace) {
        return;
      }
    }

    // Old IE blows up on attempt to delete window property
    try {
      delete namespace[parts[partCount]];
    } catch (e) {
      namespace[parts[partCount]] = undefined;
    }

  }

}));


/**
 * A special panel that allows custom HTML content (including JavaScript)
 */
Ext.define('gw.templatepanel', {
  extend: 'Ext.panel.Panel',
  alias: ['widget.templatepanel', 'widget.calendarpanel'],

  layout: {
    type: 'fit'
  },

  afterRender : function() {
    this.callParent(arguments);
    if (this.dhtml) {
      this.update(this.dhtml, /*loadScripts*/true);
      delete this.dhtml;
    }
  }
});


Ext.define('gw.override.Ext.menu.Menu', {
  override: 'Ext.menu.Menu',

  // @SenchaUpgrade override private method to work around ExtJs bug:
  // Specifying default type for menu items on the menu is not supported
  lookupItemFromObject: function(cmp) {
    if (cmp.xtype == null && this.defaultType != null && this.defaultType != 'panel') {
      cmp.xtype = this.defaultType;
    }
    return this.callOverridden(arguments);
  },
  /**
   * Extends super to support multi-column and flattened menu:
   */
  initComponent : function() {
    var items = this.items || (Ext.isArray(this.initialConfig) ? this.initialConfig : this.initialConfig.items);
    var bMultiColumn = this.numEntriesPerColumn > 0 && items && items.length > this.numEntriesPerColumn;
    if (bMultiColumn) { // multi-column menu
        
        Ext.apply(this, {
            border:false,
            bodyBorder: false,
            plain: true,
            showSeparator: false
        })
        this.addCls(Ext.baseCSSPrefix + 'columnmenu');
      this.items = [];
        
      var x = [];
      for (var i = 0; i < items.length; i++) {
        if (i > 0 && i % this.numEntriesPerColumn == 0) { // starts a new column
          this.items.push({items: x});
          x = []
        }

        if (this.flattened) {
          gw.ext.Util.appendAndFlattenMenu(items[i], x)
        } else {
          x.push(items[i])
        }
      }
      if (x.length > 0) {
        this.items.push({items: x})
      }

      this.defaults = Ext.applyIf({
        floating:false,
        plain: true,
        flex:1,
        style:{height:'100%'},
        border:false,
        bodyBorder: false,
        xtype:'menu',
        cls: Ext.baseCSSPrefix + 'columnmenu-inner',
        defaultType:'gmenuitem'
      }, this.defaults);

      if (Ext.isArray(this.initialConfig)) {
        this.initialConfig = undefined
      } else if (this.initialConfig) {
        this.initialConfig.items = undefined
      }
      delete items
    }
    else if (this.flattened) { // flattened single-column menu
      var flattened = []
      Ext.each(this.items, function(item){
        gw.ext.Util.appendAndFlattenMenu(item, flattened)
      })
      delete this.items
      this.items = flattened
    }

    this.callOverridden(arguments);

    if (bMultiColumn) {
      // force overriding the hard-coded layout of menu at the end:
      this.layout = {
        type:'table',
        autoScroll:true,
        tableAttrs:{
            cls: Ext.baseCSSPrefix + 'columnmenu-table'
        },
        tdAttrs: {
            // AHK - 4/23/2013 - The cls here on tdAttrs appears to have no affect on the rendering.  The one
            // attached to tableAttrs, however, works
            cls: Ext.baseCSSPrefix + 'columnmenu-cell',
            style : {"vertical-align" : "top"}
        }
      };
    }
  }

});

/**
 * A button with an AJAX menu that displays unsaved work entries
 */
Ext.define("gw.unsavedworkbutton", {
  extend: 'Ext.button.Button',
  alias: 'widget.unsavedworkbutton',
  cls: 'g-no-menu-icon',
  iconCls: 'g-unsavedwork-icon',
  menuAlign: 'tr-br?',
  menu : {
    xtype : 'dataviewmenu',
    items : [{xtype: 'unsavedworklist'}]
  }
});

/**
 * Model for unsaved work list
 */
Ext.define('gUnsavedWorkModel', {
    extend: 'Ext.data.Model',
    fields:['entryCls','titleCls','title','titleId','icon','iconId','entryKey']
});

/**
 * A custom DataView that contains a list of unsaved work entries
 */
Ext.define("gw.unsavedworklist", {
    extend  : 'Ext.view.View',
    alias   : 'widget.unsavedworklist',

    cls         : "unsavedwork",
    itemSelector: 'tr',
    
    initComponent: function() {
        var me = this;
        
        me.addCls(Ext.baseCSSPrefix + 'unsavedwork-list');
        me.overItemCls = Ext.baseCSSPrefix + 'unsavedwork-item-over';
        
        Ext.apply(me, {
            store: Ext.create('gw.ModelStore', {
                model: 'gUnsavedWorkModel'
            }),
            tpl: Ext.create('Ext.XTemplate', 
                '<table class="', Ext.baseCSSPrefix,'unsavedwork-table" border="0" cellspacing="0" cellpadding="0">', 
                    '<tpl for=".">', 
                        '<tr class="{entryCls}">', 
                            '<td class="text {titleCls}">', 
                                '<tpl if="titleId"><a id="{titleId}"></tpl>', 
                                    '{title}', 
                                '<tpl if="titleId"></a></tpl>', 
                            '</td>',
                            '<td class="icon">', 
                                '<tpl if="iconId"><a id="{iconId}"></tpl>', 
                                    '{icon}', 
                                '<tpl if="iconId"></a></tpl>', 
                            '</td>', 
                        '</tr>', 
                    '</tpl>', 
                '</table>'
            )
        });
        
        me.callParent(arguments);
        
        me.on('itemclick', me.onListItemClick, me);
    },

    /**
     * Handles clicking on any anchor with this DataView.
     * Note that one data record (i.e. a TR) may contains multiple anchors, each with a different action.
     */
    onListItemClick: function(dataView, record, item, index, evt) {
        var viewRootId, target, entryKey;
        
        // When the DataView is inside a menu, the menu will invoke this event again. Stop it!
        evt.stopEvent(); 
        
        // look up which anchor is clicked:
        target = evt.getTarget('a', 3); 
        if (target) {
            viewRootId  = this.store.storeId;
            entryKey    = record.get('entryKey'); // the key to identify the unsaved work entry
            
            if (target.id.match(/discard$/)) { // discard the entry
                gw.app.confirm(
                    '', 
                    gw.app.localize('Java.UnsavedWork.ConfirmDiscard', record.get('title')), 
                    function(btn) {
                        if (btn === 'yes' || btn === 'ok') {
                            gw.app.requestViewRoot(viewRootId, {
                                cancelEntry: entryKey
                            });
                        }
                    }
                );
            }
            else { // navigate to the entry
                gw.app.handleAction(null, viewRootId, {
                    param: entryKey
                });
            }
        }
    }
});




/**
 * A menu which contains a DataView and reloads DetailView store right before show
 * TODO: ExtJs4 upgrade - we can use "cls" attribute on each node to underline a tree node
 */
Ext.define('gw.dataviewmenu', {
    extend  : 'Ext.menu.Menu',
    alias   : 'widget.dataviewmenu',
    
    showSeparator   : false,
    plain           : true,
    
    initComponent: function() {
        var me = this;
        
        me.border = false;
        me.addCls(Ext.baseCSSPrefix + 'dataviewmenu');
        me.callParent(arguments);
        me.add({
            xtype   : 'component',
            itemId  : 'loading-indicator',
            html    : 'Loading...',
            cls     : Ext.baseCSSPrefix + 'dataviewmenu-loading-indicator'
        });
    },
    
    getDataComponent: function() {
        return this.child('component[store]');
    },
    
    beforeShow: function() {
        var me      = this,
            dataview= me.getDataComponent();
            store   = dataview.store;
            
        me.callParent(arguments);
        
        // clear store
        store.removeAll();

        // show loading indicator
        dataview.hide();
        me.child('#loading-indicator').show();
        
        // make sure the button id is used as store id
        if (!store.storeId) {
            store.setModelId(me.getBubbleTarget().el.id);
        }
        
        // load store
        store.load(function () {
            me.child('#loading-indicator').hide();
            dataview.show();
            
            // realign menu
            // the ajax response (processCommands) suspends layouts. We have to 
            // wait until layout is ready to realign.
            me.on('afterlayout', me.realignMenu, me, {single: true});
            
            // Don't need to redo layout. Menu components shrink wrap around content.
            // this.redoComponentLayout();
        });
    },
    
    realignMenu: function() {
        var refOwner = this.getRefOwner();
        this.showBy(refOwner, refOwner.menuAlign||'tr-br?');
    }
});

Ext.define('g-tree-model', {
  extend: 'Ext.data.Model',
  fields: ['disabled', 'text', 'selected']  // add fields to handle "disabled" node
});


/**
 * Override tree panel, so that the change can be inherited by TreeGrid sub class
 */
Ext.define('gw.override.Ext.tree.Panel', {
  override: 'Ext.tree.Panel',

  autoScroll : true,
  border : false,
  // TODO: PL-23195: May consider setting back to default animation once fixed by Ext JS.
  animate: false,

  /**
   * Remembers nodes toggled at browser side
   */
  _onToggle : function(tree, nodeId) {
    if (!tree.foldersToggled) {
      return; // not ready yet
    }
    var localToggleState = Ext.ComponentManager.get(tree.id + '_toggle');
    if (!localToggleState) {
      return; // No need to collect client folder-toggle state to send to the server
    }

    if (Ext.Array.indexOf(tree.foldersToggled, nodeId) >= 0) {
      Ext.Array.remove(tree.foldersToggled, nodeId);
    } else {
      tree.foldersToggled.push(nodeId)
    }
    localToggleState.setValue(tree.foldersToggled.toString());
  },

  /**
   * @SenchaUpgrade Handles node pre-selected from server
   */
  _selectNodeOnLoad : function(topNode) {
    var me = this;
    topNode.cascadeBy(function(node) {
      if (node.get('selected')) {
        me.suspendEvents(false); // The state comes from server, no need to trigger events
        me.selectPath(node.getPath()); // select node on load
        me.resumeEvents();
      } else {
        // AHK - 3-27-2013 - If we attempt to select a path that's a child of a node that's not expanded,
        // ExtJS will create a duplicate node and then generally freak out.  This is a bug we should fix
        // server-side, such that we shouldn't ever be in a situation where the parent of a selected node
        // ends up collapsed, but some of that code is app-specific and not 100% under our control, so we
        // want to make sure the client doesn't freak out if that happens.
        // See PL-21885
        return node.get('expanded')
      }
    });
  },

  getDataIndex : function(colIndex) {
    return this.columns[colIndex].dataIndex
  },

  /**
   * Handles click on a tree node
   */
  doClick : function (tree, nodeModel, evt) {
    if (!nodeModel.get('disabled')) { // @SenchaUpgrade TODO: Does ExtJs offer a good way to disable tree node selection
      evt.stopEvent();
      gw.app.handleAction(null, tree.dataUrl || tree.id, {param:nodeModel.get('id')})
    }
  },

  listeners : {
    /**
     * After the tree is fully rendered:
     * <li> starts tracking toggled nodes
     * <li> Selects the default "selected" node
     */
    afterrender : function () {
      this.foldersToggled = []; // resets toggled nodes after loading the tree from server
      this._selectNodeOnLoad(this.getRootNode()); // check for pre-selected node from server
    },
    /**
     * Tracks nodes toggled locally
     */
    beforeitemexpand : function(nodeModel) {
      this._onToggle(this, nodeModel.get('id'))
    },
    /**
     * Tracks nodes toggled locally
     */
    beforeitemcollapse : function(nodeModel) {
      this._onToggle(this, nodeModel.get('id'))
    },
    /**
     * Undos "toggled at client" state, when a node is loaded from server side
     */
    load : function(store, nodeModel) {
      if (nodeModel.isRoot() && !this.rootVisible) {
        return; // invisible root node doesn't have toggle state at client side
      }
      this._onToggle(this, nodeModel.get('id'))
    },

    /**
     * Triggers action on click:
     */
    itemclick :function(treeView, nodeModel, elem, index, evt) {
      return this.doClick(this, nodeModel, evt);
    }
  },

  /**
   * Sets up loader to load inline data
   */
  initComponent : function() {
    // TODO: ExtJs upgrade4 - Fix server response, so that we don't have to convert inline data format here:
    if (this.data && this.root) {
      this.root.children = this.data;
      delete this.data
    }

    this.store = {
      remoteSort: true,  // sort at server side
      storeId : this.id, // set up store id
      listeners: {
        /**
         * Checks for pre-selected node from server, when the store reload
         */
        load : function(store, node, records, successful) {
          if (successful) {
            var treePanel = Ext.ComponentManager.get(this.storeId);
            // AHK - 3-27-2013 - We have to invalidate checksums on the outer container
            // when we load new data from the server, since
            // the server-side checksum won't have taken these children into account.  If we don't do this,
            // then adds/removes on open nodes won't be reflected in the tree
            // See PL-21885
            treePanel.ownerCt.checksum = 'checksumInvalidated';
            treePanel._selectNodeOnLoad(node); // check for pre-selected node from server
          }
        }
      }
    };
    if (this.fields) {
      // @SenchaUpgrade TODO: inline fields definition was deprecated in ExtJs4.0, but seems no longer deprecated in 4.1
      this.store.fields = this.fields;
    } else {
      this.store.model = this.modelId ? this.modelId : 'g-tree-model';
    }

    // Use gw proxy for the TreeStore
    this.store.proxy = Ext.create('gw.ext.ModelProxy', {
      reader:{}, // work around JS error when there's no reader specified
      url:'dummy2',
      extraParams: {viewRootId : this.dataUrl || this.id}
    });

    this.callParent(arguments);

    // add a hidden input to store folders toggled at client side:
    this.add({
        id      : this.id+'_toggle', 
        xtype   : 'hidden',
        hidden  : true
    });
  }
});


/**
* Extends for Row Tree
*/
Ext.define('gw.ext.RowTree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.rowtree',
  rootVisible: false,
  shrinkWrap:true,
  shrinkWrapDock: true,

  // Clear toggle.
  clearFoldersToggled : function() {
    var localToggleState = Ext.ComponentManager.get(this.id + '_toggle');
    if (!localToggleState) {
      return; // No need to collect client folder-toggle state to send to the server
    }
    this.foldersToggled = [];
    localToggleState.setValue('');
  },

  updateFlagged: function() {
    // update button state:
    var checkedNodes = this.getChecked();
    gw.ext.Util.updateFlaggedButtons(this[gw.ext.Util.getFlaggedProperty()], checkedNodes, this);
  },

  /**
   * Registers events, and sets up store fields
   */
  initComponent: function() {
    var me = this;

    this.on({
      /**
       * @SenchaUpgrade TODO : talk to Sencha about disabled selection of individual nodes, and select a node upon load
       * Disable row selection, if needed
       */
      beforeselect: function(view, node) {
        if (node.get('disableSelection') && !node.get('selected')) {//if user selection is disabled, and the node is not pre-selected by server
          return false; // cancel selection
        }
      },

      /**
       * Handles row selection for a Tree-Detail panel:
       * @param selModel
       * @param selections
       */
      selectionchange: function(selModel, selections) {
        // show detail
        if (selections.length == 1) {

          var node = selections[0];
          var tree = selModel.view.ownerCt;
          gw.app.requestViewRoot(
              [tree.id, node.get('id'), '_ViewDetail'].join(":"),
              {updateData:true}
           );
        }

      },

      /**
       * @SenchaUpgrade Cancels row selection, if the event target is a checkbox. TODO: Sencha should support this by default
       */
      beforeitemmousedown: function(view, record, item, index, e) {
        if (e.getTarget().getAttribute('role') == 'checkbox') {
          return false;
        }
      },

      /**
       * Handles node checkbox state change
       */
      checkchange: this.updateFlagged,
      load: this.updateFlagged
    });

    if (!this.viewConfig) {
      this.viewConfig = {}
    }
    this.viewConfig.stripeRows = (this.gStripeRows !== false);

    // TODO: refactor to move to the common parent class of Tree Panel and Grid. And renamve "filters" to "gFilters"?
    // add filters to panel toolbar
    if (this.filters) {
      gw.ext.Util.addFiltersToPanel(this, this.filters);
      delete this.filters;
    }

    // Remember the LV grid column resize state from the local cookie store:
    if (!this.stateId)  {
      this.stateId = this.id;
    }
    if (this.stateId) {
      this.stateful = true;
    }

    var fields = [{name:'disableSelection', type:'boolean'}, 'eventParam', 'selected'];
    if (this.cb) {
      // add fields needed to render node checkbox and post checkbox state to the server
      fields.push({name:'checked', type:'boolean', mapping:'_Checkbox', convert: function (v) {
        return Ext.isBoolean(v) ? v : v === 'true' ? true : v === 'false' ? false : null;
      }});
      fields.push({name:gw.ext.Util.getRowOffsetProperty(), mapping:'id'});
      fields.push(':flags');
    }

    for (var i = 0; i < this.columns.length; i++) {
      var col = this.columns[i];
      if (i==0) {
        col.xtype = 'treecolumn'; // first column contains tree-operation buttons
      } else {
        // TODO: can we consolidate Column renderer logic for both Grid and Tree?
        col.renderer = me.treeColumnRenderer;
      }

      fields.push(col.dataIndex);
      fields.push(col.dataIndex + ':cls');
    }

    this.fields = fields;

    // Create a strut root object to have the super class method load data into.
    this.root = {id:'root'};
    // If there is no data section from the server, make the root a leaf node
    if (!this.data) {
      Ext.apply(this.root, {expanded: false, expandable: false, leaf: true});
    }

    this.callParent(arguments);

    // TODO: consolidate viewready logic between Grid and Tree?
    this.view.on('viewready', this.updateFlagged, /*grid*/this)
  },

  //@SenchaUpgrade This method relies on the dom structure of ExtJs tree column
  doClick : function (tree, nodeModel, evt) {
    // click a row tree column:
    var treeColumn = evt.getTarget('.x-grid-cell');
    if (treeColumn) {
      var colIndex = Ext.fly(treeColumn).parent().query('.x-grid-cell').indexOf(treeColumn);
      var dataIndex = tree.columns[colIndex].dataIndex;
      if (nodeModel.get(dataIndex + ':cls') == gw.app.getEventSourceCls()) {
        evt.stopEvent();
        gw.app.handleAction(null, tree.id + ':' + nodeModel.get('id') + ':' + (nodeModel.get('eventParam') || dataIndex))
      }
    }
  },

  treeColumnRenderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
    var header = view.headerCt.getHeaderAtIndex(colIndex);
    var fieldName = header.dataIndex;

    var cls = record.get(fieldName + ':cls');
    return cls ? '<span class="' +cls+ '">' +value+ '</span>' : value;
  }

});


/**
 * Overrides Container to support links and subtitle in the header
 */
Ext.define('gw.override.Ext.container.Container', {
  override: 'Ext.container.Container',

  initComponent : function () {

    //Todo: fix server response to use both "title" and "tools" config property
    if (this.headerItems) {
      if (this.headerItems.length > 0) {
        this.tools = [];
        this.title = [];
        Ext.each(this.headerItems, function(item) {
          if (item.autoEl) {
            if (item.autoEl.cls == 'x-panel-inline-icon' || item.cls == 'x-panel-header-text') {
              // insert title and title icon to the panel TITLE
              var autoEl = item.autoEl;
              if (item.id) {
                autoEl.id = item.id; // apply id
              }
              this.title.push(Ext.core.DomHelper.markup(autoEl))
              return;
            }
          }

          // insert other type of header item as "tools":
          if (item.items) {
            Ext.each(item.items, function(child){
              this.tools.push(child)
            }, this)
          } else {
            this.tools.push(item)
          }
        }, this);

        if (this.tools.length == 0) {
          delete this.tools;
        }
        if (this.title.length == 0) {
          delete this.title;
        } else {
          this.title = this.title.join('')
        }
      }

      delete this.headerItems
    } else if (this.subTitle) {
      this.title = (this.title? this.title : '') + '<span class="g-sub-title">' + this.subTitle + '</span';
    }

    this.callParent(arguments);
  }});

/**
 * An anchor that calls server on click
 */
Ext.define('gw.ext.Link', {
  extend: 'Ext.Component',
  alias: 'widget.glink',  
  cls : 'g-link', // default cls
  disabledCls : '', // show link without action as plain text

  initComponent : function() {
    this.autoEl = {
      tag : this.disabled ? 'span' : 'a',
      id : this.id,
      href : this.disabled ? undefined : 'javascript:void(0)',
      cls : this.cls, //gw.app.getEventSourceCls(),
      cn : this.iconCls ? {
        tag : 'img',
        src : Ext.BLANK_IMAGE_URL,
        cls : 'x-panel-inline-icon ' + this.iconCls
      } : this.icon ? {
        tag : 'img',
        src : this.icon
      } : undefined,
      html : this.text
    };

    if (this.eventId) {
      this.autoEl.eventId = this.eventId
    }
    if (this.eventParam) {
      this.autoEl.eventParam = this.eventParam
    }

    if (this.tooltip) {
      this.autoEl['data-qtip'] = this.tooltip
    }

    this.disabled = undefined; // remove "disabled" property to prevent grayed-out look for a Link without action

    this.callParent(arguments);
  },

  /**
   * Mimics the same function of ext Button, used for underlying shortcut key in the link text
   */
  setText: function(text) {
    text = text || '';
    var me = this,
         oldText = me.text || '';

    if (text != oldText) {
      me.text = text;
      if (me.rendered) {
        me.getEl().update(text || '&#160;');
        me.updateLayout();
      }
      me.autoEl.html = me.text;
    }
    return me;
  },

  /**
   * Registers click handler, after DOM is rendered
   */
  afterRender: function () {
    this.callParent(arguments);
    if (this.autoEl.tag == 'a') {
      var e = this.getEl();
      if (e) {
        e.on('click', function(evt) {
          gw.app.handleCompAction(this, evt)
        }, this, {stopEvent:true})
      }
    }
  }

});


Ext.define('gw.ext.BarInput', {
  extend:'Ext.form.field.Display',
  alias:'widget.gbarinput',

  getDisplayValue:function () {
    return gw.ext.Util.renderBarInput(this);
  },

  initComponent : function() {
    this.on('boxready', function(comp) {
      // Override the top level element id to avoid conflict with the inner div id:
      // TODO: Need to clean up this widget implementation.
      comp.getEl().dom.setAttribute('id', comp.id + '-wrap');
    });

    this.callParent(arguments);
  }
});

/**
 * HelperItem Plugin which helps render helper and hook up links
 */
Ext.define('gw.plugin.HelperItem', {
  alias: 'plugin.helperitem',
  extend: 'Ext.AbstractPlugin',

  // ORIGINAL
  /**
   * Shows helper menu next to the helper icon
   */
  showMenu: function() {
    if (this.item  && this.item.menu) {
      if (this.item.menu.isHidden()) {
        gw.ext.Util.createAndShowOnDemandMenuIfNeeded(this.item);
        this.item.menu.showAt(this.item.el.getAnchorXY('bl'));
      }
    } else {
      alert("No menu available for field " + this.id)
    }
  },

  // NEW
  destroy: function() {
       var cmp = this.getCmp();

       if (cmp.item) {
           Ext.destroyMembers(cmp.item, 'menu');
           delete cmp.item.menuOpener;
           delete cmp.item;
       }

       Ext.destroyMembers(cmp,
           'suffix',
           'prefix',
           'beforeSubTpl',
           'afterSubTpl',
           'afterContainer'
       );
   },

  init : function(cmp) {
    var suffix;
    var item;
    var me = this;

    cmp.beforeSubTpl = cmp.prefix;
    cmp.afterSubTpl = cmp.suffix;

    //unbox items
    if (cmp.item) {
      if (cmp.item.length > 0) {
        item = cmp.item[0];
      } else if (cmp.item) {
        item = cmp.item;
      }
    }

    if (item) {
      var alt ='';
      var title = '';
      var iconHeight = '';
      var iconWidth = '';
      if (item.text) {
        suffix = '<span class="g-link-button">' +item.text + '</span>';
      } else {
        if (item.altText) {
          alt = '" alt="' + item.altText;
          title = '" title="' + item.altText;  // tooltip for image
        }
        if (item.iconWidth) {
          iconWidth = '" width="' + item.iconWidth;
          iconHeight = '" height="' + item.iconHeight;
        }
        suffix = '<img src="' + item.icon + iconWidth + iconHeight + alt + title +'">';
      }
      // wrap inside an anchor to allow focusing onto this element:
      suffix = '<a href="javascript:void(0)" id="' + item.id + '" class="' + gw.app.getEventSourceCls() + '">' + suffix + '</a>';

      if (item.menu) { // create menu component
        var menu = item.menu;
        delete item.menu;

        item.menu = gw.ext.Util.getOrCreateFieldMenu(item.id, menu);
        item.menuOpener = this;
      }

      if (cmp.afterSubTpl) {
        cmp.afterSubTpl += suffix;
      } else {
        cmp.afterSubTpl = suffix;
      }

      if (cmp instanceof Ext.form.FieldContainer) {
        cmp.afterContainer = cmp.afterSubTpl;
        cmp.afterSubTpl = null;
      }

      cmp.on('boxready', me.onCmpBoxReady, me, {single: true});
    }
  },

  onCmpBoxReady : function(field) {
    var me = this;
    var item;

    if (field.item[0] !== undefined) {
      field.item = field.item[0];
    }

    item = field.item;
    if (item) {
      item.el = Ext.get(item.id);
      if (item.menu) { // show menu when the helper icon is clicked
        field.mon(item.el, 'click', me.showMenu, field, {scope: me, stopEvent: true});
      } else if (field.item.handler) { // custom handler
        field.mon(item.el, 'click', item.handler, field, {stopEvent: true});
      }
      if (field.disabled) {
        item.el.setVisible(false)
      }
    }
  }
});


// Layout/container widget:

/**
 * A plugin to make the owning container to size to its content, and let only the outermost panel to scroll.
 * The owning container will have a single column layout, vertical flow, and child items stretched horizontally
 * to fill the width of the container.
 */
Ext.define('gw.plugin.ShrinkWrapLayout', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.glayout',

  /**
   * Overrides the owner container layout, before initComponent is invoked on the owning container.
   */
  constructor:function(config) {
    this.callParent(arguments);

    var container = config.cmp;
    Ext.apply(container, {
      layout:{
        columns:1,
        tableAttrs: {
          style: {width:'100%'}
        },
        type:'table'
      }
    });

    if (!container.defaultType || container.defaultType == 'panel') {
      container.defaultType = 'gcontainer'; //recursion
    }
  }
});

/**
 * A plugin similar to the gw.plugin.ShrinkWrapLayout, but renders each child item in a separate table column.
 */
Ext.define('gw.plugin.MultiColumnLayout', {
  extend: 'gw.plugin.ShrinkWrapLayout',
  alias: 'plugin.multicolumnlayout',
  constructor:function(config) {
    this.callParent(arguments);
    var container = config.cmp;

    Ext.apply(container.layout, {
           tdAttrs: {
             style : {"vertical-align" : "top"}
           }
         }
    );
    delete container.layout.columns; // allow multiple columns
  }
});

/**
 * An Ext container sizes to its content, and let only the outermost panel to scroll.
 * This container has a single column, vertical flow, and child items stretched horizontally to fill the width container.
 */
Ext.define('gw.StretchContainer', {
  extend:'Ext.container.Container',
  requires:'Ext.tab.Panel',
  alias:'widget.gcontainer',

  /**
   * Registers the plugin which handles sizing and layout
   */
  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype:'glayout'});
    return this.callParent(arguments);
  },

  initComponent: function() {
    var me = this;

    // mimic the panel logic, where the header is hidden if
    // the panel is one of the tab in a tab panel
    me.on({
      added: function(comp, container) {
        if (container instanceof Ext.tab.Panel && container.removePanelHeader) {
          if (me.items && me.items.length > 0 && me.items.get(0).xtype == 'header') {
            var header = me.items.removeAt(0);
            header.ownerCt = null; // prevents remove() call on owner by Ext.destroy()
            Ext.destroy(header);
          }
        }
      }
    });

    me.callParent(arguments);

    // include the toolbar, and disable toolbar overflow:
    if (me.tbar) {
      me.shrinkWrapDock = true;
      me.shrinkWrap = true;
      me.insert(0, Ext.apply(me.tbar, {xtype:'toolbar', layout:'hbox'}))
    }
    // include the header as the very first child:
    if (me.title || me.tools) {
      me.insert(0, {
        xtype:'header',
        title:me.title,
        tools:me.tools
      });
    }
  }
});


/**
 * An Ext container that renders each child in a separate table column.
 */
Ext.define('gw.columns', {
  extend: 'Ext.container.Container',
  alias: 'widget.gcolumns',
  border: false,
  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype:'multicolumnlayout'});
    return this.callParent(arguments);
  },
  initComponent: function() {
    if (this.divider) {
      this.cls = [this.cls || '', 'g-divider'].join(' ')
    }
    this.callParent(arguments);
  }
});

Ext.define('gw.dvcolumn', {
  extend: 'gw.StretchContainer',
  alias: 'widget.dvcolumn',
  border : false,
  frame : false,
  cls : 'g-dv-column',
  divider : true,

  initComponent:function () {
    if (!this.divider) {
      this.cls = [this.cls, 'g-no-divider'].join(' ')
    }
    this.callParent(arguments);
  }
});

// TODO: change to gTabPanel
Ext.define('gw.override.Ext.tab.Panel', {
  override: 'Ext.tab.Panel',

  shrinkWrap: true,
  shrinkWrapDock: true,

  defaultType: 'gcontainer' // recursion
});

Ext.define('gw.AlertBar', {
  extend: 'gw.columns',
  alias: 'widget.galertbar',
  cls: 'g-alert-bar',

  initComponent: function() {
    if (this.items.length == 2) {
      Ext.apply(this.items[1], {
        xtype:'glink' // TODO: simply image button type during server side rendering
      });
    }
    this.callParent(arguments);
  }
})

Ext.define('gw.override.Ext.dom.Element', {
  override: 'Ext.dom.Element',

  // @SenchaUpgrade override the following private method to fix a bug in ExtJS 4.1.1
  // TODO: Remove this override after we upgrade to ExtJS 4.1.2+
  /**
   * @private.
   * Currently used for updating grid cells without modifying DOM structure
   *
   * Synchronizes content of this Element with the content of the passed element.
   *
   * Style and CSS class are copied from source into this Element, and contents are synched
   * recursively. If a child node is a text node, the textual data is copied.
   */
  syncContent: function(source) {
    source = Ext.getDom(source);
    var me = this,
         sourceNodes = source.childNodes,
         sourceLen = sourceNodes.length,
         dest = me.dom,
         destNodes = dest.childNodes,
         destLen = destNodes.length,
         i,  destNode, sourceNode,
         nodeType;

    // Copy top node's style and CSS class
    dest.style.cssText = source.style.cssText;
    dest.className = source.className;

    // If the number of child nodes does not match, fall back to replacing innerHTML
    if (sourceLen !== destLen) {
//      source.innerHTML = dest.innerHTML;
      dest.innerHTML = source.innerHTML; //@SenchaUpgrade ExtJs 4.1.1 bug
      return;
    }

    // Loop through source nodes.
    // If there are fewer, we must remove excess
    for (i = 0; i < sourceLen; i++) {
      sourceNode = sourceNodes[i];
      destNode = destNodes[i];
      nodeType = sourceNode.nodeType;

      // If node structure is out of sync, just drop innerHTML in and return
      if (nodeType !== destNode.nodeType || (nodeType === 1 && sourceNode.tagName !== destNode.tagName)) {
        dest.innerHTML = source.innerHTML;
        return;
      }

      // Update text node
      if (nodeType === 3) {
        destNode.data = sourceNode.data;
      }
      // Sync element content
      else {
        if (sourceNode.id && destNode.id !== sourceNode.id) {
          destNode.id = sourceNode.id;
        }
        destNode.style.cssText = sourceNode.style.cssText;
        destNode.className = sourceNode.className;
        Ext.fly(destNode).syncContent(sourceNode);
      }
    }
  }

});

Ext.define('gw.override.Ext.Date', {
  override: 'Ext.Date',

  useStrict : true
});
