package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses java.math.BigDecimal

@Export
class WC7JurisdictionMultiplierBuilder extends DataBuilder<WC7JurisdictionMultiplier, WC7JurisdictionMultiplierBuilder> {
  construct() {
    super(WC7JurisdictionMultiplier)
    withFederalTaxMultiplier( 1 )
    withStateTaxMultiplier( 1 )
  }
  
  final function withStateTaxMultiplier(multiplier : BigDecimal): WC7JurisdictionMultiplierBuilder {
    set(WC7JurisdictionMultiplier.Type.TypeInfo.getProperty("JurisdictionTaxMultiplier"), multiplier)
    return this
  }
  
  final function withStateExcessLossFactor(factor : BigDecimal): WC7JurisdictionMultiplierBuilder {
    set(WC7JurisdictionMultiplier.Type.TypeInfo.getProperty("JurisdictionExcessLossFactor"), factor)
    return this
  }

  final function withFederalTaxMultiplier(multiplier : BigDecimal): WC7JurisdictionMultiplierBuilder {
    set(WC7JurisdictionMultiplier.Type.TypeInfo.getProperty("FederalTaxMultiplier"), multiplier)
    return this
  }

  final function withFederalExcessLossFactor(factor : BigDecimal): WC7JurisdictionMultiplierBuilder {
    set(WC7JurisdictionMultiplier.Type.TypeInfo.getProperty("FederalExcessLossFactor"), factor)
    return this
  }
  
  final function withState(state : Jurisdiction) : WC7JurisdictionMultiplierBuilder {
    set (WC7JurisdictionMultiplier.Type.TypeInfo.getProperty("Jurisdiction"), state)
    return this
  }
}