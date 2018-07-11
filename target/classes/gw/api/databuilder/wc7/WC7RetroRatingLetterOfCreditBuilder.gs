package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses java.math.BigDecimal
uses java.util.Date

@Export
class WC7RetroRatingLetterOfCreditBuilder extends DataBuilder<WC7RetroRatingLetterOfCredit, WC7RetroRatingLetterOfCreditBuilder> {
  construct() {
    super(WC7RetroRatingLetterOfCredit)
    withIssuerName("John Doe")
    withAmount(100000)
    withValidFrom(Date.Today)
    withValidTo(Date.Tomorrow)
  }
  
  final function withIssuerName(issuerName : String): WC7RetroRatingLetterOfCreditBuilder {
    set(WC7RetroRatingLetterOfCredit.Type.TypeInfo.getProperty("IssuerName"), issuerName)
    return this
  }
  
  final function withAmount(amount : BigDecimal): WC7RetroRatingLetterOfCreditBuilder {
    set(WC7RetroRatingLetterOfCredit.Type.TypeInfo.getProperty("Amount"), amount)
    return this
  }
  
  final function withValidFrom(effective : Date): WC7RetroRatingLetterOfCreditBuilder {
    set(WC7RetroRatingLetterOfCredit.Type.TypeInfo.getProperty("ValidFrom"), effective)
    return this
  }
  
  final function withValidTo(expiration : Date): WC7RetroRatingLetterOfCreditBuilder {
    set(WC7RetroRatingLetterOfCredit.Type.TypeInfo.getProperty("ValidTo"), expiration)
    return this
  }
}