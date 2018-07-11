package gw.plugin.billing.bc700
uses gw.plugin.billing.BillingAccountInfo
uses java.math.BigDecimal
uses wsi.remote.gw.webservice.bc.bc700.billingsummaryapi.types.complex.BCPCAccountBillingSummary
uses gw.plugin.billing.BillingPaymentInfo
uses gw.plugin.billing.BillingContactInfo

@Export
class BCAccountBillingSummaryWrapper implements BillingAccountInfo{
  var _soapObject : BCPCAccountBillingSummary

  construct(o : BCPCAccountBillingSummary) {
    _soapObject = o
  }

  override property get BilledOutstandingCurrent() : BigDecimal {
    return _soapObject.BilledOutstandingCurrent
  }

  override property get BilledOutstandingPastDue() : BigDecimal {
    return _soapObject.BilledOutstandingPastDue
  }

  override property get BilledOutstandingTotal() : BigDecimal {
    return _soapObject.BilledOutstandingTotal
  }

  override property get BillingSettings() : BillingPaymentInfo {
    return new BCAccountBillingSettingsWrapper(_soapObject.BillingSettings.$TypeInstance)
  }

  override property get CollateralChargesBilled() : BigDecimal {
    return _soapObject.CollateralChargesBilled
  }

  override property get CollateralChargesPastDue() : BigDecimal {
    return _soapObject.CollateralChargesPastDue
  }

  override property get CollateralChargesUnbilled() : BigDecimal {
    return _soapObject.CollateralChargesUnbilled
  }

  override property get CollateralHeld() : BigDecimal {
    return _soapObject.CollateralHeld
  }

  override property get CollateralRequirement() : BigDecimal {
    return _soapObject.CollateralRequirement
  }

  override property get Delinquent() : boolean {
    return _soapObject.Delinquent
  }

  override property get UnappliedFundsTotal() : BigDecimal {
    return _soapObject.UnappliedFundsTotal
  }

  override property get UnbilledTotal() : BigDecimal {
    return _soapObject.UnbilledTotal
  }

  override property get PrimaryPayer() : BillingContactInfo {
    return new BCContactSummaryWrapper(_soapObject.PrimaryPayer)
  }

  override property get AccountName() : String {
    return _soapObject.AccountName
  }

  override property get AccountNameKanji() : String {
    return null // not available for bc 700
  }

}
