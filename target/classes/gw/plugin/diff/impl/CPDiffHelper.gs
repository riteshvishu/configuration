package gw.plugin.diff.impl
uses gw.api.diff.DiffItem
uses gw.api.diff.DiffProperty
uses gw.entity.IEntityPropertyInfo
uses java.util.ArrayList

/**
 * This class contains methods to help with adding and filtering diff items for a 
 * Commercial Property line of business. 
 */
@Export
class CPDiffHelper extends DiffHelper<CommercialPropertyLine> {
  
  construct(reason : DiffReason, polLine1 : CommercialPropertyLine, polLine2 : CommercialPropertyLine) {
    super(reason, polLine1, polLine2)
  }

  /**
   * Adds diff items that apply to the Commercial Property LOB, e.g. CPLocations information
   * @param diffItems - list of diff items to add to
   * @return List<DiffItem> - returns the list of diff items that we've modified
   */
  override function addDiffItems(diffItems : List<DiffItem>) : List<DiffItem> {
    diffItems = super.addDiffItems(diffItems)
    
    // Add location diffs
    diffItems.addAll(this.compareLineField("CPLocations", 5))    
    
    // Add blanket diffs
    diffItems = addBlanketDiffs(diffItems)
    
    // Add modifier diffs
    diffItems.addAll(this.compareLineField("CPModifiers", 2))
    
    return diffItems
  } 

  /**
   * Filters diff items that apply to the Commercial Property LOB
   * @param diffItems - list of diff items to filter
   * @return List<DiffItem> - returns the list of diff items that we've modified
   */ 
  override function filterDiffItems(diffItems : List<DiffItem>) : List<DiffItem> {
    diffItems = super.filterDiffItems(diffItems)
    return diffItems
  }
  
  private function addBlanketDiffs(diffItems : List<DiffItem>) : List<DiffItem> {
    var blanketDiffItems = this.compareLineField("CPBlankets", 2)
    var basedOnCovs = Line1.CPLocations*.Buildings*.Coverages.toList()
    for (item in blanketDiffItems) {
      if (not (item.Bean typeis CPBuildingCov)) { 
        diffItems.add(item)
      }
    }
    for (buildingCov in Line2.CPLocations*.Buildings*.Coverages) {
      var matchingCov = basedOnCovs.firstWhere(\ cov -> cov.FixedId == buildingCov.FixedId)
      if (matchingCov != null and buildingCov.CPBlanket.FixedId != matchingCov.CPBlanket.FixedId) {
        var prop = CPBuildingCov.Type.TypeInfo.getProperty("CPBlanket") as IEntityPropertyInfo
        diffItems.add(new DiffProperty(buildingCov, matchingCov, prop))
      }
    }
    return diffItems
  }
}
