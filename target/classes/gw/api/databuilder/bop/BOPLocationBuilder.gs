package gw.api.databuilder.bop

uses java.lang.Integer
uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.populator.BeanPopulator
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.builder.CoverageBuilder
uses gw.entity.IEntityPropertyInfo
uses gw.api.util.CurrencyUtil
uses com.guidewire.testharness.databuilder.populator.EntityPropertyPopulator

@Export
class BOPLocationBuilder extends DataBuilder<BOPLocation, BOPLocationBuilder> {

  construct() {
    super(BOPLocation)
    addPopulator(Integer.MAX_VALUE, new BeanPopulator<BOPLocation>() {
      override function execute(eu : BOPLocation) {
        var period = eu.BOPLine.Branch
        if (eu.Location == null) {
          eu.Location = period.PrimaryLocation
        }
      }
    })
  }

  protected override function createBean(context : BuilderContext) : BOPLocation {
    var line = context.ParentBean as BusinessOwnersLine
    var bopLocation = new BOPLocation(line.Branch)
    line.addToBOPLocations(bopLocation)
    return bopLocation
  }

  function withLocation(policyLocationBuilder : PolicyLocationBuilder) : BOPLocationBuilder {
    addPopulator(new BuilderPropertyPopulator(BOPLocation.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo, policyLocationBuilder))
    return this
  }

  function withBuilding(bopBuildingBuilder : BOPBuildingBuilder) : BOPLocationBuilder {
    addArrayElement(BOPLocation.Type.TypeInfo.getProperty("Buildings"), bopBuildingBuilder)
    return this
  }

  function withCoverage(coverageBuilder : CoverageBuilder) : BOPLocationBuilder {
    addAdditiveArrayElement(BOPLocation.Type.TypeInfo.getProperty("Coverages"), coverageBuilder)
    return this
  }

  function withCurrency(currency : Currency) : BOPLocationBuilder {
//    addPopulator(new EntityPropertyPopulator(BOPLocation.Type.TypeInfo.getProperty("PreferredCoverageCurrency") as IEntityPropertyInfo, currency))
    this.set(BOPLocation#PreferredCoverageCurrency, currency)
    return this
  }

}
