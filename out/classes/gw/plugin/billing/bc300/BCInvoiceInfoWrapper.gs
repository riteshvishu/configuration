package gw.plugin.billing.bc300
uses soap.BCBillingSummaryAPI.entity.PCInvoiceInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses java.math.BigDecimal
uses java.util.Date

@Export
class BCInvoiceInfoWrapper implements BillingInvoiceInfo{
  var _soapObject : PCInvoiceInfo

  construct(soapObject : PCInvoiceInfo) {
    _soapObject = soapObject
  }

  override property get Amount() : BigDecimal {
    return _soapObject.Amount
  }

  override property get Billed() : BigDecimal {
    return _soapObject.Amount
  }

  override property get InvoiceDate() : Date {
    return _soapObject.InvoiceDate.Time
  }

  override property get InvoiceDueDate() : Date {
    return _soapObject.InvoiceDueDate.Time
  }

  override property get InvoiceNumber() : String {
    return _soapObject.InvoiceNumber
  }

  override property get Paid() : BigDecimal {
    return _soapObject.Paid
  }

  override property get PaidStatus() : String {
    return _soapObject.PaidStatus
  }

  override property get PastDue() : BigDecimal {
    return _soapObject.PastDue
  }

  override property get Status() : String {
    return _soapObject.Status
  }

  override property get Unpaid() : BigDecimal {
    return _soapObject.Unpaid
  }

  override property get InvoiceStream() : String {
    return null // not available in bc 300
  }

}
