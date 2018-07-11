package gw.lob.wc.rating
uses java.util.Date
uses gw.rating.CostData

@Export
abstract class WCCostData<T extends WCCost> extends CostData<T, WorkersCompLine>  {
  
  construct(effDate : Date, expDate : Date, c : Currency) {
    super(effDate, expDate, c)
  }
  
  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }
  
  override function setSpecificFieldsOnCost(line : WorkersCompLine, cost : T) {
    cost.setFieldValue("WorkersCompLine", line.FixedId)
  }
}
