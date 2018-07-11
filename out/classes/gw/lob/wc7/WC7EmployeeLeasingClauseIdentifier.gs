package gw.lob.wc7
uses gw.api.productmodel.ClausePattern

/**
 * Identifies clauses used by employee leasing in the WC basic template module.
 */
class WC7EmployeeLeasingClauseIdentifier {
  
  static var _clauses = new WC7EmployeeLeasingClausesInLOB().get()
  
  private construct() {}
  
  /**
   * Return true if the given clausePattern is an employee leasing clause.
   */
  static function isEmployeeLeasingClause(clausePattern : ClausePattern) : boolean {
    return _clauses.contains(clausePattern)
  }

}
