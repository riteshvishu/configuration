package gw.lob.pa.rating
uses java.util.Date

@Export
class PAMultiPolicyDiscCostData extends PACostData<PAMultiPolicyDiscCost> {
  
  construct(effDate : Date, expDate : Date, c : Currency) {
    super(effDate, expDate, c)
  }

  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }

  override function getVersionedCosts(line : PersonalAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    return line.VersionList.PACosts.where( \ costVL -> costVL.AllVersions.first() typeis PAMultiPolicyDiscCost ).toList()
  }

  protected override property get KeyValues() : List<Object> {
    return {}
  }
  
  override function setSpecificFieldsOnCost( line: PersonalAutoLine, cost: PAMultiPolicyDiscCost ) {
    super.setSpecificFieldsOnCost( line, cost )
  }
  
}
