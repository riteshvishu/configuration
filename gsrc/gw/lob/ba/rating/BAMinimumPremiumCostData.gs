package gw.lob.ba.rating
uses java.util.Date

@Export
class BAMinimumPremiumCostData extends BACostData<BAMinimumPremiumCost> {
  
  construct(effDate : Date, expDate : Date, jurisdiction : BAJurisdiction) {
    super(effDate, expDate, "MinimumPremium", jurisdiction, null)
  }
  
  construct(effDate : Date, expDate : Date, c : Currency, jurisdiction : BAJurisdiction) {
    super(effDate, expDate, c, "MinimumPremium", jurisdiction, null)
  }
  
  override function setSpecificFieldsOnCost(line : BusinessAutoLine, cost : BAMinimumPremiumCost) {
    super.setSpecificFieldsOnCost( line, cost )
  }

  override function getVersionedCosts(line : BusinessAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    return line.VersionList.BACosts.where( \ costVL -> costVL.AllVersions.first() typeis BAMinimumPremiumCost ).toList()
  }

  protected override property get KeyValues() : List<Object> {
    return {}
  }

}
