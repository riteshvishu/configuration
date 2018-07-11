package gw.rating.flow
uses typekey.CalcRoutineParamName
uses entity.CalcRoutineDefinition
uses typekey.CalcStepOperandType
uses entity.RateTableArgumentSourceSet
uses typekey.CalcStepType
uses entity.CalcRoutineParameterSet
uses typekey.RoundingScaleType
uses typekey.VehicleType
uses typekey.CalcStepOperatorType
uses java.lang.String
uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.rating.flow.builders.CalcStepDefinitionOperandBuilder
uses gw.rating.flow.builders.CalcStepDefinitionRateFactorBuilder
uses gw.rating.flow.builders.CalcStepDefinitionArgumentBuilder
uses gw.rating.flow.builders.CalcStepDefinitionBuilder
uses java.math.BigDecimal
uses gw.api.database.Query
uses gw.rating.flow.scenario.PARateflowScenario

class BigRateRoutine {
  
  public static final var BIG_RATE_ROUTINE_CODE : String = "PA_ENORMOUS_ROUTINE"

  private construct() {} // don't allow "new" on this class

  static function getOrCreateBigRateRoutine() : CalcRoutineDefinition {
    var bigRR = Query.make(CalcRoutineDefinition)
      .compare("Code", Equals, BIG_RATE_ROUTINE_CODE)
      .select()
      .AtMostOneRow
    
    if (bigRR == null) {
      gw.transaction.Transaction.runWithNewBundle(\ b ->{
        bigRR = baseRateVehicleCoverageCalcRoutineBldr().create(b)
      }, "su")
    }
    
    return bigRR
  }

  static function baseRateVehicleCoverageCalcRoutineBldr() : CalcRoutineDefinitionBuilder {
    var baseArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COV_BASE_RATE, "DEFAULT") 
    var covsArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_COVERAGES, "DEFAULT") 
    var uwArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_UW_COMPANY, "DEFAULT") 
    var minArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PARateflowScenario.PA_MINIMUMPREMIUM_CODE, "DEFAULT") 
    var typeArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", PARateflowScenario.PA_VEHICLE_TYPE_CODE, "DEFAULT") 
    var costArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_VEHICLE_COST, "DEFAULT") 
    var ageArgumentSet = CalcStepDefinitionOperandBuilder.getArgumentSourceSet("PersonalAutoLine", SampleDataTablesBuilder.PA_DRIVER_AGE, "DEFAULT") 

    var baseRateLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withDefaultArgumentSources(baseArgumentSet)
        
    var vehicleTypeFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PARateflowScenario.PA_VEHICLE_TYPE_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PARateflowScenario.PA_VEHICLE_TYPE_FACTOR))
        .withDefaultArgumentSources(typeArgumentSet)

    var vehicleCostFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(SampleDataTablesBuilder.PA_VEHICLE_COST)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_VEHICLE_COST_FACTOR))
        .withDefaultArgumentSources(costArgumentSet)

    // Steps with Builder separated out so that comments can be added.`

    var baseRateRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_HALFUP)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_3))
        
    var adjRateAssignmentStep = new CalcStepDefinitionBuilder()
      .withStepType( TC_ASSIGNMENT )
      .withInScopeLocation(TC_COSTDATA, "AdjustedRate")
      .withStoreType(BigDecimal)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, "BaseRate", "java.math.BigDecimal", false))
                
   var dollarCapRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_DOWN)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_0))

   var percentCapRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_DOWN)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_0))
        
    var priorTermAmountOperand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false)
        .withOperandOrder(1)

    var capAmountOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withLocalVariable("cap")
          .withLocalVariableFieldName(SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT)
          .withOperandOrder(1)
    
    var capPercentOperand = new CalcStepDefinitionOperandBuilder()
          .withOperatorType(null)
          .withLocalVariable("cap")
          .withLocalVariableFieldName(SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT)
          .withOperandOrder(1)
                  
    var builder = new CalcRoutineDefinitionBuilder()
        .withCode(BIG_RATE_ROUTINE_CODE)
        .withName("PA Enormous Rate Routine")
        .withParamSet(SampleDataTablesBuilder.PAVehicleCoverageParamSet)
        
.sectionCommentStep("Base Rate and Adjusted Rate calculation")
        builder.storeToCostDataField("BaseRate", baseRateLookup)
        .withStep(baseRateRoundingStep
          .withNotes("Round Base Rate to thousandths (Round Half Up)"))
        .storeValue("vehicleTypeFactor", vehicleTypeFactorLookup)
        .storeValue("vehicleCostFactor", vehicleCostFactorLookup)
        .withStep(adjRateAssignmentStep
          .withNotes("Determine Adjusted Rate"))
          
var stop = 50
var incr = 50
for (i in 1..99) {
  if (i*5 == stop) {
    builder.sectionCommentStep("BaseRate/AdjRate step " + (i*5))
    incr = incr + 25
    stop = stop + incr
  }
  
    var uwCompanyLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_UW_COMPANY)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_UW_COMPANY_FACTOR))
        .withDefaultArgumentSources(uwArgumentSet)

    var coverageLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_COVERAGES)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_COVERAGES_FACTOR))
        .withDefaultArgumentSources(covsArgumentSet)

    var multiCarDiscountModifier = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(TC_POLICYLINE, "PAMultiCarDiscount", "java.math.BigDecimal", true)

    var driverAgeFactorLookup = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withTableCode(SampleDataTablesBuilder.PA_DRIVER_AGE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(SampleDataTablesBuilder.PA_DRIVER_AGE_FACTOR))
        .withDefaultArgumentSources(ageArgumentSet)

    var minFunction = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_MULTIPLICATION)
        .withFunctionName("min(java.math.BigDecimal, java.math.BigDecimal)")
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
          .withParamType("java.math.BigDecimal")
          .withParam("num1")
          .withLocalVariable("vehicleCostFactor"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
          .withParamType("java.math.BigDecimal")
          .withParam("num2")
          .withLocalVariable("vehicleTypeFactor"))

        builder.mathStep(coverageLookup)
        .mathStep(uwCompanyLookup)
        .mathStep(multiCarDiscountModifier)
        .mathStep(minFunction)
        .mathStep(driverAgeFactorLookup)
}

builder.blankStep()
.sectionCommentStep("Term Amount Determination")
stop = 140
incr = 140
for (i in 1..139) {
  if (i*7 == stop) {
    builder.sectionCommentStep("Term Amount step " +(i*7))
    incr = incr + 70
    stop = stop + incr
  }
    var subOperand1 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withCostDataField("AdjustedRate")
        .withOperandOrder(1)

    var subOperand2 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_LESSTHAN)
        .withOperandType(TC_RATETABLE)
        .withOperandOrder(2)
        .withTableCode(PARateflowScenario.PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PARateflowScenario.PA_MINIMUMPREMIUM_FACTOR))
        .withDefaultArgumentSources(minArgumentSet)

    var subOperand3 = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_AND)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(TC_VEHICLE, "VehicleType", "typekey.VehicleType", false)
        .withOperandOrder(3)

    var subOperand4 = new CalcStepDefinitionOperandBuilder()
        .withTypeListConstant(VehicleType.TC_OTHER)
        .withOperatorType(TC_EQUAL)
        .withOperandOrder(4)

    var termAmountRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_UP)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_MINUS1))

   var dollarRoundingStep = new CalcStepDefinitionBuilder()
      .withStepType(TC_CONTINUE)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_UP)
        .withOperandType(TC_ROUNDING)
        .withRoundingScale(TC_0))
        
    var termAmountAssignmentStep = new CalcStepDefinitionBuilder()
      .withStepType( TC_ASSIGNMENT )
      .withInScopeLocation(TC_COSTDATA, "TermAmount")
      .withStoreType(BigDecimal)
      .withOperand(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, "AdjustedRate", "java.math.BigDecimal", false))

    var minimumPremiumLookup = new CalcStepDefinitionOperandBuilder()
        .withTableCode(PARateflowScenario.PA_MINIMUMPREMIUM_CODE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(PARateflowScenario.PA_MINIMUMPREMIUM_FACTOR))
        .withDefaultArgumentSources(minArgumentSet)

        builder.ifConditional({subOperand1, subOperand2, subOperand3, subOperand4})
        .storeToCostDataField("TermAmount", minimumPremiumLookup)
        .withStep(termAmountRoundingStep
          .withNotes("Round Up minimum premium to 10s dollars"))
        .elseStep()
        .withStep(termAmountAssignmentStep
          .withNotes("Otherwise round to dollars"))
        .withStep(dollarRoundingStep)
        .endifStep()
}
builder.blankStep()
.sectionCommentStep("Apply coverage level renewal capping")

        builder.ifConditional({priorTermAmountOperand, compareNotNull()}, "Can only compute cap if we have prior term amount")
          .storeRateTableLookup("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP, {
            new CalcStepDefinitionArgumentBuilder().withParam("COV_CODE"),
            new CalcStepDefinitionArgumentBuilder().withParam("AMOUNT").withCostDataField("TermAmount")
            }, {SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT, SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT}, "DEFAULT")
          .ifConditional({capAmountOperand, compareNotNull()}, "Cap based on absolute amount")
            .storeToCostDataField("CappedTermAmount", 
                new CalcStepDefinitionOperandBuilder()
                  .withFunctionName("capPremiumByAmount(java.math.BigDecimal, java.math.BigDecimal, java.math.BigDecimal)", java.math.BigDecimal)
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("value").withCostDataField("TermAmount").withParamType("java.math.BigDecimal"))
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("priorValue").withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false).withParamType("java.math.BigDecimal"))
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("allowedChangeAmount").withLocalVariable("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP_AMOUNT).withParamType("java.math.BigDecimal"))
             )
             .withStep(dollarCapRoundingStep.withNotes("because we cannot exceed cap, must round down"))
          .elseifConditional({capPercentOperand, compareNotNull()}, "Cap based on percentage")
            .storeToCostDataField("CappedTermAmount", 
                new CalcStepDefinitionOperandBuilder()
                  .withFunctionName("capPremiumByPercent(java.math.BigDecimal, java.math.BigDecimal, java.math.BigDecimal)", java.math.BigDecimal)
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("value").withCostDataField("TermAmount").withParamType("java.math.BigDecimal"))
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("priorValue").withInScope(TC_PREVIOUSTERMAMOUNT, null, "java.math.BigDecimal", false).withParamType("java.math.BigDecimal"))
                  .withArgumentSource(new CalcStepDefinitionArgumentBuilder().withParam("allowedChangePercent").withLocalVariable("cap", SampleDataTablesBuilder.PA_RENEWAL_CAP_PERCENT).withParamType("java.math.BigDecimal"))
             )
             .withStep(percentCapRoundingStep.withNotes("because we cannot exceed cap, must round down"))
         .endifStep()
        .endifStep() // rate capping

    return builder
  }

  private static function compareNotNull() : CalcStepDefinitionOperandBuilder {
   return new CalcStepDefinitionOperandBuilder()
      .withOperatorType(TC_NOTEQUAL)
      .withConstant("null")
      .withOperandOrder(2)
  }

}
