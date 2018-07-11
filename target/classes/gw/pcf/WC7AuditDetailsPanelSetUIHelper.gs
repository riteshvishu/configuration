package gw.pcf
uses gw.lob.wc7.rating.WC7RatingPeriod
uses java.util.ArrayList
uses java.util.HashMap

class WC7AuditDetailsPanelSetUIHelper {
  /**
   * Gets the covered employees across multiple rating periods and returns a map of jurisdiction to covered employees
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return HashMap<WC7RatingPeriod, List<WC7CoveredEmployee>>
   */
  static function getCoveredEmployeesAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7CoveredEmployee>> {
    var covEmpMap = new HashMap<WC7RatingPeriod, List<WC7CoveredEmployee>>()   
    ratingPeriods.each(\ ratingPeriod -> { 
        var coveredEmployees = getCoveredEmployeesInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (coveredEmployees.HasElements) {
          covEmpMap.put(ratingPeriod, coveredEmployees)
        }
    })
    return covEmpMap
  }    

  /**
   * Gets the federal covered employees across multiple rating periods and returns a map of jurisdiction to covered employees
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return HashMap<WC7RatingPeriod, List<WC7FedCoveredEmployee>>
   */  
  static function getFedCoveredEmployeesAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7FedCoveredEmployee>> {
    var covEmpMap = new HashMap<WC7RatingPeriod, List<WC7FedCoveredEmployee>>()   
    ratingPeriods.each(\ ratingPeriod -> { 
        var fedCoveredEmployees = getFedCoveredEmployeesInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (fedCoveredEmployees.HasElements) {
          covEmpMap.put(ratingPeriod, fedCoveredEmployees)
        }
    })
    return covEmpMap
  }    

  /**
   * Gets the maritime covered employees across multiple rating periods and returns a map of jurisdiction to covered employees
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return HashMap<WC7RatingPeriod, List<WC7MaritimeCoveredEmployee>>
   */    
  static function getMaritimeCoveredEmployeesAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7MaritimeCoveredEmployee>> {
    var covEmpMap = new HashMap<WC7RatingPeriod, List<WC7MaritimeCoveredEmployee>>()   
    ratingPeriods.each(\ ratingPeriod -> { 
        var maritimeCoveredEmployees = getMaritimeCoveredEmployeesInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (maritimeCoveredEmployees.HasElements) {
          covEmpMap.put(ratingPeriod, maritimeCoveredEmployees)
        }
    })
    return covEmpMap
  }  
  
 /**
   * Gets the Specific Waiver Of Subrogation across multiple rating periods and returns a map of Rating Period to WC7WaiverOfSubro
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the Specific Waiver Of Subrogation
   * @return HashMap<WC7RatingPeriod, List<WC7WaiverOfSubro>>
   */ 
      
  static function getSpecificWaiverOfSubroExposureAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7WaiverOfSubro>> { 
    var specificWaiversMap = new HashMap<WC7RatingPeriod, List<WC7WaiverOfSubro>>()
    ratingPeriods.each(\ ratingPeriod -> { 
        var specificWaiverOfSubro = getSpecificWaiversOfSubroInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (specificWaiverOfSubro.HasElements) {
          specificWaiversMap.put(ratingPeriod, specificWaiverOfSubro)
        }
    })
    return specificWaiversMap
  }  

 /**
   * Gets the Supplementary Disease Exposure across multiple rating periods and returns a map of Rating Period to WC7SupplDiseaseExposure
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the Supplementary Disease Exposure
   * @return HashMap<WC7RatingPeriod, List<WC7SupplDiseaseExposure>>
   */ 
      
  static function getSupplementaryDiseaseExposureAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7SupplDiseaseExposure>> { 
    var supplDiseaseExpoMap = new HashMap<WC7RatingPeriod, List<WC7SupplDiseaseExposure>>()
    ratingPeriods.each(\ ratingPeriod -> { 
        var supplDiseaseExpo = getSupplementaryDiseaseExposureInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (supplDiseaseExpo.HasElements) {
          supplDiseaseExpoMap.put(ratingPeriod, supplDiseaseExpo)
        }
    })
    return supplDiseaseExpoMap
  }  
  
  /**
   * Gets the Atomic Energy Exposure across multiple rating periods and returns a map of Rating Period to WC7AtomicEnergyExposure
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriods - array of {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the Atomic Energy Exposure
   * @return HashMap<WC7RatingPeriod, List<WC7AtomicEnergyExposure>>
   */ 
      
  static function getAtomicEnergyExposureAcrossAllRatingPeriods(wc7Line : WC7WorkersCompLine, ratingPeriods : WC7RatingPeriod[]) : HashMap<WC7RatingPeriod, List<WC7AtomicEnergyExposure>> { 
    var atomicEnergyExpoMap = new HashMap<WC7RatingPeriod, List<WC7AtomicEnergyExposure>>()
    ratingPeriods.each(\ ratingPeriod -> { 
        var atomicEnergyExpo = getAtomicEnergyExposureInSpecificRatingPeriod(wc7Line, ratingPeriod)
        if (atomicEnergyExpo.HasElements) {
          atomicEnergyExpoMap.put(ratingPeriod, atomicEnergyExpo)
        }
    })
    return atomicEnergyExpoMap
  }  
  
  /**
   * Gets the covered employees in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return WC7CoveredEmployee[]
   */
  static function getCoveredEmployeesInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7CoveredEmployee> {
    var matchingJurisdiction = gw.api.util.StateJurisdictionMappingUtil.getStateMappingForJurisdiction(ratingPeriod.Jurisdiction.Jurisdiction)
    var coveredEmps = new ArrayList<WC7CoveredEmployee>()
    for (coveredEmpVL in wc7Line.WC7CoveredEmployeeVLs) {
      var matchingVersions = coveredEmpVL.AllVersions.where(\ covEmp -> covEmp.Location.State == matchingJurisdiction and 
                                                                        isCovEmpWithinRatingPeriod(covEmp, ratingPeriod))
      coveredEmps.addAll(matchingVersions)
    }
    return coveredEmps
  }  
  
  /**
   * Gets the federal covered employees in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the federal covered employee
   * @return WC7FedCoveredEmployee[]
   */
  static function getFedCoveredEmployeesInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7FedCoveredEmployee> {
    var matchingJurisdiction = gw.api.util.StateJurisdictionMappingUtil.getStateMappingForJurisdiction(ratingPeriod.Jurisdiction.Jurisdiction)
    var coveredEmps = new ArrayList<WC7FedCoveredEmployee>()
    for (coveredEmpVL in wc7Line.WC7FedCoveredEmployeeVLs) {
      var matchingVersions = coveredEmpVL.AllVersions.where(\ covEmp -> covEmp.Location.State == matchingJurisdiction and 
                                                                        isCovEmpWithinRatingPeriod(covEmp, ratingPeriod))
      coveredEmps.addAll(matchingVersions)
    }
    return coveredEmps
  }  
  
  /**
   * Gets the maritime covered employees in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the maritime covered employee
   * @return WC7MaritimeCoveredEmployee[]
   */
  static function getMaritimeCoveredEmployeesInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7MaritimeCoveredEmployee> {
    var matchingJurisdiction = gw.api.util.StateJurisdictionMappingUtil.getStateMappingForJurisdiction(ratingPeriod.Jurisdiction.Jurisdiction)
    var coveredEmps = new ArrayList<WC7MaritimeCoveredEmployee>()
    for (coveredEmpVL in wc7Line.WC7MaritimeCoveredEmployeeVLs) {
      var matchingVersions = coveredEmpVL.AllVersions.where(\ covEmp -> covEmp.Location.State == matchingJurisdiction and 
                                                                        isCovEmpWithinRatingPeriod(covEmp, ratingPeriod))
      coveredEmps.addAll(matchingVersions)
    }
    return coveredEmps
  }
  /**
   * Gets the Specific Waiver Of Subrogation in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the Specific Waiver Of Subrogation
   * @return WC7WaiverOfSubro[]
   */
   static function getSpecificWaiversOfSubroInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7WaiverOfSubro> {
    
    var waiverOfSubroList = new ArrayList<WC7WaiverOfSubro>()
    for (specificWaiverOfSubroVL in wc7Line.WC7SpecificWaiverOfSubroVLs) {
      var matchingVersions = specificWaiverOfSubroVL.AllVersions.where(\ specificWaiver -> specificWaiver.Jurisdiction == ratingPeriod.Jurisdiction.Jurisdiction and 
                                                                        isSpecificWaiverWithinRatingPeriod(specificWaiver, ratingPeriod))
      waiverOfSubroList.addAll(matchingVersions)
    }
    return waiverOfSubroList
  }

  /**
   * Gets the Supplementary Disease Exposure in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on Supplementary Disease Exposure
   * @return List of WC7SupplDiseaseExposure
   */
   static function getSupplementaryDiseaseExposureInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7SupplDiseaseExposure> {
    
    var supplDiseaseExpoList = new ArrayList<WC7SupplDiseaseExposure>()
    for (supplDiseaseExposureVL in wc7Line.WC7SupplDiseaseExposureVLs) {
      var matchingVersions = supplDiseaseExposureVL.AllVersions.where(\ supplDisease -> supplDisease.WC7Jurisdiction == ratingPeriod.Jurisdiction and 
                                                                        isSupplementaryDiseaseExposureWithinRatingPeriod(supplDisease, ratingPeriod))
      supplDiseaseExpoList.addAll(matchingVersions)
    }
    return supplDiseaseExpoList
  }
  
   /**
   * Gets the Atomic energy Exposure in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on Atomic Energy Exposure
   * @return List of WC7AtomicEnergyExposure
   */
   static function getAtomicEnergyExposureInSpecificRatingPeriod(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7AtomicEnergyExposure> {
    
    var atomicEnergyExpoList = new ArrayList<WC7AtomicEnergyExposure>()
    for (atomicEnergyExposureVL in wc7Line.WC7AtomicEnergyExposureVLs) {
      var matchingVersions = atomicEnergyExposureVL.AllVersions.where(\ atomicEnergy -> atomicEnergy.WC7Jurisdiction == ratingPeriod.Jurisdiction and 
                                                                        isAtomicEnergyExposureWithinRatingPeriod(atomicEnergy, ratingPeriod))
      atomicEnergyExpoList.addAll(matchingVersions)
    }
    return atomicEnergyExpoList
  }
  
  
  /**
   * Checks to see if the effective and expiration dates for rating on the covered employee base are within the rating period start and end dates
   * @param covEmp - the {@link WC7CoveredEmployeeBase}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return boolean 
   */
  static function isCovEmpWithinRatingPeriod(covEmp : WC7CoveredEmployeeBase, ratingPeriod : WC7RatingPeriod) : boolean {
    return covEmp.EffectiveDateForRating >= ratingPeriod.RatingStart
           and covEmp.EffectiveDateForRating < ratingPeriod.RatingEnd 
           and covEmp.ExpirationDateForRating > ratingPeriod.RatingStart
           and covEmp.ExpirationDateForRating <= ratingPeriod.RatingEnd   
  }
  
   /**
   * Checks to see if the effective and expiration dates for rating on the specific waiver of subrogation are within the rating period start and end dates
   * @param specificWaiver - the {@link WC7WaiverOfSubro}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the specific waiver of subrogation
   * @return boolean 
   */
  
  static function isSpecificWaiverWithinRatingPeriod(specificWaiver : WC7WaiverOfSubro, ratingPeriod : WC7RatingPeriod) : boolean {
    return specificWaiver.EffectiveDateForRating >= ratingPeriod.RatingStart
           and specificWaiver.EffectiveDateForRating < ratingPeriod.RatingEnd 
           and specificWaiver.ExpirationDateForRating > ratingPeriod.RatingStart
           and specificWaiver.ExpirationDateForRating <= ratingPeriod.RatingEnd   
  }

   /**
   * Checks to see if the effective and expiration dates for rating on the supplementary disease exposure are within the rating period start and end dates
   * @param supplementary disease exposure - the {@link WC7SupplDiseaseExposure}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the supplementary disease exposure
   * @return boolean 
   */
  static function isSupplementaryDiseaseExposureWithinRatingPeriod(supplDiseaseExpo : WC7SupplDiseaseExposure, ratingPeriod : WC7RatingPeriod) : boolean {
    return supplDiseaseExpo.EffectiveDateForRating >= ratingPeriod.RatingStart
           and supplDiseaseExpo.EffectiveDateForRating < ratingPeriod.RatingEnd 
           and supplDiseaseExpo.ExpirationDateForRating > ratingPeriod.RatingStart
           and supplDiseaseExpo.ExpirationDateForRating <= ratingPeriod.RatingEnd   
  }
  
  
   /**
   * Checks to see if the effective and expiration dates for rating on the atomic energy exposure are within the rating period start and end dates
   * @param atomic Energy exposure - the {@link WC7AtomicEnergyExposure}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the atomic Energy exposure
   * @return boolean 
   */
  static function isAtomicEnergyExposureWithinRatingPeriod(atomicEnergyExpo : WC7AtomicEnergyExposure, ratingPeriod : WC7RatingPeriod) : boolean {
    return atomicEnergyExpo.EffectiveDateForRating >= ratingPeriod.RatingStart
           and atomicEnergyExpo.EffectiveDateForRating < ratingPeriod.RatingEnd 
           and atomicEnergyExpo.ExpirationDateForRating > ratingPeriod.RatingStart
           and atomicEnergyExpo.ExpirationDateForRating <= ratingPeriod.RatingEnd   
  }


  /**
   * returns which basis to use for rating
   * @param auditInfo - the {@link AuditInformation} which is used to check which basis should be used
   * @param covEmp - the {@link WC7CoveredEmployeeBase} from which to retrieve the basis for rating
   * @return int
   */
  static function basisForRating(auditInfo : AuditInformation, covEmp : WC7CoveredEmployeeBase) : int {
    var amountToUse = covEmp.ProratedEstimatedAmount
    if (auditInfo.IsFinalAudit) {
      amountToUse = covEmp.BasisAmount
    } else if (auditInfo.IsRevision) {
      amountToUse = covEmp.LastBilledCoveredEmployee.BasisForRating
    }
      else {
       amountToUse = covEmp.ProratedEstimatedAmount
    }
    return amountToUse
  }

 /**
   * returns which waiverSubrobasis to use for rating
   * @param auditInfo - the {@link AuditInformation} which is used to check which basis should be used
   * @param wcWaiverSubro - the {@link WC7WaiverOfSubro} from which to retrieve the basis for rating
   * @return int
   */ 
 static function  waiverSubroBasisForRating(auditInfo : AuditInformation, wcWaiverSubro : WC7WaiverOfSubro) : int { 
  var amountToUse = wcWaiverSubro.ProratedEstimatedAmount
    if (auditInfo.IsFinalAudit) {
      amountToUse = wcWaiverSubro.BasisAmount
    } else if (auditInfo.IsRevision) {
      amountToUse = wcWaiverSubro.LastBilledCoveredEmployee.BasisForRating
    }
    return amountToUse
}
  
  /**
   * Gets the supplementary disease in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return WC7SupplDiseaseExposure[]
   */
  static function getSupplementaryDiseaseInJurisdiction(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7SupplDiseaseExposure> {
   var matchingJurisdiction = gw.api.util.StateJurisdictionMappingUtil.getStateMappingForJurisdiction(ratingPeriod.Jurisdiction.Jurisdiction)
   
   return wc7Line.WC7SupplDiseaseExposureVLs.map(\versionList ->
      versionList.AllVersions.where(\ wcSupplDisease ->
          wcSupplDisease.Location.State == matchingJurisdiction
          and wcSupplDisease.EffectiveDateForRating >= ratingPeriod.RatingStart
          and wcSupplDisease.EffectiveDateForRating < ratingPeriod.RatingEnd
          and wcSupplDisease.ExpirationDateForRating > ratingPeriod.RatingStart
          and wcSupplDisease.ExpirationDateForRating <= ratingPeriod.RatingEnd))
     .where(\l -> l.Count > 0).flatten().toList()
  }

   /**
   * Gets the Atomic Energy in a particular jurisdiction that are within the rating period start and end dates
   * @param wc7Line - the {@link WC7WorkersCompLine}
   * @param ratingPeriod - the {@link WC7RatingPeriod} which is used to compare with the effective and expiration rating dates on the covered employee
   * @return WC7AtomicEnergyExposure[]
   */
  static function getAtomicEnergyInJurisdiction(wc7Line : WC7WorkersCompLine, ratingPeriod : WC7RatingPeriod) : List<WC7AtomicEnergyExposure> {
   var matchingJurisdiction = gw.api.util.StateJurisdictionMappingUtil.getStateMappingForJurisdiction(ratingPeriod.Jurisdiction.Jurisdiction)
   
   return wc7Line.WC7AtomicEnergyExposureVLs.map(\versionList ->
      versionList.AllVersions.where(\ wcAtomicEnergy ->
          wcAtomicEnergy.Location.State == matchingJurisdiction
          and wcAtomicEnergy.EffectiveDateForRating >= ratingPeriod.RatingStart
          and wcAtomicEnergy.EffectiveDateForRating < ratingPeriod.RatingEnd
          and wcAtomicEnergy.ExpirationDateForRating > ratingPeriod.RatingStart
          and wcAtomicEnergy.ExpirationDateForRating <= ratingPeriod.RatingEnd))
     .where(\l -> l.Count > 0).flatten().toList()
  }
  
  /**
   * returns which basis to use for rating
   * @param auditInfo - the {@link AuditInformation} which is used to check which basis should be used
   * @param wcSupplDisease - the {@link WC7SupplDiseaseExposure} from which to retrieve the basis for rating
   * @return int
   */
  static function supplDiseaseBasisForRating(auditInfo : AuditInformation, wcSupplDisease : WC7SupplDiseaseExposure) : int {
    var amountToUse = wcSupplDisease.ProratedEstimatedAmount
    if (auditInfo.IsFinalAudit) {
      amountToUse = wcSupplDisease.BasisAmount
    } else if (auditInfo.IsRevision) {
      amountToUse = wcSupplDisease.LastBilledSupplDiseaseExposure.BasisForRating
    }
    return amountToUse
  }
  
    /**
   * returns which basis to use for rating
   * @param auditInfo - the {@link AuditInformation} which is used to check which basis should be used
   * @param wcAtomicEnergy - the {@link WC7AtomicEnergyExposure} from which to retrieve the basis for rating
   * @return int
   */
  static function atomicEnergyBasisForRating(auditInfo : AuditInformation, wcAtomicEnergyExposure : WC7AtomicEnergyExposure) : int {
    var amountToUse = wcAtomicEnergyExposure.ProratedEstimatedAmount
    if (auditInfo.IsFinalAudit) {
      amountToUse = wcAtomicEnergyExposure.BasisAmount
    } else if (auditInfo.IsRevision) {
      amountToUse = wcAtomicEnergyExposure.LastBilledAtomicEnergyExposure.BasisForRating
    }
    return amountToUse
  }
}
