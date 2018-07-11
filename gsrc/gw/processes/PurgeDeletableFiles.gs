package gw.processes
/**
This is batch process that clears out purges out deletable files that are older than the maxSession 
*/

uses gw.processes.BatchProcessBase
uses java.lang.Integer
uses gw.api.system.PLConfigParameters
uses java.io.File
uses gw.api.util.DateUtil
uses java.util.Date

@Export
class PurgeDeletableFiles extends BatchProcessBase{
  var _ageSecs : int

  construct() {
    this({PLConfigParameters.SessionTimeoutSecs.Value})
  }

  construct(arguments : Object[]) {
    super("PurgeDeletableFiles")
    if (arguments != null && arguments.length > 0) {
      _ageSecs = arguments[0] as Integer
    }
  }

  override function doWork() : void {
    var lastRun = getLastRun()
    var cutOff = DateUtil.currentDate().Time - (_ageSecs * 1000)
    if (lastRun != null && lastRun.Time < cutOff) {
      cutOff = lastRun.Time
    }
    var dir = File.getDeletableTempFileDirectory()
    dir.eachFileInTree(\ f -> {
      if (f.lastModified() - cutOff < 0) {
        f.delete()
      }
      else if (f.Directory && f.Children.Empty) {
        f.delete()
      }
    })
  }
  
  function getLastRun() : Date {
    var ph = find(ph in ProcessHistory where ph.ProcessType == Type).orderByDescending(\ p -> p.CompleteDate).FirstResult
    return ph.CompleteDate
  }
}
