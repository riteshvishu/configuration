Ext.define("Override.form.Labelable", {
    override: 'Ext.form.Labelable',
    requires: ['Ext.XTemplate'],

    /*
     * make label selectable
     */
    getLabelCls: function() {
      var labelCls = this.labelCls + ' ', // + Ext.dom.Element.unselectableCls,
        labelClsExtra = this.labelClsExtra;

      return labelClsExtra ? labelCls + ' ' + labelClsExtra : labelCls;
    }

});
