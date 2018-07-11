package gw.plugin.billing.impl
uses java.math.BigDecimal
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingPaymentInfo
uses gw.plugin.billing.BillingContactInfo

@Export
class MockAccountBilling implements BillingAccountInfo
{
  var _BilledOutstandingTotal : BigDecimal as BilledOutstandingTotal
  var _BilledOutstandingCurrent : BigDecimal as BilledOutstandingCurrent
  var _BilledOutstandingPastDue : BigDecimal as BilledOutstandingPastDue
  var _UnbilledTotal : BigDecimal as UnbilledTotal
  var _UnappliedFundsTotal : BigDecimal as UnappliedFundsTotal
  var _CollateralRequirement : BigDecimal as CollateralRequirement
  var _CollateralHeld : BigDecimal as CollateralHeld
  var _CollateralChargesBilled : BigDecimal as CollateralChargesBilled
  var _CollateralChargesPastDue : BigDecimal as CollateralChargesPastDue
  var _CollateralChargesUnbilled : BigDecimal as CollateralChargesUnbilled
  var _Delinquent : boolean as Delinquent
  var _AccountName : String as AccountName
  var _AccountNameKanji : String as AccountNameKanji
  var _BillingSettings : MockBillingSettings as MockBillingSettings
  var _PrimaryPayer : MockBillingContact as MockPrimaryPayer

  override property get BillingSettings() : BillingPaymentInfo {
    return MockBillingSettings
  }
  
  override property get PrimaryPayer() : BillingContactInfo {
    return MockPrimaryPayer
  }
}