package gw.lob.wc7.options

/**
 * A pogo for exposing {@link WC7Option} functionality for {@link entity.WC7ParticipatingPlan}
 */
@Export
class WC7ManuscriptWCOption extends WC7Option {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override property get Label() : String {
    return displaykey.Web.Policy.WC.ManuscriptOption
  }

  override property get Mode() : String {
    return "ManuscriptOption"
  }

  override function addToPolicy() {
    WCLine.HasWC7ManuscriptOptions = true
  }

  override function removeFromPolicy() {
    WCLine.HasWC7ManuscriptOptions = false
  }

  override function isOnPolicy() : boolean {
    return WCLine.HasWC7ManuscriptOptions
  }
}