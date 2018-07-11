package gw.lob.wc7
uses gw.api.util.Math

abstract class WC7RatingEffDatedExposureImpl extends WC7RatingEffDatedImpl implements WC7RatingEffDatedExposure {

  construct(theOwner : EffDated) {
    super(theOwner)
  }
  
  override property get BasisForRating() : int {
    var numDaysForRating = this.NumDaysEffectiveForRating 
    var numdays = this.NumDaysEffective
     
    if (numDaysForRating == 0 or numdays == 0) {
      return 0
    }

    // If it's an audit job OR we're rating the whole thing, do no pro-ration
    if (Owner.BranchUntyped typeis PolicyPeriod and (Owner.BranchUntyped.Audit != null or numDaysForRating == numdays)) {
      return this.UnproratedBasisForRating
    } 
    return Math.roundNearest((this.UnproratedBasisForRating as double) * numDaysForRating / numdays) as int
  }  
  
  override property get UnproratedBasisForRating() : int {
    var unproratedBasis = this.AuditedBasis
    if (Owner.BranchUntyped typeis PolicyPeriod and Owner.BranchUntyped.Audit == null) {
      unproratedBasis = this.Basis
    } 
    if (unproratedBasis == null) {
      return 0
    }
    return unproratedBasis
  }
  
  abstract property get Basis() : int
  
  abstract property get AuditedBasis() : int
}
