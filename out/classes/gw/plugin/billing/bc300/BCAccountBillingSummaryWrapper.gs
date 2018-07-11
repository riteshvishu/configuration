package gw.plugin.billing.bc300
uses gw.plugin.billing.BillingAccountInfo
uses java.math.BigDecimal
uses soap.BCBillingSummaryAPI.entity.BCPCAccountBillingSummary
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
    return new BCAccountBillingSettingsWrapper(_soapObject.BillingSettings)
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
    return null // not available for bc 300
  }

  override property get AccountName() : String {
    return null // not available for bc 300
  }

  override property get AccountNameKanji() : String {
    return null // not available for bc 300
  }

}
