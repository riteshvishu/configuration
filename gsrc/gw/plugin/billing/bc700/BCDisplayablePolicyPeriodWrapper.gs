package gw.plugin.billing.bc700
uses gw.plugin.billing.BillingPeriodInfo
uses java.math.BigDecimal
uses java.util.Date
uses gw.plugin.billing.BillingInvoiceInfo
uses java.lang.IllegalStateException
uses wsi.remote.gw.webservice.bc.bc700.billingsummaryapi.types.complex.DisplayablePolicyPeriod
uses java.lang.Integer
uses gw.api.database.Query

@Export
class BCDisplayablePolicyPeriodWrapper implements BillingPeriodInfo{
  var _period : DisplayablePolicyPeriod

  construct(soapObject : DisplayablePolicyPeriod) {
    _period = soapObject
  }

  override property get BillingMethod() : BillingMethod {
    return _period.BillingStatus.BillingMethodCode
  }

  override property get CurrentOutstanding() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Delinquent() : Boolean {
    return _period.BillingStatus.Delinquent
  }

  override property get DepositRequirement() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get EffectiveDate() : Date {
    return _period.EffectiveDate
  }

  override property get ExpirationDate() : Date {
    return _period.ExpirationDate
  }

  override property get Invoices() : BillingInvoiceInfo[] {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Paid() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get PastDue() : BigDecimal {
    return _period.BillingStatus.PastDue
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
    return _period.BillingStatus.TotalBilled
  }

  override property get TotalCharges() : BigDecimal {
    throw new IllegalStateException("This field is not applicable for this soap object.")
  }

  override property get Unbilled() : BigDecimal {
    return _period.BillingStatus.Unbilled
  }

  override function findPolicyPeriod() : PolicyPeriod{
    return Query.make(PolicyPeriod)
      .compare(PolicyPeriod#PolicyNumber.PropertyInfo.Name, Equals, this.PolicyNumber)
      .compare(PolicyPeriod#TermNumber.PropertyInfo.Name, Equals, this.TermNumber).select().FirstResult        
  }

  override property get AltBillingAccount() : String {
    return _period.AltBillingAccount
  }

  override property get InvoiceStream() : String {
    return _period.InvoiceStream
  }

  override property get OwningAccount() : String {
    return _period.OwningAccount
  }

  override property get PCPolicyPublicID(): String {
    // not exist in bc 700
    return null
  }
}
