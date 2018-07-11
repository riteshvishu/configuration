package gw.lob.wc7.financials
uses java.lang.Integer
uses gw.lob.wc7.WC7RatingEffDatedExposure

/**
 * A class for costs associated with a {@link WC7AtomicEnergyCost}
 * The linked {@link WC7AtomicEnergyCost} associated with the cost is used to provide most of the values.
 */
@Export
class WC7AtomicEnergyCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7AtomicEnergyCost> {

  construct(owner : WC7AtomicEnergyCost) {
    super(owner)
  }
  
  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7AtomicEnergyExposure.Jurisdiction.Jurisdiction
  }

  override property get LocationNum() : Integer {
    return Cost.WC7AtomicEnergyExposure.Location.LocationNum
  }

  override property get ClassCode() : String {
    return Cost.WC7AtomicEnergyExposure.ClassCode.Code
  }

  override property get Description() : String {
    return Cost.WC7AtomicEnergyExposure.ClassCode.Classification
  }

  property get AtomicEnergyExposure() : WC7AtomicEnergyExposure {
    return Cost.WC7AtomicEnergyExposure
  }

  override property get AuditableRatingEffDated() : Auditable & WC7RatingEffDatedExposure  {
    return Cost.WC7AtomicEnergyExposure
  }
}

