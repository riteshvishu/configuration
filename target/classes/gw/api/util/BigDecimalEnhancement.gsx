package gw.api.util

enhancement BigDecimalEnhancement : java.math.BigDecimal {

  public property get DisplayValue() : String {
    return LocaleUtil.getCurrentLocale().getNumberFormat().getJavaNumberFormat().format(this)
  }
}
