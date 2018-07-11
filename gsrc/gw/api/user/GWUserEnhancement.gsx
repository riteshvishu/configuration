package gw.api.user

uses gw.api.util.PhoneUtil
uses gw.api.util.LocaleUtil
/**
 * Created with IntelliJ IDEA.
 * User: cliu
 * Date: 10/29/12
 * Time: 5:58 PM
 * To change this template use File | Settings | File Templates.
 */
enhancement GWUserEnhancement : entity.User {

  property get UserLanguage() : LanguageType{
    if (this.Language == null){
      return LocaleUtil.getCurrentLanguageType()
    }
    return this.Language
  }

  property set UserLanguage(language : LanguageType){
    this.Language = language
  }

  property get UserLocale() : LocaleType{
    if (this.Locale == null){
      return LocaleUtil.getCurrentLocaleType()
    }
    return this.Locale
  }

  property set UserLocale(locale : LocaleType){
    this.Locale = locale
  }

  property get UserDefaultCountry() : Country{
    if (this.DefaultCountry == null){
      return LocaleUtil.getUserDefaultCountry()
    }
    return this.DefaultCountry
  }

  property set UserDefaultCountry(country : Country){
    this.DefaultCountry = country
  }

  property get UserDefaultPhoneCountry() : PhoneCountryCode{
    if (this.DefaultPhoneCountry == null){
      return PhoneUtil.getUserDefaultPhoneCountry()
    }
    return this.DefaultPhoneCountry
  }

  property set UserDefaultPhoneCountry(phoneCountry : PhoneCountryCode){
    this.DefaultPhoneCountry = phoneCountry
  }

}
