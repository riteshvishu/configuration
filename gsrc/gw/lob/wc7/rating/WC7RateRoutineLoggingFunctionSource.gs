package gw.lob.wc7.rating

uses gw.rating.flow.RatingFunctionSource
uses gw.rating.RateFlowLogger

/**
 * Rating functions for logging and debugging WC7 Rate Routines.
 * 
 * Note, these should not be referenced in production
 */
@Export
class WC7RateRoutineLoggingFunctionSource extends RatingFunctionSource {
  
  static var _rfLogger = RateFlowLogger.get()
  
  /**
   * Write a log message to communicate that a rate routine was invoked
   */
  function logRateRoutine(routineName : String){
     var msg = "ROUTINE CALLED:" + routineName
     _rfLogger.debug(msg)
  }
 
  override function availableForLine(policyLineCode : String) : boolean {
    return "WC7Line" == policyLineCode
  }

}
