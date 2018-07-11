/**
 * By default splitter has 5px. Make it wider with 9px
 */
Ext.define('Override.resizer.Splitter',{
    override: 'Ext.resizer.Splitter',
    
    beforeRender: function() {
        this.callParent(arguments);
        this[this.vertical ? 'width' : 'height'] = 9;
    }
});