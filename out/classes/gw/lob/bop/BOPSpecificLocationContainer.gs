package gw.lob.bop

uses gw.lob.common.LineSpecificLocationContainerBase
uses com.guidewire.pl.web.controller.UserDisplayableException
uses gw.api.domain.LineSpecificLocation

@Export
class BOPSpecificLocationContainer extends LineSpecificLocationContainerBase<BOPLocation> {
  var _bopLine : BusinessOwnersLine
  
  construct(bopLine : BusinessOwnersLine) {
    super(bopLine)
    _bopLine = bopLine
  }

  override property get LineSpecificLocations() : LineSpecificLocation[] {
    return _bopLine.BOPLocations
  }

  override function addToLineSpecificLocations(bopLocation : LineSpecificLocation ) {
    _bopLine.addToBOPLocations(bopLocation as BOPLocation)
  }

  override function removeFromLineSpecificLocations(bopLocation : LineSpecificLocation ) {
    if ((bopLocation as BOPLocation).Buildings.Count > 0) {
      throw new UserDisplayableException(displaykey.BusinessOwners.Location.CannotDelete.HasBuilding(bopLocation))
    }
    _bopLine.removeFromBOPLocations(bopLocation as BOPLocation)
  }

  override property get Period() : PolicyPeriod {
    return _bopLine.Branch
  }
 
}
