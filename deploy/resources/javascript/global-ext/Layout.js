/**
 * Defines the overall border layout for the app
 */
Ext.define('gw.plugin.RegionSplitter', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gsplitter',
    init: function(client) {
        //<debug warn>
        if (console) {
            console.warn('[Deprecated][gw.plugin.RegionSplitter] remove plugin and add split: true');
        }
        //</debug>
        client.split = true;
    }
});

/**
 * View port for the app. Config properties:
 * <li> links - tabbar links (e.g. Logout)
 * <li> tabs - tabs in the tabbar
 * <li> infoBar - info bar
 * <li> west - left nav content
 * <li> center - main page content
 * <li> south - work space content
 */
Ext.define('gw.ext.view', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.gview',
    constructor: function(config) {

        /**
         * Updates the worksheet count in the workspace title bar
         * @param southPanel workspace panel
         */
        function updateWorksheetCount(southPanel) {
            //@SenchaUpgrade: TODO Is it a Sencha bug that add/remove listeners are called on the Tab not the TabPanel sometimes?
            if (southPanel.xtype == 'tabpanel') {
                // TODO - localize and create a display key:
                southPanel.setTitle('Workspace (' + southPanel.items.getCount() + ')');
            }
        }
        
        var northConfig = {
            xtype       : 'gnorthpanel',
            links       : config.links,
            tabs        : config.tabs,
            QuickJump   : config.QuickJump,
            infoBar     : config.infoBar,
            hidden      : !config.links && !config.tabs && !config.infoBar && !config.QuickJump
        };
        
        var westConfig = {
            xtype: 'gwestpanel'
        };
        
        if (config.west) {
            westConfig.hidden = false;
            Ext.apply(westConfig, config.west);
        }

        var centerConfig = Ext.apply({
            xtype: 'gcenterpanel'
        }, config.center);
        
        var southConfig = {
            border: false,
            collapsible: true,
            height: 400,
            hidden: true,
            id: 'southPanel',
            region: 'south',
            hideCollapseTool: true,     // only collapse south panel thru the splitter
            floatable: true,           // allow floating by clicking on title bar
            header: false,              // do not show title bar when the workspace is expanded (by default, title bar shows up when minimized)
            headerPosition: 'bottom',   // show header at the bottom when collapsed
            listeners: {
              // @SenchaUpgrade workaround ExtJs bug when hide() is called when the southPanel is floated
              beforehide: function() {
                var me = this;
                if (me.floated) {
                  me.slideOutFloatedPanel();
                }
              },
                add: updateWorksheetCount,
                remove: updateWorksheetCount,
                beforeshow: updateWorksheetCount
            },
            split: true,
            defaults: {
                autoScroll: true // allow worksheet to scroll
            },
            xtype: 'tabpanel'
        };

        if (config.south) {
            southConfig.hidden = false;
            Ext.apply(southConfig, config.south);
        }
        
        this.callParent([{
            layout  : 'fit',
            items   : {
                xtype   : 'container',
                id      : 'mainform',
                layout  : 'border',
                items   : [northConfig, westConfig, centerConfig, southConfig]
            }
        }]);
    }
});

Ext.define('gw.centerpanel', {
    extend  : 'gw.StretchContainer',
    xtype   : 'gcenterpanel',
    
    autoScroll  : true,
    id          : 'centerPanel',
    region      : 'center',
    
    /**
     * Hook to inject default properties in specific views
     * prior instantiation.
     */
    applyDefaults: function(config) {
        config = this.callParent([config]);
        
        // Login
        if (config.id === 'Login') {
            Ext.apply(config, {
                ui              : 'login-page',
                managedHeight   : false
            });
        }
        
        return config;
    },

    /**
     * Hook to inject default properties in specific views
     * post instantiation.
     */    
    onAdd: function(component, index) {
        this.callParent(arguments);
        
        // Login 
        if (component.id === 'Login') {
            Ext.each(component.query('field'), function(item) { 
                item.labelAlign = 'right'; 
            });
        }
    }
});

/**
 * Special widget for north panel
 */
Ext.define('gw.northpanel', {
    extend: 'Ext.Container',
    xtype: 'gnorthpanel',
    
    currentTabId: undefined,
    region  : 'north',
    id      : 'northPanel',
    layout  : 'anchor',
    ui      : 'top-navigation',
    border  : '0 0 5 0',
    border  : false,
    hidden  : true,
    defaults: {
        border: false,
        anchor: '100%'
    },

    initComponent: function() {
        var tabLinkConfig, tabConfig, infoBarConfig, quickJumpConfig,
            me = this;
        
        tabLinkConfig = Ext.apply({
            id              : gw.ext.Util.getTabBarLinksId(),
            xtype           : 'gtoolbar',
            ui              : 'top-links',
            enableOverflow  : false,
            height          : 30,
            defaults        : {
                ui: 'plain'
            }
        }, me.links);
        
        tabConfig = Ext.apply({
            anchor      : '100%',
            flex        : 1,
            id          : gw.ext.Util.getTabsId(),
            xtype       : 'gtoolbar',
            ui          : 'top-tabs',
            height      : 30,
            layout      : {
              overflowHandler: 'Menu'
// The 'hbox' layout below in combination with overflowHandler breaks cell editor in Titanium theme somehow. Commenting it out.
//                type: 'hbox',
//                align: 'stretch'
            },
            defaults    : {
                ui: 'plain'
            }
        }, me.tabs);

        infoBarConfig = Ext.apply({
            id          : 'infoBar',
            hidden      : !me.infoBar,
            xtype       : 'gtoolbar',
            defaultType : 'gInfoBarItem',
            ui          : 'top-info',
            height      : 47
        }, me.infoBar);

        Ext.define('gw.gInfoBarItem', {
            extend: 'gw.ext.Button',
            alias: 'widget.gInfoBarItem',

            initComponent: function() {
                /**
                 * Do not gray out infoBarItem without an action
                 */
                if (this.disabled) {
                    this.handleMouseEvents = false;
                    this.tabIndex = -1;
                    this.cls = (this.cls ? this.cls + ' ' : '') + 'g-plain-text';
                    this.disabled = undefined;
                }
                this.callParent(arguments);
            }
        });
        
        quickJumpConfig = Ext.apply({
            displayField: 'listText',
            id          : 'QuickJump',
            modelId     : 'g-quickjump-model',
            valueField  : 'text',
            xtype       : 'quickjump',
            width       : 180
        }, me.QuickJump);

        // Set up a model for quick jump
        Ext.define('g-quickjump-model', {
            extend: 'Ext.data.Model',
            fields: [quickJumpConfig.displayField, quickJumpConfig.valueField]
        });
        
        var logo = {
            xtype   : 'image',
            cls     : 'product-logo',
            src     : Ext.BLANK_IMAGE_URL,
            width   : 200,
            height  : 30,
            style   : {
                'background-image': 'url(images/app/logo.png)',
                'background-position': '0px center',
                'background-repeat': 'no-repeat',
                'margin':"0 0 0 8px"
            }
        };
        
        me.items = [{
            xtype   : 'container',
            cls     : 'g-banner',
            height  : 30,
            layout  : {
                type: 'hbox',
                align: 'middle'
            },
            items   : [
                logo, tabConfig, quickJumpConfig, tabLinkConfig
            ]
        },{
            xtype: 'component',
            cls: 'top-navigation-divisor',
            height: 5
        }, infoBarConfig];

        me.callParent(arguments);

    },

    /**
     * Updates style class for active tab
     * @param tabId tab id
     */
    setCurrentTab: function(tabId) {
        // If the current tab id is unchanged, do nothing
        if (this.currentTabId && this.currentTabId == tabId) {
            return;
        }
        this.currentTabId = tabId;
        
        var currentTab, lastVisible;

        // for each tab
        Ext.getCmp(gw.ext.Util.getTabsId()).items.each(function(tab) {
            
            // save the last visible one
            if (tab.isVisible()) {
                lastVisible = tab;
            }
            
            // active/deactive tabs
            if (tabId === tab.id) {
                tab.addCls('x-btn-default-toolbar-small-menu-active');
                currentTab = tab;
            } 
            else {
                tab.removeCls('x-btn-default-toolbar-small-menu-active');
            }
        });
        
        // if not visible, switch tabs position
        if (lastVisible && currentTab && !currentTab.isVisible()) {
            currentTab.show();
            
            var toolbar             = currentTab.up(),
                index               = 0,
                toolbarInnerWidth   = toolbar.getLayout().innerCt.getWidth(),
                lastVisibleRight    = lastVisible.el.getLocalX() + lastVisible.el.getWidth() + lastVisible.margin$.right, //@SenchaUpdate margin$ is private
                availableSpace      = toolbarInnerWidth - lastVisibleRight,
                currentTabWidth     = currentTab.getWidth();
            
            // find open space 
            if (currentTabWidth < availableSpace) {
                index = toolbar.items.indexOf(lastVisible) + 1;
            }
            else {
                while (currentTabWidth > availableSpace) {
                    availableSpace += lastVisible.getWidth();
                
                    if (currentTabWidth < availableSpace || !lastVisible.previousSibling()) {
                        break;
                    }
                
                    lastVisible = lastVisible.previousSibling();
                }
                
                index = toolbar.items.indexOf(lastVisible);
            }
            
            // reorganize index
            toolbar.items.insert(index, currentTab);
        }
    },

    /**
     * Updates tab links
     * @param config config for all tab links
     */
    setLinks: function(config) {
        replaceItemsAndChecksum(Ext.getCmp(gw.ext.Util.getTabBarLinksId()), config);
    },

    /**
     * Updates tabs
     * @param config config for all tabs
     */
    setTabs: function(config) {
        replaceItemsAndChecksum(Ext.getCmp(gw.ext.Util.getTabsId()), config);
    },

    /**
     * Updates info bar
     * @param config info bar config
     */
    setInfoBar: function(config) {
        var infoBar = Ext.ComponentManager.get('infoBar');

        if (config.hidden) {
            if (infoBar.isVisible()) {
                infoBar.hide();
            }
            infoBar.checksum = null;
        } 
        else {
            replaceItemsAndChecksum(infoBar, config);
        }
    },

    /**
     * Updates quickJump
     * @param config quick jump config
     */
    setQuickJump: function(config) {
        var quickJump = Ext.getCmp('QuickJump');

        if (config.hidden) {
            if (quickJump.isVisible()) {
                quickJump.hide();
            }
        } 
        else if (!quickJump.isVisible()) {
            quickJump.show();
        }
    }

});

/**
 * Replaces child item at the given index
 * @param comp component
 * @param item the new child item
 * @param index index of the old child item
 */
function replaceItemAt(comp, item, index) {
    if (Ext.isArray(comp.items)) { // comp hasn't been initialized, simply override the config
        comp.items[index] = item;
    } 
    else {
        comp.remove(comp.items.get(index));
        var newComp = comp.insert(index, item);
        if (item.checksum) {
            newComp.checksum = item.checksum;
        }
    }
}

/**
 * Replaces all items of a component, and updates its checksum property
 */
function replaceItemsAndChecksum(comp, config) {
    gw.ext.Util.replaceItems(comp, config);
    comp.checksum = config.checksum;
}

