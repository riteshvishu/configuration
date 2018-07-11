package gw.lob.pa.rating
uses java.util.Date

@Export
class PAShortRatePenaltyCostData extends PACostData<PAShortRatePenaltyCost> {
 
  construct(effDate : Date, expDate : Date, c : Currency) {
    super(effDate, expDate, c)
  }

  construct(effDate : Date, expDate : Date) {
    super(effDate, expDate)
  }

  override function getVersionedCosts(line : PersonalAutoLine) : List<com.guidewire.commons.entity.effdate.EffDatedVersionList> {
    return line.VersionList.PACosts.where( \ costVL -> costVL.AllVersions.first() typeis PAShortRatePenaltyCost ).toList()
  }

  protected override property get KeyValues() : List<Object> {
    return {}
  }
  
  override function setSpecificFieldsOnCost( line: PersonalAutoLine, cost: PAShortRatePenaltyCost ) {
    super.setSpecificFieldsOnCost( line, cost )
  }
}
