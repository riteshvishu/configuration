package gw.plugin.billing.impl
uses java.math.BigDecimal
uses gw.plugin.billing.BillingPeriodInfo
uses java.util.Date
uses gw.plugin.billing.BillingInvoiceInfo
uses java.lang.Integer

@Export
class MockPolicyPeriodBilling implements BillingPeriodInfo
{
  construct()
  {
  }
  
  var _BillingMethod : BillingMethod as BillingMethod
  var _Delinquent : Boolean as Delinquent
  var _EffectiveDate : Date as EffectiveDate
  var _ExpirationDate : Date as ExpirationDate
  var _PastDue : BigDecimal as PastDue
  var _PolicyNumber : String as PolicyNumber
  var _TermNumber : Integer as TermNumber
  var _Product : String as Product
  var _PaymentPlanName : String as PaymentPlanName
  var _TotalBilled : BigDecimal as TotalBilled
  var _Unbilled : BigDecimal as Unbilled
  var _CurrentOutstanding : BigDecimal as CurrentOutstanding
  var _DepositRequirement : BigDecimal as DepositRequirement
  var _Paid : BigDecimal as Paid
  var _TotalCharges : BigDecimal as TotalCharges
  var _AltBillingAccount : String as AltBillingAccount
  var _InvoiceStream : String as InvoiceStream
  var _OwningAccount : String as OwningAccount
  var _pcpolicypublicid : String as PCPolicyPublicID
  
  var _Periods : String[] as Periods
  var _Invoices : MockInvoice[] as MockInvoices

  override function findPolicyPeriod() : PolicyPeriod{
    return PolicyPeriod.finder.findByPolicyNumberAndTerm(PolicyNumber, TermNumber).FirstResult
  }

  override property get Invoices() : BillingInvoiceInfo[] {
    return MockInvoices
  }

}
