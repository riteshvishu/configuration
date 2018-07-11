package gw.lob.wc7.rating

uses gw.rating.CostData
uses java.util.Map
uses java.util.HashMap
uses java.util.Date
uses gw.job.RenewalProcess

/**
 * This class executes a specified rate routine 
 */
class WC7RateRoutineExecutor {
  
  var _line : WC7WorkersCompLine
  var _minRatingLevel : RateBookStatus
                     
  construct(line : WC7WorkersCompLine,
            minRatingLevel : RateBookStatus) {
    _line = line
    _minRatingLevel = minRatingLevel
  }
  
  /**
   * This function executes the specified rate routine for the latest active ratebook that matches the specified
   * line, jurisdiction, reference date, and minimum rating level
   * @param rateRoutineCode - the code of the rate routine
   * @param jurisdiction - the {@link Jurisdiction} to be used to search for the rate book
   * @param refDate - the reference date that is used to query the rate book. If the reference date falls between the 
   * rate book's effective and expiration dates, then there is a match
   * @param costData - the {@link CostData} that would be populated after executing the rate routine
   * @param paramSet - the parameters that is used in the rating parameter set (i.e.,  {@link WC7CoveredEmployee}) 
   */
  function executeRateRoutine(rateRoutineCode : String,
                              jurisdiction : Jurisdiction,
                              refDate : Date,
                              costData : CostData, 
                              paramSet : Map<CalcRoutineParamName,Object>) {
    // Create the rate routine parameter set
    var params = new HashMap<CalcRoutineParamName,Object>()
    params.putAll(paramSet)

    // Execute the rate routine    
    var rateBook = getRateBook(jurisdiction, refDate)
    rateBook.executeCalcRoutine(rateRoutineCode, costData, costData, params)
  }

  /**
   * Gets the latest active ratebook (the rate book with the latest last status change date) matching the line, reference
   * date, jurisdiction, and minimum rating level
   * @param jurisdiction - the {@link Jurisdiction} to be used to search for the rate book
   * @param refDate - the reference date that is used to query the rate book. If the reference date falls between the 
   * rate book's effective and expiration dates, then there is a match
   * @return RateBook - the matching rate book 
   */
  private function getRateBook(jurisdiction : Jurisdiction,
                       refDate: Date) : RateBook {
    return RateBook.selectRateBook(refDate, 
                                   _line.Branch.RateAsOfDate, 
                                   _line.PatternCode, 
                                   jurisdiction, 
                                   _minRatingLevel, 
                                   _line.Branch.JobProcess typeis RenewalProcess,
                                   _line.Branch.Offering.Code)
  }
}