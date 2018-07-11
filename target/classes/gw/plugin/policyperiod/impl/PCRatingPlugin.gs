package gw.plugin.policyperiod.impl

uses gw.plugin.InitializablePlugin
uses gw.rating.AbstractRatingEngine

uses java.lang.IllegalArgumentException
uses java.util.Map
uses gw.pc.rating.typekey.RateEngineParameter

@Export
class PCRatingPlugin extends SysTableRatingPlugin implements InitializablePlugin {

  public static final var MINIMAL_RATING_LEVEL : String = "RatingLevel"
  var _defaultMinimumBookStatusLevel : RateBookStatus

  override function setParameters(params : Map<Object, Object>) {
    var levelKey = params.get(MINIMAL_RATING_LEVEL)
    _defaultMinimumBookStatusLevel = RateBookStatus.get(levelKey as String)
    checkValidRatingLevel(levelKey)
  }

  private function checkValidRatingLevel(key : Object) {
    if (_defaultMinimumBookStatusLevel == null) {
      throw new IllegalArgumentException(displaykey.Web.Rating.Errors.InvalidRatingLevel(key))
    }
  }

  override protected function createRatingEngine(line : PolicyLine) : AbstractRatingEngine {
    var rateBookEngine = line.createRatingEngine(RateMethod.TC_RATEFLOW, {RateEngineParameter.TC_RATEBOOKSTATUS -> _defaultMinimumBookStatusLevel})
    if (rateBookEngine == null) {
      return super.createRatingEngine(line)
    }
    return rateBookEngine
  }
}
