package gw.lob.wc7.financials
uses java.util.Set
uses gw.lob.wc7.rating.WC7RatingPeriod
uses java.util.ArrayList
uses gw.api.ui.WC7CostWrapper

enhancement WC7CostSetEnhancement<T extends WC7Cost> : Set<T>{
  /**
   * Returns the costs in this set that have an effective date in the rating period's [RatingStart, RatingEnd).
   */
  function byRatingPeriod( ratingPeriod : WC7RatingPeriod ) : Set<T> {
    var start = ratingPeriod.RatingStart.trimToMidnight()
    var end   = ratingPeriod.RatingEnd.trimToMidnight()
    return this.where( \ c -> c.EffDate >= start and c.EffDate < end ).toSet()
  }
  
  /**
   * Returns the costs in this set that have a calcOrder in [calcOrder, endOrder].
   */
  function byCalcOrder( startOrder : int, endOrder : int ) : Set<T> {
    return this.where( \ c -> c.CalcOrder >= startOrder and c.CalcOrder <= endOrder ).toSet()
  }

  function getOtherPremiumAndSurcharges(currency : Currency) : WC7CostWrapper[]{
    var ordered = new ArrayList<WC7CostWrapper>()
    
    ordered.addWC7Costs( this.where( \ t -> t.CalcOrder >= 400 ))
    var state = this.first().JurisdictionState
    var header1 = displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.TotalPremium(state)
    ordered.add( new WC7CostWrapper(500.5, header1, this.byCalcOrder( 0, 500 ).AmountSum(currency), true) )
    var header2 = displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.TotalCost(state)
    ordered.add( new WC7CostWrapper(10000000, header2, this.AmountSum(currency), true) )

    return ordered.toTypedArray()
  }
  
  function getStandardPremiums(currency : Currency) : WC7CostWrapper[]{
    var ordered = new ArrayList<WC7CostWrapper>()
    
    //ordered.addCosts( this.where( \ t -> t.CalcOrder < 400 ))
    //var costcollection = this as Collection<WC7Cost>
    ordered.addAll(this.where(\ c -> c.CalcOrder < 400) .map(\ c -> new WC7CostWrapper(c)))
    ordered.add( new WC7CostWrapper(100.5, 
      displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.ManualPremium, 
      this.byCalcOrder( 0, 100 ).AmountSum(currency), false) )
    ordered.add( new WC7CostWrapper(200.5, 
      displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.SubjectPremium, 
      this.byCalcOrder( 0, 200 ).AmountSum(currency), false) )
    ordered.add( new WC7CostWrapper(300.5, 
      displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.ModifiedPremium, 
      this.byCalcOrder( 0, 300 ).AmountSum(currency), false))
    ordered.add( new WC7CostWrapper(400.5, 
      displaykey.Web.SubmissionWizard.Quote.WC.Subtotal.StandardPremium, 
      this.byCalcOrder( 0, 400 ).AmountSum(currency), true))

    return ordered.toTypedArray()
  }
  
  property get StandardPremiumCosts() : Set<WC7Cost> {
    return this.where(\ cost -> cost.PremiumLevelType <= WC7PremiumLevelType.TC_ESTIMATEDANNUALPREMIUM).toSet()
  }  
  
  property get OtherPremiumAndSurchargeCosts() : Set<WC7Cost> {
    return this.where(\ cost -> cost.PremiumLevelType > WC7PremiumLevelType.TC_ESTIMATEDANNUALPREMIUM).toSet()
  }
}
