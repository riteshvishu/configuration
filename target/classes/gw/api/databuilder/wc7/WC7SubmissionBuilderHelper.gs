package gw.api.databuilder.wc7
/**
 * Helper class that helps with Basic Template vs. Standards Based Default Values
 * 
 * Note, this class should be overwritten in the pc-wc-iso and pc-wc-lob module with different values.
 */
class WC7SubmissionBuilderHelper {

  property get Jurisdiction() : typekey.Jurisdiction {
    return typekey.Jurisdiction.TC_CA
  }
  
  property get State() : typekey.State {
    return typekey.State.TC_CA
  }
  
  property get ClassCode() : String {
    return "0005"
  }

  property get MaritimeClassCode() : String {
    return  "7038M" //- Commmon with Standards-Based
  }

  property get FELAClassCode() : String {
    return "8814M" //Clerical - Commmon with  Standards-Based
  }

  property get SupplementaryDiseaseCode() : String {
    return "0065D" //Foundries Steel - Commmon with  Standards-Based
  }

  property get PostalCode() : String {
    return "94515"
  }

  property get City() : String {
    return "Calistoga"
  }

  property get USLHClassCode() : String {
    return "U709F"  //Stevedoring: By Hand Or Hand Trucks Exclusively - FL
  }

  /**
   * Helper method called during the createBean of WC7JurisdictionBuilder to create benefits deductible endorsement
   * with valid cov terms for a jurisdiction
   */
  function setupBenefitsDedCov(wc7Jurisdiction : WC7Jurisdiction) {
    wc7Jurisdiction.WC7BenefitsDedCov.WC7DeductibleTerm.setValueFromString("500med+indem")
  }
}
