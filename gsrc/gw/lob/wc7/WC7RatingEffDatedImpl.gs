package gw.lob.wc7

uses com.guidewire.pl.system.util.DateRange
uses gw.financials.Prorater
uses gw.lob.wc7.rating.WC7RatingPeriod
uses java.util.Date

/**
 * The base implementation for {@link WC7RatingEffDated}
 */
@Export
class WC7RatingEffDatedImpl implements WC7RatingEffDated {

  var _owner : EffDated as readonly Owner

  construct(theOwner : EffDated) {
    _owner = theOwner
  }

  override function getEffDateRangeForRatingPeriod(ratingPeriod : WC7RatingPeriod) : DateRange {
    var effectiveDate = this.EffectiveDateForRating
    var expirationDate = this.ExpirationDateForRating
    
    if (ratingPeriod != null and 
        effectiveDate != null and 
        expirationDate != null) {
      if (effectiveDate.before(ratingPeriod.RatingStart)) {
        effectiveDate = ratingPeriod.RatingStart
      }
      if (expirationDate.after(ratingPeriod.RatingEnd)) {
        expirationDate = ratingPeriod.RatingEnd
      }
    }
    return DateRange.allDatesBetween(effectiveDate, expirationDate)
  }

  override function getNumDaysEffectiveForDateRange(dateRange: DateRange) : int {
    var effDate = dateRange.Start
    var expDate = dateRange.End
    if (effDate == null or expDate == null or effDate > expDate) {
      return 0
    }
    return Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(effDate, expDate)
  }

  override property get EffectiveDateForRating() : Date {
    var effectiveDate = _owner.EffectiveDate
    if (_owner.BranchUntyped typeis PolicyPeriod) {
      var policyPeriod = _owner.BranchUntyped
      if (policyPeriod.Audit.AuditInformation.AuditPeriodStartDate > effectiveDate) {
        effectiveDate = policyPeriod.Audit.AuditInformation.AuditPeriodStartDate
      }
    }
    return effectiveDate
  }

  override property get ExpirationDateForRating() : Date {
    var expDate = _owner.ExpirationDate

    if (_owner.BranchUntyped typeis PolicyPeriod) {
      var policyPeriod = _owner.BranchUntyped
      if (policyPeriod.CancellationDate < expDate) {
        expDate = policyPeriod.CancellationDate
      }
      if (policyPeriod.Audit.AuditInformation.AuditPeriodEndDate < expDate) {
        expDate = policyPeriod.Audit.AuditInformation.AuditPeriodEndDate
      }
    }
    return expDate
  }

  override property get NumDaysEffectiveForRating() : int {
    var effDate = this.EffectiveDateForRating
    var expDate = this.ExpirationDateForRating
    if (effDate > expDate) {
      return 0
    }
    return Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(effDate, expDate)
  }
  
  override property get NumDaysEffective() : int {
    return Prorater.forFinancialDays(TC_PRORATABYDAYS).financialDaysBetween(_owner.EffectiveDate, _owner.ExpirationDate)
  }

}
