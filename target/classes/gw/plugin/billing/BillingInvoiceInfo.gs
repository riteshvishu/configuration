package gw.plugin.billing
uses java.util.Date
uses java.math.BigDecimal

/**
 * Information about an invoice in Billing System.
 */
@Export
interface BillingInvoiceInfo extends BillingInvoiceInfoJava{
  /**
   * The invoice date
   */
  property get InvoiceDate() : Date
  /**
   * The invoice due date
   */
  property get InvoiceDueDate() : Date
  /**
   * The amount
   */
  property get Amount() : BigDecimal
  /**
   * The amount paid
   */
  property get Paid() : BigDecimal
  /**
   * The amount billed
   */
  property get Billed() : BigDecimal
  /**
   * The amount past due
   */
  property get PastDue() : BigDecimal
  /**
   * The amount unpaid
   */
  property get Unpaid() : BigDecimal
  /**
   * The invoice number
   */
  property get InvoiceNumber() : String
  /**
   * The paid status (fully paid, partially paid...)
   */
  property get PaidStatus() : String
  /**
   * The status of the invoice (billed, planned...)
   */
  property get Status() : String
  property get InvoiceStream() : String
}
