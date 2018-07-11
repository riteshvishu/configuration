package gw.plugin.billing.impl
uses java.math.BigDecimal
uses gw.plugin.billing.BillingInvoiceInfo
uses java.util.Date

@Export
class MockInvoice implements BillingInvoiceInfo
{
  construct()
  {
  }
  
  var _invoiceNumber : String as InvoiceNumber
  var _status : String as Status
  var _paidStatus : String as PaidStatus
  var _Amount : BigDecimal as Amount
  var _Billed : BigDecimal as Billed
  var _Paid : BigDecimal as Paid
  var _Unpaid : BigDecimal as Unpaid
  var _PastDue : BigDecimal as PastDue
  var _InvoiceDate : Date as InvoiceDate
  var _InvoiceDueDate : Date as InvoiceDueDate
  var _InvoiceStream : String as InvoiceStream
}
