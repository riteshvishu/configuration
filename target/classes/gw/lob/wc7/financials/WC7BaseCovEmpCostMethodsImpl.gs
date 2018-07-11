package gw.lob.wc7.financials

uses java.lang.Integer
uses gw.api.util.JurisdictionMappingUtil
uses gw.lob.wc7.WC7RatingEffDatedExposure

/**
 * Abstract base class for costs associated with a {@link WC7CoveredEmployeeBase}
 * The linked {@link WC7CoveredEmployeeBase} associated with the cost is used to provide most of the values.
 */
@Export
abstract class WC7BaseCovEmpCostMethodsImpl<T extends WC7Cost> extends WC7GenericWC7CostMethodsImpl<T> {
  
  construct( owner : T ){
    super( owner )
  }

  override property get JurisdictionState() : Jurisdiction {
    return JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(CoveredEmployee.Location )
  }

  override property get LocationNum() : Integer {
    return CoveredEmployee.Location.LocationNum
  }

  override property get ClassCode() : String {
    return CoveredEmployee.ClassCode.Code
  }

  override property get Description() : String {
    return CoveredEmployee.ClassCode.Classification
  }

  override property get AuditableRatingEffDated() : Auditable & WC7RatingEffDatedExposure  {
    return CoveredEmployee
  }
  
  /**
   * Return the {@link WC7CoveredEmployeeBase} associated with this cost.
   */
  abstract property get CoveredEmployee() : WC7CoveredEmployeeBase
}
