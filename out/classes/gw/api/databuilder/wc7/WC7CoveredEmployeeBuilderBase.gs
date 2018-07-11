package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.entity.IEntityType
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses gw.entity.IEntityPropertyInfo
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.util.JurisdictionMappingUtil
uses gw.api.database.Query
uses java.util.ArrayList
uses java.math.BigDecimal


/**
 *  Databuilder base for entities that extend {@link WC7CoveredEmployeeBase}
 */
class WC7CoveredEmployeeBuilderBase<T extends WC7CoveredEmployeeBase, B extends WC7CoveredEmployeeBuilderBase> extends DataBuilder<T, B> {
  var _validateClassCode = true
  var _classCodeCode: String
  var _wc7GoverningLaw : WC7GoverningLaw
 
  /**
   *  <ul>
   *   <li>If Location is unset, sets to policy period's primary location</li>
   *   <li>Populate the class code based on the code and domain</li>
   */
  construct(type: IEntityType) {
    super(type)

    withPayroll(100000)
    withAuditedAmount(130000)
    withClassCode("0005")  // exists in most WC Domains, but not all, so be careful

    addPopulator(Integer.MAX_VALUE, new BeanPopulator<WC7CoveredEmployeeBase>() {
      public override function execute(exposure : WC7CoveredEmployeeBase) {
        var period = exposure.WC7WorkersCompLine.Branch
        if (exposure.Location == null) {
          exposure.Location = period.PrimaryLocation
        }
        if (exposure.ClassCode == null && _classCodeCode != null) {
          exposure.ClassCode = findFirstLegalClassCode(exposure)
        }

        if (_validateClassCode && exposure.ClassCode != null) {
          var excludedClassCodeTypes = new ArrayList<WC7ClassCodeType>()
          if (WC7GoverningLaw.TC_LONGSHOREANDHARBOR.equals(_wc7GoverningLaw)) {
            // Exclude USLH class code types
            excludedClassCodeTypes = {typekey.WC7ClassCodeType.TC_USLH}
          }
          var classCode = exposure.WC7WorkersCompLine.doesClassCodeExist(exposure.ClassCode.Code, 
                                                                         JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(exposure.Location), 
                                                                         null, 
                                                                         null, 
                                                                         excludedClassCodeTypes)          
          if (classCode == null) {
            throw displaykey.Builder.WCCoveredEmployee.Error.InvalidClassCode(_classCodeCode, exposure.Location.State, period.EditEffectiveDate)
          }
        }
      }
    })
  }
  
  private function findFirstLegalClassCode(exposure : WC7CoveredEmployeeBase) : WC7ClassCode {
    var jurisdiction = JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(exposure.Location)
    var result = Query.make(WC7ClassCode)
      .compare("Code", Equals, _classCodeCode)
      .compare("Jurisdiction", Equals, jurisdiction)
    return result.select().FirstResult
  }

  function validateClassCode(validate: boolean): B {
    _validateClassCode = validate
    return this as B
  }

  /**
   * Same as {@link #withBasisAmount(Integer)}
   */
  final function withPayroll(payroll : Integer) : B {
    return withBasisAmount(payroll)
  }
  
  final function withBasisAmount(basisAmount : Integer) : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("BASISAMOUNT"), basisAmount)
    return this as B
  }

  final function withAuditedAmount(auditedAmount : Integer) : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("AUDITEDAMOUNT"), auditedAmount)
    return this as B
  }

  final function withLocation(locationBuilder : PolicyLocationBuilder) : B {
    var locationProp = WC7CoveredEmployee.Type.TypeInfo.getProperty("LOCATION") as IEntityPropertyInfo
    addPopulator(new BuilderPropertyPopulator(locationProp, locationBuilder))
    return this as B
  }

  final function withClassCode(code : WC7ClassCode) : B {
    set(WC7FedCoveredEmployee.Type.TypeInfo.getProperty("ClassCode"), code)
    return this as B
  }

  final function withClassCode(code : String) : B {
    _classCodeCode = code
    return this as B
  }

  final function withSpecificDiseaseLoaded() : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("SpecificDiseaseLoaded"), true)
    return this as B
  }

  final function withNoSpecificDiseaseLoaded() : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("SpecificDiseaseLoaded"), false)
    return this as B
  }

  final function withSupplementalDiseaseLoaded() : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("SupplementalDiseaseLoaded"), true)
    return this as B
  }

  final function withNoSupplementalDiseaseLoaded() : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("SupplementalDiseaseLoaded"), false)
    return this as B
  }

  final function withSupplementalLoadingRate(rate : BigDecimal) : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("SupplementalDiseaseLoadingRate"), rate)
    return this as B
  }
  
   final function withClassCodeRate(rate : BigDecimal) : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("ClassCodeRate"), rate)
    return this as B
  }

  final function withWC7GoverningLawCoverage(governingLawCov : WC7GoverningLaw) : B {
    _wc7GoverningLaw = governingLawCov
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("GoverningLaw"), governingLawCov)
    return this as B
  }
  
  final function asIfAny() : B {
    set(WC7CoveredEmployee.Type.TypeInfo.getProperty("IfAnyExposure"), true)
    withBasisAmount(null)
    return this as B
  }
}
