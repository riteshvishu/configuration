package gw.plugin.location.impl

uses gw.plugin.location.ILocationPlugin


@Export
class LocationPlugin implements ILocationPlugin {

  override function areAccountLocationsEquivalent(loc1: AccountLocation, loc2: AccountLocation): boolean {
    return
      loc1.City == loc2.City and
      loc1.PostalCode == loc2.PostalCode and
      loc1.State == loc2.State and
      loc1.AddressLine1 == loc2.AddressLine1 and
      loc1.AddressLine2 == loc2.AddressLine2 and
      loc1.AddressLine3 == loc2.AddressLine3
  }

  /**
   * Use this method to clone extended fields and arrays from the old AccountLocation to the new one.
   * The caller of this method clones the AccountLocation and AccountLocationAddress.  This will clone
   * fields but not FKs or arrays
   * WARNING: Do not make ANY changes to the Periods, Accounts, or any other entity via this
   *   method.  This method will be called during bind and modifying any entity other than the clone
   *   will make the policy out-of-sync for the bind with disastrous consequences at some point.
   */
  override function cloneExtensions(oldLoc : AccountLocation, newLoc : AccountLocation) {

  }

}
