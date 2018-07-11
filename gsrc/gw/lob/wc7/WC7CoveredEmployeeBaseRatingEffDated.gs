package gw.lob.wc7

/**
 * The implementation for {@link WC7RatingEffDated} for {@link entity.WC7CoveredEmployeeBase}
 */
@Export
class WC7CoveredEmployeeBaseRatingEffDated extends WC7RatingEffDatedExposureImpl {
  
  var _covEmp : WC7CoveredEmployeeBase
  
  construct(theOwner : WC7CoveredEmployeeBase) {
    super(theOwner)
    _covEmp = theOwner
  }

  override property get Basis() : int {
    return _covEmp.BasisAmount
  }

  override property get AuditedBasis() : int {
    return _covEmp.AuditedAmount
  }  
  
  override property get BasedOnBasisForRating() : int {
    return _covEmp.BasedOn != null ? _covEmp.BasedOn.BasisForRating : null
  }
}
