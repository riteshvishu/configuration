/*
 * DateTime field extension
 * Original code from Sencha community forum:
 * http://www.sencha.com/forum/showthread.php?137242-Ext.ux.DateTimeField-DateTimePicker-for-ext4-also-DateTimeMenu-TimePickerField
 *
 * Note: These classes have been customized. In particular, no need to override the height style and initializing the
 * spinner field did not work in the original.
 *  update Ext - 4.1 2012/04/27
 */

Ext.ns('Ext.ux.form');

/**
 * Time picker field. Hour/minute spinner fields for selecting hour/minutes.
 * 
 * TODO tpollinger PL-17741: We need to format the time picker by AM/PM based on user's local.
 */
Ext.define('Ext.ux.form.TimePickerField', {
  extend:'Ext.form.field.Base',
  alias:'widget.utimepicker', // prefix ux class with "u" to avoid conflict with base ExtJs class
  alternateClassName:'Ext.form.field.TimePickerField',
  requires:['Ext.form.field.Number'],

  // hidden basefield's input
  inputType:'hidden',

  style:'padding:4px 0 0 0;margin-bottom:0px',

  /**
   * @cfg {String} value
   * initValue, format: 'H:i:s'
   */
  value:null,

  /**
   * @cfg {Object} spinnerCfg
   *  number input config
   */
  spinnerCfg:{
    width:40
  },

  /** Override. */
  initComponent:function () {
    var me = this;
    // value already passed in from DateTimePicker
    //me.value = me.value || Ext.Date.format(new Date(), 'H:i:s');

    me.callParent(arguments);// called setValue

    me.spinners = [];
    var cfg = Ext.apply({}, me.spinnerCfg, {
      readOnly:me.readOnly,
      disabled:me.disabled,
      style:'float: left',
      listeners:{
        change:{
          fn:me.onSpinnerChange,
          scope:me
        }
      }
    });

    me.hoursSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
      minValue:0,
      maxValue:23
    }));
    me.minutesSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
      minValue:0,
      maxValue:59
    }));
    // TODO use timeformat  maybe second field is not always need.
    me.secondsSpinner = Ext.create('Ext.form.field.Number', Ext.apply({}, cfg, {
      minValue:0,
      maxValue:59
    }));

    me.spinners.push(me.hoursSpinner, me.minutesSpinner, me.secondsSpinner);

  },
  /**
   * @private
   * Override.
   */
  onRender:function () {
    var me = this, spinnerWrapDom, spinnerWrap;
    me.callParent(arguments);

    // render to original BaseField input td
    // spinnerWrap = Ext.get(Ext.DomQuery.selectNode('div', this.el.dom)); // 4.0.2
    spinnerWrapDom = Ext.dom.Query.select('td', this.getEl().dom)[1]; // 4.0 ->4.1 div->td
    spinnerWrap = Ext.get(spinnerWrapDom);
    me.callSpinnersFunction('render', spinnerWrap);

    Ext.core.DomHelper.append(spinnerWrap, {
      tag:'div',
      cls:'x-form-clear-left'
    });

    this.setRawValue(this.value);
  },

  _valueSplit:function (v) {
    if (Ext.isDate(v)) {
      v = Ext.Date.format(v, 'H:i:s');
    }
    var split = v.split(':');
    return {
      h:split.length > 0 ? split[0] : 0,
      m:split.length > 1 ? split[1] : 0,
      s:split.length > 2 ? split[2] : 0
    };
  },
  onSpinnerChange:function () {
    if (!this.rendered) {
      return;
    }
    this.fireEvent('change', this, this.getValue(), this.getRawValue());
  },
  // , call each spinner's function
  callSpinnersFunction:function (funName, args) {
    for (var i = 0; i < this.spinners.length; i++) {
      this.spinners[i][funName](args);
    }
  },
  // @private get time as object,
  getRawValue:function () {
    if (!this.rendered) {
      var date = this.value || new Date();
      return this._valueSplit(date);
    } else {
      return {
        h:this.hoursSpinner.getValue(),
        m:this.minutesSpinner.getValue(),
        s:this.secondsSpinner.getValue()
      };
    }
  },

  // private
  setRawValue:function (value) {
    value = this._valueSplit(value);
    if (this.hoursSpinner) {
      this.hoursSpinner.setValue(value.h);
      this.minutesSpinner.setValue(value.m);
      this.secondsSpinner.setValue(value.s);
    }
  },
  // overwrite
  getValue:function () {
    var v = this.getRawValue();
    return Ext.String.leftPad(v.h, 2, '0') + ':' + Ext.String.leftPad(v.m, 2, '0') + ':'
            + Ext.String.leftPad(v.s, 2, '0');
  },
  // overwrite
  setValue:function (value) {
    this.value = Ext.isDate(value) ? Ext.Date.format(value, 'H:i:s') : value;
    if (!this.rendered) {
      return;
    }
    this.setRawValue(this.value);
    this.validate();
  },
  // overwrite
  disable:function () {
    this.callParent(arguments);
    this.callSpinnersFunction('disable', arguments);
  },
  // overwrite
  enable:function () {
    this.callParent(arguments);
    this.callSpinnersFunction('enable', arguments);
  },
  // overwrite
  setReadOnly:function () {
    this.callParent(arguments);
    this.callSpinnersFunction('setReadOnly', arguments);
  },
  // overwrite
  clearInvalid:function () {
    this.callParent(arguments);
    this.callSpinnersFunction('clearInvalid', arguments);
  },
  // overwrite
  isValid:function (preventMark) {
    return this.hoursSpinner.isValid(preventMark) && this.minutesSpinner.isValid(preventMark)
            && this.secondsSpinner.isValid(preventMark);
  },
  // overwrite
  validate:function () {
    return this.hoursSpinner.validate() && this.minutesSpinner.validate() && this.secondsSpinner.validate();
  }
});


/**
 * Date time picker.
 *
 * Extends the date picker to add a time picker to the date picker.
 */
Ext.define('Ext.ux.DateTimePicker', {
  extend:'Ext.picker.Date',
  alias:'widget.udatetimepicker',  // prefix ux class with "u" to avoid conflict with base ExtJs class
  requires:['Ext.ux.form.TimePickerField'],

  initComponent:function () {

    this.todayText = gw.app.localize("Button.Now");
    this.timeLabel = gw.app.localize("ExtJS.Picker.Date.TimeLabel");
    // keep time part for value
    var value = this.value || new Date();
    this.callParent();
    this.value = value;


  },
  onRender:function (container, position) {
    if (!this.timefield) {
      this.timefield = Ext.create('Ext.ux.form.TimePickerField', {
        fieldLabel:this.timeLabel,
        labelWidth:40,
        value:Ext.Date.format(this.value, 'H:i:s')  // 'H:i:s' is the format used by time picker for split
      });
    }
    this.timefield.ownerCt = this;
    this.timefield.on('change', this.timeChange, this);
    this.callParent(arguments);

    var table = Ext.get(Ext.DomQuery.selectNode('table', this.el.dom));
    var tfEl = Ext.core.DomHelper.insertAfter(table, {
      tag:'div',
      style:'border:0px;',
      children:[
        {
          tag:'div',
          cls:'x-datepicker-footer ux-timefield'
        }
      ]
    }, true);
    this.timefield.render(this.el.child('div div.ux-timefield'));

    var p = this.getEl().parent('div.x-layer');
    if (p) {
      p.setStyle("height", p.getHeight() + 31);
    }
  },
  // listener , timefield change
  timeChange:function (tf, time, rawtime) {
    // if(!this.todayKeyListener) { // before render
    this.value = this.fillDateTime(this.value);
    // } else {
    // this.setValue(this.value);
    // }
  },
  // @private
  fillDateTime:function (value) {
    if (this.timefield) {
      var rawtime = this.timefield.getRawValue();
      value.setHours(rawtime.h);
      value.setMinutes(rawtime.m);
      value.setSeconds(rawtime.s);
    }
    return value;
  },
  // @private
  changeTimeFiledValue:function (value) {
    this.timefield.un('change', this.timeChange, this);
    this.timefield.setValue(this.value);
    this.timefield.on('change', this.timeChange, this);
  },

  // override  -- note this is modified and is different from ux 4.1.1 version
  getValue:function () {
    var value = this.callParent();

    // value should have the time field set. Setting it in case the super class might have cleared it out
    // This is only set if the caller is not the super class date picker.
    if (this.timefield && !this.isDatePickerCalling(this.getValue)) {
      var rawValue = this.timefield.getRawValue();
      value.setHours(rawValue.h);
      value.setMinutes(rawValue.m);
    }

    return value;
  },

  // override  -- note this is modified and is different from ux 4.1.1 version
  setValue:function (value) {
    this.callParent(arguments);

    if (this.timefield) {
      // If the caller is not the super class date picker, save the time value from the passed in value.
      if (!this.isDatePickerCalling(this.setValue)) {
        this.timefield.hoursSpinner.setValue(value.getHours());
        this.timefield.minutesSpinner.setValue(value.getMinutes());
        this.timefield.secondsSpinner.setValue(value.getSeconds());
        //this.timefield.setRawValue({h: value.getHours(), m: value.getMinutes()});
      }
      // In any case, set the current time from the time picker field for value.
      var rawValue = this.timefield.getRawValue();
      this.value.setHours(rawValue.h);
      this.value.setMinutes(rawValue.m);
      this.value.setSeconds(rawValue.s);
    }
  },

  isDatePickerCalling:function (boundFunction) {
    // TODO Hack: getValue / setValue callers can either be the date picker, where the time field is erased.
    // Other callers are date time picker callers where the time field is expected.
    // Internally, the value stores the date and the time. The super class date picker expects the value
    // field to have the time cleared.
    var callingClassName = Ext.ClassManager.getName(boundFunction.caller.$owner);
    return (callingClassName == "Ext.picker.Date");
  },

  // overwrite : fill time before setValue
  handleDateClick:function (e, t) {
    var me = this,
            handler = me.handler;

    e.stopEvent();
    if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
      me.doCancelFocus = me.focusOnSelect === false;
      me.setValue(this.fillDateTime(new Date(t.dateValue))); // overwrite: fill time before setValue
      delete me.doCancelFocus;
      me.fireEvent('select', me, me.value);
      if (handler) {
        handler.call(me.scope || me, me, me.value);
      }
      me.onSelect();
    }
  },

  // overwrite : fill time before setValue
  selectToday:function () {
    var me = this,
            btn = me.todayBtn,
            handler = me.handler;

    if (btn && !btn.disabled) {
      // me.setValue(Ext.Date.clearTime(new Date())); //src
      me.setValue(new Date());// overwrite: fill time before setValue
      me.fireEvent('select', me, me.value);
      if (handler) {
        handler.call(me.scope || me, me, me.value);
      }
      me.onSelect();
    }
    return me;
  }
});


/**
 * Date time field
 *
 * The date time field shows a formatted date and time.
 *
 * TODO tpollinger PL-17741 needs localized time formats.
 */
Ext.define('Ext.ux.form.DateTimeField', {
  extend:'Ext.form.field.Date',
  alias:'widget.datetimefield', // Referenced by server side
  requires:['Ext.ux.DateTimePicker'],

  dateFormat: 'd-m-Y',  // default datetime format
  timeFormat: 'H:i',

  initComponent:function () {
    this.format = this.dateFormat + ' ' + this.timeFormat;
    this.callParent();
  },

  getValue:function () {
    return this.parseDate(Ext.form.field.Date.superclass.getValue.call(this)) || '';
  },

  // overwrite
  createPicker:function () {
    var me = this,
        format = Ext.String.format;

    return Ext.create('Ext.ux.DateTimePicker', {
      ownerCt:me.ownerCt,
      renderTo:document.body,
      floating:true,
      hidden:true,
      focusOnShow:true,
      minDate:me.minValue,
      maxDate:me.maxValue,
      disabledDatesRE:me.disabledDatesRE,
      disabledDatesText:me.disabledDatesText,
      disabledDays:me.disabledDays,
      disabledDaysText:me.disabledDaysText,
      format:me.format,
      timeFormat: this.timeFormat,
      dateFormat: this.dateFormat,
      showToday:me.showToday,
      startDay:me.startDay,
      minText:format(me.minText, me.formatDate(me.minValue)),
      maxText:format(me.maxText, me.formatDate(me.maxValue)),
      listeners:{
        scope:me,
        select:me.onSelect
      },
      keyNavConfig:{
        esc:function () {
          me.collapse();
        }
      }
    });
  }
});
