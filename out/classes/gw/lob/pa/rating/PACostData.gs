package gw.lob.pa.rating
uses java.util.Date
uses gw.rating.CostData

@Export
abstract class PACostData<R extends PACost> extends CostData<R, PersonalAutoLine> {
  
  construct(effDate : Date, expDate : Date, c : Currency) {
    super(effDate, expDate, c)
  }

  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }

  construct(c : PACost) {
    super(c)  
  }
  
  override function setSpecificFieldsOnCost(line : PersonalAutoLine, cost : R) {
    cost.setFieldValue("PersonalAutoLine", line.FixedId)
  }

}
