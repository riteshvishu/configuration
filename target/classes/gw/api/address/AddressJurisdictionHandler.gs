package gw.api.address

uses java.lang.IllegalArgumentException
uses java.lang.IllegalStateException
uses gw.api.admin.BaseAdminUtil

@Export
class AddressJurisdictionHandler {

   /**
    * Gets the Jurisdiction for the given Address.  If address is null, return null.  If address.Country
    * is null, the system DefaultCountry will be used when attempting to determine Jurisdiction
    *
    * @param address Jurisdiction for the specified address is returned
    * @return the Jurisdiction for the given address.  If address is null, return null
    * @throws IllegalStateException if unable to determine a distinct jurisdiction for the input address
    */
   static function getJurisdiction(address : AddressAutofillable) : Jurisdiction {
     if (address == null ) return null
     return getJurisdiction(new AddressAutofillableDelegate(address))
   }

  /**
   * Gets the Jurisdiction for the given AddressFillableExtension.  If address is null, return null.
   * If address.Country is null, infer the country from the state typekey, otherwise use DefaultCountry to determine Jurisdiction
   *
   * @param address Jurisdiction for the specified address is returned
   * @return the Jurisdiction for the given address or null if the jurisdiction can't be determined.
   * @throws IllegalStateException if there are multiple possible jurisdictions
   */
  static function getJurisdiction(address : AddressFillableExtension) : Jurisdiction {
    if (address == null) return null
    var targetCountry = address.Country
    if (address.Country == null and address.State != null) {
      var countries = address.State.Categories.where( \ elt -> elt typeis Country)
      if (countries.Count == 1) {
        targetCountry = countries.first() as Country
        }
    }
    if (targetCountry == null) {
      targetCountry = BaseAdminUtil.DefaultCountry
    }

    switch(targetCountry) {
      // By Country
      case TC_FR: // France
      case TC_JP: // Japan
      case TC_GB: // United Kingdom
        return getJurisdiction(targetCountry)

      // By State
      case TC_AU: // Australia
      case TC_CA: // Canada
      case TC_DE: // Germany
      case TC_US: // United States
        return getJurisdiction(address.State, targetCountry)

      default:
        return null
    }
  }

  /**
   * Gets the Jurisdictions for the given country.
   *
   * @param country only Jurisdictions for the specified country are returned.
   * @return an array of Jurisdictions.
   */
  static function getJurisdictions(country: Country) : Jurisdiction[] {
    if (country == null) {
      return null
    }
    return Jurisdiction.getTypeKeys(false).where(\j -> j.hasCategory(country)).toTypedArray()
  }

  /**
   * Returns the jurisdiction for the provided state and country.
   *
   * @param state target whose Jurisdiction is being determined for
   * @param country state's country whose Jurisdiction is being determined for
   * @return Jurisdiction the jurisdiction for the input state and country or null if the jurisdiction could not be determined.
   */
  static function getJurisdiction(state : State, country : Country) : Jurisdiction {
    if (state == null) {
      //TODO skwon 10-4-2013: Return null for now, need to fix up tests to set state
      //throw new IllegalArgumentException("Unable to get jurisdiction by state because state is null")
      return null
    }
    var jurisdiction = typekey.Jurisdiction.get(state.Code)
    if (jurisdiction != null and jurisdiction.hasCategory(country)) {
      return jurisdiction
    } else {
      return null
    }
  }

  /**
   * Returns the jurisdiction for the provided country.
   *
   * @param country state's country whose Jurisdiction is being deteremined for
   * @return Jurisdiction the jurisdiction for the input country or null if the jurisdiction could not be determined.
   * If more than one jurisdiction is found for the input country, an exception is thrown.
   */
  private static function getJurisdiction(country : Country) : Jurisdiction {
    var jurisdictions = getJurisdictions(country)
    if (jurisdictions.Count == 0) {
      return null
    } else if (jurisdictions.Count == 1) {
      return jurisdictions.first()
    } else {
      throw new IllegalStateException("Found multiple jurisdictions for country: " + country)
    }
  }

}
