package gw.lob.wc7.rating

enhancement WC7BaseCovEmpCostDataEnhancement : gw.lob.wc7.rating.WC7BaseCovEmpCostData {
  /**
   * Returns WC7ClassCode of the Covered Employee (including FELA and Maritime) related to this cost
   */
  function getWC7ClassCode(workersCompLine : WC7WorkersCompLine) : WC7ClassCode {
    return workersCompLine.AllWC7CoveredEmployeeBaseWM.firstWhere(\ w -> w.FixedId == this.EmpID).ClassCode
  }   
}
