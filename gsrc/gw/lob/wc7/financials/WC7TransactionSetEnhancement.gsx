package gw.lob.wc7.financials

uses java.util.Set
uses gw.lob.wc7.rating.WC7RatingPeriod

enhancement WC7TransactionSetEnhancement<T extends WC7Transaction> : Set<T> {
  
  /**
   * Returns the transactions in this set that have an effective date in the rating period's [RatingStart, RatingEnd).
   */
  function byRatingPeriod( ratingPeriod : WC7RatingPeriod ) : Set<T> {
    var start = ratingPeriod.RatingStart.trimToMidnight()
    var end   = ratingPeriod.RatingEnd.trimToMidnight()
    return this.where( \ tx -> (tx.EffDate >= start and tx.EffDate < end)
                      or (tx.EffDate == start and tx.EffDate == end)).toSet()
  }
  
  /**
   * Returns the transactions in this set that have a calcOrder in [calcOrder, endOrder].
   */
  function byCalcOrder( startOrder : int, endOrder : int ) : Set<T> {
    return this.where( \ tx -> tx.WC7Cost.CalcOrder >= startOrder and tx.WC7Cost.CalcOrder <= endOrder ).toSet()
  }
}
