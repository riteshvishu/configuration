package gw.pcf.coverage

uses com.guidewire.pl.system.locale.PLDisplayKeys
uses com.guidewire.pl.system.util.NumberFormatUtil
uses gw.api.domain.covterm.DirectCovTerm
uses gw.lang.Export
uses java.lang.String
uses java.lang.Object
uses java.lang.Double

@Export
class CovTermDirectInputSetHelper {

  public static function validate(covTerm : DirectCovTerm): String {
    if (covTerm == null) {
      return PLDisplayKeys.Java_Validation_NonNullable.localize(new Object[]{"Term"})
    } else {
      return covTerm.validateValueInRange(covTerm.Value);
    }
  }

  public static function convertFromString(value: String): Object {
    return NumberFormatUtil.parse(value)
  }

  public static function convertToString(value: Object): String {
    return NumberFormatUtil.render(value as Number)
  }
}
