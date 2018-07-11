//----------------------------------------------------------------------------------------------------------------------
//   Ext Form Extensions:
//----------------------------------------------------------------------------------------------------------------------
Ext.require('Ext.form.field.Text');

/**
 * A labellable container which contains a Grid panel. Supported properties:
 * <li> fieldLabel
 * <li> labelAlign: top or left
 * <li> hideLabel
 * <li> labelWidth
 * <li> labelCls
 * <li> labelStyle
 * <li> colspan (pass-through)
 */
Ext.define('gw.form.lvInput', {
  extend: 'Ext.container.Container',
  alias: 'widget.glvinput',
  labelWidth: 150,

  layout:{
    type: 'table',
    tableAttrs: {
      style: {width:'100%'}
    }
  },

  initComponent: function() {
    this.layout.columns = (this.labelAlign === 'top' || this.hideLabel) ? 1 : 2;

    if (!this.hideLabel) { // insert a label component as the first child item:
      var theLabel = [{
        xtype: 'label',
        text: this.fieldLabel,
        style: this.labelStyle,
        cls: this.labelCls,
        tdAttrs: {
          width: this.labelWidth,
          style:{'vertical-align' : 'top'}
        }
      }];
      if(this.items) {
        Ext.Array.insert(this.items, 0, theLabel);
      } else {
        this.items = theLabel;
      }
    }

    this.callParent(arguments);
  }

});

Ext.define('gw.override.Ext.form.FieldContainer', {
  override: 'Ext.form.FieldContainer',

  hideEmptyLabel: true,
  labelSeparator: '', // do not add ':' after the label
  labelWidth: 150,

  // adding table layout to avoid flow drop
  layout: {
    type: 'table'
  },

  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype: 'helperitem',  pluginId: 'helper'});
    return this.callParent(arguments);
  },

  initComponent : function() {
//  Todo:  Instead of special case container, find out how template is substituted
//    if (this.item || this.altVal || this.prefix || this.suffix) {
//      this.labelableRenderTpl = gw.ext.Util.getLabelableRenderTpl();
//    }

    if (this.required) {
      this.cls = (this.cls ? this.cls + ' ' : '') + 'g-required';
    }
    this.callParent(arguments);

    if (this.vertical) {
      this.layout.columns = 1;
    }

    this.on('beforeRender', function() {
      if (this.item) {
        this.add({
          xtype:'container',
          style: 'margin-bottom: 2px;',
          html: this.afterContainer
        });
      }
    });
  }
});

Ext.define('gw.override.Ext.form.field.Base', {
  override: 'Ext.form.field.Base',

  hideEmptyLabel: true,
  labelSeparator: '', // do not add ':' after the label
  labelWidth: 150,
  checkChangeBuffer: 0, // no delay

  /**
   * Overrides default property in the constructor, so that it won't override the config from a component instance
   */
  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype: 'helperitem',  pluginId: 'helper'});
    this.invalidText = gw.app.localize('Java.Web.Validation.StepOff.InvalidValue');
    this.callParent(arguments);
  },

  // @SenchaUpgrade mimic the same method of Button. Remove when ExtJs supports tooltip for Text field
  setTooltip: function(tooltip, initial) {
    var me = this;

    if (me.rendered) {
      if (!initial || !tooltip) {
        me.clearTip();
      }
      if (tooltip) {
        if (Ext.quickTipsActive && Ext.isObject(tooltip)) {
          Ext.tip.QuickTipManager.register(Ext.apply({
                 target: me.inputEl.id
               },
               tooltip));
        } else {
          me.inputEl.dom.setAttribute(me.getTipAttr(), tooltip);
        }
      }
    }
    me.tooltip = tooltip;

    return me;
  },

  // @SenchaUpgrade mimic the same method of Button. Remove when ExtJs supports tooltip for Text field
  getTipAttr: function(){
    return 'data-qtip';
  },

  // @SenchaUpgrade mimic the same method of Button. Remove when ExtJs supports tooltip for Text field
  clearTip: function() {
    var me = this,
         inputEl = me.inputEl;

    if (me.rendered) {
      if (Ext.quickTipsActive && Ext.isObject(me.tooltip)) {
        Ext.tip.QuickTipManager.unregister(inputEl);
      } else {
        inputEl.dom.removeAttribute(me.getTipAttr());
      }
    }
  },

  /**
   * Forces change handlers right away, and not to wait till blur
   */
  flushChange:function(){
    var me = this;
    if (me.gChangeOnBlur && me.gchanged) {
      me.gchanged = false;
      me.fireEvent('blurchange', me, me.newValueBlur, me.lastValueBlur);
    }
  },

  initComponent:function () {
    if (this.item || this.altVal || this.prefix || this.suffix) {
      this.labelableRenderTpl = gw.ext.Util.getLabelableRenderTpl();
    }
    
    // @SenchaUpgrade add altVal to label rendering data
    if (this.altVal) {
      this.labelableRenderProps.push('altVal');
      this.labelableRenderProps.push('altId');
      this.altId = this.getInputId() + '_altFooter';
    }
      
    if (this.required) {
      this.cls = (this.cls ? this.cls + ' ' : '') + 'g-required';
    }
    
    //Todo: extjs upgrade4 set name attribute to be the id for testing
    if (this.name == null) {
      this.name = this.id;
    }
    this.callOverridden(arguments);
    
    if (this.invalid) {
      this.markInvalid(this.invalidText ? this.invalidText : ''); // use ExtJs default indicator
    }

    this.on({

      // when an form field is under a toolbar, make the label size by content:
      added: function(comp, container) {
        if (comp.fieldLabel && container instanceof Ext.toolbar.Toolbar) {
          // insert a separate label as sibling to size the label by content:
          var index = container.items.indexOf(comp);
          container.insert(index, {
            xtype: 'label',
            forId: comp.id,
            cls: comp.required ? 'g-required' : undefined,
            html: comp.fieldLabel
          });

          comp.hideLabel = true; // hide the original label
        }
      },

      /**
       * Registers tooltip, if any, but only if the field isn't marked as invalid
       * @SenchaUpgrade Should we ask sencha to support tooltip on form field?
       */
      afterrender: function (field) {
        if (field.tooltip && !field.invalid) {
          field.setTooltip(field.tooltip, /*initial*/true);
        }
        Ext.apply(field, {
          prefixEl:field.el.down('.x-form-prefix'),
          suffixEl:field.el.down('.x-form-suffix'),
          altValEl:field.el.down('.x-form-altVal')
        })
      },
      /**
       * Unregister tooltip, if any
       */
      beforedestroy: function (field) {
        field.clearTip();
      },
      /**
       * Keeps track if this field has focus.
       * If the field has focus, wait till BLUR before fire gw change event.
       */
      focus: gw.app.deferChangeTillBlur,
      /**
       * Determines whether to fire gw change event right away or wait till BLUR time.
       */
      change: function(comp, newValue, oldValue) {
        if (!comp.gChangeOnBlur) { // fire change right away, if the component doesn't have focus:
          comp.fireEvent('blurchange', comp, newValue, oldValue);
        } else { // tracks changed state, but don't fire gw change event yet:
          if (!comp.gchanged) {
            comp.gchanged = true; // value changed
            comp.lastValueBlur = oldValue; // track the last value
          }
          comp.newValueBlur = newValue; // track the new value
        }
      },
      /**
       * Fires gw change event, if the value has changed since FOCUS:
       */
      blur: function(comp) {
        if (comp.gchanged) {
          comp.gchanged = false;
          if (!comp.isEqual(comp.newValueBlur, comp.lastValueBlur)) {
            comp.fireEvent('blurchange', comp, comp.newValueBlur, comp.lastValueBlur);
          }
        }
        comp.gChangeOnBlur = false;
      },

      /**
       * AHK - 5/29/2013
       * We never want the regular tooltip to display at the same time as the error tooltip,
       * since they can overlap weirdly.  So if there's a tooltip, we want to unregister it when
       * the field is marked invalid, and re-register it when the field is valid again.
       * See PL-26189
       * @SenchaUpgrade
       */
      validitychange : function(comp, isValid) {
        if (comp.tooltip) {
          if (isValid) {
            comp.setTooltip(comp.tooltip, /*initial*/true);
          } else {
            comp.clearTip();
          }
        }
      },
      /**
       * Registers gw change handler when the field is changed and lost focus
       */
      blurchange: gw.app.onChange
    });

    if (this.item) { // the helper icon for the input:
      var item = null;

      // unwrap item from array, if needed
      if (Ext.isArray(this.item)) {
        if (this.item.length > 1) { // generate errors if more than one item:
          item = {xtype:'component', autoEl:{tag:'span', html:'More than one child items not supported'}};
        } else if (this.item.length > 0) {
          item = this.item[0];
        }
      } else {
        item = this.item;
      }

      if (item.menu) { // create menu component
        var menu = item.menu;
        delete item.menu;
        item.menu = gw.ext.Util.getOrCreateFieldMenu(item.id, menu);
        item.menuOpener = this;
      }

      delete this.item;
      this.item = item;
    }
  },
  
  getLabelableRenderData: function() {
      
      if (this.altVal) {
          debugger;
      }
      
      return this.callParent(arguments);
  },

  alignErrorIcon: function(){
    this.errorIcon.alignTo(this.getPositionEl(), 'tl-tr', [2, 0]);
  }
});


/**
 * Renders prefix or suffix for the textfield in ExtJs4,  when all required scripts are fully loaded
 * Fix height of the shuttle widget
*/


Ext.define('gw.override.Ext.form.field.Text', {
  override: 'Ext.form.field.Text',

      shrinkWrap : 1, // adjust for width only

      getFieldStyle: function() {
        return (this.suffix || this.prefix ? '':'width:100%;') + (Ext.isObject(this.fieldStyle) ? Ext.DomHelper.generateStyles(this.fieldStyle) : this.fieldStyle ||'');
      },

      initComponent : function() {
        if (this.regex && typeof this.regex == typeof "") {
          this.regex = eval(this.regex);
        }
        if (this.gNumCols) {   // The size of the text field in characters
          this.inputWidth = this.gNumCols * 8;   // Convert to number of pixels
        }
        this.callParent(arguments);
      },

      getSubTplData: function() {
        var me = this,
            type = me.inputType,
            inputId = me.getInputId(),
            cls = [],
            data;

        if (me.cls) {
            cls.push(me.cls);
        }
        if (me.readOnly) {
            cls.push(me.readOnlyCls);
        }

        data = Ext.apply(me.callParent(), {
          id:inputId,
          name:me.name || inputId,
          type:type,
          cls:cls.join(' '),
          prefix:me.prefix,
          suffix:me.suffix
//          item:me.item,
        });

        // prefix and suffix are both htmlEncoded coming from the server.
        return Ext.apply(data, {
          altHtmlValue:(me.altVal)? Ext.String.htmlEncode(me.altVal.value) : undefined
        });
    },

      hasAltValue: function() {
        return this.altVal !== undefined ? true : false;
      },

      getAltText: function() {
        return this.altVal;
      },

      setAltValue: function(text, value) {
        if (this.hasAltValue()) {
          this.altVal = text;
          this.altValEl.update(text);
          this.altValEl.dom.setAttribute('value', value);
        }
      }
    });

// fire onChange event on click, if a checkbox or radio does not belong to a group
Ext.define('gw.override.Ext.form.field.Checkbox', {
  override: 'Ext.form.field.Checkbox',

  initComponent : function() {
    if (this.boxIcon) {
      this.boxLabel = '<img src="' + this.boxIcon + '"/>' + (this.boxLabel || '');
      //delete this.boxIcon;
    }

    this.callOverridden(arguments);

    this.un('focus', gw.app.deferChangeTillBlur); // for checkbox and radio, no need to defer change event till blur

    this.on('added', function(me, container) {
      // if this checkbox belongs to a group, do not handle change event on its own:
      if (container instanceof Ext.form.CheckboxGroup) {
        this.un('blurchange', gw.app.onChange);
      }
    });
  }

});

Ext.define('gw.override.Ext.form.CheckboxGroup', {
  override: 'Ext.form.CheckboxGroup',

  //@SenchaUpgrade ask Sencha to provide convenient syntax for typical checkbox group config (all checkboxes have the same name)
  setValue : function(value) {
    if (value != null && !Ext.isObject(value)) {
      var temp = {};
      temp[this.id] = value;
      value = temp;
    }
    this.callOverridden([value]);
  },
  /**
   * Handles 'change' event at group level:
   */
  initComponent : function() {
    // Override default layout of check/radio group, to workaround ExtJs bug that radios are spread out too much
    // @SenchaUpgrade Still an issue in ExtJs 4.1.1
    this.layout = {type:'table'};
    if (this.columns != null) {
      this.layout.columns = this.columns;
    }

    // TODO: Fix server rendering not to render the group level value because the value is set at individual checkbox level
    if (this.value) {
      this.value = null;
    }

    this.callOverridden(arguments);
    this.on('change', gw.app.onChange);
  }
});

Ext.define('gw.ext.fieldset', {
 extend: 'Ext.form.FieldSet',
 alias: 'widget.gfieldset',

  // fix the value and id for checkbox
  createCheckboxCmp : function() {
    var cb = this.callParent(arguments);
    cb.inputValue = 'true';
    cb.inputId = cb.name;
    return cb;
  },

  // @SenchaUpgrade override ExtJs private method to support confirm dialog (async) and load content from server when expanding
  onCheckChange : function(cmp, checked) {
    var newValue = this.checkboxCmp.getValue();
    var firstTimeExpand = false;
    if (this.checkboxCmp.getValue() && this.items.length == 0) {
      // need to load content from server when expanded for the first time
      firstTimeExpand = true;
    }
    gw.app.handleChange(this, newValue, !newValue, function(options, success, response) {
      // checking postedToServer to determine if separate request should be made.
      // loading content of the inputGroup will be part of poc if postOnChange is specified.
      if (firstTimeExpand &&
          (!options || (options && !options.postedToServer))) {
        // Makes a separate call to just expand the inputGroup if there was no post to server.
        var params = {};
        params[this.checkboxName] = this.checkboxCmp.inputValue;
        gw.app.requestViewRoot(this.id, params)
      }
      // invoke super
      Ext.form.FieldSet.prototype.onCheckChange.call(this, cmp, checked);
      // @SenchaUpgrade workaround an ExtJs4.2 bug that hierarchyState.collapsed is out of date:
      if (this.hierarchyState) {
        this.hierarchyState.invalid = true
      }
    }, firstTimeExpand ? {firstTimeExpand:true} : undefined)
  }
});

Ext.define('gw.override.Ext.form.ComboBox', {
  override: 'Ext.form.ComboBox',

  initComponent: function() {
    this.on({
      select:function(comp){
        // force change handler on select:
        comp.flushChange()
      }
    });

    this.suspendCheckChange++; // @SenchaUpgrade working around an ExtJs bug? with ComboBox that initComponent() calls setValue() and fires change event
    this.callParent(arguments);
    this.suspendCheckChange--;
  },

  /**
   * Work around ext bug where combo may be expanded when nothing is typed in (when alt or ctrl key is on)
   */
  onKeyUp : function(e) {
    if (e.ctrlKey || e.altKey) {
      Ext.form.ComboBox.superclass.onKeyUp.call(this, e)
      return false; // do not invoke combo function
    }
    this.callOverridden(arguments)
  }
})

/**
 * A simple combo box like a HTML select element.
 * Overrides super to
 * <li>Proper encoding for combo box option label. (No HTML is allowed in option label, as of HTML Select)
 * <li>Support option group label
 */
Ext.define('gw.ext.SimpleCombo', {
  extend: 'Ext.form.ComboBox',
  alias: 'widget.simplecombo',
  typeAhead:true,
  forceSelection:true, // do not allow arbitrary user input
  matchFieldWidth:false, // allow the pull-down menu to auto size
  listConfig: {
    tpl: new Ext.XTemplate(
      '<ul class="' + Ext.plainListCls + '"><tpl for=".">',

        // option group label:
        '<tpl if="this.field3 != values.field3">',
        '<tpl exec="this.field3 = values.field3"></tpl>',
        '<h1>{field3}</h1>',
        '</tpl>',

        '<li role="option" class="x-boundlist-item">{field2:htmlEncode}</li>', // fix encoding of special character
      '</tpl></ul>'
     )
  },

  initComponent: function() {
    // create group field:
    if (Ext.isArray(this.store)) {
      this.queryMode = 'local';
      this.valueField = 'field1';
      this.displayField = 'field2';
      this.groupField = 'field3';

      var modelId = 'g-combo-model';
      // define an explicit model for the arry store:
      if (!Ext.ModelManager.getModel(modelId)) {
        Ext.define(modelId, {
          extend: 'Ext.data.Model',
          fields: [this.valueField, this.displayField, this.groupField]
        });
      }

      this.store = Ext.create('Ext.data.ArrayStore', {
        autoDestroy: true,
        model: modelId,
        data: this.store
      });
    }

    this.callParent(arguments);

    // showNoneSelected=false:
    if (this.value == "" && this.store.getCount() > 0 && this.store.findExact(this.valueField, this.value) < 0) {
      this.setValue(this.store.getAt(0).get(this.valueField)); // select the first option
    }
  },

  initEvents: function() {
    var me = this;
    me.callParent();

    // select cell text and open menu, when clicking on a bounded combo field:
    me.mon(me.inputEl, 'click', function() {me.selectText(); me.onTriggerClick()});
  }
});

Ext.define('gw.override.Ext.form.field.Display', {
  override: 'Ext.form.field.Display',

  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype: 'helperitem', pluginId: 'helper'});
    return this.callParent(arguments);
  },

  initComponent : function() {
    // This is mainly for multi-select in read only mode but might be used for other things
    if (Ext.isArray(this.value)) {
      var newValue = [];
      // this is an array so parse the array and set the value to a string for that
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i].preHtml) {
          newValue.push(this.value[i].preHtml);
        }
        if (this.value[i].value) {
          newValue.push(this.value[i].value);
        }

        if (this.value[i].postHtml) {
          newValue.push(this.value[i].postHtml);
        }
      }
      delete this.value;
      this.value = newValue.join('<br>');
    }
    this.callOverridden(arguments);
  }
});

Ext.define('gw.ext.ReadonlySelect', {
    extend : 'Ext.form.field.Display',
    alias : 'widget.readonlyselect',

  initComponent : function() {
    if (this.store) {
      var modelId = 'g-model-ReadonlySelect';
      if (!Ext.ModelManager.getModel(modelId)) {
        Ext.define(modelId, {
          extend: 'Ext.data.Model',
          fields: ['value', 'text']
        });
      }
      this.store = Ext.create('Ext.data.ArrayStore', {
        autoDestroy: true,
        'id': 0,
        model: modelId,
        data : this.store
      });
    }
    this.callParent(arguments);
  },
  setValue : function(value) {
    var copy_arg = Ext.Array.clone(arguments);
    if (value && this.store) {
      var index = this.store.findExact('value', value)
      if (index != -1) {
        value = this.store.getAt(index).get('text');
      }
      copy_arg[0] = value;
    }
    this.callParent(copy_arg);
  },
  getValue : function() {
    var value = this.callParent(arguments);
    if (this.store) {
      var index = this.store.findExact('text', value)
      if (index != -1) {
        value = this.store.getAt(index).get('value');
      }
    }
    return value
  }
});

/**
 * A textbox with auto-complete suggetions
 */
Ext.define('gw.ext.AutoComplete', {
  extend: 'Ext.form.ComboBox',
  alias: 'widget.autocomplete',
  minChars:0,
  typeAhead:true,
  hideTrigger:true,// hide dropdown arrow
  forceSelection: false,
  triggerAction:'query',

  defaultListConfig: {loadingText:''},// hide loading text
  valueField:'text', // default value field

  /**
   * <li>Sets up store with special data loading
   * <li>If "displayField" is specified, don't ever set it into the textbox, since it may contain HTML tags
   */
  initComponent : function() {
    // do not allow displayField to differ from valueField, otherwise the displayField will be set into the textbox
    this.textField = this.displayField;
    this.displayField = this.valueField;
    this.getInnerTpl = function() {
      return '<tpl for="."><div class="x-combo-list-item">{' + (this.textField || this.displayField) + '}</div></tpl>';
    }

    if (!this.modelId) { // default model config
      this.modelId = 'g-model-autocomplete';
      if (!Ext.ModelManager.getModel(this.modelId)) {
        Ext.define(this.modelId, {
          extend: 'Ext.data.Model',
          fields : [this.valueField]
        });
      }
    }

    // set up the store fields before instanciate the store (i.e., before calling super):
    this.store = { model: this.modelId };

    // @SenchaUpgrade workaround ExtJs bug where xtype in the store config is ignored:
    this.store = Ext.create('gw.ModelStore', this.store);

    this.callParent(arguments);

    // sets up model info after the store is instanciated
    this.store.setModelId(this.eventParam || this.id, this.argWidgets);

    /**
     * Do not cache query result, if the query depends on additional args
     * @param evt query event
     */
    this.on('beforequery', function (evt) {
      if (evt.combo.argWidgets) {
        delete evt.combo.lastQuery;
      }
    })
  },

  // override getSubmitValue so it returns empty string instead of null when the field is set empty
  getSubmitValue:function () {
    var submitValue = this.callOverridden(arguments);
    return (submitValue != null) ? submitValue : this.getRawValue();
  }
});


/**
 * Extends auto-complete with ENTER key behavior
 */
Ext.define('gw.ext.quickjump', {
  extend: 'gw.ext.AutoComplete',
  alias: 'widget.quickjump',
  shortcut:'/',
  typeAhead: true,
  typeAheadDelay: 10,
  queryDelay: 10,

  initComponent:function () {
    this.emptyText = gw.app.localize('Web.QuickJump') + ' (Alt+/)'
    this.callParent(arguments);
    /**
     * call server when the ENTER key is pressed
     */
    this.on('specialkey', function (field, e) {
      if (e.getKey() == e.ENTER) {
        // post to server
        gw.app.handleAction(e, field.getEl().dom,
                {postCallback:function () {
                  field.clearValue()
                }, postCallbackScope:field})
      }
    });
  }
});

/** fix encoding and submitting multiple values to server */
Ext.define('gw.override.Ext.ux.form.MultiSelect', {
  override: 'Ext.ux.form.MultiSelect',

  // set the delimiter to null so getSubmitValue will return as an array instead of string
  delimiter: null,
  layout:'autocontainer',

  constructor: function() {
    this.plugins = this.plugins||[];
    this.plugins.push({ptype: 'helperitem', pluginId: 'helper'});
    return this.callParent(arguments);
  },

  initComponent:function () {
    this.value = gw.ext.Util.decodeValue(this.value);
    this.callParent(arguments);
    // need to set the name otherwise the form value will not be recorded
    if (this.name == null) {
      this.name = this.id;
    }
    var lWidth = (this.labelAlign == 'top') ? 0 : this.labelWidth;
    this.width = (this.inputWidth) ? lWidth + this.inputWidth : lWidth + 194;
    if (this.boundList) {
        this.boundList.maxHeight = 120;
    }
    this.on('change', gw.app.onChange);
    // workaround the sencha bug for not changing the css class when the field is marked as invalid.
    // (http://www.sencha.com/forum/showthread.php?233404)
    this.checkForInvalid(this.invalid);
  },

  listeners: {
    validitychange: function(mselect, valid) {
      var  invalid = (valid !== undefined) ? !valid : false;
      this.checkForInvalid(invalid);
    }
  },

  checkForInvalid: function (isInvalid) {
    if (isInvalid) {
      this.addCls('gw-multiselect-invalid');
    } else {
      this.removeCls('gw-multiselect-invalid');
    }
  }
});

/** Customize shuttle widget, and fix its ecoding and from submit behavior: */
Ext.define('gw.override.Ext.ux.form.ItemSelector', {
  override: 'Ext.ux.form.ItemSelector',

  delimiter: null, // set the delimiter to null so getSubmitValue will return as an array instead of string
  buttons: ['add', 'remove'],

  initComponent: function() {
    this.value = gw.ext.Util.decodeValue(this.value);
    this.buttonsText.add = gw.app.localize("ExtJS.Ux.Form.ItemSelector.Add");
    //this.buttonsText.remove = gw.app.localize("ExtJS.Ux.Form.ItemSelector.Remove");
    this.suspendCheckChange++;  //suspend change event during bindStore in initComp so checkForInvalid would work
    this.callParent(arguments);
    this.suspendCheckChange--;
    // TODO: this is for the test, apparently valueField is only set at ItemSelector but not fromField and toField.
    // But fromField.valueField and toField.valueField are used in TestExt.js
    this.fromField.valueField = this.valueField;
    this.toField.valueField = this.valueField;
    var lWidth = (this.labelAlign == 'top') ? 0 : this.labelWidth;
    this.width = (this.inputWidth) ? lWidth + this.inputWidth : lWidth + 420;
    this.fromField.boundList.height = this.toField.boundList.height = 120;
  }
});

/**
 * Provides a textbox with a search icon
 */
Ext.define('gw.searcher', {
  extend: 'Ext.form.field.Trigger',
  alias: 'widget.searcher',
  triggerCls:'x-form-search-trigger', // default to search icon

  initComponent:function () {
    // create menu:
    if (this.gClearEnabled) {
      var clearId = this.id + '_CLEAR';
      var clearItem = {icon:"images/app/calendar_close.png", compId:this.id, handler:function () {
        this.setValue('')
      }, xtype:"button", id:clearId};

      if (!this.item) {
        this.item = [clearItem]
      } else if (!this.item.menu) { // if there are menuItems, clear button will be combined with the menuItem
        // only one item
        var items = [];
        var item = null;
        items.push(clearItem);
        items.push(this.item[0]);
        item = [{
            icon:"images/app/drop_button.png",
            width: 16,
            height: 16,
            xtype:"button",
            id:this.getId() + '_MENU',
            menu:{items:items}
          }];
        delete this.item;
        this.item = item;
      }
      // TODO : make it work with multiple menuItems
    }
    this.callOverridden(arguments);
  },

  onRender : function(){
    this.callParent(arguments);
    this.triggerWrap.down('.x-form-trigger', true).id = this.triggerId // for testing purpose
  },

  onTriggerClick : function() {
    this.callParent(arguments);
    gw.app.handleAction(null, this.triggerId,
        {postCallback:function() {
          // searcher may have been removed, so dom won't be available.
          if (this.el && this.el.dom) {
            this.setValue('')
          }
        }, postCallbackScope:this})
  }
});

Ext.define('gw.ext.ChoiceRadio', {
  extend: 'Ext.form.field.Radio',
  alias: 'widget.choiceradio',

  initComponent:function(){
    this.callParent(arguments);//initComponent on super
    this.un('blurchange', gw.app.onChange);
    this.on('blurchange', function(radio, newValue, oldValue) {
      var checkedItemCount = 0;
      var checkedRadioItem;
      //TODO : @SenchaUpgrade radio.getManager() is private function in ExtJS4, be careful when upgrade since ExtJS could change internal function.
      // cannot find alternative function in 4.1.1
      radio.getManager().getByName(radio.name, radio.getFormId()).each(function(item){
        if(item.checked) {
          checkedItemCount++;
          checkedRadioItem = item;
        }
      })
      if (checkedItemCount == 1) {
        gw.app.handleChange(checkedRadioItem, true, false)
      }
    });
  }
});

Ext.define('gw.ext.Choice', {
    extend: 'Ext.panel.Panel',
    requires: 'Ext.layout.container.Column',
    alias: 'widget.choice',
    layout:'column',
    border : false,
    defaults: {
      bodyStyle:'padding:5px'
    },
    initComponent: function(){
      if (this.items) {
        var inputs = {
          layout : 'anchor',
          border : false,
          frame : false,
          items: this.items
        };
        if (this.initialConfig.id) {
          var id = this.initialConfig.id
          this.id = id + '_Panel'
          this.items = [{
            border : false,
            items: [{
              xtype: 'choiceradio',
              name : this.name,
              id : id,
              checked : this.checked,
              eventParam : id,
              inputValue : id,
              postOnChange : true
            }]
          },
          inputs
          ]
        } else {
        // For read-only mode, we don't render the radio buttons.
        this.items = [inputs]
      }
    } else {
      this.hidden = true; // do not show choice that has no content
    }
      this.callParent(arguments);//initComponent on super
  }
});

/**
 * A panel for encapsulating a template widget.
 */
Ext.define('gw.templatevaluepanel', {
  extend: 'Ext.Panel',
  alias: 'widget.templatevaluepanel',

  layout : 'anchor',
  /**
   * Handle line breaks in template panel.
   */
  initComponent : function() {
    // Look for '-' as the line break indicator.
    // Items between line breaks will be rendered as a composite field.
    var allItems = this.items;
    this.items = [];
    var curItems = [];
    var tempItems = [];
    Ext.each(allItems, function(it, index) {
      if (it == '-') {
       if (curItems.length == 1) {
         tempItems.push(curItems[0]);
       } else if (curItems.length > 1) {
         tempItems.push ( { xtype: 'fieldcontainer', items : curItems});
       }
       curItems = [];
      } else {
        curItems.push(it) ;
      }
    }, this);

    if (curItems.length == 1) {
      tempItems.push(curItems[0]);
    } else if (curItems.length > 1) {
      tempItems.push ( { xtype: 'fieldcontainer', items : curItems});
    }

    // Propagate label information for test purposes.
    var label = this.fieldLabel;
    var fieldLabel = this.fieldLabel;
    var lStyle = this.labelStyle;
    var needsWrapper = false;
    Ext.apply(this, {fieldLabel: fieldLabel, 'defaults': {labelStyle: lStyle, label: label}});
    Ext.each(tempItems, function (item) {
      if (item.xtype) {
        Ext.apply(item, {fieldLabel: fieldLabel, hideEmptyLabel: false})
        if (item.xtype == 'fieldcontainer') {
          Ext.apply(item, {layout: 'hbox', combineErrors: true, defaults: {labelStyle: lStyle, label: label}});
        }
        fieldLabel = "";  // only apply label to the first item
      } else {
        needsWrapper = true;
      }
    });

    // AHK - 5/31/2013 - We need to wrap everything in a fieldcontainer or we could sometimes
    // (depending on the type of child item) end up with no labels showing up
    // See PL-26317
    if (needsWrapper) {
      var containerWrapper = { xtype: 'fieldcontainer', items : tempItems, fieldLabel : this.fieldLabel, vertical : true, labelStyle : this.labelStyle };
      this.items.push(containerWrapper);
    } else {
      this.items = tempItems;
    }

    this.callParent(arguments);//initComponent on super
  }
});

(function() {
  /**
   * Deletes old value from server, and enables editing
   * @param item menu item
   */
  function deletePrivacyValue(item) {
    var comp = Ext.ComponentManager.get(item.compId);
    comp.setRawValue('');
    comp.setReadOnly(false);
    comp.submitValue = true;
    comp.item.el.remove();
    comp.focus();
  }

   /**
   * Privacy widget which never reveals existing value from server
   */
  Ext.define('gw.ext.privacy', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.privacy',

    initComponent : function() {
      if (this.value) { // non-empty value from server:
        this.setReadOnly(true); // disable editing
        this.submitValue = false; // disable submitting to server
        // create menu:
        var menuId = this.id + '_MENU';
        var items = [];
        Ext.each(gw.ext.Util.getPrivacyFieldMenuItems(), function(itemText, index) {
          items.push({text:itemText, handler:deletePrivacyValue, compId:this.id, id:index == 0 ? menuId + ':edit' : undefined})
        }, this);
        this.item = [{
          icon:"images/app/drop_button.png",
          width: 16,
          height: 16,
          xtype:"button",
          id:menuId,
          menu: {
            items:items
          }}
        ];
      }

      this.callParent(arguments);
    }
  });

  Ext.define('gw.override.Ext.form.field.Date', {
    override: 'Ext.form.field.Date',

    // check the submit value first to prevent formatting javascript error. If it's not valid, still
    // send back the value to let server side handle the validation.
    // @SenchaUpgrade override private method. TODO: Handle invalid client side value in general.
    getSubmitValue: function() {
      if (!this.isValid()) {
        return this.getValue() || this.getRawValue();
      }
      return this.callParent(arguments);
    }
  });

  /**
   * A composite field for entering Japanese Imperial Calendar data.
   */
  Ext.define('gw.ext.JapaneseImperialDate', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.gjicdate',
    layout: {
      type: 'table'
    },
    defaults: {
      typeAhead:true,
      xtype: 'combo', // most child elements are bounded combo box
      submitValue: false // most child elements don't submit value directly
    },

    items: [{ // ERA element
      inputWidth: 70,
      store: [''],
      forceSelection: true
    }, { // YEAR IN ERA element
      store: [''],
      forceSelection: true,
      emptyText: 'yy',
      inputWidth: 50
    }, { // YEAR symbol
      xtype: 'component',
      autoEl: {
        tag: 'span'
      }
    }, { // MONTH IN YEAR element
      store: ['','01','02','03','04','05','06','07','08','09','10','11','12'], // hard code months here
      forceSelection: true,
      emptyText: 'MM',
      inputWidth: 50
    }, { // MONTH symbol
      xtype: 'component',
      autoEl: {
        tag: 'span'
      }
    }, { // 3: day in month
      inputWidth: 35,
      maskRe: /\d/,
      enforceMaxLength: true,
      emptyText: 'dd',
      maxLength: 2,
      validator: function() {
        return this.ownerCt.validateDay.apply(this.ownerCt, arguments);
      },
      xtype: 'textfield'
    }, { // DAY symbol
      xtype: 'component',
      autoEl: {
        tag: 'span'
      }
    }, { // 4: time
      forceSelection: false,
      inputWidth: 90,
      xtype: 'timefield'
    }, { // 5: a hidden input to submit value to the server
      submitValue: true,
      getSubmitValue: function() {
        return this.ownerCt.getValue();
      },
      getName: function() {
        return this.ownerCt.id;
      },
      tdAttrs: {style:{width:'0px'}}, // do not consume any space
      xtype: 'hidden'
    }],

    validateDay : function(day) {
      if (day) {
        if (Number(day) < 1 || Number(day) > 31) {
          return this.invalidText; // day > 31 is obviously invalid
        }
      }

      // TODO: validation based on current month context  (e.g. 29th of Feb on non-leap year)

      return true;// valid
    },

    /**
     * Updated range of years, when the era changes
     */
    updateYearsInEra: function() {
      var era = this.eraElem.getValue();
      var yearElem = this.yearElem;
      var yearArray = gw.app.getJICYearsInEra(era);

      if (!Ext.Array.contains(yearArray, yearElem.getValue())) { // clear out of range year value:
        yearElem.suspendEvents(false);
        yearElem.setValue('');
        yearElem.resumeEvents();
      }

      // update range
      yearElem.store.loadData(yearArray.map(function(v) {
        var rec = {};
        rec[yearElem.valueField] = v;
        return rec
      }));
    },

    /**
     * @return {Boolean} true, if all fields are empty, or all fields are filled (i.e. the data is complete)
     */
    isValid: function() {
      var hasValue = null;
      var valid = true;
      Ext.Array.each(this.inputItems, function (item) {
             if (item == this.timeElem && !this.timeFormat) {
               return;
             }

             if (!item.isValid()) {
               valid = false;
               return false;
             }

             if (hasValue == null) {
               hasValue = !!item.getSubmitValue();
             } else {
               if (hasValue != !!item.getSubmitValue()) {
                 valid = false;
                 return false;  // abort iteration
               }
             }
           }, this);

      return valid;
    },

    /**
     * Invokes change event handler, when value changes, ONLY if the value is complete
     */
    onChange : function (comp, newValue, oldValue) {
      if (!comp.isValid() ||
           comp.forceSelection && !comp.findRecordByDisplay(newValue)) { // ignore out-of-range value, it'll be reverted soon. @SenchaUpgrade Is it a bug that ExtJs fires change event in this case?
        return;
      }

      if (comp == this.eraElem) { // update year range after era changes
        this.updateYearsInEra();
      }

      if (this.isValid()) {
        gw.app.onChange(this, this.getValue())
      }
    },

    /**
     * @return JIC date value as string; or '', when the value is incomplete
     */
    getValue: function() {
      if (!this.isValid()) {
        return null; // value incomplete, do not submit
      }

      // date value:
      var hasValue = false;
      var args = [gw.app.getJICInputDateFormatTokenized()]; // The tokenized string to be formatted
      Ext.Array.each(this.inputItems, function(item) {
        if (item != this.timeElem) {
          var value = item.getSubmitValue();
          if (!hasValue && value) {
            hasValue = true;
          }
          args.push(value);
        }
      }, this);
      if (!hasValue) {
        return '';
      }
      var value = Ext.String.format.apply(this, args);

      // time value:
      if (this.timeFormat) {
        value = [value, this.timeElem.getSubmitValue()].join(' ');
      }
      return value;
    },

    /**
     * Sets value to the components.
     * @param value JIC data string
     */
    setValue : function(value) {
      var matches = value.match(gw.app.getJICInputPatternRegex());
      // Result array format: 0:full-value, 1:era, 2:year, 3:month: 4:day, 5:<ignore>, 6:(optional)time
      if (!matches) {
        this.setJICValue('', '', '', '', '');
      } else {
        this.setJICValue(matches[1], matches[2], matches[3], matches[4], matches[6]);
      }
    },

    /**
     * Sets JIC date value onto the elements
     * @param era '' or a valid era
     * @param yearInEra '' or a valid year in the given era
     * @param monthInYear '' or a valid month in year
     * @param dayInMonth '' or a valid day in year
     * @param time '' or a valid time string
     */
    setJICValue: function(era, yearInEra, monthInYear, dayInMonth, time) {
      var i = 0, args = arguments;
      Ext.Array.each(this.inputItems, function(item) {
        if (item == this.timeElem && !this.timeFormat) {
          return; // no time element
        }
        item.setValue(args[i]);
        if (item == this.eraElem) {
          // update year range in era:
          this.updateYearsInEra(); // refresh range of years
        }

        i++;
      }, this);
    },

    initComponent: function() {
      var i;

      //
      // Updates child item config before the children are instantiated:
      //
      if (this.timeFormat) {
        // override format before store is instantiated:
        this.items[7].format = this.timeFormat;
      }

      this.callParent(arguments);

      //
      // Updates instantiated child item instances:
      //
      // insert year symbol:
      this.items.get(2).autoEl.html = gw.app.getJICYearSymbol();
      // insert month symbol:
      this.items.get(4).autoEl.html = gw.app.getJICMonthSymbol();
      // insert day symbol:
      this.items.get(6).autoEl.html = gw.app.getJICDaySymbol();

      this.inputItems = [
        this.eraElem = this.items.get(0),
        this.yearElem = this.items.get(1),
        this.monthElem = this.items.get(3),
        this.dayElem = this.items.get(5),
        this.timeElem = this.items.get(7)
      ];

      this.timeElem.hidden = !this.timeFormat;  // show time element only when there's a time part
      this.timeElem.emptyText = this.emptyText;

      // set up range or eras:
      this.eraElem.store.loadData(gw.app.getJICEras().map(function(v) {
        var record = {};
        record[this.valueField] = v;
        return record;
      }, this.eraElem));

      // update initial value from the server without firing change event:
      this.setValue(this.value);

      Ext.Array.each(this.inputItems, function(item) {
        // set up change listener on visible chile elements, AFTER setting up initial values:
        item.on({
          blurchange:this.onChange,
          scope:this
        });

        item.invalidText = this.invalidText;
        item.tooltip = item.emptyText;

        // update "invalid" state from the server
        if (this.invalid) {
          item.markInvalid(item.invalidText);
        }
      }, this);

    }
  });

})();

