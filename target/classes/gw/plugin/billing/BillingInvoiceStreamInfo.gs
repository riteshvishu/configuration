package gw.plugin.billing

/**
 * Invoice stream from BC
 */
@Export
interface BillingInvoiceStreamInfo extends BillingInvoiceStreamInfoJava{
  /**
   * The description
   */
  property get Description() : String
  /**
   * eg. 1, 15 or Wed, Tue...
   */
  property get Days() : String
  /**
   * Invoice date or due date.
   */
  property get DueDateBilling() : Boolean
  /**
   * Monthly, twice a month...
   */
  property get Interval() : BillingPeriodicity
  /**
   * The payment method for this invoice stream
   */
  property get PaymentMethod() : AccountPaymentMethod
  /** 
   * The payment instrument display name
   */
  property get PaymentInstrumentName() : String
}
