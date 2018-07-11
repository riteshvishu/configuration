package gw.lob.wc7.options

/**
 * A pogo for exposing {@link WC7Option} functionality for {@link entity.WC7ManuscriptOption}
 */
@Export
class WC7ParticipatingPlanWCOption extends WC7Option {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return displaykey.Web.Policy.WC.ParticipatingPlan
  }

  override property get Mode() : String {
    return "ParticipatingPlan"
  }

  override function addToPolicy() {
    WCLine.HasParticipatingPlan = true
  }

  override function removeFromPolicy() {
    WCLine.HasParticipatingPlan = false
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasParticipatingPlan
  }
}