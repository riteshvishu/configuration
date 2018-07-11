package gw.lob.cp.financials
uses gw.api.domain.financials.CostAdapter
uses gw.api.reinsurance.ReinsurableCoverable
uses java.util.Date

@Export
class CPCostAdapter implements CostAdapter
{
  var _owner : CPCost
  construct(owner : CPCost) { _owner = owner }

  override function createTransaction( branch : PolicyPeriod ) : Transaction
  {
    var transaction = new CPTransaction( branch, branch.PeriodStart, branch.PeriodEnd )
    transaction.CPCost            = _owner.Unsliced
    return transaction
  }

  override property get Reinsurable() : Reinsurable {
    if (_owner.Coverage == null or not _owner.SubjectToRICeding) {
      return null
    }
    
    var rCov : ReinsurableCoverable = _owner.Coverage.ReinsurableCoverable
    var candidates = rCov.Reinsurables.where(\ r -> r.CoverageGroup == _owner.Coverage.RICoverageGroupType)
    return candidates.HasElements ? candidates.single() : null
  }

  override property get Worksheet() : RatingWorksheet {
    return _owner.CPRatingWorksheet
  }

  override function initializeWorksheet(){
    var ws = new CPRatingWorksheet(_owner.Branch, _owner.EffectiveDate, _owner.ExpirationDate)
    ws.CPCost = _owner.Unsliced
  }

  override property get NameOfCoverable() : String {
    return (_owner.Building != null) ? _owner.Building.DisplayName
         : (_owner.Location != null) ? _owner.Location.DisplayName : _owner.State.DisplayName
  }

  override function isMatchingBean(bean : KeyableBean) : boolean {
    return false
  }
  
  override property get Coverable() : Coverable {
    return _owner.OwningCoverable
  }

}
