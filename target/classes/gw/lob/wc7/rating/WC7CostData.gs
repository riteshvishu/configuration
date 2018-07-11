package gw.lob.wc7.rating
uses java.util.Date
uses org.apache.commons.lang.builder.ReflectionToStringBuilder
uses gw.rating.CostDataWithOverrideSupport

@Export
abstract class WC7CostData<T extends WC7Cost> extends CostDataWithOverrideSupport<T, WC7WorkersCompLine>  {

  var _premiumLevelType : WC7PremiumLevelType as PremiumLevelType
  var _calcOrder : int as CalcOrder
  
  construct(effDate : Date, expDate : Date, c : Currency) {
    super(effDate, expDate, c)
  }

  construct(cost : T) {
    super(cost)  
  }
  
  abstract property get Jurisdiction() : typekey.Jurisdiction
  
  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : T) {
    cost.setFieldValue("WC7WorkersCompLine", line.FixedId)
    cost.setFieldValue("PremiumLevelType", _premiumLevelType)
    cost.CalcOrder = _calcOrder
    cost.DisplayOrder = cost.CalcOrder
  }

  override function toString() : String {
    var reflectionToStringBuilder = new ReflectionToStringBuilder(this)
      reflectionToStringBuilder.setAppendStatics(true)
      reflectionToStringBuilder.setAppendTransients(true)
      reflectionToStringBuilder.setExcludeFieldNames(new String[] {"_entries"})
      return reflectionToStringBuilder.toString()
   }
}
