package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.util.DateUtil
uses java.math.BigDecimal
uses java.util.Date
uses gw.api.databuilder.BuilderContext
uses gw.api.util.JurisdictionMappingUtil

/**
 * Databuidler for P@link WC7RetrospectiveRatingPlan}
 */
@Export
class WC7RetrospectiveRatingPlanBuilder extends DataBuilder<WC7RetrospectiveRatingPlan, WC7RetrospectiveRatingPlanBuilder> {
  
  var _defaultLetterOfCredit : boolean
  var _defaultStateMultiplier : boolean

  construct() {
    super(WC7RetrospectiveRatingPlan)        
    withIncludeALAE(true)
    withLossConversionFactor( 1 )
    withLossLimitAmount( 3437 )
    withEstimatedStandardPremium( 343 )
    withFirstComputationDate( DateUtil.createDateInstance( 8, 1, 2009 ) )
    withLastComputationDate( DateUtil.createDateInstance( 8, 1, 2010 ) )
    withComputationInterval( 12 )
    withMinRetroPremiumRatio( 1.5 )
    withMaxRetroPremiumRatio( 1.75 )
    withDefaultLetterOfCreditAndStateMultiplier()
  }
  
  final function withIncludeALAE(include: boolean): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("IncludeALAE"), include)
    return this
  }

  final function withLossConversionFactor(value: BigDecimal): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LossConversionFactor"), value)
    return this
  }

  final function withLossLimitAmount(value: BigDecimal): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LossLimitAmount"), value)
    return this
  }

  final function withEstimatedStandardPremium(value: BigDecimal): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("EstimatedStandardPremium"), value)
    return this
  }

  final function withFirstComputationDate(date: Date): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("FirstComputationDate"), date)
    return this
  }

  final function withLastComputationDate(date: Date): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LastComputationDate"), date)
    return this
  }

  final function withComputationInterval(value: int): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("ComputationInterval"), value)
    return this
  }

  final function withMinRetroPremiumRatio(value: BigDecimal): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("MinRetroPremiumRatio"), value)
    return this
  }

  final function withMaxRetroPremiumRatio(value: BigDecimal): WC7RetrospectiveRatingPlanBuilder {
    set(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("MaxRetroPremiumRatio"), value)
    return this
  }

  final function withLetterOfCredit(letter : WC7RetroRatingLetterOfCreditBuilder) : WC7RetrospectiveRatingPlanBuilder {
    addAdditiveArrayElement(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LettersOfCredit"), letter)
    return this
  }

  final function withStateMultiplier(multiplier : WC7JurisdictionMultiplierBuilder) : WC7RetrospectiveRatingPlanBuilder {
    addAdditiveArrayElement(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("JurisdictionMultipliers"), multiplier)
    return this
  }

  function withNoLettersOfCredit() : WC7RetrospectiveRatingPlanBuilder {
    _defaultLetterOfCredit = false
    removePopulator(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LettersOfCredit"))
    return this
  }

  function withNoStateMultipliers() : WC7RetrospectiveRatingPlanBuilder {
    _defaultStateMultiplier = false
    removePopulator(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("JurisdictionMultipliers"))
    return this
  }
  
  final function withDefaultLetterOfCreditAndStateMultiplier() : WC7RetrospectiveRatingPlanBuilder {
    _defaultLetterOfCredit = true
    _defaultStateMultiplier = true
    return this
  }
  
  override protected function createBean( context : BuilderContext) : WC7RetrospectiveRatingPlan {
    if (_defaultStateMultiplier and (getPopulator(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("JurisdictionMultipliers")) == null)){
      var container = context.getParentBean() as WC7WorkersCompLine
      var primaryLoc = container.Branch.PrimaryLocation
      var defaultJurisdiction = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(primaryLoc)
      withStateMultiplier(new WC7JurisdictionMultiplierBuilder().withState(defaultJurisdiction))
    }
    if (_defaultLetterOfCredit and (getPopulator(WC7RetrospectiveRatingPlan.Type.TypeInfo.getProperty("LettersOfCredit")) == null)){
      withLetterOfCredit(new WC7RetroRatingLetterOfCreditBuilder())
    }
    return super.createBean(context)
  }
}

