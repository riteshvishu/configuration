package gw.policy

uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.plugin.Plugins
uses gw.plugin.claimsearch.IClaimSearchPlugin
uses com.guidewire.pl.system.dependency.PLDependencies
uses java.util.Map
uses java.util.HashMap
uses java.util.ArrayList
uses gw.plugin.exchangerate.IFXRatePlugin
uses java.util.HashSet

/**
 * Base implementation for {@link gw.validation.PCValidation PCValidation} for {@link PolicyLine PolicyLines}
 */
@Export
abstract class PolicyLineValidation<T extends PolicyLine> extends PCValidationBase {
  
  var _line : T as Line

  /**
   * @param valContext a context to store validation issues
   * @param polLine the policy line to validate
   */
  construct(valContext : PCValidationContext, polLine : T) {
    super(valContext)
    _line = polLine
  }
  
  /**
   * Call validations that should be done for all policy lines.
   */
  final override function validateImpl() {
    if (not Context.addToVisited( this, "validateImpl")) {
      return
    }
    checkSchedulesAreNotEmpty()
    checkCoverageAndSettlementCurrenciesCompatible()
    checkCoverageCurrenciesOnEachCoverableAreSelfConsistent()
    doValidate()
  }

  /**
   * Call validations that should be done for particular policy lines.
   */
  abstract function doValidate()

  /**
   * Call validations that should be done for a policy line in an Audit job.
   * These validations will namely involve audit amounts and temps.
   */
  final function validateForAudit() {
    if ( not ( Line.Branch.Job typeis Audit ) ) {
      throw displaykey.Validator.ForAuditOnlyError
    }    
    validateLineForAudit()
  }
  
  /**
   * This call should be implemented by any line using audit.
   */
  abstract protected function validateLineForAudit()

  /**
   * Ensure that each schedule has at least one scheduled item.  In the current context, set an error
   * if quoting, otherwise a warning if these conditions are not met.
   */
  protected function checkSchedulesAreNotEmpty() {
    Context.addToVisited(this, "checkSchedulesAreNotEmpty")
    var allSchedules = Line.AllSchedules
    allSchedules.each(\ s -> {
      if (s.ScheduledItems.IsEmpty){
        if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE)) {  
          Context.Result.addError(Line, ValidationLevel.TC_QUOTABLE, displaykey.Web.Policy.Schedule.Validation.AtLeastOneItemInSchedule(s.ScheduleName))
        } else {
          Context.Result.addWarning(Line, ValidationLevel.TC_DEFAULT, displaykey.Web.Policy.Schedule.Validation.AtLeastOneItemInSchedule(s.ScheduleName))
        }
      }
    })
  }

  /**
   * Ensure that the exchange rates between the coverage currencies (default and instantiated) and the settlement
   * currency are available
   */
  private function checkCoverageAndSettlementCurrenciesCompatible() {
    var fxPlugin = PLDependencies.getPluginConfig().getPlugin(IFXRatePlugin)
    var settlementCurrency = Line.Branch.PreferredSettlementCurrency
    var currencyMap = Line.AllCoverages.partition( \ c -> c.Currency)

    for (currency in currencyMap.Keys) {
      if (!fxPlugin.canConvert(currency, settlementCurrency)) {
        for (coverage in currencyMap.get(currency)) {
          Result.addError(Line, ValidationLevel.TC_DEFAULT, displaykey.Web.PolicyLine.Validation.CurrencyExchangeUnsupported(currency.Code, settlementCurrency.Code), "Currency")
        }
      }
    }
  }

  /**
  * As configured from Guildewire, there is an assumption in the UI that all coverage currencies on a coverable are the
   * same.  This validation check ensures that this assumption is not violated.
   * If the UI is reconfigured to display and manage multiple currencies per coverable, this validation will no longer
   * be necessary
  */
  private function checkCoverageCurrenciesOnEachCoverableAreSelfConsistent() {
    for (coverable in Line.AllCoverables) {
      var currencies = new HashSet()
      for (coverage in coverable.CoveragesFromCoverable) {
        currencies.add(coverage.Currency)
        if (currencies.size() > 1) {
          Result.addError(Line, ValidationLevel.TC_DEFAULT, displayKey.Web.PolicyLine.Validation.CoverageCurrenciesInconsistentForCoverage)
          return
        }
      }
    }
  }
}
