package gw.api.databuilder.wc7
uses gw.api.databuilder.DataBuilder
uses java.math.BigDecimal

class WC7RateFactorBuilder extends DataBuilder<WC7RateFactor, WC7RateFactorBuilder> {

  construct() {
    super(WC7RateFactor)
    withJustification("Something")
    withPatternCode(RateFactorType.TC_WORKPLACEMAINT) 
  }

  function withAssessment(value : double) : WC7RateFactorBuilder {
    set(WC7RateFactor#Assessment.PropertyInfo, BigDecimal.valueOf(value))
    return this
  }
  
  final function withJustification(justification : String) : WC7RateFactorBuilder {
    set(WC7RateFactor#Justification.PropertyInfo, justification)
    return this
  }
  
  final function withPatternCode(patternCode : RateFactorType) : WC7RateFactorBuilder {
    set(WC7RateFactor#PatternCode.PropertyInfo, patternCode.Code)
    return this
  }
  
}
