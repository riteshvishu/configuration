package gw.plugin.billing.bc300
uses gw.plugin.billing.BillingPeriodInfo
uses java.math.BigDecimal
uses java.util.Date
uses gw.plugin.billing.BillingInvoiceInfo
uses soap.BCBillingSummaryAPI.entity.DisplayablePolicyPeriod
uses java.lang.IllegalStateException
uses java.lang.Integer
uses gw.api.database.Query

@Export
class BCDisplayablePolicyPeriodWrapper implements BillingPeriodInfo{
  var _period : DisplayablePolicyPeriod

  construct(soapObject : DisplayablePolicyPeriod) {
    _period = soapObject
  }

  override property get BillingMethod() : BillingMethod {
    return _period.BillingMethodCode
  }

  override property get CurrentOutstanding() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Delinquent() : Boolean {
    return _period.Delinquent
  }

  override property get DepositRequirement() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get EffectiveDate() : Date {
    return _period.EffectiveDate.Time
  }

  override property get ExpirationDate() : Date {
    return _period.ExpirationDate.Time
  }

  override property get Invoices() : BillingInvoiceInfo[] {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Paid() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get PastDue() : BigDecimal {
    return _period.PastDue
  }

  override property get PaymentPlanName() : String {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Periods() : String[] {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get PolicyNumber() : String {
    return _period.PolicyNumber
  }

  override property get Product() : String {
    return _period.Product
  }

  override property get TermNumber() : Integer {
    return _period.TermNumber
  }

  override property get TotalBilled() : BigDecimal {
    return _period.TotalBilled
  }

  override property get TotalCharges() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Unbilled() : BigDecimal {
    return _period.Unbilled
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
