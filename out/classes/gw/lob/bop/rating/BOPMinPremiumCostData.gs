package gw.lob.bop.rating
uses java.util.Date

@Export
class BOPMinPremiumCostData extends BOPCostData<BOPMinPremiumCost> {
  
  construct(effDate : Date, expDate : Date, stateArg : Jurisdiction) {
    super(effDate, expDate, stateArg)
  }

  construct(effDate : Date, expDate : Date, c : Currency, stateArg : Jurisdiction) {
    super(effDate, expDate, c, stateArg)
  }

  override function getVersionedCosts(line : BOPLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    return line.VersionList.BOPCosts.where( \ vl -> vl.AllVersions.first() typeis BOPMinPremiumCost).toList()
  }
  
  protected override property get KeyValues() : List<Object> {
    return {}
  }

  override function setSpecificFieldsOnCost( line: BOPLine, cost: BOPMinPremiumCost ) {
    super.setSpecificFieldsOnCost( line, cost )
  }

}
