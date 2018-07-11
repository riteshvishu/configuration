package gw.lob.wc7.rating
uses java.lang.Integer

@Export
/**
 * A class which holds rating step information needed to create WC7JurisdictionCostData.
 */
class WC7RatingStepData {

  var _jurisdictionCostType : WC7JurisdictionCostType as readonly JurisdictionCostType
  var _rateAmountType : RateAmountType as readonly RateAmountType
  var _classCode : String as ClassCode
  var _calcOrder : Integer as readonly CalcOrder
  
  construct(aJurisdictionCostType : WC7JurisdictionCostType, aRateAmountType: RateAmountType, aClassCode : String, theCalcOrder : Integer) {
    _jurisdictionCostType = aJurisdictionCostType
    _rateAmountType = aRateAmountType
    _classCode = aClassCode
    _calcOrder = theCalcOrder
  }
  
  construct(aJurisdictionCostType : WC7JurisdictionCostType, aRateAmountType: RateAmountType, theCalcOrder : Integer) {    
    this(aJurisdictionCostType, aRateAmountType, null, theCalcOrder)
  }

  construct(step : WC7RatingStepExt) {
    this(step.aggCostType, step.amountType, step.classcode, step.calcOrder)
  }
  
  override function equals(object : Object) : boolean {
    if (this === object) {
      return true
    }
    
    if (typeof this <> typeof object) {
      return false
    }
    
    var otherTypedObject = object as WC7RatingStepData
    return JurisdictionCostType == otherTypedObject.JurisdictionCostType 
      and RateAmountType == otherTypedObject.RateAmountType 
      and ClassCode == otherTypedObject.ClassCode 
      and CalcOrder == otherTypedObject.CalcOrder
  }

  override function hashCode() : int {
    return new org.apache.commons.lang.builder.HashCodeBuilder(7, 5)
      .append(typeof this)
      .append(JurisdictionCostType)
      .append(RateAmountType)
      .append(ClassCode)
      .append(CalcOrder)
      .toHashCode()
  }
}
