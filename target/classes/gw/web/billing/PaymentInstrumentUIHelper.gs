package gw.web.billing

@Export
class PaymentInstrumentUIHelper {

  static function checkForError(jobNumber : String, jobToFind : Job) : String{
    if (jobNumber == null)
      return displaykey.Web.Errors.MissingUrlParameter("JobNumber")
    if (jobToFind == null)
      return displaykey.Web.Errors.InvalidUrlParameter("JobNumber", jobNumber)
    if (not User.util.CurrentUser.canView( jobToFind ))
      return displaykey.Java.Error.Permission.View("job")
    return null
  }

  function createPaymentInstrument(jobToFind : Job, paymentMethod : String, token : String) {
    if (paymentMethod != null) {
      var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
      var paymentInstrument = new gw.plugin.billing.BillingPaymentInstrument()
      paymentInstrument.PaymentMethod = paymentMethod
      paymentInstrument.Token = token
      var accountNumber = jobToFind.Policy.Account.AccountNumber
      plugin.addPaymentInstrumentTo(accountNumber, paymentInstrument)
    }
  }
}