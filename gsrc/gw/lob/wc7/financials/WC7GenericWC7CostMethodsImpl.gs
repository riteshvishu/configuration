package gw.lob.wc7.financials

uses java.lang.Integer 
uses gw.lob.wc7.WC7RatingEffDatedExposure
uses gw.lob.wc7.WC7RatingEffDatedExposure

/**
 * A default implementation of {@link WC7CostMethods} that returns null for every value.
 */
@Export
class WC7GenericWC7CostMethodsImpl<T extends WC7Cost> implements WC7CostMethods{
  protected var _owner : T as readonly Cost

  construct( owner : T ) {
    _owner = owner
  }

  override property get JurisdictionState() : Jurisdiction {
    return null
  }

  override property get LocationNum() : Integer {
    return null
  }

  override property get ClassCode() : String {
    return null
  }

  override property get Description() : String {
    return null
  }

  override property get AuditableRatingEffDated() : Auditable & WC7RatingEffDatedExposure {
    return null 
  }

  override property get RatesOverridable() : boolean {
    return _owner.Overridable
  }
}
