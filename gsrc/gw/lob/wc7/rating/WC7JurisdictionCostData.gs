package gw.lob.wc7.rating
uses java.util.Date
uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7JurisdictionVersionList

@Export
class WC7JurisdictionCostData<T extends WC7JurisdictionCost> extends WC7CostData<T> {
  
  private var _step : WC7RatingStepData as Step 
  private var _jurisdictionID : Key
  private var _state : Jurisdiction as readonly State
  
  construct(effDate : Date, expDate : Date, jurisdictionID : Key, stateArg : Jurisdiction, stepArg : WC7RatingStepData, c : Currency) {
    super(effDate, expDate, c)
    assertKeyType(jurisdictionID, WC7Jurisdiction)
    _jurisdictionID = jurisdictionID
    _state = stateArg
    _step = stepArg
    RateAmountType = _step.RateAmountType
  }

  override property get Jurisdiction() : Jurisdiction {
    return State 
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : T) {
    super.setSpecificFieldsOnCost( line, cost )
    cost = cost.Unsliced as T
    cost.setFieldValue("WC7Jurisdiction", _jurisdictionID)
    cost.JurisdictionCostType = _step.JurisdictionCostType
    // try to set ChargePattern to match RateAmountType for billing integration
    cost.ChargePattern  = (_step.RateAmountType == typekey.RateAmountType.TC_TAXSURCHARGE ? 
        "Taxes" as ChargePattern : "Premium" as ChargePattern)
    cost.StatCode       = _step.ClassCode
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    var jurisdictionVL = EffDatedUtil.createVersionList( line.Branch, _jurisdictionID ) as WC7JurisdictionVersionList
    return jurisdictionVL.Costs.where( \ costVL -> matchesStep(costVL.AllVersions.first())).toList()
  }

  protected function matchesStep(cost : WC7JurisdictionCost) : boolean {
    return cost.JurisdictionCostType == _step.JurisdictionCostType &&
           cost.CalcOrder == _step.CalcOrder &&
           cost.RateAmountType == _step.RateAmountType
  }
  
  override property get KeyValues() : List<Object> {
    return {_step.JurisdictionCostType, _jurisdictionID}  
  }
  
  // We do not want to preserve the discount percent for Premium Discount or Minimum Premium costs
  override property get PreserveOverrideDiscounts() : boolean {
    if (_step.JurisdictionCostType == WC7JurisdictionCostType.TC_PREMDIS or
        _step.JurisdictionCostType == WC7JurisdictionCostType.TC_MINPREM or
        _step.JurisdictionCostType == WC7JurisdictionCostType.TC_MINPREMFELAMARITIME) {
      return false
    } else {
      return super.PreserveOverrideDiscounts
    }
  }
}
