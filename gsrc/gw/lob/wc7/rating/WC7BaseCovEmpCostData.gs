package gw.lob.wc7.rating

uses java.util.Date

/**
 * Abstract methods for a {@link WC7CostData} for a cost data 
 * associated with a {@link entity.WC7CoveredEmployeeBase}
 */
@Export
abstract class WC7BaseCovEmpCostData<T extends WC7Cost> extends WC7CostData<T> {
  private var _empID : Key as readonly EmpID
  private var _covID : Key as readonly CovID
  private var _state : Jurisdiction as readonly State
  private var _statCode : String as StatCode

  construct(effDate : Date, expDate : Date, empIDArg : Key, covIDArg : Key, stateArg : Jurisdiction, c : Currency) {
    super(effDate, expDate, c)
    _empID = empIDArg
    _covID = covIDArg
    _state = stateArg 
  }

  override property get Jurisdiction() : Jurisdiction {
    return State 
  }

  override function setSpecificFieldsOnCost(line : WC7WorkersCompLine, cost : T) {
    super.setSpecificFieldsOnCost( line, cost )
    setCoveredEmployee(_empID, cost)
    setCoverage(_covID, cost)
    cost.StatCode = StatCode
  }
  
  override property get KeyValues() : List<Object> {
    return {CovID, EmpID}  
  }
  
  //----------------------------------------------------------------- abstract functions
  
  /**
   * Set the Covered Employee property for the associated cost with the provided key.
   * @param coveredEmployeeFixedID the FixedID of a WC7CoveredEmployeeBase
   */
  abstract function setCoveredEmployee(coveredEmployeeFixedID : Key, cost : T)
  
  /**
   * Set the Coverage property for the associated cost with the provided key.
   * @param coverageFixedID the FixedID of a WC7WorkersCompCov
   */
  abstract function setCoverage(coverageFixedID : Key, cost : T)
}
