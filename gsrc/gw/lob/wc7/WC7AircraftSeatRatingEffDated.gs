package gw.lob.wc7

class WC7AircraftSeatRatingEffDated extends WC7RatingEffDatedExposureImpl {

  var _aircraftSeat : WC7AircraftSeat
  
  construct(theOwner : WC7AircraftSeat) {
    super(theOwner)
    _aircraftSeat = theOwner
  }

  override property get Basis() : int {
    return _aircraftSeat.PassengerSeats
  }

  override property get AuditedBasis() : int {
    return _aircraftSeat.PassengerSeats
  }

  override property get BasedOnBasisForRating() : int {
    return _aircraftSeat.BasedOn.BasisForRating
  }

}