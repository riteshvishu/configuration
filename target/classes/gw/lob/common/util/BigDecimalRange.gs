package gw.lob.common.util
uses java.math.BigDecimal

class BigDecimalRange {
  var _min : BigDecimal as readonly LowerBound
  var _max : BigDecimal as readonly UpperBound
  
  construct(min : String, max : String) {
    _min = new BigDecimal(min)
    _max = new BigDecimal(max)
  }
  
  function contains(that : BigDecimal) : boolean {
    return _min <= that and that <= _max  
  }
  function contains(that : String) : boolean {
    return contains(new BigDecimal(that))
  }
  
  property get Empty() : boolean {
    return UpperBound == LowerBound  
  }
  
  function lessThanLower(that : BigDecimal) : boolean {
    return that < _min  
  }
  function overUpper(that : BigDecimal) : boolean {
    return that > _max  
  }
  
  override function toString() : String {
    return "${_min} to ${_max}"
  }
  
  static function emptyRange() : BigDecimalRange {
    return new BigDecimalRange("0", "0")
  }
}
