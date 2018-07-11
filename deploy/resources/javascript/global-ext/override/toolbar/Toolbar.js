/**
 * Do not add leading separator or adjacent toolbar separators
 */
Ext.define('gw.override.Ext.toolbar.Toolbar', {
  override: 'Ext.toolbar.Toolbar',
    initComponent: function() {
        this.on('beforeadd', function(container, comp, index) {
            if (comp instanceof Ext.toolbar.Separator && (
                index === 0 || container.items.get(index - 1) instanceof Ext.toolbar.Separator
            )) {
                comp.destroy();
                return false;
            }
        });

        this.callParent(arguments);
    }
});