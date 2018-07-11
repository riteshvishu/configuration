package gw.lob.common.util

uses gw.api.diff.DiffProperty
uses gw.api.domain.Clause

class LOBDiffUtil {
  final static var AVL_SUFFIX = "Avl"
  
  static function isAvailabilityDiff(diff : DiffProperty) : boolean{
    var diffPropInfo = diff.PropertyInfo
    var propertyName = diffPropInfo.Name
    var bean = diff.Bean
    

    if(bean typeis Clause and diffPropInfo.FeatureType == Boolean and propertyName.endsWith(AVL_SUFFIX)){
      var correspondingTermName = propertyName.substring(0, propertyName.length() - AVL_SUFFIX.length)
      if((typeof bean).TypeInfo.getProperty(correspondingTermName) != null){
        return true
      }
    }
    
    return false
  }
}
