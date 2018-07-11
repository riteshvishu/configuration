package gw.pcf
uses gw.util.TypekeyUtil
uses gw.entity.TypeKey

class WC7ModifiersInputSetUIHelper {

  static function typekeyModifierAvailable(modifier : Modifier, period : PolicyPeriod) : boolean {
    // has more specific functionality in standards-based
    return true
  }
  
  static function typekeyModifierDisablePostOnChange(modifier : Modifier) : boolean {
    // has more specific functionality in standards-based
    return true
  }
     
  static function rateModifierAvailable(modifier : Modifier, period : PolicyPeriod) : boolean{
    // has more specific functionality in standards-based
    return true
  }
 
  static function rateModifierDisablePostOnChange(modifier : Modifier) : boolean {
    // has more specific functionality in standards-based
    return true
  }

  static function filterTypekeyModifier(modifier : Modifier) : List<TypeKey>{
    return TypekeyUtil.getTypeKeys(modifier.TypeList).toList().cast(TypeKey)
  }
}
