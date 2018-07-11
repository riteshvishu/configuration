package gw.lob.wc7.options

/**
 * A pogo for exposing {@link WC7Option} functionality for {@link entity.WC7RetrospectiveRatingPlan}
 */
@Export
class WC7RetrospectiveRatingPlanWCOption extends WC7Option {
  
  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return displaykey.Web.Policy.WC.RetroRatingPlan
  }

  override property get Mode() : String {
    return "RetrospectiveRatingPlan"
  }
  
  override function addToPolicy() {
    WCLine.createAndAddWC7RetrospectiveRatingPlanWM() 
  }

  override function removeFromPolicy() {
    WCLine.removeWC7RetrospectiveRatingPlanWM()
  }

  override function isOnPolicy() : boolean {
    return WCLine.RetrospectiveRatingPlan != null
  }
}