package gw.plugin.billing.bc300
uses gw.plugin.billing.BillingPaymentInfo
uses soap.BCBillingSummaryAPI.entity.AccountBillingSettings

@Export
class BCAccountBillingSettingsWrapper implements BillingPaymentInfo{
  var _soapObject : AccountBillingSettings

  construct(soapObject : AccountBillingSettings) {
    _soapObject = soapObject
  }

  override property get InvoiceDeliveryMethod() : InvoiceDeliveryMethod {
    return _soapObject.InvoiceDeliveryMethod
  }

  override property set InvoiceDeliveryMethod(value : InvoiceDeliveryMethod) {
    _soapObject.InvoiceDeliveryMethod = value.Code
  }

  override property get PaymentMethod() : AccountPaymentMethod {
    return _soapObject.PaymentMethod
  }

  override property set PaymentMethod(value : AccountPaymentMethod) {
    _soapObject.PaymentMethod = value.Code
  }

}
