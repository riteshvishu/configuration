package gw.product

uses gw.pc.product.entity.ProducerCodeCurrency
uses gw.pc.product.entity.ProducerCodeCurrency

/**
 * Currently, ProducerCodes are configured to have a collection of Currencies associated with each.  However, having
 * only a single currency per ProducerCode makes integration with BC much easier.  For this reason, we provide an
 * enhancement to ProducerCode which treats Currency as a single foreign key instead of a collection.
 * If you are planning to use multiple currencies for each ProducerCode, you should delete this enhancement as it
 * will overly constrain your configuration.
 */
enhancement ProducerCodeSingleCurrencyEnhancement : entity.ProducerCode {

  property get Currency() : Currency {
    if (this.ProducerCodeCurrencies.IsEmpty) return null
    if (this.ProducerCodeCurrencies.length > 1) {
      throw new SingleCurrencyProducerCodeException("Cannot get currency.  Multiple currencies already defined")
    }
    return this.ProducerCodeCurrencies.first().Currency
  }

  property set Currency(value : Currency) {
    if (this.ProducerCodeCurrencies.length > 1) {
      throw new SingleCurrencyProducerCodeException("Cannot set currency.  Multiple currencies already defined")
    }
    if (!this.ProducerCodeCurrencies.IsEmpty) {
      if (Currency == value) {
        return
      }
      this.removeFromProducerCodeCurrencies(this.ProducerCodeCurrencies.first())
    }
    this.addCurrency(value)
  }
}
