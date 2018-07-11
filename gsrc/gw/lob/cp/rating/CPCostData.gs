package gw.lob.cp.rating
uses gw.rating.CostDataWithOverrideSupport

@Export
abstract class CPCostData<T extends CPCost> extends CostDataWithOverrideSupport<T, CommercialPropertyLine> {
  construct(effDate : DateTime, expDate : DateTime) {
    super(effDate, expDate)
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency) {
    super(effDate, expDate, c)
  }

  construct(cost : T) {
    super(cost)  
  }
  
  override function setSpecificFieldsOnCost(line : CommercialPropertyLine, cost : T) {
    cost.setFieldValue("CommercialPropertyLine", line.FixedId)
  }
}
