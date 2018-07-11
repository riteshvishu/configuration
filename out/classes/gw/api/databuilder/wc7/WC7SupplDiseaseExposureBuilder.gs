package gw.api.databuilder.wc7
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses java.lang.Integer
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.builder.PolicyLocationBuilder
uses gw.entity.IEntityPropertyInfo

class WC7SupplDiseaseExposureBuilder extends DataBuilder<WC7SupplDiseaseExposure, WC7SupplDiseaseExposureBuilder> {

  construct() {
    super(WC7SupplDiseaseExposure)
  }
  
  protected override function createBean(context : BuilderContext) : WC7SupplDiseaseExposure {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var exposure = line.createAndAddSupplementaryDiseaseExposure()
    exposure.Location = line.Branch.PrimaryLocation
    return exposure
  }

  final function withJurisdiction(theJurisdiction : Jurisdiction) : WC7SupplDiseaseExposureBuilder {
    set(WC7SupplDiseaseExposure.Type.TypeInfo.getProperty("Jurisdiction"), theJurisdiction)
    return this
  }

  final function withBasisAmount(theAmount : Integer) : WC7SupplDiseaseExposureBuilder {
    set(WC7SupplDiseaseExposure.Type.TypeInfo.getProperty("BasisAmount"), theAmount)
    return this
  }

  final function asIfAny() : WC7SupplDiseaseExposureBuilder {
    set(WC7SupplDiseaseExposure.Type.TypeInfo.getProperty("IfAnyExposure"), true)
    return this
  }
  
  final function withDiseaseCode(theCode : String) : WC7SupplDiseaseExposureBuilder {
    var aQuery = Query.make(WC7DiseaseCode)
    aQuery.compare("Code", Relop.Equals, theCode)
    var queryResults = aQuery.select()
    var theDiseaseCode = queryResults.first()
    set(WC7SupplDiseaseExposure.Type.TypeInfo.getProperty("DiseaseCode"), theDiseaseCode)
    return this
  }
  
  final function withLocation(locationBuilder : PolicyLocationBuilder) : WC7SupplDiseaseExposureBuilder {
    var locationProp = WC7SupplDiseaseExposure.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo
    addPopulator(new BuilderPropertyPopulator(locationProp, locationBuilder))
    return this
  }
}
