package gw.lob.common.util
uses java.util.Date
uses java.lang.IllegalArgumentException

// The end of the range is not considered part of the range.
// The range's start or end can be null, meaning that it extends in that direction to infinity.
class DateRange extends gw.util.DateRange {
  construct(startDate : Date, endDate : Date) {
    super(startDate, endDate)
  }

  override function contains( d : Date ) : boolean {
    if ( d == null ) throw new IllegalArgumentException( "Cannot test containment on a null date" )
    if ( start == null and end == null ) return true
    
    if ( start == null ) return end > d
    if ( end == null ) return start <= d
    return start <= d and d < end
  }

  function contains(otherRange : DateRange) : boolean {
    if (this.start == null or this.start <= otherRange.start) {
      if(this.end == null) {
        return true
      } else if(otherRange.end <= this.end) {
        return true
      }
    }
 
    return false
  }

  function overlapOnLeft(otherRange: DateRange) : boolean {
    return otherRange.contains(start) and start != otherRange.start
  }
  
  function overlapOnRight(otherRange: DateRange) : boolean {
    return otherRange.contains(end) and end != otherRange.start
  }
  
  function intersects(otherRange : DateRange) : boolean {
    return contains(otherRange) or overlapOnLeft(otherRange) or overlapOnRight(otherRange)
  }

  function disjoint(otherRange : DateRange) : boolean {
    return not intersects(otherRange)
  }
  
  function equals(otherRange : DateRange) : boolean {
    return (this.start == otherRange.start and 
      this.end == otherRange.end)
  }

  property get NumberOfDaysInRange() : int {
    return start.daysBetween(end)
  }
}
