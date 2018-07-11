package gw.lob.im.rating
uses gw.rating.CostData

@Export
abstract class IMCostData<T extends IMCost> extends CostData<T, InlandMarineLine> {
  
  construct(effDate : DateTime, expDate : DateTime) {
    super(effDate, expDate)
  }
  
  construct(effDate : DateTime, expDate : DateTime, c : Currency) {
    super(effDate, expDate, c)
  }
  
  override function setSpecificFieldsOnCost(line : InlandMarineLine, cost : T) {
    cost.setFieldValue("InlandMarineLine", line.FixedId)
  }
}
