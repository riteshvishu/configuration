package gw.lob.wc7

/**
 * WC7 specific enhancements to CovTerm.
 */
enhancement WC7CovTermEnhancement : gw.api.domain.covterm.CovTerm {

  function resetToDefault() {
    this.setValueFromString(this.Pattern.getDefaultValue(null))
  }

}
