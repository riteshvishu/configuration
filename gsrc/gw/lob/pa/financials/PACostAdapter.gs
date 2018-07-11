package gw.lob.pa.financials
uses gw.api.domain.financials.CostAdapter
uses gw.api.reinsurance.ReinsurableCoverable

@Export
class PACostAdapter implements CostAdapter
{
  var _owner : PACost
  construct(owner : PACost) { _owner = owner }

  override function createTransaction( branch : PolicyPeriod ) : Transaction
  {
    var transaction = new PATransaction( branch, branch.PeriodStart, branch.PeriodEnd )
    transaction.PACost = _owner.Unsliced
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
    return _owner.PARatingWorksheet
  }
  
  override function initializeWorksheet(){
    var ws = new PARatingWorksheet(_owner.Branch, _owner.EffectiveDate, _owner.ExpirationDate)
    ws.PACost = _owner.Unsliced
  }

  override property get Coverable() : Coverable {
    return _owner.OwningCoverable
  }

  override property get NameOfCoverable() : String {
    return _owner.Vehicle.DisplayName
  }

  override function isMatchingBean(bean : KeyableBean) : boolean {
    var b2PACost = bean as PACost
    return _owner.Coverage.PatternCode == b2PACost.Coverage.PatternCode and 
           _owner.Vehicle.Vin == b2PACost.Vehicle.Vin
  }
}
