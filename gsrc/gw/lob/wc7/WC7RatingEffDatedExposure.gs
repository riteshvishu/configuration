package gw.lob.wc7

interface WC7RatingEffDatedExposure {
  
  /**
   * Returns the BasisAmount prorated, from its own effective period, to the period it is
   * effective for rating, that is, taking any cancellation or audit window into account.
   * If this exposure falls after the cancellation date, or outside of the audit window,
   * then it returns 0 basis.
   */
  property get BasisForRating() : int
  
  /**
   * Returns either the audited amount, or the basis amount depending on if the job is an audit.
   * Returns 0 if the basis is null to handle "If Any Exposure".
   */
  property get UnproratedBasisForRating() : int
  
  /**
   * Returns the basis for rating for the BasedOn of this WC7RatingEffDated
   */
  property get BasedOnBasisForRating() : int
  
}
