package gw.lob.wc7
uses gw.api.productmodel.ClausePattern
uses java.util.Collection

/**
 * Employee leasing clauses in the WC basic template module.
 */
class WC7EmployeeLeasingClausesInLOB {
  
  protected var _clauses : Collection<ClausePattern>
  
  protected construct() {
    _clauses = {
      "WC7EmployeeLeasingClientEndorsementCond",      // Employee Leasing Client Endorsement
      "WC7EmployeeLeasingClientExclEndorsementExcl",  // Employee Leasing Client Exclusion Endorsement
      "WC7LaborContractorEndorsementACond",           // Employee Leasing Endorsement (was, Labor Contractor endorsement)
      "WC7LaborContractorExclEndorsementExcl",        // Employee Leasing Exclusion Endorsement (was, Labor Contractor Exclusion Endorsement)
      "WC7MultipleCoordinatedPolicyEndorsementCond"   // Multiple Coordinated Policy Endorsement (MCP)
    }
  }
  
  function get() : Collection<ClausePattern> {
    return _clauses
  }

}
