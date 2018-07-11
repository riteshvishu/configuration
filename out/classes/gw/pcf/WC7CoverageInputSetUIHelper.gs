package gw.pcf

uses gw.api.productmodel.ClausePattern
uses gw.entity.IArrayPropertyInfo
uses gw.lob.wc7.rating.WC7RatingPeriod
uses java.lang.IllegalStateException

/**
 * Helper methods for custom CoverageInputSets for WC7Line.  In particular, CoverageInputSets that bind to custom
 * list views such as "WC7SoleProprietorsPartnersOfficersAndOthersCovCond" and Owner Officers.
 */
class WC7CoverageInputSetUIHelper {

  function toggleClause(wc7Line : WC7WorkersCompLine, clausePattern : ClausePattern, selected : boolean) {
    //WC7FederalEmployersLiabilityActACov must be added or removed full term to facilitate in rating.
    if (clausePattern == "WC7FederalEmployersLiabilityActACov"){
      wc7Line.setFELACovExists(selected)
      return
    }
    //MaritimeACov must be added or removed full term to facilitate in rating.
    if (clausePattern == "WC7MaritimeACov"){
      wc7Line.setMaritimeCovExists(selected)
      return
    }
    
    if (not selected)
      deselectClause(wc7Line, clausePattern)
      
    wc7Line.setCoverageConditionOrExclusionExists(clausePattern, selected)
  }

  protected function deselectClause(wc7Line : WC7WorkersCompLine, clausePattern : ClausePattern) {
    switch (clausePattern) {
      case "WC7AircraftPremiumEndorsementCond":
        removeAllWC7AircraftSeats(wc7Line)
        break
      case "WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond":
        removeAllWaiverOfSubros(wc7Line)
        break
      case "WC7DesignatedWorkplacesExclEndorsementExcl":
        removeAllDesignatedWorkplaces(wc7Line)
        break
      case "WC7SoleProprietorsPartnersOfficersAndOthersCovCond":
        removeAllIncludedOwnerOfficers(wc7Line)
        break
      case "WC7PartnersOfficersAndOthersExclEndorsementExcl":
        removeAllExcludedOwnerOfficers(wc7Line)
        break
      case "WC7LaborContractorExclEndorsementExcl":
        removeAllExcludedLaborContractors(wc7Line)
        break
      case "WC7LaborContractorEndorsementACond":
        removeAllIncludedLaborContractors(wc7Line, clausePattern)
        break
      case "WC7EmployeeLeasingClientEndorsementCond":
        removeAllIncludedLaborClients(wc7Line, clausePattern)
        break
      case "WC7EmployeeLeasingClientExclEndorsementExcl":
        removeAllExcludedEmployeeLaborClientExclusion(wc7Line)
        break
      case "WC7MultipleCoordinatedPolicyEndorsementCond":
        removeAllMultipleCoordinatedPolicies(wc7Line)
        break 
      }
  }

  /**
   * Remove all WC7AircraftSeat data from the line {@link WC7WorkersCompLine}
   */
  function removeAllWC7AircraftSeats(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7AircraftSeats") as IArrayPropertyInfo
    removeAllMatchingValuesAfterDate(wc7Line, \ e-> true, arrayProp)
  }
  

  /**
   * Remove all Included Owner Officers  {@link WC7OwnerOfficers} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Owner Officers that are 'excluded' should still remain on the line.
   */
  function removeAllIncludedOwnerOfficers(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyOwnerOfficers") as IArrayPropertyInfo
    var isMatch : block(aBean : EffDated) : boolean  = \ aBean : EffDated -> {
        return (aBean as WC7PolicyOwnerOfficer).isIncluded()
      }
    removeAllMatchingValuesAfterDate(wc7Line, isMatch, arrayProp)
  }
  

  /**
   * Remove all Excluded Owner Officers  {@link WC7OwnerOfficers} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Owner Officers that are 'included' should still remain on the line.
   */
  function removeAllExcludedOwnerOfficers(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyOwnerOfficers") as IArrayPropertyInfo
    var isMatch : block(aBean : EffDated) : boolean  = \ aBean : EffDated -> {
        return (not (aBean as WC7PolicyOwnerOfficer).isIncluded())
      }      
    removeAllMatchingValuesAfterDate(wc7Line, isMatch, arrayProp)
  }

  /**
   * Remove all Waivers of Subrogation {@link WC7WaiverOfSubros} from the line {@link WC7WorkersCompLine}
   */
  function removeAllWaiverOfSubros(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7WaiverOfSubros") as IArrayPropertyInfo
    removeAllMatchingValuesAfterDate(wc7Line, \ e-> true, arrayProp)
  }

  /**
   * Remove all Designated Workplaces {@link WC7ExcludedWorkplace} from the line {@link WC7WorkersCompLine}
   */
  function removeAllDesignatedWorkplaces(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7ExcludedWorkplaces") as IArrayPropertyInfo
    removeAllMatchingValuesAfterDate(wc7Line, \ e-> true, arrayProp)
  }

  /**
   * Remove all Multiple Coordinated Policies {@link WC7CoordinatedPolicy} from the line {@link WC7WorkersCompLine}
   */
  function removeAllMultipleCoordinatedPolicies(wc7Line : WC7WorkersCompLine) {
    var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("MultipleCoordinatedPolicies") as IArrayPropertyInfo
    removeAllMatchingValuesAfterDate(wc7Line, \ e-> true, arrayProp)
  }
  
  /**
   * End dates any future FELA exposures {@link WC7FedCoveredEmployees} on the line {@link WC7WorkersCompLine}
   * as of the slice date 
   * 
   * @param wc7Line - the {@link WC7WorkersCompLine} that is used to retrieve the federal liability covered employees
   */
  function endDateFutureFELAExposures(wc7Line : WC7WorkersCompLine) {
    wc7Line.VersionList.WC7FedCoveredEmployees.allVersionsFlat()
      .each(\ wcFedCovEmp -> {
        if (wcFedCovEmp.ExpirationDate > wc7Line.SliceDate) {
          wcFedCovEmp.endDateWM(wc7Line.SliceDate)
        }
      })
  }

  /**
   * End dates any future Maritime exposures {@link WC7MaritimeCoveredEmployees} on the line {@link WC7WorkersCompLine}
   * as of the slice date 
   * 
   * @param wc7Line - the {@link WC7WorkersCompLine} that is used to retrieve the maritime covered employees
   */
  function endDateFutureMaritimeExposures(wc7Line : WC7WorkersCompLine) {
    wc7Line.VersionList.WC7MaritimeCoveredEmployees.allVersionsFlat()
      .each(\ wcMaritimeCovEmp -> {
        if (wcMaritimeCovEmp.ExpirationDate > wc7Line.SliceDate) {
          wcMaritimeCovEmp.endDateWM(wc7Line.SliceDate)
        }
      })
  }
    
  /**
   * Remove all Included Labor Contractor  {@link WC7PolicyLaborContractor} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Owner Officers that are 'excluded' should still remain on the line.
   */
  function removeAllIncludedLaborContractors(wc7Line : WC7WorkersCompLine, clausePattern : ClausePattern) {
    var parentArrayProperty = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborContractors") as IArrayPropertyInfo
    var arrayProperty = WC7LaborContact.Type.TypeInfo.getProperty("WC7Details") as IArrayPropertyInfo
    var isMatch : block(detail : EffDated) : boolean  = \ detail : EffDated -> {
      return detail typeis WC7IncludedLaborContactDetail and detail.LaborContactCondition.Pattern == clausePattern
    }      
    removeAllMatchingValuesAfterDateForNestedBean(wc7Line, isMatch, arrayProperty, parentArrayProperty)
  }
  
  /**
   * Remove all Excluded Labor Contractor  {@link WC7PolicyLaborContractor} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Owner Officers that are 'included' should still remain on the line.
   */
  function removeAllExcludedLaborContractors(wc7Line : WC7WorkersCompLine) {
    var parentArrayProperty = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborContractors") as IArrayPropertyInfo
    var arrayProperty = WC7LaborContact.Type.TypeInfo.getProperty("WC7Details") as IArrayPropertyInfo
    var isMatch : block(aBean : EffDated) : boolean  = \ aBean : EffDated -> {
        var detail = aBean as WC7LaborContactDetail
        return not detail.isIncluded()
      }      
    removeAllMatchingValuesAfterDateForNestedBean(wc7Line, isMatch, arrayProperty, parentArrayProperty)
 }
 
  /**
   * Remove all Included Labor Client  {@link WC7PolicyLaborClient} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Labor Clients that are 'excluded' should still remain on the line.
   */
  function removeAllIncludedLaborClients(wc7Line : WC7WorkersCompLine, clausePattern : ClausePattern) {    
    var parentArrayProperty = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborClients") as IArrayPropertyInfo
    var arrayProperty = WC7LaborContact.Type.TypeInfo.getProperty("WC7Details") as IArrayPropertyInfo
    var isMatch : block(aBean : EffDated) : boolean  = \ detail : EffDated -> {
      return detail typeis WC7IncludedLaborContactDetail and detail.LaborContactCondition.Pattern == clausePattern
    }      
    removeAllMatchingValuesAfterDateForNestedBean(wc7Line, isMatch, arrayProperty, parentArrayProperty)
  }
    
  /**
   * Determine whether the disease loaded column should be visible based on the existing WC7WaiverOfSubros entries
   * @param wc7Line - the {@link WC7Line} where the WC7WaiverOfSubros are stored in
   * @return Boolean - true if there is one or more {@link WC7WaiverOfSubros} with disease class code
   */
  function isDiseaseLoadedColumnVisible(wc7Line : WC7WorkersCompLine) : boolean {
    return wc7Line.WC7WaiverOfSubroVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ waiver -> waiver.ClassCode.DiseaseType and waiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC)
  }
    
  /**
   * Determine whether the disease loaded column should be visible based on the existing WC7WaiverOfSubros entries
   * @param wc7Line - the {@link WC7Line} where the WC7WaiverOfSubros are stored in
   * @return Boolean - true if there is one or more {@link WC7WaiverOfSubros} with disease class code
   */
  function isDiseaseLoadedColumnVisible(juris : WC7Jurisdiction) : boolean {
    return juris.WCLine.WC7WaiverOfSubroVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ waiver -> waiver.Jurisdiction == juris.Jurisdiction and waiver.ClassCode.DiseaseType and waiver.Type == WC7WaiverOfSubrogation.TC_SPECIFIC)
  }
  
  
  /**
   * Clear up user previously provided DiseaseLoaded of current WC7WaiverOfSubro
   * @param wc7SpecificWaiverOfSubro - the {@link WC7WaiverOfSubro} where the WC7WaiverOfSubro are stored in
   */
  function clearupSpecificWaiverDiseaseLoadedColumn(wc7SpecificWaiverOfSubro : WC7WaiverOfSubro)  {   
    wc7SpecificWaiverOfSubro.SpecificDiseaseLoaded = false
  }
  
  /**
   * Remove all Excluded Labor Client  {@link WC7PolicyLaborClient} from the line {@link WC7WorkersCompLine}
   *
   * Note, any Labor Clients that are 'included' should still remain on the line.
   */
  function removeAllExcludedEmployeeLaborClientExclusion(wc7Line : WC7WorkersCompLine) {    
    var parentArrayProperty = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyLaborClients") as IArrayPropertyInfo
    var arrayProperty = WC7LaborContact.Type.TypeInfo.getProperty("WC7Details") as IArrayPropertyInfo
    var isMatch : block(aBean : EffDated) : boolean  = \ aBean : EffDated -> {
        var detail = aBean as WC7LaborContactDetail
        return not detail.isIncluded()
      }      
    removeAllMatchingValuesAfterDateForNestedBean(wc7Line, isMatch, arrayProperty, parentArrayProperty)
  }

   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7FedCoveredEmployees entries
   * @param wc7Line - the {@link WC7Line} where the WC7FedCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7FedCoveredEmployees} with disease loaded selected
   */
  function isFedCovEmpSupplementalLoadingRateColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7FedCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.SupplementalDiseaseLoaded)
  }
  
   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7MaritimeCoveredEmployees entries
   * @param wc7Line - the {@link WC7Line} where the WC7MaritimeCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7MaritimeCoveredEmployees} with disease loaded selected
   */
  function isMaritimeCovEmpSupplementalLoadingRateColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7MaritimeCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.SupplementalDiseaseLoaded)
  }

   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7FedCoveredEmployees entries
   * @param wc7Line - the {@link WC7Line} where the WC7FedCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7FedCoveredEmployees} with disease loaded selected
   */
  function isFedCovEmpSpecificDiseaseColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7FedCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.ClassCode.DiseaseType)
  }

   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7FedCoveredEmployees entries
   * This is used by the Audit screen which groups Federal Employees by Jurisdiction (instead of all of them together like the wizard UI)
   * @param juris - the {@link WC7Jurisdiction} where the WC7FedCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7FedCoveredEmployees} with disease loaded selected
   */
  function isFedCovEmpSpecificDiseaseColumnVisible(juris : WC7Jurisdiction) : boolean { 
    return juris.WCLine.WC7FedCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.Jurisdiction == juris and covEmp.ClassCode.DiseaseType)
  }
  
   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7MaritimeCoveredEmployees entries
   * @param wc7Line - the {@link WC7Line} where the WC7MaritimeCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7MaritimeCoveredEmployees} with disease loaded selected
   */
  function isMaritimeCovEmpSpecificDiseaseColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7MaritimeCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.ClassCode.DiseaseType)
  }
  
   /**
   * Determine whether the supplemental disease loading rate column should be visible based on the existing WC7MaritimeCoveredEmployees entries
   * This is used by the Audit screen which groups Maritime Employees by Jurisdiction (instead of all of them together like the wizard UI)
   * @param juris - the {@link WC7Jurisdiction} where the WC7MaritimeCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7MaritimeCoveredEmployees} with disease loaded selected
   */
  function isMaritimeCovEmpSpecificDiseaseColumnVisible(juris : WC7Jurisdiction) : boolean { 
    return juris.WCLine.WC7MaritimeCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.Jurisdiction == juris and covEmp.ClassCode.DiseaseType)
  }

   /**
   * Determine whether the Specific Disease column should be visible based on the existing WC7FedCoveredEmployees entries
   * @param jurisidiction - the {@link WC7Jurisdiction} where the WC7FedCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7FedCoveredEmployees} have a disease Class Code
   */
  function isFedCovEmpRateColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7FedCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.ClassCode.ARatedType)
  }
  
   /**
   * Determine whether the  rate column should be visible based on the existing WC7MaritimeCoveredEmployees entries
   * @param jurisidiction - the {@link WC7Jurisdiction} where the WC7MaritimeCoveredEmployees are stored in
   * @return Boolean - true if there is one or more {@link WC7MaritimeCoveredEmployees} with ARated class code
   */
  function isMaritimeCovEmpRateColumnVisible(wc7Line : WC7WorkersCompLine) : boolean { 
    return wc7Line.WC7MaritimeCoveredEmployeeVLs*.AllVersions?.flatMap(\ l -> l)?.hasMatch(\ covEmp -> covEmp.ClassCode.ARatedType)
  }
  
  
  private function removeAllMatchingValuesAfterDateForNestedBean(parentBean : EffDated, isMatch : block(aBean : EffDated) : boolean, arrayProp : IArrayPropertyInfo, parentArrayProp : IArrayPropertyInfo) {
    var listOfParentEntityArrayVersionLists = parentBean.VersionList.getArray(parentArrayProp)
    var editEffDate = parentBean.BranchUntyped.EditEffectiveDate      
    
    for (versionListOfParentEntity in listOfParentEntityArrayVersionLists){
      var dateToRemove = editEffDate
      var versionListOfTargetEntity = versionListOfParentEntity.getArray(arrayProp)
      versionListOfTargetEntity.each(\ aVersionList -> {
        var beanToRemove = aVersionList.AllVersionsUntyped.firstWhere(\ ed -> {
          var effDateRange = ed.EffectiveDateRange
          var willRemove = isMatch(ed) and (effDateRange.includes(dateToRemove) or effDateRange.Start.afterOrEqual(dateToRemove))
          return willRemove
        })
  
        if (beanToRemove != null){
          var beanEffDate = beanToRemove.EffectiveDate
          var removesliceDate = beanEffDate.after(dateToRemove) ? beanEffDate : dateToRemove
          var slicedbean = beanToRemove.getSliceUntyped(removesliceDate)
          slicedbean.remove()
        }
      })
    }
  }
  
  /**
   * Remove matching child elements from a parent eff dated from the current and future slices.
   * 
   * <br>
   * For example: remove all "included" owner officers from the line after the edit effective date (see the code below)
   * <pre>
     var arrayProp = WC7WorkersCompLine.Type.TypeInfo.getProperty("WC7PolicyOwnerOfficers") as IArrayPropertyInfo
     var isMatch : block(aBean : EffDated) : boolean  = \ aBean : EffDated -> {
         return (aBean as WC7PolicyOwnerOfficer).isIncluded()
       }      
     removeAllMatchingValuesAfterDate(wc7Line, isMatch, arrayProp)
    </pre>
   * 
   * @param parentBean - an {@link EffDated} bean that contains the array property.
   * @param isMatch -    a {@link block(aBean : EffDated) : boolean} expression that returns true if the given bean will match.  This should check properties on the child
   * @param arrayProp -  the {@link IArrayPropertyInfo} for child beans to traverse.
   */
  private function removeAllMatchingValuesAfterDate(parentBean : EffDated, isMatch : block(aBean : EffDated) : boolean, arrayProp : IArrayPropertyInfo) {
    var listOfArrayVersionLists = parentBean.VersionList.getArray(arrayProp)
    var editEffDate = parentBean.BranchUntyped.EditEffectiveDate      
    for (aVersionList in listOfArrayVersionLists){
      var dateToRemove = editEffDate
            
      var beanToRemove = aVersionList.AllVersionsUntyped.firstWhere(\ ed -> {
          var effDateRange = ed.EffectiveDateRange
          var willRemove = isMatch(ed) and (effDateRange.includes(dateToRemove) or effDateRange.Start.afterOrEqual(dateToRemove))
          return willRemove
        })
      
      if (beanToRemove != null){
        var beanEffDate = beanToRemove.EffectiveDate
        var removesliceDate = beanEffDate.after(dateToRemove) ? beanEffDate : dateToRemove
        var slicedbean = beanToRemove.getSliceUntyped(removesliceDate)
        slicedbean.remove()
      }
    }
  }

   /**
    * Returns the BenefitsDedCov on the coverable (@link WC7Jurisdiction) 
    * from versionList for the given rating period
    *
    * @return WC7BenefitsDedCov
    * @param WC7Jurisdiction - for the selected WC7Jurisdiction
    * @param ratingPeriod - for the given rating period 
    */
   function getBenefitsDeductibleCovInRatingPeriod(ratingPeriod : WC7RatingPeriod) : WC7BenefitsDedCov {
     var jurisAtRatingPeriodStart = (ratingPeriod.Jurisdiction.VersionList.getVersionAsOf(ratingPeriod.Start) as WC7Jurisdiction).getSlice(ratingPeriod.Start)
     var benDedCov = jurisAtRatingPeriodStart.WC7BenefitsDedCov
     return benDedCov
   }
   
  /**
   * Return a first benefitsDedCov version (in natural order) for any rating period in the given jurisdiction
   * @return WC7BenefitsDedCov
   * @param WC7Jurisdiction
   */  
  function getBenefitsDeductibleCovForAnyRatingPeriod(jurisdiction : WC7Jurisdiction) : WC7BenefitsDedCov {
    return jurisdiction.AllCoverageVersions.whereTypeIs(WC7BenefitsDedCov).sort().first()
  }

  /**
   * On toggle, checks/unchecks the benefitsDedCov for a given jurisdiction and rating period. 
   * If the coverage is null, either gets a coverage from the version list and clones it or 
   * creates a new one. If benefitsDedCov is unselected, resets the selected covTerm values 
   * to defaults and end dates the coverage. 
   * @param wc7Jurisdiction - for the selected WC7Jurisdiction
   * @param coverage - selected coverage or null. If null, existing coverage from versionlist 
   * is set as coverage or a new coverage is created
   * @param selected - boolean value on coverage toggle
   * @param ratingPeriod - for a rating period
   */
  function setBenefitsDedCovOnToggle(selected : boolean, ratingPeriod : WC7RatingPeriod) : WC7BenefitsDedCov {
    var coverage = getBenefitsDeductibleCovInRatingPeriod(ratingPeriod)
    if (selected) {
      coverage = makeBenefitsDedCovForRatingPeriod(ratingPeriod)
    } else if (not selected) {
      removeBenefitsDedCovForRatingPeriod(ratingPeriod)
    } 
    return coverage
  }
  
  internal function makeBenefitsDedCovForRatingPeriod(ratingPeriod : WC7RatingPeriod) : WC7BenefitsDedCov {
    var jurisAtRatingPeriodStart = (ratingPeriod.Jurisdiction.VersionList.getVersionAsOf(ratingPeriod.Start) as WC7Jurisdiction).getSlice(ratingPeriod.Start)
    var benefitsDedCov = getBenefitsDeductibleCovForAnyRatingPeriod(jurisAtRatingPeriodStart)
    if(benefitsDedCov == null) {
      benefitsDedCov = jurisAtRatingPeriodStart.createCoverage("WC7BenefitsDedCov") as WC7BenefitsDedCov
      benefitsDedCov.Unsliced.setEffectiveWindow(ratingPeriod.Start, ratingPeriod.End)
    } else {
      benefitsDedCov = benefitsDedCov.Branch.cloneBeanIntoSlice(benefitsDedCov, ratingPeriod.Start, ratingPeriod.End) as WC7BenefitsDedCov
    }
    resetCovTerms(benefitsDedCov)
    return benefitsDedCov
  }
  
  internal function removeBenefitsDedCovForRatingPeriod(ratingPeriod : WC7RatingPeriod) {
    var coverage = getBenefitsDeductibleCovInRatingPeriod(ratingPeriod)
    if (coverage == null) {
      return
    }
    
    // make sure coverage dates match ratingPeriod dates
    if (not effDatesMatchPeriodDates(coverage, ratingPeriod)) {
      throw new IllegalStateException("Benefit Deductible Coverage Effective Dates ${coverage.EffectiveDate}-${coverage.ExpirationDate} do not match Rating Period dates ${ratingPeriod.Start}-${ratingPeriod.End}")
    }
    
    // short circuit if coverage does not exist
    if(coverage == null) {
      return
    }
    
    resetCovTerms(coverage)  // remove it
    // protect against 0-width coverage...
//    if(coverage.isEffective(coverage.EffectiveDate)) {
//      for(cost in coverage.Costs) {
//        // remove costs in slice mode - may lose cost overrides in some cases, but safer
//        var costSlice = cost.getSlice(coverage.EffectiveDate)
//        costSlice.remove()
//      }
//    }
//    var covWM = coverage.VersionList.getVersionAsOf(coverage.EffectiveDate)
//    covWM.removeChunk(coverage.EffectiveDate, coverage.ExpirationDate)
    coverage.removeChunk(coverage.EffectiveDate, coverage.ExpirationDate)
  }
  
  private function effDatesMatchPeriodDates(effDated : EffDated, ratingPeriod : WC7RatingPeriod) : boolean {
    return effDated.EffectiveDate == ratingPeriod.Start and effDated.ExpirationDate == ratingPeriod.End
  }
  
  /**
   * Resets the coverage's cov terms to their default values and the Effictive/ExpirationDate to eff/exp date.
   */
  function resetCovTerms(coverage : WC7BenefitsDedCov) {
    coverage.CovTerms.each(\ c -> c.resetToDefault())
  }

  /**
   * Clear up user previously provided DiseaseLoaded, Supplemental Disease Loading rate and classCodeRate of current wc7CoveredEmploy
   * @param wc7fedEmployee - the {@link WC7FedCoveredEmployee} where the WC7FedCoveredEmployee are stored in
   */
  function clearupWC7FedEmployeeRates(wc7FedEmployee : WC7FedCoveredEmployee)  {   
      wc7FedEmployee.SupplementalDiseaseLoaded = false
      wc7FedEmployee.SpecificDiseaseLoaded = false
      wc7FedEmployee.SupplementalDiseaseLoadingRate = null
      wc7FedEmployee.ClassCodeRate = null  
  }
  
  /**
   * Clear up user previously provided DiseaseLoaded, Supplemental Disease Loading rate and classCodeRate of current wc7CoveredEmploy
   * @param wc7MaritimeEmployee - the {@link wc7MaritimeEmployee} where the wc7MaritimeEmployee are stored in
   */
  function clearupWC7MaritimeEmployeeRates(wc7MaritimeEmployee : WC7MaritimeCoveredEmployee)  {   
      wc7MaritimeEmployee.SupplementalDiseaseLoaded = false
      wc7MaritimeEmployee.SpecificDiseaseLoaded = false
      wc7MaritimeEmployee.SupplementalDiseaseLoadingRate = null
      wc7MaritimeEmployee.ClassCodeRate = null  
  }

  function syncConditionsIfRequired(coverable : Coverable, openForEdit : boolean) {
    //functionality used in Standards Based
  }
}
