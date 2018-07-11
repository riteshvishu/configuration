package gw.rating.rtm.domain

uses gw.rating.rtm.valueprovider.AbstractProductModelValueProvider
uses gw.rating.rtm.valueprovider.RateTableCellValueProvider
uses java.text.DecimalFormat
uses java.math.BigDecimal
uses gw.pc.policy.typekey.RateTableDataType
uses com.guidewire.pl.system.util.NumberFormatUtil

/**
 * GUI enhancements for display/edit of RateTableCell
 */
enhancement RateTableCellEnhancement : gw.rating.rtm.domain.table.RateTableCell {
  property get EditMode() : String {
    return this.ColumnDefinition.EditMode
  }

  function getOptionalLabel(vp : RateTableCellValueProvider, v : Object) : String {
    if (vp == null) {
      return ""
    }
    if (this.ColumnDefinition.ColumnType == RateTableDataType.TC_DECIMAL) {
      return NumberFormatUtil.render(getBigDecimalEquivalent(v))
    }
    return vp.valueByCode(this.FactorRowBean, v as String)
  }

  function getValueRange(vp : RateTableCellValueProvider) : List {
    if (vp == null) {
      return {this.Value}
    }
    var values = vp.getValues(this.FactorRowBean)
    if (this.ColumnDefinition.ColumnType == RateTableDataType.TC_DECIMAL) {
      return values.map(\v -> new BigDecimal(v))
    }
    return values
  }

  function checkAvailable(vp : RateTableCellValueProvider) : Boolean {
    var v = (vp == null) ? true : (vp.getValues(this.FactorRowBean).length > 0)
    return v
  }

  private function getBigDecimalEquivalent(v : Object) : BigDecimal {
    var num : BigDecimal
    if (v typeis BigDecimal) {
      num = v
    } else {
      num = NumberFormatUtil.parse(v as String)
    }
    return num
  }
}
