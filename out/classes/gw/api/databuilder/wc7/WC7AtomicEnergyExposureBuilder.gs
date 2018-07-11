package gw.api.databuilder.wc7
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses java.lang.Integer
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.builder.PolicyLocationBuilder
uses gw.entity.IEntityPropertyInfo
uses java.math.BigDecimal

@Export
class WC7AtomicEnergyExposureBuilder extends DataBuilder<WC7AtomicEnergyExposure, WC7AtomicEnergyExposureBuilder> {
  
  var _classCode : entity.WC7ClassCode as ClassCode
   
  construct() {
    super(WC7AtomicEnergyExposure)
  }
  
  protected override function createBean(context : BuilderContext) : WC7AtomicEnergyExposure {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var exposure = line.createAndAddAtomicEnergyExposure()
    if (exposure.Location == null) {
      exposure.Location = line.Branch.PrimaryLocation   
    }
    return exposure
  }

  final function withBasisAmount(theAmount : Integer) : WC7AtomicEnergyExposureBuilder {
    set(WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("BasisAmount"), theAmount)
    return this
  }

  final function asIfAny() : WC7AtomicEnergyExposureBuilder {
    set(WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("IfAnyExposure"), true)
    return this
  }
  
  final function withClassCode(code : WC7ClassCode) : WC7AtomicEnergyExposureBuilder {
    set(WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("ClassCode"), code)
    return this
  }
  
  final function withRate(rate : BigDecimal) :  WC7AtomicEnergyExposureBuilder {
    set(WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("Rate"), rate)
    return this
  }
  
  final function withLocation(locationBuilder : PolicyLocationBuilder) : WC7AtomicEnergyExposureBuilder {
    var locationProp = WC7AtomicEnergyExposure.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo
    addPopulator(new BuilderPropertyPopulator(locationProp, locationBuilder))
    return this
  }
}
