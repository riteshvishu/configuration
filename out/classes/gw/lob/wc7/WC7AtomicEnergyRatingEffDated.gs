package gw.lob.wc7

class WC7AtomicEnergyRatingEffDated extends WC7RatingEffDatedExposureImpl {

  var _atomicEnergy : WC7AtomicEnergyExposure
  
  construct(theOwner : WC7AtomicEnergyExposure) {
    super(theOwner)
    _atomicEnergy = theOwner
  }

  override property get Basis() : int {
    return _atomicEnergy.BasisAmount
  }

  override property get AuditedBasis() : int {
    return _atomicEnergy.AuditedAmount
  }

  override property get BasedOnBasisForRating() : int {
    return _atomicEnergy.BasedOn.BasisForRating
  }

}