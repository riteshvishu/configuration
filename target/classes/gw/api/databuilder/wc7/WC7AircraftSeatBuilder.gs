package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ConditionPattern


@Export
class WC7AircraftSeatBuilder extends DataBuilder<WC7AircraftSeat, WC7AircraftSeatBuilder> {

  construct() {
    super(WC7AircraftSeat)
  }

  protected override function createBean(context : BuilderContext) : WC7AircraftSeat {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var airCraftSeatCondPattern : ConditionPattern = "WC7AircraftPremiumEndorsementCond"
    line.setConditionExists(airCraftSeatCondPattern, true)
    return line.createAndAddWC7AircraftSeat(line.WC7AircraftPremiumEndorsementCond)
  }
  
  final function withDescription(desc : String) : WC7AircraftSeatBuilder {
    set(WC7AircraftSeat.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  final function withState(aJurisdiction : Jurisdiction) : WC7AircraftSeatBuilder {
    set(WC7AircraftSeat.Type.TypeInfo.getProperty("Jurisdiction"), aJurisdiction)
    return this
  }
  
  final function withAircraftID(aircraftID : String) : WC7AircraftSeatBuilder {
    set(WC7AircraftSeat.Type.TypeInfo.getProperty("AircraftNumber"), aircraftID)
    return this
  }
  
  final function withNumberOfSeats(numberOfSeats : int) : WC7AircraftSeatBuilder {
    set(WC7AircraftSeat.Type.TypeInfo.getProperty("PassengerSeats"), numberOfSeats)
    return this
  }
}
