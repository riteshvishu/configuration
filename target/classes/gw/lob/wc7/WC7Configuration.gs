package gw.lob.wc7

uses gw.plugin.rateflow.IRateRoutineConfig
uses gw.policy.PolicyLineConfiguration
uses gw.api.productmodel.PolicyLinePattern
uses gw.lob.wc7.rating.WC7RateRoutineConfig

class WC7Configuration extends PolicyLineConfiguration {

  override property get RateRoutineConfig(): IRateRoutineConfig {
    return new WC7RateRoutineConfig()
  }

  override property get AllowedCurrencies(): List<Currency> {
    var pattern = PolicyLinePattern.getByCode(InstalledPolicyLine.TC_WC7.UnlocalizedName)
    return pattern.AvailableCurrenciesByPriority
  }
}