package gw.lob.wc7

enhancement WC7RetrospectiveRatingPlanEnhancement : WC7RetrospectiveRatingPlan { 
  /**
   * Returns the letters of credit in window mode
   * @returns {@link List<WC7RetroRatingLetterOfCredit>} 
   */
  property get LettersOfCreditWM() : List<WC7RetroRatingLetterOfCredit> {
    var versionLists = this.VersionList.LettersOfCredit
    return versionLists.map(\ vl -> vl.AllVersions.first())
  }  
  
  /**
   * Returns the Jurisdiction multipliers in window mode
   * @returns {@link List<WC7JurisdictionMultiplier>} 
   */
  property get JurisdictionMultipliersWM() : List<WC7JurisdictionMultiplier> {
    var versionLists = this.VersionList.JurisdictionMultipliers
    return versionLists.map(\ vl -> vl.AllVersions.first())
  }

  /**
   * Create and adds a Jurisdiction multiplier to the retrospective rating plan in window mode. 
   * @returns {@link WC7JurisdictionMultiplier} - in window mode
   */  
  function createAndAddWC7JurisdictionMultiplierWM() : WC7JurisdictionMultiplier {
    var branch = this.WC7WorkersCompLine.Branch
    var windowModeJurisdictionMulti = new WC7JurisdictionMultiplier(branch).Unsliced
    windowModeJurisdictionMulti.WC7RetrospectiveRatingPlan = this.Unsliced
    this.addToJurisdictionMultipliers(windowModeJurisdictionMulti)
    windowModeJurisdictionMulti.setEffectiveWindow(this.Branch.PeriodStart, this.Branch.PeriodEnd)    
    return windowModeJurisdictionMulti
  }
  
  /**
   * Create and adds a letter of credit to the retrospective rating plan in window mode. 
   * @returns {@link WC7RetroRatingLetterOfCredit} - in window mode
   */
  function createAndAddWC7LetterOfCreditWM() : WC7RetroRatingLetterOfCredit {
    var branch = this.WC7WorkersCompLine.Branch
    var windowModeLetterOfCredit = new WC7RetroRatingLetterOfCredit(branch).Unsliced
    windowModeLetterOfCredit.WC7RetrospectiveRatingPlan = this.Unsliced
    this.addToLettersOfCredit(windowModeLetterOfCredit)
    windowModeLetterOfCredit.setEffectiveWindow(this.Branch.PeriodStart, this.Branch.PeriodEnd)    
    return windowModeLetterOfCredit
  }
}
