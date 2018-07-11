package gw.lob.wc7.financials
uses java.lang.Integer
uses gw.lob.wc7.WC7RatingEffDatedExposure

class WC7SupplementaryDiseaseCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7SupplDiseaseCost> {

  construct(owner : WC7SupplDiseaseCost) {
    super(owner)
  }
  
  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7SupplDiseaseExposure.Jurisdiction.Jurisdiction
  }

  override property get LocationNum() : Integer {
    return Cost.WC7SupplDiseaseExposure.Location.LocationNum
  }

  override property get ClassCode() : String {
    return Cost.WC7SupplDiseaseExposure.DiseaseCode.Code
  }

  override property get Description() : String {
    return Cost.WC7SupplDiseaseExposure.DiseaseCode.SupplDiseaseLoadingType
  }

  property get SupplementaryDiseaseExposure() : WC7SupplDiseaseExposure {
    return Cost.WC7SupplDiseaseExposure
  }

  override property get AuditableRatingEffDated() : Auditable & WC7RatingEffDatedExposure  {
    return Cost.WC7SupplDiseaseExposure
  }
}
