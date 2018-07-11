package gw.lob.bop.rating
uses gw.rating.CostData

@Export
abstract class BOPCostData<T extends BOPCost> extends CostData<T, BOPLine> {
  
  private var _state : Jurisdiction as State
  
  construct(effDate : DateTime, expDate : DateTime, stateArg : Jurisdiction) {
    super(effDate, expDate)
    init(stateArg)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, stateArg : Jurisdiction) {
    super(effDate, expDate, c)
    init(stateArg)
  }

  construct(cost : BOPCost) {
    super(cost)
    init(cost.State)
  }

  private function init(stateArg : Jurisdiction) {
    _state = stateArg
  }
  
  override function setSpecificFieldsOnCost(line : BOPLine, cost : T) {
    cost.setFieldValue("BusinessOwnersLine", line.FixedId)
  }
}
