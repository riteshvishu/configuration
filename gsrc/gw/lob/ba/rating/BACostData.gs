package gw.lob.ba.rating
uses java.util.Date
uses gw.rating.CostData

@Export
abstract class BACostData<T extends BACost> extends CostData<T, BusinessAutoLine> {
  
  private var _ratedOrder : BARatedOrderType as RatedOrder
  private var _jurisdiction : BAJurisdiction as JurisdictionArg
  private var _vehicleID : Key as VehicleID
  
  construct(effDate : Date, expDate : Date, c : Currency, ratedOrderArg : BARatedOrderType, jurisdiction : BAJurisdiction, vehicleIDArg : Key) {
    super(effDate, expDate, c)
    init(ratedOrderArg, jurisdiction, vehicleIDArg)
  }  

  construct(effDate : Date, expDate : Date, ratedOrderArg : BARatedOrderType, jurisdiction : BAJurisdiction, vehicleIDArg : Key) {
    super(effDate, expDate)
    init(ratedOrderArg, jurisdiction, vehicleIDArg)
  }  

  private function init(ratedOrderArg : BARatedOrderType, jurisdiction : BAJurisdiction, vehicleIDArg : Key) {
    _ratedOrder = ratedOrderArg  
    _jurisdiction = jurisdiction
    _vehicleID = vehicleIDArg
  }
  
  construct(cost : BACost) {
    super(cost)  
    _ratedOrder = cost.RatedOrder
    _jurisdiction = cost.Jurisdiction
    _vehicleID = cost.BusinessVehicle.FixedId
  }
  
  override function setSpecificFieldsOnCost(line : BusinessAutoLine, cost : T) {
    cost.setFieldValue( "BusinessAutoLine", line.FixedId )
    cost.setFieldValue("BusinessVehicle", _vehicleID)
    cost.setFieldValue("Jurisdiction", _jurisdiction.FixedId)
    cost.RatedOrder = _ratedOrder
  }
}
