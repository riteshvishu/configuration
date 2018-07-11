/**
 * When a combobox is opened, the typeAhead function is scheduled to execute with a delay.
 * If you open a combobox inside a grid editor and quickly switch to another row, the previous will be destroyed, leaving
 * the typeAhead task still running. This produces an error, since the typeAhead function will run on a 
 * destroy combo.
 * 
 * To fix this, let's make sure the task is canceled when we destroy the grid.
 *
 * Sencha 06/21/13 
 * Submitted to the framework EXTJSIV-10337
 */
Ext.define('Override.form.field.ComboBox',{
    override: 'Ext.form.field.ComboBox',
    onDestroy: function() {
        var me = this;
        
        if (me.typeAheadTask) {
            me.typeAheadTask.cancel();
        }
        
        me.callParent(arguments);
    }
})