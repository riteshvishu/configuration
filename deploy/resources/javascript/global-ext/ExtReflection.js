/**
 * Reflection
 */

gw.reflection = function() {
  var _reflectPath = []; // keep track of reflection path to detect circular reflection
  var _reflectors = null;  // list of reflectors
  var _rangeReflectorToTriggersMap = null; // map of range reflector to triggers
  var _lvIds = [];

  var _trackElementsToRedo = null;
  var _pendingReqs = null;
  var NO_CHANGE = '<NOCHANGE>'; // a special string to indicate value not changed
  var TRIGGER_INDEX_PARAM = 'TRIGGER_INDEX'; // name of trigger index param


  function _processOneResponse(newValues, resp) {
    if (resp.cmd) {
      return !gw.app.processCommand(resp);
    }
    newValues[resp.index] = resp.value;
    return true;
  }

  function _request(reqs, newValues, fcnCallback) {
    gw.app.requestViewRoots(reqs,
      function(options, success, response) {
        var data = Ext.decode(response.responseText);
        if (newValues) {
          if (reqs.length == 1) { // single request
            _processOneResponse(newValues, data[0])
          } else { // multiple requests
            Ext.each(data, function(d) {
              return _processOneResponse(newValues, Ext.decode(d)[0])
            })
          }
        }
        if (fcnCallback) {
          fcnCallback()
        }
      })
  }

  function _updateAllReflectors(aspects, newValues) {
    var aspect, pocReflectors = [];
    for (var i = 0; i < aspects.length; i++) {
      aspect = aspects[i];
      if (aspect.maybePostToServer()) {
        pocReflectors.push([aspect, newValues[i]]); // postpone poc request to the end
      } else {
        aspect.updateReflector(newValues[i]);
      }
    }

    Ext.Array.each(pocReflectors, function(item) {
      item[0].updateReflector(item[1]);
    });
  }

  function _logReflection(comp, aspects, cancelledReflectors) {
    var logMsg = '<b>Start reflecting </b>: ' + gw.reflection.getIdForReflection(comp);
    if (_reflectPath.length > 1) {
      logMsg += '<br>(path): ' + _reflectPath;
    }
    if (aspects.length > 0) {
      logMsg += '<br>(Reflectors): ';
      for (var i = 0; i < aspects.length; i++) {
        if (i > 0) {
          logMsg += ' | '
        }
        logMsg += aspects[i].reflector.id + ' [' + aspects[i].name + ']';
      }
    }
    if (cancelledReflectors.length > 0) {
      logMsg += '<br>(Circular reflectors cancelled): ' + cancelledReflectors;
    }
    gw.Debug.log(logMsg);
  }

  /**
   * Updates alt footer value from server
   */
  function _updateAltValue(comp) {
    if (comp instanceof Ext.form.Field) {
      if (comp.hasAltValue && comp.hasAltValue()) {
        gw.app.requestViewRoot(comp.id, {'calcAltModelValue':comp.getValue()}, 'NO_MASK_ELEM', {altValComp:comp});
      }
    }
  }

  ////////////////////////////////////////////////////////////
  // Public methods.

  return {
    getPrerequisiteAjaxParam : function (triggerElem) {
      var rangeTriggers = _rangeReflectorToTriggersMap[this.getIdForReflection(triggerElem)];
      return rangeTriggers == null ? null : this.addAjaxParams({}, null, rangeTriggers, null, null);
    },

    getNoChangeString : function() {
      return NO_CHANGE;
    },

    init : function(metaMap, bAppend, lvIds, reflectionOnLoad) {
      if (!bAppend) { // reset reflectors:
        _reflectors = []
        _rangeReflectorToTriggersMap = {};
        _lvIds = []
      }

      Ext.iterate(metaMap, function (rId, value) {
        var reflector = new gw.reflection.Reflector(rId, value);
        _reflectors.push(reflector);
        reflector.addRangeReflector(_rangeReflectorToTriggersMap); // collect all range reflectors
      })

      if (lvIds) {
        _lvIds = _lvIds.concat(lvIds)
      }

      _reflectPath = [];

      if (reflectionOnLoad) {// redo reflection for user values not yet in backing model, when return to page after click away
        _trackElementsToRedo = [];
        _pendingReqs = [];
        for (var i = 0; i < reflectionOnLoad.length; i++) {
         gw.reflection.reflect(Ext.ComponentManager.get(reflectionOnLoad[i]), true)
        }

        // add requests for updating sum value into the AJAX call
        // TODO: can we leverage LV sums instead?
        //    var sumValueReqs = DHTML.updateSumValues(Reflection._trackElementsToRedo);
        //    if (sumValueReqs) {
        //      for (var i=0; i<sumValueReqs.length; i++) {
        //        this._pendingReqs.push(sumValueReqs[i]);
        //      }
        //    }

        if (_pendingReqs.length > 0) {
          _request(_pendingReqs, undefined, undefined)
          //ReflectionImpl_endRedoMode()
        } else {
          //ReflectionImpl_endRedoMode();
        }
        _pendingReqs = null;
      }
    },

    reflect : function (e, bDirectChange) {
      if (!_reflectors) {
        return;
      }

      // Post page to server, if this is a postOnChange item
      var tId = this.getIdForReflection(e);
      if (e.postOnChange) {
        if (!bDirectChange) {
          gw.Debug.log("<b>PostOnChange by reflecting</b>: " + tId);
        }
        gw.app.handleAction(null, tId);
        //    // If mouse is about to be released, wait till then before post (No need to post, if the current mouse event is going to post)
        //    var actionStr = ReflectionImpl_getDelayedRefreshActionString(tId);
        //    var waitTillMouseRelease = EventHandlers.setMouseReleaseActionString(actionStr);
        //    if (!waitTillMouseRelease) {
        //      // post after all other events already in queue get executed:
        //      eval(actionStr);
        //    }
        return;
      }

      //
      // client reflection:
      //
      if (bDirectChange) {
        gw.Debug.log("Direct change resetting reflect path for " + tId)
        _reflectPath = [tId]; // reset reflect path
      }

      // gather all reflector aspects of this trigger:
      var aspects = [];
      var reflectorsForTrigger = [];
      var cancelledReflectors = [];
      var trackElements = this._trackElementsToRedo;
      Ext.each(_reflectors, function(reflector) {
        if (trackElements && Ext.ComponentManager.get(reflector.id) instanceof Ext.form.field.Display) {
          return; // ignore editable reflector, the value of which should have been remembered
        }
        if (Ext.Array.indexOf(_reflectPath, reflector.id) == -1) {
          if (reflector.addAspects(e, bDirectChange, aspects)) {
            reflectorsForTrigger.push(reflector.id);
          }
        } else {
          var temp = [];
          if (reflector.addAspects(e, bDirectChange, temp)) {
          // circle detected, cancel
            cancelledReflectors.push(reflector.id);
          }
        }
      })

      if (aspects.length > 0 || cancelledReflectors.length > 0) {
        _logReflection(e, aspects, cancelledReflectors)
        var newValues = [];
        var ajaxRequests = [];

        var updateReflectors = function() {
          // update reflect path before invoking chained reflections:
          _reflectPath = _reflectPath.concat(reflectorsForTrigger)
          _updateAllReflectors(aspects, newValues);
        };

        // fetch new value for each aspect that has been triggered (some new value may be on the server side):
        Ext.each(aspects, function(aspect, index) {
          newValues[index] = gw.reflection.getNoChangeString();
          var ajaxCall = aspect.addNewReflectorValue(e, newValues, index);
          if (ajaxCall) {
            ajaxRequests.push(ajaxCall);
          }
        })

        // update all reflectors:
        if (ajaxRequests.length > 0) {
          if (_trackElementsToRedo) { // collect all ajax requests to be sent at once
            Ext.each(ajaxRequests, function(req) {
              _pendingReqs.push(req);
            })
          } else {
            _request(ajaxRequests, newValues, updateReflectors)
          }
        } else {
          updateReflectors();
        }
      }

      // update alt value:
      _updateAltValue(e)
    },

    getTriggerIndexParamString : function() {
      return TRIGGER_INDEX_PARAM
    },

    addAjaxParams : function(params, type, tIds, triggerId, index) {
      if (type) {
        params['aspectType'] = type;
      }
      var multipleTriggers = tIds.length > 1;
      Ext.each(tIds, function(tId,i) {
        params[tId] = gw.reflection.getFieldValueById(tId);
        if (multipleTriggers && triggerId == tId) {
          params[TRIGGER_INDEX_PARAM] = i + 1; // add 1-based trigger index to ajax params
        }
      })
      params['index'] = index;
      return params;
    },

    getIdForReflection :function (e) {
      if (e.eventParam) {
        return e.eventParam;
      }
      if (e instanceof Ext.form.field.Checkbox) {
        var id = e.id;
        var name = e.name;
        return id.indexOf(name) == 0 ? name : id; // if the id is in the form of "name"+"value", returns "name" as renderId
//      } else if (e instanceof gw.ext.SimpleCombo || e instanceof Ext.ux.form.MultiSelect) {
//        return e.hiddenName
      } else {
        return e.hiddenName || e.id;
      }
    },
    getFieldValueById : function(id) {
      var comp = Ext.ComponentManager.get(id)
      if (comp) {
        return gw.ext.Util.getFieldValue(comp)
      }

      var gridInfo = gw.reflection.getGridInfoByCellId(id)
      if (gridInfo != null 
            && gridInfo.getCellValue) { // Work around JavaScript error - Why is gridInfo invalid here?
        var value = gridInfo.getCellValue()
        if (value && value.text !== undefined) {
          value = value.text
        }
        return value
      }
      return null
    },

    /**
     * Get data grid information for the given id. It is assumed that the id is a fully qualified cell id
     * into the grid.
     * @param cellId fully qualified cell id identifying a cell in a grid
     * @return the grid information object or null if this is not a cell id or no matching LV has been found
     */
    getGridInfoByCellId: function(cellId) {
      var gridInfo = null;

      Ext.each(_lvIds, function(lvId) {
        gridInfo = gw.ext.Util.getGridInfoByCellId(cellId, lvId);

        // Keep on searching (true) if grid info could not be found
        return !gridInfo;
      });

      return gridInfo;
    }
  }
}();


/**
 * Reflector in the reflection
 */
Ext.define('gw.reflection.Reflector', {

  constructor:function (id, aspectMap) {
    if (arguments.length == 0) {
      return;
    }

    this.id = id
    this.aspects = []

    // TODO : change for .. in to just the for loop
    for (var name in aspectMap) {
      if (aspectMap.hasOwnProperty(name)) {
        if ('DIRECT_ONLY' == name) {
          this.bReflectDirectChangeOnly = aspectMap[name];
        } else {
          this.aspects.push(new gw.reflection.Aspect(this, name, aspectMap[name]));
        }
      }
    }
    //sort aspects, so that "OPTION" will come before "VALUE"
    this.aspects = Ext.Array.sort(this.aspects, function (a, b) {
      return (a.name == b.name) ? 0 : (a.name < b.name) ? -1 : 1;
    })
  },

  // add aspects to the input aspect array
  // returns true if aspects were added
  addAspects:function (e, bDirectChange, aspects) {
    var oldLen = aspects.length;
    if (!this.bReflectDirectChangeOnly || bDirectChange) {
      Ext.each(this.aspects, function (aspect) {
        if (aspect.isTriggered(e)) {
          aspects.push(aspect);
        }
      })
    }
    return oldLen != aspects.length;
  },

  addRangeReflector:function (reflectorToTriggersMap) {
    var id = this.id
    Ext.each(this.aspects, function (aspect) {
      var rangeTriggers = aspect.getRangeTriggers();
      if (rangeTriggers != null) {
        reflectorToTriggersMap[id] = rangeTriggers;
        return false;
      }
    })
  }

});

/**
 * The aspect of the reflection (data changes, availability.. etc)
 */
Ext.define('gw.reflection.Aspect', {

  constructor:function (reflector, name, args) {
    if (arguments.length == 0) {
      return;
    }
    this.reflector = reflector;
    this.name = name;
    this.method = args[0];
    this.tIds = args[1];
    if (args.length > 2) {
      this.args = args[2];
    }
  },

  isTriggered:function (e) {
    return Ext.Array.indexOf(this.tIds, gw.reflection.getIdForReflection(e)) != -1;
  },
  getRangeTriggers:function () {
    return this.name == 'OPTIONS' ? this.tIds : null;
  },

  addNewReflectorValue:function (e, newValues, index) {
    var ajaxParams = null;
    if (this.method == 'map') {
      ajaxParams = gw.reflection.getPrerequisiteAjaxParam(e); // if this is forced to be ajax reflection
    }

    var triggerId = gw.reflection.getIdForReflection(e);
    if (ajaxParams == null) {
      ajaxParams = this[this.method](e, newValues, index);
    } else {
      gw.reflection.addAjaxParams(ajaxParams, this.name, this.tIds, triggerId, index) // if we are sending an ajax request, append aspect type and other trigger values
    }
    if (ajaxParams) {
      gw.Debug.log('Request reflector value from server for "' + this.reflector.id + '", trigger("' + triggerId + '") - ' + this.name);
      return {viewRootId:this.reflector.id, paramMap:ajaxParams}
    } else {
      return null;
    }
  },

  splitEditor:function (editors, editorByRow, row, additionalConfig) {
    var rowIndexes = editorByRow[1]
    rowIndexes.splice(Ext.Array.indexOf(rowIndexes, row), 1);
    var editorConfig = {xtype:editorByRow[0].xtype};
    if (additionalConfig) {
      Ext.apply(editorConfig, additionalConfig)
    }
    editors.push([editorConfig, [row]]);
    return editorConfig
  },

  createNewEditor:function (rE) {
    // The editor is defined on the column.
    // Create the editor.
    var rowIndexes = []
    // Create array of row indexes.
    for (var i = 0; i < rE.grid.store.getCount(); i++) {
      rowIndexes.push("" + i)
    }
    var column = gw.ext.Util.getColumnById(rE.grid, rE.dataIndex);
    var editorsForColumn = [
      [column.getEditor(), rowIndexes]
    ];

    if (!rE.grid.store.reader.jsonData.editors) {
      rE.grid.store.reader.jsonData.editors = {}
    }
    rE.grid.store.reader.jsonData.editors[column.mapping || column.dataIndex] = editorsForColumn
    return this.splitEditor(editorsForColumn, editorsForColumn[0], rE.row)
  },
  /**
   * Update reflector to the given value
   */
  updateReflector: function(value) {
    // The value object may be a simple value or complex value object with value attributes
    // Splitting into simple value and value holder if so
    var complexValue = value;
    if (value && value.value != undefined) {
      value = value.value;
    }

    if (value == gw.reflection.getNoChangeString()) {
      return; // no op
    }

    var id = this.reflector.id;
    var rE = Ext.ComponentManager.get(id);
    if (rE == null) {
      // Assume the id belongs to an LV. Try to find a matching LV cell definition.
      // TODO: Refactor: rE should be a component. In case of an LV, we get a wrapper over a grid component that
      // represents the cell for the reflection. A possible refactor would be to have a reflector wrapper for
      // all components (including fields) that abstracts this logic away
      rE = gw.reflection.getGridInfoByCellId(id);
    }

    if (rE == null) {
      alert("Could not find reflector with id " + id);
    }

    var editor;
    switch (this.name) {
      case 'VALUE':
        if (rE.getGrid) {
          var cellValue = rE.getCellValue();
          if (((cellValue && cellValue.text != undefined) ? cellValue.text : cellValue) != value) {
            // set cell value calls beginEdit on the record that does not emit change events, hence no suspendEvents
            // TODO: Refactor: Put in reflector wrapper
            rE.setCellValue(complexValue);
            gw.ext.Util.processGridEditor(rE.grid.store, rE.row, rE.getColumn(), function (editorByRow) {
              rE.postOnChange = editorByRow[0].postOnChange;
            });
            gw.reflection.reflect(rE);
          }

        } else {
          if (rE.getValue() != value) {
            rE.suspendEvents();
            gw.ext.Util.setValue(rE, complexValue);
            gw.reflection.reflect(rE);
            rE.resumeEvents();
          }
        }

        break;

      case 'OPTIONS':
        if (rE.getGrid) {
          cellValue = rE.getCellValueText();
          // TODO: should we use rE.getGrid().getStore() since grid.store is private?
          gw.ext.Util.processGridEditor(rE.grid.store, rE.row, rE.getColumn(), function (editorByRow, editors) {
            if (editorByRow[1].length > 1) {
              editor = this.splitEditor(editors, editorByRow, rE.row);
            } else {
              editor = editorByRow[0];
            }
          }, false, this);

          // This should not happen with the configuration we currently have,
          // we always define an editor in the store and not on the column.
          if (!editor) {
            editor = this.createNewEditor(rE);
          }

          if (editor.store && editor.store.reader) {
            gw.ext.Util.updateStore(editor.store, complexValue);
          } else {
            editor.store = complexValue;
          }
          var defaultValue = undefined;
          if (editor.displayField) { // lookup display text for combo field
            var idx = editor.store.findExact(editor.valueField, cellValue);
            if (idx == -1) {
              defaultValue = editor.store.getAt(0).get(editor.valueField);
            }
          } else {
            defaultValue = editor.store[0][0];
            Ext.each(editor.store, function (data) {
              if (data[0] == cellValue) {
                defaultValue = undefined;
                return false;
              }
            });
          }
          if (defaultValue !== undefined) {
            rE.setCellValue(defaultValue);
          }

        } else if (rE.store) {
          gw.ext.Util.updateStore(rE.store, complexValue);

        } else {
          gw.Debug.log("ERROR!!! Cannot reflect options, no store defined on " + this.reflector.id);
        }

        break;

      case 'AVAILABLE':
        var disabled = (value == true || value == 1 || value == "true" || value == "1") ? false : true;

        if (rE.getGrid) {
          gw.ext.Util.processGridEditor(rE.grid.store, rE.row, rE.getColumn(), function (editorByRow, editors) {
            var rowIndexes = editorByRow[1];
            if (rowIndexes.length > 1) {
              editor = this.splitEditor(editors, editorByRow, rE.row);
            } else {
              editor = editorByRow[0];
            }
          }, false, this);
          if (!editor) {
            editor = this.createNewEditor(rE);
          }
          gw.ext.Util.setDisabled(editor, disabled);

        } else {
          gw.ext.Util.setDisabled(rE, disabled);
        }

        break;

      case 'MASK':
        if (rE.getGrid) {
          // no-op: deprecated feature, use TPOC instead
        } else {
          // update tooltip:
          if (rE.tooltip == rE.emptyText && rE.setTooltip != null) {
            rE.setTooltip(value);
          }
          // update regex:
          if (value) {
            if (value.lastIndexOf('#') >= 0) {
              // @SenchaUpgrade The regex property is a config-time-only option; there's no officially-supported
              rE.regex = eval('/^' + value
                   .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") //escape special char for regex
                   .replace(/#/g, '.')
                 + '$/');
            }
          } else {
            delete rE.regex;
          }
          // update invalidText:
          if (rE.emptyText && rE.invalidText && rE.invalidText.lastIndexOf(rE.emptyText) >= 0) {
            rE.invalidText = rE.invalidText.replace(rE.emptyText, value);
          }
          // At last, update emptyText:
          rE.emptyText = value;
          rE.inputEl.dom.placeholder = value;
          // Force re-validation of the field
          rE.validate();
        }
        break;

      case 'CUSTOM':
        // no-op
        break;

      default:
        alert("Unkown aspect: " + this.name);
        break;
    }
  },

  maybePostToServer: function() {
    if (this.name == 'VALUE') {
      var reflector = Ext.ComponentManager.get(this.reflector.id);
      return reflector && reflector.postOnChange;
    }
    return false;
  },

  /**
   * Get trigger value
   */
  tv:function (e, newValues, index) {
    newValues[index] = e.eventParam ? gw.reflection.getFieldValueById(e.eventParam) : gw.ext.Util.getFieldValue(e);
  },

  contentsEqual:function (a1, a2) {
    if (a1 == a2) {
      return true;
    }
    if (!a1 || !a2) {
      return (!a1 && !a2);
    }
    if (a1.length != a2.length) {
      return false;
    }
    for (var i = 0; i < a1.length; i++) {
      if (a1[i] != a2[i]) {
        return false;
      }
    }
    return true;
  },
  /**
   * Calculates new value from map:
   */
  map:function (e, newValues, index) {
    if (this.args != null) {
      for (var i = 0; i < this.args.length; i++) {
        var valueByIds = []
        Ext.each(this.tIds, function (tId) {
          valueByIds.push(gw.reflection.getFieldValueById(tId))
        })

        if (this.contentsEqual(this.args[i][0], valueByIds)) {
          newValues[index] = this.args[i][1];
          return null;
        }
      }
      newValues[index] = gw.reflection.getNoChangeString();
      return null;
    } else { // value on server:
      return gw.reflection.addAjaxParams({}, this.name, this.tIds, gw.reflection.getIdForReflection(e), index); // returns params to fetch new value from server thru AJAX
    }
  },

  filter:function (e, newValues, index) {
    var result = []
    for (var i = 0; i < this.args.length; i++) {
      var item = this.args[i][0]
      var ok = true;

      // check each trigger
      if (this.args[i].length > 1) {
        var conditions = this.args[i][1];

        Ext.each(this.tIds, function (tId) {
          var tValue = gw.reflection.getFieldValueById(tId);
          if (tValue != '') { // value specified
            var expected = conditions[tId]
            var inArray = expected && (Ext.Array.indexOf(expected, tValue) != -1);
            if (!(inArray)) {
              ok = false;
              return false;
            }
          }

        })
      }

      if (ok) {
        result.push(item);
      }
    }

    newValues[index] = result;
  },
  /**
   * Evaluate client side reflection expression.
   * This method gets called through the aspect method name (see gw.reflection.Aspect).
   * This name is set on the server. In this case, it is eval for any client reflection side reflection
   * expression javascript:[JavaScript expression]
   * TODO: Refactor: Likely consider renaming eval into gwEval or equivalent to make it clear that this is a
   * GW eval function, not a general purpose JavaScript eval function.
   */
  eval: function (e, newValues, index) {
    // set up global variables before evaluate expression:
    window.VALUE = gw.reflection.getFieldValueById(e.id);
    // VALUE1, VALUE2, ..., and trigger index
    var numtIds = this.tIds.length;
    Ext.each(this.tIds, function (tId, idx) {
      window['VALUE' + (idx + 1)] = gw.reflection.getFieldValueById(tId);
      if (numtIds > 1 && gw.reflection.getIdForReflection(e) == tId) {
        window[gw.reflection.getTriggerIndexParamString()] = idx + 1;
      }
    });

    // REFLECTOR: - the INPUT element
    // REFLECTOR is a variable that the client side reflection code can access.
    // Note: This is not working for cell ids as they are not components.
    // TODO: This is only used in PX, not in app code. Consider removing this (deprecating)
    var reflectorField = Ext.ComponentManager.get(this.reflector.id);
    window.REFLECTOR = reflectorField ? reflectorField.inputEl.dom : null;

    newValues[index] = eval(this.args[0]);
  }
});

