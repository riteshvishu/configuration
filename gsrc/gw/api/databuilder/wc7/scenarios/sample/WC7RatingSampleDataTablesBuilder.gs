package gw.api.databuilder.wc7.scenarios.sample
uses gw.rating.rtm.RatingTestMethods
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.api.database.Query


class WC7RatingSampleDataTablesBuilder implements RatingTestMethods {

  static final var WC7_CLASSCODE_RATE : String = "WC7_ClassCode_Rate" 
  static final var WC7_MINIMUMPREMIUM_RATE : String = "WC7_MinimumPremium_Rate"
  //employersLiabLimitsPercentRateTable
  static final var WC7_EMPLOYERSLIABLIMITS_RATE : String = "WC7_Employers_Liability_Increase_Limits_Percent"
  //premium discount
  static final var WC7_PREMIUMDISCOUNT_RATE : String = "WC7_PremiumDiscount_Rate"
  static final var WC7_LINE : String = "WC7Line"

  static final var EXACT_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare("OpCode", Equals, "ExactMatch").select().AtMostOneRow
    
  public static final var RANGE_MAX_INCL_MATCH_OP_DEF : RateTableMatchOpDefinition =
    Query.make(RateTableMatchOpDefinition).compare("OpCode", Equals, "RangeMatchMaxIncl").select().AtMostOneRow
    
  static function aClassCodeRateTable() : RateTableBuilder {
    return new RateTableBuilder(aClassCodeRateTableDef())
  }

  static function aClassCodeRateTableDef() : RateTableDefinition {
    return aClassCodeRateTableDefBuilder().createAndCommit()
  }

  static function aClassCodeRateTableDefBuilder() : RateTableDefinitionBuilder {
    var classCodeParam = getParam(10, "ClassCode", "str1")
                      .withColumnLabel("ClassCode")
                      .withType("String")
                      .withDisplayType("Normal")
 

    return new RateTableDefinitionBuilder()
      .withCode(WC7_CLASSCODE_RATE)
      .named(WC7_CLASSCODE_RATE.replaceAll("_", " "))
      .withPolicyLine(WC7_LINE)
      .addMatchOperation(getMatchOp(classCodeParam).withDefinition(EXACT_MATCH_OP_DEF))
      .addFactor(getFactor("Rate").withColumnLabel("Rate"))
  }
  
  static function aMinimumPremiumRateTable() : RateTableBuilder {
    return new RateTableBuilder(aMinimumPremiumRateTableDef())
  }

  static function aMinimumPremiumRateTableDef() : RateTableDefinition {
    return aMinimumPremiumRateTableDefBuilder().createAndCommit()
  }

  static function aMinimumPremiumRateTableDefBuilder() : RateTableDefinitionBuilder {
    var classCodeParam = getParam(10, "ClassCode", "str1")
                      .withColumnLabel("ClassCode")
                      .withType("String")
                      .withDisplayType("Normal")

    return new RateTableDefinitionBuilder()
      .withCode(WC7_MINIMUMPREMIUM_RATE)
      .named(WC7_MINIMUMPREMIUM_RATE.replaceAll("_", " "))
      .withPolicyLine(WC7_LINE)
      .addMatchOperation(getMatchOp(classCodeParam).withDefinition(EXACT_MATCH_OP_DEF))
      .addFactor(getFactor("MinimumPremium").withColumnLabel("MinimumPremium"))
  }
  
  static function anEmployersLiabLimitsRateTable() : RateTableBuilder {
    return new RateTableBuilder(anEmployersLiabLimitsRateTableDef())
  }

  static function anEmployersLiabLimitsRateTableDef() : RateTableDefinition {
    return anEmployersLiabLimitsRateTableDefBuilder().createAndCommit()
  }

  static function anEmployersLiabLimitsRateTableDefBuilder() : RateTableDefinitionBuilder {
    var empLiabParam1 = getParam(10, "EachAccidentLimit", "Dec1")
                      .withColumnLabel("EachAccidentLimit")
                      .withType(RateTableDataType.TC_DECIMAL)
                      .withDisplayType("Normal")
    var empLiabParam2 = getParam(20, "DiseasePolicyLimit", "Dec2")
                      .withColumnLabel("DiseasePolicyLimit")
                      .withType(RateTableDataType.TC_DECIMAL)
                      .withDisplayType("Normal")

    return new RateTableDefinitionBuilder()
      .withCode(WC7_EMPLOYERSLIABLIMITS_RATE)
      .named(WC7_EMPLOYERSLIABLIMITS_RATE.replaceAll("_", " "))
      .withPolicyLine(WC7_LINE)
      .addMatchOperation(getMatchOp(empLiabParam1).withDefinition(EXACT_MATCH_OP_DEF))
      .addMatchOperation(getMatchOp(empLiabParam2).withDefinition(EXACT_MATCH_OP_DEF))
      .addFactor(getFactor("Factor").withColumnLabel("Factor"))
  }
  
 static function aPremDiscountRateTable() : RateTableBuilder {
    return new RateTableBuilder(aPremDiscountRateTableDef())
  }

  static function aPremDiscountRateTableDef() : RateTableDefinition {
    return aPremDiscountRateTableDefBuilder().createAndCommit()
  }


  static function aPremDiscountRateTableDefBuilder() : RateTableDefinitionBuilder {
  
    return new RateTableDefinitionBuilder()
      .withCode(WC7_PREMIUMDISCOUNT_RATE)
      .named(WC7_PREMIUMDISCOUNT_RATE.replaceAll("_", " "))
      .withPolicyLine(WC7_LINE)
      .addMatchOperation(getMatchOp({
          getParam(10, "MIN", "int1", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Min (>=)")
            .withDisplayType("Normal"),
          getParam(20, "MAX", "int2", RateTableDataType.TC_INTEGER)
            .withColumnLabel("Max (<=)")
            .withDisplayType("Normal")
        })
        .withOpName("PREMIUM")
        .withDefinition(RANGE_MAX_INCL_MATCH_OP_DEF)
      ) 
      .addFactor(getFactor("Factor").withColumnLabel("Factor"))
  }
}
