package gw.lob.wc7.options

/**
 * A pogo to model options as found on the 'WC Options' in the wizard.  
 * This includes Retrospective Rating Plan, Participating Plan, and Manuscript
 */
@Export
abstract class WC7Option {

  private var _policyPeriod : PolicyPeriod as readonly Period

  //This is "Boolean" rather than "boolean" so that it can be lazily initialized from the null state
  private var _showOnMenu : Boolean = null

  construct (policyPeriod: PolicyPeriod) {
    _policyPeriod = policyPeriod
  }

  abstract property get Label() : String
  abstract property get Mode() : String

  property get ShowOnMenu() : boolean {
    if (_showOnMenu == null) {
      _showOnMenu = not isOnPolicy()
    }
    return _showOnMenu
  }

  property get WCLine() : WC7WorkersCompLine {
    return _policyPeriod.WC7Line
  }

  protected abstract function addToPolicy()
  protected abstract function removeFromPolicy()
  protected abstract function isOnPolicy() : boolean

  function moveFromMenuToActiveList() {
    _showOnMenu = false
    addToPolicy()
  }

  function moveToMenuFromActiveList() {
    _showOnMenu = true
    removeFromPolicy()
  }

  static function createOptionList(policyPeriod : PolicyPeriod) : List<WC7Option> {
    return {
      new WC7RetrospectiveRatingPlanWCOption(policyPeriod)
      , new WC7ParticipatingPlanWCOption(policyPeriod)
      , new WC7ManuscriptWCOption(policyPeriod)
    }
  }
}