package gw.api.databuilder.wc7.scenarios.sample
uses gw.rating.rtm.builders.scenario.RatingScenario
uses java.util.Date
uses gw.rating.rtm.builders.scenario.sample.SampleDataFactorRowBuilder

class WC7RatingSampleDataScenario {

  public static final var WC7_DEMO_RATE_BOOK_CODE : String = "WC7_RTM_Demo_Rating"
  static final var WC7_LINE : String = "WC7Line"

  static final var WC7_CLASSCODE_RATE_TABLE_DATA_SMALL : List<Object[]> = {
    // Classcode              Rate
    {"0005",  4.99000},
    {"0035",  2.99000 },
    {"6251", 0.20000 } ,
    {"6258", 5.69000 } ,
    {"U709F",5.69000 }
    
  }
  
  static final var WC7_MINIMUMPREMIUM_RATE_TABLE_DATA_SMALL : List<Object[]> = {
    // Classcode              MinimumPremium
    {"0005",  574} ,
    {"6251",  627} 
  }
//EmployersLiabIncrLimitsPercent
  static final var WC7_EMPLOYERSLIABLIMIT_RATE_TABLE_DATA_SMALL : List<Object[]> = {
    // EachAccidentLimit , DiseasePolicyLimit,            Factor
    {1000000, 500000, 0 },
    {1000000, 1000000, 2.800 } ,
    {1000000, 10000000, 5.300 } ,  
    {10000000, 10000000, 9.000 },
    {20000000, 20000000, 11.3000 }   
  }
  
//PremiumDiscount
 static final var WC7_PREMIUMDISCOUNT_RATE_TABLE_DATA_SMALL : List<Object[]> = {
    // min , max,            Factor
     {0,          5000,        0 },
     {5001,      95000,       -0.0950},
     {95001,    400000,       -0.1190},
     {400001,     null,       -0.1240}
  }

  static function aRatingSampleDataScenario() : RatingScenario {
    var scenario = new RatingScenario()

    var bookBuilder = scenario.addActiveBook(WC7_DEMO_RATE_BOOK_CODE)
    bookBuilder.withBookName(WC7_DEMO_RATE_BOOK_CODE.replaceAll("_", " "))
      .effectiveOn(Date.createDateInstance(1, 1, 2000))
      .expireOn(null)
      .activeOn(Date.createDateInstance(1, 1, 2000))
      .renewalEffectiveOn(Date.createDateInstance(1, 1, 2001))
      .withPolicyLine(WC7_LINE)

    // ClassCode Rates
    var classCodeRateTable = WC7RatingSampleDataTablesBuilder.aClassCodeRateTable()
    bookBuilder.includeTableWithData(classCodeRateTable, 
       SampleDataFactorRowBuilder.getData(classCodeRateTable.Definition, WC7_CLASSCODE_RATE_TABLE_DATA_SMALL))
    
    //Minimum Premium Rate
    var minimumPremiumRateTable = WC7RatingSampleDataTablesBuilder.aMinimumPremiumRateTable()
    bookBuilder.includeTableWithData(minimumPremiumRateTable, 
       SampleDataFactorRowBuilder.getData(minimumPremiumRateTable.Definition, WC7_MINIMUMPREMIUM_RATE_TABLE_DATA_SMALL))
       
    //Employers Liab Incr Limits Percent
    var employersLiabLimitsRateTable = WC7RatingSampleDataTablesBuilder.anEmployersLiabLimitsRateTable()
    bookBuilder.includeTableWithData(employersLiabLimitsRateTable, 
       SampleDataFactorRowBuilder.getData(employersLiabLimitsRateTable.Definition, WC7_EMPLOYERSLIABLIMIT_RATE_TABLE_DATA_SMALL))
       
    //Premium Discount
    var premDiscountRateTable = WC7RatingSampleDataTablesBuilder.aPremDiscountRateTable()
    bookBuilder.includeTableWithData(premDiscountRateTable, 
       SampleDataFactorRowBuilder.getData(premDiscountRateTable.Definition, WC7_PREMIUMDISCOUNT_RATE_TABLE_DATA_SMALL))
       
    return scenario
  }
}
