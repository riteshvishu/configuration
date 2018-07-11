package gw.lob.common.util

enhancement LOBBooleanEnhancement : java.lang.Boolean {
  function toYesNoString() : String {
    return this ? "Yes" : "No"
  }  
}
