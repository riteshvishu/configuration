package gw.lob.common.util
uses java.math.BigDecimal
uses java.math.RoundingMode

enhancement LOBBigDecimalEnhancement : java.math.BigDecimal {
  
  function roundDollar() : BigDecimal {
    return this.setScale(0, RoundingMode.HALF_UP)      
  }
  
  function leftOf(range : BigDecimalRange) : boolean {
    return this < range.LowerBound
  }
  
  function rightOf(range : BigDecimalRange) : boolean {
    return this > range.UpperBound
  }
}
