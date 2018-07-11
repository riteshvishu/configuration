package gw.pcf
uses gw.api.web.util.DateRangeUtil
uses java.util.Date
uses gw.api.util.LocationUtil
uses gw.lob.wc7.WC7LineValidation

/**
 * Helper methods for the WC7ClassesInputSet.pcf.  
 */
class WC7ClassesInputSetUIHelper {
  
  /**
   * Gets the first matching class code using a set of criteria
   * @param code - the class code string to look for
   * @param wc7Employee - uses the attributes off of the {@link WC7CoveredEmployee} to search for the class code
   * @param previousCode - the previous {@link WC7ClassCode} that was entered
   * @return WC7ClassCode
   */
  static function findFirstMatchingClassCode(code : String,
                                              wc7Employee : WC7CoveredEmployee,
                                              previousCode : WC7ClassCode) : WC7ClassCode {    
    var jur = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(wc7Employee.LocationWM)                             
    if (code == null) {
      return null
    }
    var classCodes = wc7Employee.WC7WorkersCompLine.findMatchingClassCodes(code, jur, previousCode, getExcludedClassCodeTypes(wc7Employee.GoverningLaw))
    if (classCodes.IsEmpty) {
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Policy.WC7.Validation.InvalidClassCode(code, jur))
    } 
    return classCodes.first()
  }  

  /**
   * Gets the first matching atomic energy class code using a set of criteria
   * @param code - the class code string to look for
   * @param wc7AtomicEnergyExp - uses the attributes off of the {@link WC7AtomicEnergyExposure} to search for the class code
   * @return WC7ClassCode
   */
  static function findFirstMatchingClassCodeAtomicEnergy(code : String,
                                              wc7AtomicEnergyExp : WC7AtomicEnergyExposure): WC7ClassCode {    
    var jur = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(wc7AtomicEnergyExp.LocationWM)                             
    if (code == null) {
      return null
    }
    var classCodes = wc7AtomicEnergyExp.WCLine.findMatchingAtomicEnergyClassCodes(code, jur)
    if (classCodes.IsEmpty) {
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Policy.WC7.Validation.InvalidAtomicEnergyClassCode(code, jur))
    } 
    return classCodes.first()
  }  

  /**
   * Gets the first matching class code using a set of criteria
   * @param code - the class code string to look for
   * @param wc7FedCoveredEmployee - uses the attributes off of the {@link WC7FedCoveredEmployee} to search for the class code
   * @param wc7FedEmpLiabCov - uses attributes off of the {@link WC7FederalEmployersLiabilityActACov} to derive program type to search for the class code
   * @param previousCode - the previous {@link WC7ClassCode} that was entered
   * @return WC7ClassCode
   */
  static function findFirstMatchingClassCodeFedEmp(code : String,
                                              wc7FedCoveredEmployee : WC7FedCoveredEmployee,
                                              wc7FedEmpLiabCov : WC7FederalEmployersLiabilityActACov,
                                              previousCode : WC7ClassCode) : WC7ClassCode {    
    var jur = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(wc7FedCoveredEmployee.LocationWM)                             
    if (code == null) {
      return null
    }
    var classCodes = wc7FedCoveredEmployee.WC7WorkersCompLine
                      .findMatchingClassCodes(code, jur, 
                        WC7ClassCodeType.TC_FELA, 
                        deriveClassCodeProgramType(wc7FedEmpLiabCov.WC7FedEmpLiabProgramTerm.Value, wc7FedEmpLiabCov.WC7FedEmpLiabLawTerm.Value), 
                        previousCode)
    if (classCodes.IsEmpty) {
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Policy.WC7.Validation.InvalidClassCodeForProgramType(code, jur))
    } 
    return classCodes.first()
  }
  
  /**
   * Derives clas code program type value using program type and governing law values on the coverage
   * @param covProgramType - program type on the coverage
   * @param governingLaw - applicable law on the coverage
   * @return WC7ClassCodeProgramType
   */
  static function deriveClassCodeProgramType(covProgramType : WC7CovProgramType, governingLaw : WC7GoverningLaw) : WC7ClassCodeProgramType {
    return WC7LineValidation.deriveClassCodeProgramType(covProgramType, governingLaw)
  }

  /**
   * Gets the first matching class code using a set of criteria
   * @param code - the class code string to look for
   * @param wc7MaritimeCoveredEmployee - uses the attributes off of the {@link WC7MaritimeCoveredEmployee} to search for the class code
   * @param wc7MaritimeCov - uses attributes off of the {@link WC7MaritimeACov} to derive program type to search for the class code
   * @param previousCode - the previous {@link WC7ClassCode} that was entered
   * @return WC7ClassCode
   */
  static function findFirstMatchingClassCodeMaritime(code : String,
                                              wc7MaritimeCoveredEmployee : WC7MaritimeCoveredEmployee,
                                              wc7MaritimeCov : WC7MaritimeACov,
                                              previousCode : WC7ClassCode) : WC7ClassCode {    
    var jur = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(wc7MaritimeCoveredEmployee.LocationWM)                             
    if (code == null) {
      return null
    }
    var classCodes = wc7MaritimeCoveredEmployee.WC7WorkersCompLine
                      .findMatchingClassCodes(code, jur, 
                        WC7ClassCodeType.TC_ADMIRALTY, 
                        deriveClassCodeProgramType(wc7MaritimeCov.WC7MaritimeProgramTerm.Value, wc7MaritimeCov.WC7MaritimeLiabLawTerm.Value), 
                        previousCode)
    if (classCodes.IsEmpty) {
      LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Policy.WC7.Validation.InvalidClassCodeForProgramType(code, jur))
    } 
    return classCodes.first()
  }
  
  /**
   * Gets the period number using the {@link WC7CoveredEmployee} and the dates that the covered employee splits
   * @param wc7Employee - the {@link WC7CoveredEmployee} from wchih to retrieve the dates
   * @param splitDates - a list of dates that the covered employee splits on
   */
  static function getPeriodNumbers(wc7Employee : WC7CoveredEmployee, splitDates : List<Date>) : String{
    return DateRangeUtil.getPeriodNumbers(wc7Employee.EffectiveDateRange, splitDates)
  }

  /**
   * Get the class code short descriptions using the {@link WC7CoveredEmployee} for covered employees
   * @param wc7Employee - the {@link WC7CoveredEmployeeBase} from which to retrieve the short descriptions
   * @param polLocation - the Policy Location {@link PolicyLocation)
   * @param previousCode - the previous {@link WC7ClassCode}
   * @return String[] - an array of class code short descriptions
   */
  static function getClassCodeShortDescriptions(wc7Employee : WC7CoveredEmployeeBase, 
                                                polLocation : PolicyLocation,
                                                previousCode : WC7ClassCode) : String[] {
                                                
    var hasRequiredInfoToRetrieveShortDescs = wc7Employee != null and 
                                                   wc7Employee.ClassCode != null and 
                                                   polLocation != null and 
                                                   wc7Employee.GoverningLaw != null
    var jurisdiction  = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(polLocation)                                                                                        
    if (hasRequiredInfoToRetrieveShortDescs) {      
      var classCodes = wc7Employee.WC7WorkersCompLine.findMatchingClassCodes(wc7Employee.ClassCode.Code, 
                                                                             jurisdiction.Code,                                                                              
                                                                             previousCode,
                                                                             getExcludedClassCodeTypes(wc7Employee.GoverningLaw)
                                                                             )                                                                      
      return classCodes.map(\ w -> w.ShortDesc)
    } 
    return {}
  }
  
  /**
   * Get the class code short descriptions using the {@link WC7CoveredEmployee} for line level coverages
   * @param wc7Employee - the {@link WC7CoveredEmployeeBase} from which to retrieve the short descriptions
   * @param polLocation - the Policy Location {@link PolicyLocation)
   * @param previousCode - the previous {@link WC7ClassCode}
   * @return String[] - an array of class code short descriptions
   */
  static function getClassCodeShortDescriptionsForLineCoverage(wc7Employee : WC7CoveredEmployeeBase, 
                                                polLocation : PolicyLocation,
                                                previousCode : WC7ClassCode) : String[] {
                                                
    var hasRequiredInfoToRetrieveShortDescs = wc7Employee != null and 
                                                   wc7Employee.ClassCode != null and 
                                                   polLocation != null and 
                                                   wc7Employee.GoverningLaw != null
    var jurisdiction  = gw.api.util.JurisdictionMappingUtil.getJurisdictionMappingForPolicyLocation(polLocation)                                                                                        
    if (hasRequiredInfoToRetrieveShortDescs) {      
      var classCodes = wc7Employee.WC7WorkersCompLine.findMatchingClassCodes(wc7Employee.ClassCode.Code, 
                                                                             jurisdiction.Code,                                                                              
                                                                             previousCode,
                                                                             null
                                                                             )
      return classCodes.map(\ w -> w.ShortDesc)
    } 
    return {}
  }
  
  /**
   * Get the class code type that we want to exclude in a class code search
   * @param specialCov - the {@link WC7GoverningLaw} that is used to determine which class code types to include
   * @return WC7ClassCodeType - the {@link WC7ClassCodeType} to search for
   */
  static function getExcludedClassCodeTypes(specialCov : WC7GoverningLaw) : List<WC7ClassCodeType> {
    // USLH -> return USLH and blank type, exclude Atomic Energy, Maritime and FELA
    if (WC7GoverningLaw.TC_LONGSHOREANDHARBOR.equals(specialCov)) {
      return {WC7ClassCodeType.TC_ATOMICENERGY, WC7ClassCodeType.TC_ADMIRALTY, WC7ClassCodeType.TC_FELA}
    }
    
    // by default -> return everything but Atomic Energy, Maritime, FELA and USLH
    return {WC7ClassCodeType.TC_ATOMICENERGY, WC7ClassCodeType.TC_ADMIRALTY, WC7ClassCodeType.TC_FELA, WC7ClassCodeType.TC_USLH}
  }

  
  /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7CoveredEmployees entries
   * @param jurisidiction - the {@link WC7Jurisdiction} where the WC7CoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7CoveredEmployee} with disease loaded
   */
  static function isSupplementalLoadingRateColumnVisible(jurisdiction : WC7Jurisdiction) : boolean { 
    return jurisdiction.WCLine.WC7CoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.Jurisdiction == jurisdiction and covEmp.SupplementalDiseaseLoaded)
  }

  /**
   * Determine whether the Specific Disease Loaded column should be visible based on the existing WC7CoveredEmployees entries
   * @param jurisidiction - the {@link WC7Jurisdiction} where the WC7CoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7CoveredEmployee} with disease class code
   */
  static function isSpecificDiseaseColumnVisible(jurisdiction : WC7Jurisdiction) : boolean { 
    return jurisdiction.WCLine.WC7CoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.Jurisdiction == jurisdiction and covEmp.ClassCode.DiseaseType)
  }

  /**
   * Determine whether the  rate column should be visible based on the existing WC7CoveredEmployees entries
   * @param jurisidiction - the {@link WC7Jurisdiction} where the WC7CoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7CoveredEmployee} with ARated class code
   */
  static function isRateColumnVisible(jurisdiction : WC7Jurisdiction) : boolean { 
    return jurisdiction.WCLine.WC7CoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.ClassCode.ARatedType 
      and covEmp.Jurisdiction == jurisdiction)
  }
  
  /**
   * Clear up user previously provided DiseaseLoaded, Supplemental Disease Loading rate and classCodeRate of current wc7CoveredEmploy
   * @param wc7Employee - the {@link WC7CoveredEmployee} where the WC7CoveredEmployees are stored in
   */
  static function clearupRates(wc7Employee : WC7CoveredEmployee)  {   
      wc7Employee.SupplementalDiseaseLoaded = false
      wc7Employee.SpecificDiseaseLoaded = false
      wc7Employee.SupplementalDiseaseLoadingRate = null
      wc7Employee.ClassCodeRate = null 
  }
}
