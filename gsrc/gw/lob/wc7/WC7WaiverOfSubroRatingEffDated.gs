package gw.lob.wc7

class WC7WaiverOfSubroRatingEffDated extends WC7RatingEffDatedExposureImpl {

  var _waiverSubro : WC7WaiverOfSubro
  
  construct(theOwner : WC7WaiverOfSubro) {
    super(theOwner)
    _waiverSubro = theOwner
  }

  override property get Basis() : int {
    return _waiverSubro.BasisAmount
  }

  override property get AuditedBasis() : int {
    return _waiverSubro.AuditedAmount
  }

  override property get BasedOnBasisForRating() : int {
    return _waiverSubro.BasedOn.BasisForRating
  }
}