package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * The implementation of {@link WC7SpecificScheduledItem} for {@link entity.WC7AircraftSeat}
 */
@Export
class WC7AircraftSeatCondScheduledItemImpl implements WC7SpecificScheduledItem {
  
  var _aircraftSeat : WC7AircraftSeat as readonly Owner
  
  construct(aircraftSeat : WC7AircraftSeat) {
    _aircraftSeat = aircraftSeat
  }

  override property get ParentClause() : Clause {
    return _aircraftSeat.AircraftSeatCondition
  }
}