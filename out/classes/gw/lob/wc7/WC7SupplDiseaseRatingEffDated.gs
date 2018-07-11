package gw.lob.wc7

class WC7SupplDiseaseRatingEffDated extends WC7RatingEffDatedExposureImpl {

  var _supplDisease : WC7SupplDiseaseExposure
  
  construct(theOwner : WC7SupplDiseaseExposure) {
    super(theOwner)
    _supplDisease = theOwner
  }

  override property get Basis() : int {
    return _supplDisease.BasisAmount
  }

  override property get AuditedBasis() : int {
    return _supplDisease.AuditedAmount
  }

  override property get BasedOnBasisForRating() : int {
    return _supplDisease.BasedOn.BasisForRating
  }
}
