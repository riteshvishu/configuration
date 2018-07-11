/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
Ext.define('Override.form.CheckboxGroup', {
  override: 'Ext.form.CheckboxGroup',

  invalidCls: Ext.baseCSSPrefix + 'form-invalid',

  activeErrorsTpl: [
    '<tpl if="errors && errors.length">',
    '<ul class="{listCls}"><tpl for="errors"><li role="alert">{.}</li></tpl></ul>',
    '</tpl>'
  ],

  initComponent: function() {
      var me = this;
      me.invalidText = me.blankText = gw.app.localize('Java.Web.Validation.StepOff.InvalidValue'),
      me.allowBlank = !me.required;

      if (me.invalid) {
        this.addCls(me.invalidCls);
        this.markInvalid(me.invalidText);
      } else {
        this.removeCls(me.invalidCls);
        this.clearInvalid();
      }

      me.callParent();
      me.initField();
  }
});

