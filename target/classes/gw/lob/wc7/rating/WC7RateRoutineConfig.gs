package gw.lob.wc7.rating

uses gw.plugin.rateflow.IRateRoutineConfig
uses java.math.RoundingMode
uses java.lang.Integer
uses gw.plugin.rateflow.CostDataBase
uses gw.lang.reflect.IType
uses gw.plugin.rateflow.ICostDataWrapper
uses gw.rating.CostDataWithOverrideSupport
uses gw.rating.flow.domain.CalcRoutineCostDataWithAmountOverride
uses gw.rating.flow.domain.CalcRoutineCostDataWithTermOverride

@Export
class WC7RateRoutineConfig implements IRateRoutineConfig {

  construct() {
  }

  override function getCostDataWrapperType(paramSet : CalcRoutineParameterSet) : IType {
    return CalcRoutineCostDataWithTermOverride
  }

  override function makeCostDataWrapper(paramSet : CalcRoutineParameterSet, 
                                        costData : CostDataBase, 
                                        defaultRoundingLevel : Integer, 
                                        defaultRoundingMode : RoundingMode) : ICostDataWrapper {
    return new CalcRoutineCostDataWithTermOverride(costData as CostDataWithOverrideSupport, 
                                                    CalcRoutineCostDataWithAmountOverride.OverrideMode.APPROXIMATE_STANDARD_RATES,
                                                    defaultRoundingLevel,
                                                    defaultRoundingMode)
  }

  override function worksheetsEnabledForLine(linePatternCode : String) : boolean {
    return true
  }

}
