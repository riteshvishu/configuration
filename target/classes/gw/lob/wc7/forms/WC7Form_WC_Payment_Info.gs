package gw.lob.wc7.forms

uses gw.forms.FormInferenceContext
uses java.util.Set
uses gw.api.xml.XMLNode
uses java.math.BigDecimal

@Export
class WC7Form_WC_Payment_Info extends WC7FormData
{
  var _paymentPlanDescription : String
  var _deposit : BigDecimal
  //var _paymentScheduleItems : Set<PaymentScheduleItem>
  
  override function populateInferenceData( context: FormInferenceContext, specialCaseStates: Set<Jurisdiction> ) : void {
    var period = context.Period
    var paymentPlan = period.PaymentPlans.getById(period.PaymentPlanID)
    _paymentPlanDescription = period.PaymentPlanName
    _deposit = paymentPlan.DownPayment
    /**
    if (context.Period.PaymentSchedule.PaymentScheduleItems != null) {
      _paymentScheduleItems = context.Period.PaymentSchedule.PaymentScheduleItems.toSet()
    }
    **/
  }

  override property get InferredByCurrentData() : boolean {
    return _paymentPlanDescription != null
  }

  override function addDataForComparisonOrExport( contentNode: XMLNode ) : void {
    contentNode.addChild(createTextNode( "PaymentPlanDescription", _paymentPlanDescription ) )
    contentNode.addChild(createTextNode( "Deposit", _deposit as String ) )
    /**
    if (_paymentScheduleItems.Count > 0) {
      contentNode.addChild(createScheduleNode( "Payment Schedule", "Events", _paymentScheduleItems.map( \ p -> (p.Amount + " on " + p.EventDate))))
    }
    **/
  }
}
