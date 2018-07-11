package gw.lob.wc7.financials

uses gw.api.domain.financials.CostAdapter

/**
 * A WC7 specific implementation of {@link gw.api.domain.financials.CostAdapter}
 */
@Export
class WC7CostAdapter implements CostAdapter {
  var _owner : WC7Cost
  construct(owner : WC7Cost) { _owner = owner }

  override function createTransaction( branch : PolicyPeriod ) : Transaction {
    var transaction = new WC7Transaction( branch, branch.PeriodStart, branch.PeriodEnd )
    transaction.WC7Cost = _owner.Unsliced
    return transaction
  }

  override property get Reinsurable() : Reinsurable {
    if (not _owner.SubjectToRICeding) {
      return null
    }
    
    return _owner.Branch.AllReinsurables.single() // only one on a WC policy -- the line
  }

  override property get Worksheet() : RatingWorksheet {
    return _owner.WC7RatingWorksheet
  }

  override function initializeWorksheet(){
    var ws : WC7RatingWorksheet
    for(versionedCost in _owner.VersionList.AllVersions) {
      if (versionedCost.Worksheet != null) {
        ws = _owner.Branch.cloneBeanIntoSlice(versionedCost.Worksheet as EffDated, _owner.EffectiveDate, _owner.ExpirationDate) as WC7RatingWorksheet
        ws.TextData = null
        break
      }
    }
    if (ws == null) {
      ws = new WC7RatingWorksheet(_owner.Branch, _owner.EffectiveDate, _owner.ExpirationDate)
    }
    ws.WC7Cost = _owner.Unsliced
  }

  override property get Coverable() : Coverable {
    return (_owner typeis WC7JurisdictionCost) ? _owner.WC7Jurisdiction : _owner.WC7WorkersCompLine
  }

  override property get NameOfCoverable() : String {
    return _owner.Description
  }

  override function isMatchingBean(bean : KeyableBean) : boolean {
    return false
  }
}
