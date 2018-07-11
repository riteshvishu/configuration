package gw.plugin.diff.impl
uses gw.api.diff.DiffItem
uses gw.api.productmodel.CovTermPattern
uses java.util.ArrayList
uses gw.api.diff.DiffAdd
uses gw.api.diff.DiffRemove

/**
 * This class contains methods to help with adding and filtering diff items for a 
 * Workers Compensation line of business. 
 */
@Export
class WC7DiffHelper extends DiffHelper<entity.WC7WorkersCompLine>
{
  construct(reason : DiffReason, polLine1 : entity.WC7WorkersCompLine, polLine2 : entity.WC7WorkersCompLine) {
    super(reason, polLine1, polLine2)
  }

  /**
   * Adds diff items that apply to the Workers Comp LOB, e.g. Jurisdictions information
   * @param diffItems - list of diff items to add to
   * @return List<DiffItem> - returns the list of diff items that we've modified
   */  
  override function addDiffItems(diffItems : List<DiffItem>) : List<DiffItem> {
    diffItems = super.addDiffItems(diffItems)
    
    // Manually add diffs for retrospective and participating plans
    diffItems.addAll(createDiffsForEntity(diffItems, Line1.RetrospectiveRatingPlan, Line2.RetrospectiveRatingPlan))
    diffItems.addAll(createDiffsForEntity(diffItems, Line1.ParticipatingPlan, Line2.ParticipatingPlan))
    
    // Add diffs for line fields
    var differences = DiffUtils.compareBeans(Line1, Line2, 2)
    differences = recastPolicyLaborContactDiffItems(differences)
    diffItems.addAll(differences)  
    
    // Add diffs for 'assigned risk' field on policy info
    diffItems.addAll(this.comparePolicyPeriodField("AssignedRisk", 0))

    return diffItems.toSet().toList()
  } 
  
  function recastPolicyLaborContactDiffItems(diffItems : List<DiffItem>) :  List<DiffItem> {
    var result = new ArrayList<DiffItem>()

    for (diffItem in diffItems) {
      if (diffItem.Bean typeis WC7LaborContact) {
        var included = diffItem.Bean.WC7Details.where(\ w -> w.Inclusion == Inclusion.TC_INCL).cast(WC7IncludedLaborContactDetail)
        addDiffItemsBasedOnType(result, diffItem, included)
        var excluded = diffItem.Bean.WC7Details.where(\ w -> w.Inclusion == Inclusion.TC_EXCL).cast(WC7ExcludedLaborContactDetail)
        addDiffItemsBasedOnType(result, diffItem, excluded)      
      } else {
        result.add(diffItem)
      }
    }
    return result
  }

  function addDiffItemsBasedOnType(theList : ArrayList, theItem : DiffItem, theBeans : KeyableBean[]) {
    for (theBean in theBeans) {
      theList.add(theItem typeis DiffAdd ? new DiffAdd(theBean) : new DiffRemove(theBean))
    }
  }
  
  /**
   * Filters diff items that apply to the Workers Comp LOB
   * @param diffItems - list of diff items to filter
   * @return List<DiffItem> - returns the list of diff items that we've modified
   */ 
  override function filterDiffItems(diffItems : List<DiffItem>) : List<DiffItem> {  
    // Exposures, Modifiers, and Covered employees need to be handled differently because they split
    var filteredDiffItems = new ArrayList<DiffItem>()
    var hasSplittableEntity = false
    for (item in diffItems) {
      if (isSplittableEntity(item.Bean)) {
        hasSplittableEntity = true
        continue
      }
      filteredDiffItems.add(item)
    }
    // If there were splittable entities in the list of diff items, set the list of diffItems to 
    // filteredDiffItems (which does not contain any splittable entities), and
    // then add them back with special handling for splits. 
    if (hasSplittableEntity and this.Line2.Branch.Renewal == null) {
      diffItems = filteredDiffItems
      addWC7ExposureDiffs(diffItems)   
      addWC7ModifierDiffs(diffItems)
      addWC7JurisdictionDeductibleDiffs(diffItems)
    }
    super.filterDiffItems(diffItems)
    return diffItems.toSet().toList()
  }
  
  private function isSplittableEntity(bean : KeyableBean) : boolean {
    if (bean typeis WC7CoveredEmployeeBase or
        bean typeis WC7WaiverOfSubro or 
        bean typeis WC7Modifier or 
        bean typeis WC7JurisdictionCov or
        bean typeis WC7SupplDiseaseExposure) {
      return true
    }
    return false
  }
  
  private function addWC7ExposureDiffs(diffItems : List<DiffItem>) {
    addSplittableDiffs(diffItems, \ w -> w.AllWC7CoveredEmployeeBaseWM, \ s -> getEmpKey(s))
    addSplittableDiffs(diffItems, \ w -> w.AllWC7WaiverOfSubrosWM.toList(), \ s -> getWaiverKey(s))
    addSplittableDiffs(diffItems, \ w -> w.AllWC7SupplDiseaseExposuresWM.toList(), \ s -> getSupplDiseaseKey(s))
  }

  private function addWC7JurisdictionDeductibleDiffs(diffItems : List<DiffItem>) : List<DiffItem> {
    return addSplittableDiffs(diffItems, \ w -> getCoveragesWithTermValues(w, "WCDeductible"), \ s -> getCoverageKey(s))
  }
   
  private function addWC7ModifierDiffs(diffItems : List<DiffItem>) : List<DiffItem> {
    return addSplittableDiffs(diffItems, \ w -> getEligibleModifiers(w), \ s -> getModKey(s))
  }
  
  private function getEmpKey(coveredEmp : WC7CoveredEmployeeBase) : String {
    return coveredEmp.Location.FixedId + " " + coveredEmp.FixedId
  }  
  
  private function getWaiverKey(waiver : WC7WaiverOfSubro) : String {
    return waiver.Jurisdiction.Code + " " + waiver.FixedId
  }  
  
  private function getSupplDiseaseKey(supplDisease : WC7SupplDiseaseExposure) : String {
    return supplDisease.Location.FixedId + " " + supplDisease.FixedId
  }
  
  private function getModKey(mod : WC7Modifier) : String {
    return mod.PatternCode + " " + mod.State
  }
  
  private function getCoverageKey(cov : WC7JurisdictionCov) : String {
    return cov.PatternCode + " " + cov.WC7Jurisdiction.Jurisdiction
  }

  private function getCoveragesWithTermValues(line : entity.WC7WorkersCompLine, pattern : CovTermPattern) : List<WC7JurisdictionCov> {
    var allCovs = line.WC7Jurisdictions*.AllCoverageVersions.toList().flatten()
    return allCovs.where(\ cov -> cov.getCovTerm(pattern).DisplayValue != "")
  }  
  
  private function getEligibleModifiers(line : entity.WC7WorkersCompLine) : List<WC7Modifier> {
    var allMods = line.WC7Jurisdictions*.AllModifierVersions.toList().flatten()
    return allMods.where(\ mod -> mod.Eligible)
  }
}
