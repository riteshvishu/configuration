package gw.lob.wc7.financials
uses java.lang.Integer
uses gw.lob.wc7.WC7RatingEffDatedExposure

/**
 * Additional methods and properties provided by the costs that supply this interface.
 */
@Export
interface WC7CostMethods {
  /**
   *  The Jurisdiction related to this Cost
   */
  property get JurisdictionState() : Jurisdiction

  /**
   *  The LocationNum related to this Cost
   */
  property get LocationNum() : Integer
  /**
   *  The ClassCode related to this Cost
   */
  property get ClassCode() : String
  /**
   *  The Description for this Cost
   */
  property get Description() : String

  /**
   * An entity that implements the WC7RatingEffDatedExposure that this cost is associated. It also is an Auditable entity.  
   * Null if no such thing exists (e.g. WC7AircraftSeat).
   */
  property get AuditableRatingEffDated() : WC7RatingEffDatedExposure & Auditable

  /**
   * True if it is possible to override base or adjusted rate, false otherwise.
   */
  property get RatesOverridable() : boolean
  
}
