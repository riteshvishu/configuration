package gw.api.databuilder.wc7

uses gw.api.builder.CoverageBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses java.util.Date
uses gw.api.productmodel.CoveragePattern
uses java.math.BigDecimal
uses gw.api.productmodel.ModifierPattern

@Export
class WC7JurisdictionBuilder extends DataBuilder<WC7Jurisdiction, WC7JurisdictionBuilder> {

  var _state : Jurisdiction as readonly Jurisdiction
  var _anniversaryDate : Date

  construct(state : Jurisdiction) {
    super(WC7Jurisdiction)
    _state = state
    populateJurisdiction(true)
  }
  
  construct(state : Jurisdiction, withBenefitsDeductible : boolean) {
    super(WC7Jurisdiction)
    _state = state
    populateJurisdiction(withBenefitsDeductible)
  }

  protected override function createBean(context : BuilderContext) : WC7Jurisdiction {
    var line = context.ParentBean as WC7WorkersCompLine
    var wcJurisdiction = line.addJurisdiction(_state) 
    return wcJurisdiction
  }

  function setRateModifierValue(modifierPatternCode : String, rate : double) : WC7JurisdictionBuilder {
    addArrayElement(WC7Jurisdiction.Type.TypeInfo.getProperty("WC7MODIFIERS"), 
                    new WC7ModifierBuilder(modifierPatternCode)
                        .withRateValue(rate)
                        .withBooleanValue(true))
    return this
  }

  function withCoverage(coverageBuilder : CoverageBuilder) : WC7JurisdictionBuilder {
    addArrayElement(WC7Jurisdiction.Type.TypeInfo.getProperty("COVERAGES"), coverageBuilder)
    return this
  }

  function withWaiverOfSubrogation(waiverBuilder : WC7WaiverOfSubroBuilder) : WC7JurisdictionBuilder {
    addAdditiveArrayElement(WC7Jurisdiction.Type.TypeInfo.getProperty("CONDITIONS"), waiverBuilder)
    return this
  }

  function withRPSD(rpsdDate : Date, rpsdType : RPSDType) : WC7JurisdictionBuilder {
    addAdditiveArrayElement(WC7Jurisdiction.Type.TypeInfo.getProperty("WC7RATINGPERIODSTARTDATES"), 
                            new WC7RatingPeriodStartDateBuilder().withDate(rpsdDate).withType(rpsdType))
    return this
  }

  function withAnniversaryDate(anniversaryDate : Date) : WC7JurisdictionBuilder {
    _anniversaryDate = anniversaryDate
    return this
  }

  function withWC7Modifier(modifier : WC7ModifierBuilder) : WC7JurisdictionBuilder {
    addArrayElement(WC7Jurisdiction.Type.TypeInfo.getProperty("WC7MODIFIERS"), modifier)
    return this
  }

  function withCPAPModifier(amount : BigDecimal)  : WC7JurisdictionBuilder {
    var cpapModifierPattern : ModifierPattern = "WC7CPAPModifier"
    
    this.withWC7Modifier(new WC7ModifierBuilder(cpapModifierPattern)
            .withEligible()
            .withRateValue(amount.doubleValue()))
    return this
  }

  function withExperienceModifier(amount : BigDecimal)  : WC7JurisdictionBuilder {
    var expModifierPattern : ModifierPattern = "WC7ExpMod"
    
    this.withWC7Modifier(new WC7ModifierBuilder(expModifierPattern)
            .withEligible()
            .withRateValue(amount.doubleValue()))
    return this
  }
  
  private function populateJurisdiction(withBenefitsDeductible : boolean) {
    addPopulator(Integer.MAX_VALUE, new BeanPopulator<WC7Jurisdiction>() {
        override function execute(wc7Jurisdiction : WC7Jurisdiction) {
          if (_anniversaryDate != null) {
            wc7Jurisdiction.AnniversaryDate = _anniversaryDate
          }
          if (withBenefitsDeductible and not wc7Jurisdiction.WC7BenefitsDedCovExists) {
            var benefitsDedCov : CoveragePattern = "WC7BenefitsDedCov"
            wc7Jurisdiction.setCoverageExists(benefitsDedCov, true)
            new WC7SubmissionBuilderHelper().setupBenefitsDedCov(wc7Jurisdiction)
          }
        }
      })   
  }
}
