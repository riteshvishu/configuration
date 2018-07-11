package gw.billing
uses java.math.RoundingMode

enhancement PaymentPlanSummaryEnhancement : entity.PaymentPlanSummary
{
  /**
   * @return Number of payments required by this payment plan
   */
  property get NumberOfPayments() : int{
    if(this.Total == null or this.DownPayment == null or this.Installment == null
      or this.Installment.IsZero){
      return 1
    }
    return this.Total.subtract( this.DownPayment )
      .divide( this.Installment, RoundingMode.CEILING ).intValue()
  }

  /**
   *@return true if this summary has a PaymentCode set, false otherwise
   */
  property get IsReporting() : boolean{
    return this.PaymentCode <> null
  }

  /**
   * @return true iff one of the allowed payment methods is "Responsive"
   */
  property get AllowResponsive() : boolean{
    return this.AllowedPaymentMethods.contains(AccountPaymentMethod.TC_RESPONSIVE)
  }
}
