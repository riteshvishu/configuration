package gw.plugin.billing.bc300

uses gw.plugin.billing.IBillingSummaryPlugin
uses gw.api.util.DisplayableException
uses soap.BCBillingSummaryAPI.fault.SOAPException
uses soap.BCBillingSummaryAPI.fault.BadIdentifierException
uses soap.BCBillingSummaryAPI.api.BillingSummaryAPI
uses gw.plugin.billing.BillingAccountInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses gw.plugin.billing.BillingPeriodInfoJava
uses com.guidewire.commons.metadata.MetadataDependencies

@Export
class BCBillingSummaryPlugin implements IBillingSummaryPlugin {
  var logger = gw.api.system.PCLoggerCategory.BILLING_SUMMARY_PLUGIN

  construct() {
  }
  
  protected function callWebService<T>(call : block(api : BillingSummaryAPI) : T) : T{
    var api = new BillingSummaryAPI()
    api.addGWAuthentication()
    try {
      return call(api)
    } catch (e : BadIdentifierException) {
      logger.error(e)
      return null
    } catch (e : SOAPException) {
      logger.error("Server exception was encountered during retrieval of the billing summary", e)
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.GeneralException(e.Message))
    } catch (e : org.apache.axis.AxisFault) {
      logger.error("Unknown exception was encountered during retrieval of the billing summary", e)
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.GeneralException(e.Message))
    } catch (e : java.net.ConnectException) {
      logger.error("Unknown exception was encountered during retrieval of the billing summary", e)
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.GeneralException(e.Message))
    }
  }

  override function retrieveAccountBillingSummary(accountNumber : String) : BillingAccountInfo {
    var localeCode = MetadataDependencies.getCurrentLocaleProvider().getCurrentLanguage().Code
    var bcSummary = callWebService(\ api -> { 
      return api.retrieveAccountBillingSummary(accountNumber, localeCode)
    })
    
    if(bcSummary == null){
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.AccountNotFound)
    }

    return new BCAccountBillingSummaryWrapper(bcSummary)
  }
  
  override function retrievePolicyBillingSummary(policyNumber : String, termNumber : int) : BillingPeriodInfoJava {
    var localeCode = MetadataDependencies.getCurrentLocaleProvider().getCurrentLanguage().Code
    var bcSummary = callWebService(\ api -> {
      return api.retrievePolicyBillingSummary(policyNumber, termNumber, localeCode)
    })
    
    if(bcSummary == null){
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.PolicyNotFound)
    }
    return new BCPolicyBillingSummaryWrapper(bcSummary)
  }


  override function retrieveBillingPolicies(accountNumber: String) : BillingPeriodInfoJava[] {
    var localeCode = MetadataDependencies.getCurrentLocaleProvider().getCurrentLanguage().Code
    var periodInfos = callWebService(\ api -> {
      return api.retrievePeriodsForAccount(accountNumber, localeCode)
    })
    
    if(periodInfos == null){
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.AccountNotFound)
    }
    
    if(periodInfos.IsEmpty){
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.NoPolicies)
    }
    
    return periodInfos.map(\ periodInfo -> new BCDisplayablePolicyPeriodWrapper(periodInfo))
  }


  override function retrieveAccountInvoices(accountNumber: String) : BillingInvoiceInfo[] {
    var localeCode = MetadataDependencies.getCurrentLocaleProvider().getCurrentLanguage().Code
    var invoices = callWebService(\ api -> {
      return api.retrieveInvoicesForAccount(accountNumber, localeCode)
    })
    if(invoices == null){
      throw new DisplayableException(displaykey.Web.AccountBilling.Error.AccountNotFound)
    }
    return invoices.map(\ p -> new BCInvoiceInfoWrapper(p))
  }

  override function getPoliciesBilledToAccount(p0 : String) : BillingPeriodInfoJava[] {
    return {} // not available for bc 300
  }

}
