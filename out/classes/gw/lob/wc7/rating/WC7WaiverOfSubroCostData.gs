package gw.lob.wc7.rating

uses gw.api.effdate.EffDatedUtil
uses entity.windowed.WC7WaiverOfSubroVersionList
uses com.guidewire.commons.entity.effdate.EffDatedVersionList
uses java.util.Date

class WC7WaiverOfSubroCostData extends WC7CostData<WC7WaiverOfSubroCost>{

  private var _waiverFixedID : Key as readonly WaiverID
  private var _jurisdiction : Jurisdiction as readonly Jurisdiction
  private var _statCode : String as StatCode
  private var _wc7JurisdictionID : Key
  private var _waiverType : WC7WaiverOfSubrogation
  
  construct(effDate : Date, expDate : Date, theJurisdiction : WC7Jurisdiction, waiver : WC7WaiverOfSubro, c : Currency) {
    super(effDate, expDate, c)
    _waiverFixedID = waiver.FixedId
    _jurisdiction = theJurisdiction.Jurisdiction
    _wc7JurisdictionID = theJurisdiction.FixedId
    _waiverType = waiver.Type
  }

  construct(cost : WC7WaiverOfSubroCost) {
    super(cost)
    _waiverFixedID = cost.WC7WaiverOfSubro.FixedId
    _jurisdiction = cost.JurisdictionState
    _wc7JurisdictionID = cost.WC7Jurisdiction.FixedId
    _waiverType = cost.WC7WaiverOfSubro.Type
  }

  override function getVersionedCosts(line : WC7WorkersCompLine) : List<EffDatedVersionList> {
    var waiverVL = EffDatedUtil.createVersionList( line.Branch, WaiverID ) as WC7WaiverOfSubroVersionList
    return waiverVL.WaiverOfSubroCosts.toList()
  }
  
  override property get KeyValues() : List<Object> {
    return {WaiverID, _wc7JurisdictionID}  
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : WC7WaiverOfSubroCost) {
    super.setSpecificFieldsOnCost( line, cost )
    cost.JurisdictionCostType = typekey.WC7JurisdictionCostType.TC_WAIVER
    cost.setFieldValue("WC7WaiverOfSubro", WaiverID)
    cost.setFieldValue("WC7Jurisdiction", _wc7JurisdictionID)
    cost.StatCode = StatCode
  }

  // We do not want to preserve the discount percent for Blanket Waivers because they are balaned in the same cost
  override property get PreserveOverrideDiscounts() : boolean {
    if (_waiverType == typekey.WC7WaiverOfSubrogation.TC_BLANKET) {
      return false
    } else {
      return super.PreserveOverrideDiscounts
    }
  }

  property get isBlanketWaiver() : boolean {
    return _waiverType == typekey.WC7WaiverOfSubrogation.TC_BLANKET
  }
}
