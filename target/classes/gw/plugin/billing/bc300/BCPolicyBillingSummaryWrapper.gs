package gw.plugin.billing.bc300
uses gw.plugin.billing.BillingPeriodInfo
uses java.math.BigDecimal
uses java.util.Date
uses gw.plugin.billing.BillingInvoiceInfo
uses soap.BCBillingSummaryAPI.entity.PolicyBillingSummary
uses java.lang.IllegalStateException
uses java.lang.Integer
uses gw.api.database.Query

@Export
class BCPolicyBillingSummaryWrapper implements BillingPeriodInfo{
  var _soapObject : PolicyBillingSummary

  construct(soapObject : PolicyBillingSummary) {
    _soapObject = soapObject
  }
  
  override property get BillingMethod() : BillingMethod {
    return _soapObject.BillingMethodCode
  }

  override property get CurrentOutstanding() : BigDecimal {
    return _soapObject.CurrentOutstanding
  }

  override property get Delinquent() : Boolean {
    return _soapObject.Delinquent
  }

  override property get DepositRequirement() : BigDecimal {
    return _soapObject.DepositRequirement
  }

  override property get EffectiveDate() : Date {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get ExpirationDate() : Date {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Invoices() : BillingInvoiceInfo[] {
    return _soapObject.Invoices.map(\ p -> new BCInvoiceInfoWrapper(p))
  }

  override property get Paid() : BigDecimal {
    return _soapObject.Paid
  }

  override property get PastDue() : BigDecimal {
    return _soapObject.PastDue
  }

  override property get PaymentPlanName() : String {
    return _soapObject.PaymentPlanName
  }

  override property get Periods() : String[] {
    return _soapObject.Periods
  }

  override property get PolicyNumber() : String {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Product() : String {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get TermNumber() : Integer {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get TotalBilled() : BigDecimal {
    return _soapObject.TotalBilled
  }

  override property get TotalCharges() : BigDecimal {
    return _soapObject.TotalCharges
  }

  override property get Unbilled() : BigDecimal {
    return _soapObject.Unbilled
  }

  override function findPolicyPeriod() : PolicyPeriod{
    return Query.make(PolicyPeriod)
      .compare(PolicyPeriod#PolicyNumber.PropertyInfo.Name, Equals, this.PolicyNumber)
      .compare(PolicyPeriod#TermNumber.PropertyInfo.Name, Equals, this.TermNumber).select().FirstResult        
  }

  override property get AltBillingAccount() : String {
    return null // not exist in bc 300
  }

  override property get InvoiceStream() : String {
    return null // not exist in bc 300
  }

  override property get OwningAccount() : String {
    return null // not exist in bc 300
  }

  override property get PCPolicyPublicID() : String {
    return null
    // not exist in bc 300
  }
}
