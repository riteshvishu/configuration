/**
 * The gw.progress bar extends Ext.ProgressBar to add the following:
 * - Show a spinning/busy image when the progress cannot be estimated.
 * - Show a detailed status text for progress steps outside the progress bar
 * - Server polling and refresh on complete.
 *
 * Some methods are overridden because the template customization is not supported.
 */
Ext.define('gw.progress', {
  extend: 'Ext.ProgressBar',
  requires: 'Ext.ProgressBar',
  alias: 'widget.gprogress',

  width: 200,
      
  /**
   * Wrap the status text field and the progress bar.
   * @SenchaUpgrade Need to verify the default renderTpl is still defined as an array
   */
  renderTpl: function() {
    return [
      '<div class="{baseCls}-status"></div>',
      '<div class="{baseCls}-wrap">'
    ].concat(

         // @SenchaUpgrade copied from Ext.ProgressBar#renderTpl:
         [
           '<tpl if="internalText">',
           '<div class="{baseCls}-text {baseCls}-text-back">{text}</div>',
           '</tpl>',
           '<div id="{id}-bar" class="{baseCls}-bar {baseCls}-bar-{ui}" style="width:{percentage}%">',
           '<tpl if="internalText">',
           '<div class="{baseCls}-text">',
           '<div>{text}</div>',
           '</div>',
           '</tpl>',
           '</div>'
         ],

        ['</div>']
    )
  }(),

  /**
   * Get the value of this progress bar. The value is a fractional from 0 to 1, 1 is 100%
   */
  getValue: function() {
    return this.value;
  },

  /**
   * Get the progress bar status text. This is a status text without percentage representation
   */
  getText: function() {
    return this.status;
  },

  /**
   * Update the status text and the progress bar text
   */
  updateText : function() {
    this.callParent(arguments);

    if (this.rendered) {
      if (this.status) {
        this.statusEl.update(this.status);
      }
    }
  },

  /**
   * Shows the manual progress bar if progress steps can be determined.
   * Shows the spinner if animation is enabled and the progress steps are not known (progress duration unknown).
   * The spinner is on the outer wrap element and the bar is inside the outer wrap element.
   */
  updateProgress : function(value, text, animate){
    // Hide/show progress bar.
    if (this.hideAnimation || this.value < 0) {
      Ext.get(this.wrapEl).hide();
      // AHK - 5-28-2013 - The height on the containing element is set to 44px in the CSS, so we need to size it down
      // if the progress bar div is hidden
      Ext.get(this.el).setHeight("18px");
    } else {
      Ext.get(this.wrapEl).show();
      Ext.get(this.el).setHeight("44px");
    }

    // Hide show spinner.
    if (!this.hideAnimation && this.value < 0) {
      Ext.get(this.statusEl).addCls("g-progress-spinner");
    } else {
      Ext.get(this.statusEl).removeCls("g-progress-spinner");
    }

    return this.callParent(arguments);
  },

  afterRender: function() {
    // Declare a reference to the status text element
    if (!this.statusEl) {
      this.statusEl = this.el.select('.' + this.baseCls + '-status');
    }
    if (!this.wrapEl) {
      this.wrapEl = this.el.select('.' + this.baseCls + '-wrap');

      // Push the root class for the root element down to the wrapped progress bar
      Ext.get(this.el).removeCls(this.baseCls);
      Ext.get(this.wrapEl).removeCls(this.baseCls + '-wrap');
      Ext.get(this.wrapEl).addCls(this.baseCls);
    }

    this.callParent(arguments);

    // Register poller
    if (this.value < 1) {
      // TODO: rename to gSync or better name (sync is true when actionOnComplete is set so the UI will be blocked until it's finished)
      if (this.sync) {
        gw.app.showBusy()
      }
      gw.progressfunction.registerToPoll(this.id);


    } else if (this.sync) {
      gw.app.handleAction(null, this.target)
    }
  },

  /**
   * Update the progress bar state based on the progress bar command information.
   * This calls the progress bar's updateProgress function
   * @param cmdInfo progress bar command information data structure
   * @see updateProgress
   */
  updateProgBar: function(cmdInfo) {
    // TODO : prefix gw property with gXXX? (hideAnimation status)
    this.status = cmdInfo.status;
    this.text = cmdInfo.text;
    this.value = cmdInfo.value;
    this.hideAnimation = cmdInfo.hideAnimation;

    // Updating the progress bar
    if (this.value) {
      this.updateProgress(this.value, this.text);
    }

    if (cmdInfo.value < 1) {
      gw.progressfunction.registerToPoll(cmdInfo.target);

    } else {
      if (cmdInfo.sync) {
        gw.app.handleAction(null, cmdInfo.target);
      }
    }
  }
})

/**
 * Progress polling function
 */
gw.progressfunction = function() {
  var _progBarTask = null;
  var _progVersion = 0;
  var _needPoll = [];
  var PROGRESS_POLL_INTERVAL = 3000; // 3 seconds

  function doPoll() {
    var currentPoll = _progVersion;
    if (_needPoll[currentPoll] == null) {
      return;
    }
    if (_needPoll[currentPoll].length == 0) {
      return;
    }

    var nextPoll = currentPoll+1;
    _needPoll[nextPoll] = [];
    _progVersion = nextPoll;

    var ids = _needPoll[currentPoll];
    _needPoll[currentPoll] = null;

    var reqs = [];
    for (var i = 0; i < ids.length; i++) {
      reqs[i] = {viewRootId:ids[i], paramMap:{progBarId:ids[i]}, childrenOnly:false};
    }

    gw.app.requestViewRoots(reqs,
        function(options, success, response) {
          var commands = Ext.decode(response.responseText);
          var op;
          if (reqs.length == 1) {
            op = commands[0];
            // Need to handle case where there is no op because
            // the progress is no longer visible (navigated to another page)
            // in that case, an empty op is sent.
            if (op) {
              gw.cmdProc[op.cmd](op, response)
            }
          } else {
            for (var i = 0; i < commands.length; i++) {
              op = Ext.decode(commands[i])[0];
              if (op) {
                gw.cmdProc[op.cmd](op, response)
              }
            }
          }
        })
  }

  function _getProgBarTask () {
    if (_progBarTask == null) {
      // Create the progress bar task.
      _progBarTask = {
        run: function() {
          doPoll()
        },
        interval: PROGRESS_POLL_INTERVAL
      }
      Ext.TaskManager.start(_progBarTask);
    }
    return _progBarTask;
  }

  return {
   registerToPoll : function(progBarId) {
     _getProgBarTask();
     if (_needPoll[_progVersion] == null) {
       _needPoll[_progVersion] = []
     }
     _needPoll[_progVersion].push(progBarId);
   }
  }
}();