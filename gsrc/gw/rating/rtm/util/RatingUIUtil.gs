package gw.rating.rtm.util

uses gw.entity.ITypeList
uses gw.entity.TypeKey
uses gw.lang.reflect.TypeSystem
uses gw.util.concurrent.LockingLazyVar

@Export
class RatingUIUtil {

  final static var _typekeyPrefix : String as TypekeyPrefix = "typekey." 

  static var _typekeyNames : LockingLazyVar<String[]> = new LockingLazyVar<String[]>() {
    override function init() : String[] {
      //the code that used to be here got ALL type names, which requires loading the world of gosu.
      return TypeSystem.getTypeLoader(com.guidewire.commons.entity.type2.TypelistTypeLoader).getAllTypeNames().map(\ typeNameSeq -> typeNameSeq as String ).toTypedArray()
    }
  }

  /**
   * List of all the typekeys in the application
   */
  static function getAllTypekeyNames() : String[] {
    return _typekeyNames.get()
  }

  /**
   * List of all TypeKeys for a given type TypeList
   */
  static function getTypekeysForTypelist(selectedTypelist : String) : List<TypeKey> {
    return (selectedTypelist != null) 
      ? (TypeSystem.getByRelativeName(selectedTypelist) as ITypeList).getTypeKeys(false) 
      : {}
  }

  static function getOwnershipLabel(rt : RateTable) : String {
    if (rt.RefTable != null) {
      return displaykey.Web.Rating.RateTable.Reference
    } else if (rt.ReferencingRateTables.Empty) {
      return displaykey.Web.Rating.RateTable.OwnedAndNotShared
    } else {
      return displaykey.Web.Rating.RateTable.OwnedAndShared
    }
  }

  // Used to facilitate maintaining tabs when moving from viewing to editing
  // in the RateBook UI
  static public enum RateBookCardTabType {
    TableCard,
    RoutineCard
  }

}