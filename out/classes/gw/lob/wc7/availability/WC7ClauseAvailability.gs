package gw.lob.wc7.availability

uses gw.api.productmodel.ClausePattern
uses java.lang.SuppressWarnings

// Shadowed by implementation in pc-wc-iso
@SuppressWarnings("Unused parameters")
class WC7ClauseAvailability {
  final static var _instance = new WC7ClauseAvailability()
  
  static property get Instance() : WC7ClauseAvailability {
    return _instance
  }
  
  function includesClause(clausePattern : ClausePattern, state : Jurisdiction) : boolean {
    return true
  }
}
