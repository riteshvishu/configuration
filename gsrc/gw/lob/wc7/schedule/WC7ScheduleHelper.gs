package gw.lob.wc7.schedule

uses gw.lob.common.schedule.AbstractScheduleHelper
uses java.util.ArrayList
uses java.util.LinkedHashSet
uses gw.api.domain.Clause
uses gw.api.productmodel.Schedule
uses gw.api.productmodel.ClausePattern
uses java.util.HashMap

@Export
class WC7ScheduleHelper extends AbstractScheduleHelper<WC7Line, ScheduledItem>{
  
  override function getScheduledItemsForAllCoverables(line : WC7Line) : List<ScheduledItem> {
    var allItems = new ArrayList<ScheduledItem>()
    
    allItems.addAll(getScheduledItemsForCoverable(line))
    return allItems
  }

  override function getCurrentAndFutureScheduledItemsForPolicyLine(line : WC7Line) : List<ScheduledItem> {
    var allItems = new ArrayList<ScheduledItem>()
    var lineVersionList = line.getVersionsOnDates<WC7Line>(getEffectiveDatesForCurrentAndFutureSlices(line))
    for (lineVersion in lineVersionList) {
      allItems.addAll(getScheduledItemsForAllCoverables(lineVersion))
    }        
    var uniqueItems = new LinkedHashSet<ScheduledItem>(allItems)
    return uniqueItems.toList()
  }

  /**
   * A convenience function that looks through the passed array safely checking if each element is a Schedule.
   * It then returns an array of the schedules.
   *
   * @param clauses The array of potential schedules to filter
   */
  static function filterSchedules(clauses : Clause[]) : Schedule[] {
    var schedules : List<Schedule> = {}
    clauses.each(\ clause -> {
      if (clause typeis Schedule) {
        schedules.add(clause)
      }
    })
    return schedules.toTypedArray()
  }

  /**
   * A convenience function that looks through the passed array safely checking if each element is a Schedule.
   * It then returns an array of the schedule coverages with cov terms.
   *
   * @param coverages The array of coverages to filter
   */
  static function filterScheduleCovsWithCovTerms(coverages : Coverage[]) : Schedule[] {
    var schedules : List<Schedule> = {}
    coverages.each(\ cov -> {
      if (cov typeis Schedule) {
        if (cov.ScheduledItemPattern != null) {
          schedules.add(cov)
        }
      }
    })
    return schedules.toTypedArray()
  }
    
  /**
   * A convenience function that looks through the passed array of coverages
   * It then returns an array of coverages and schedule coverages with no cov terms.
   *
   * @param coverages The array of coverages to filter
   */
  static function filterCoveragesAndScheduleCovsWithNoCovTerms(coverages : Coverage[]) : Coverage[] {
    var covAndSchCovWithNoCovTerms : List<Coverage> = {}
    coverages.each(\ cov -> {
      if (cov typeis Schedule) {
        if (cov.ScheduledItemPattern == null) {
          covAndSchCovWithNoCovTerms.add(cov)
        }
      } else {
        covAndSchCovWithNoCovTerms.add(cov)
      }
    })
    return covAndSchCovWithNoCovTerms.toTypedArray()
  }  
  
  /**
   * Test if a jurisdiction is referenced by current or future generic scheduled items.
   * This is useful when testing if a policy location can be safely removed.
   * @param juris a jurisdiction to test
   * @line a {@link productmodel.WC7Line}
   * @return true if the given jurisdiction exists on generic schedules for the given line in the current or future slices.
   * @see #getCurrentAndFutureScheduledItemsForPolicyLine(line)
   */
  function isJurisdictionUsedByCurrentAndFutureScheduleItems(juris : typekey.Jurisdiction, line : productmodel.WC7Line) : boolean {
    //Test Generic Schedules
    var jurisPropCache = new HashMap<ClausePattern, WC7ScheduleJurisdictionPropertyInfo[]>()
    var currentAndFutureItems = getCurrentAndFutureScheduledItemsForPolicyLine(line)
    for (anItem in currentAndFutureItems){
      var schedParent = anItem.ScheduleParent as Clause & Schedule
      var clausePattern = schedParent.Pattern
      var jurisProps : WC7ScheduleJurisdictionPropertyInfo[] = {}
      if (jurisPropCache.containsKey(clausePattern)){
        jurisProps = jurisPropCache.get(clausePattern)
      } else {
        jurisProps = schedParent.PropertyInfos.whereTypeIs(WC7ScheduleJurisdictionPropertyInfo)
        jurisPropCache.put(clausePattern, jurisProps)
      }
      if (jurisProps.hasMatch(\ prop -> prop.getJursidictionFromItem(anItem) == juris)){
        //return on first hit
        return true
      }
    }
    return false
  }
  
  /**
   * Test if a jurisdiction is referenced by current or future specific scheduled items.
   * Specific schedules include things such as aircraft seats, policy owner officers etc.
   * This is useful when testing if a policy location can be safely removed.
   * @param juris a jurisdiction to test
   * @line a {@link productmodel.WC7Line}
   * @return true if the given jurisdiction exists on specific schedules for the given line in the current or future slices.
   */
  function isJurisdictionUsedByCurrentAndFutureSpecificSchedules(juris : typekey.Jurisdiction, line : productmodel.WC7Line) : boolean {
    var editEffectiveDates = getEffectiveDatesForCurrentAndFutureSlices(line)
    for (aSliceDate in editEffectiveDates){
      var currentSliceLine = line.getSlice(aSliceDate)
      if (currentSliceLine.WC7AircraftSeats.hasMatch(\ w -> juris == w.Jurisdiction)){
        return true
      }
      if (currentSliceLine.WC7PolicyOwnerOfficers.hasMatch(\ poOfficer -> juris == poOfficer.Jurisdiction)){
        return true
      }        
      if (currentSliceLine.WC7WaiverOfSubros.hasMatch(\ waiver -> juris == waiver.Jurisdiction)){
        return true
      }
      if (currentSliceLine.WC7PolicyLaborClients*.WC7Details.hasMatch(\ detail -> juris == detail.Jurisdiction)){
        return true
      }
      if (currentSliceLine.WC7PolicyLaborContractors*.WC7Details.hasMatch(\ detail -> juris == detail.Jurisdiction)){
        return true
      }
    }
    return false
  }
  
  /**
   * @return a list of all effective dates for beans on the branch as of or after the branch's #EdtiEffectiveDate.
   * Note, this method can be expensive since it involves every time that a slice is made.  It should be used with discression.
   */
  private function getEffectiveDatesForCurrentAndFutureSlices(line : productmodel.WC7Line) : List<DateTime>{
    var branchEffDate = line.Branch.EditEffectiveDate
    
    //Note, #AllEffectiveDates can be expensive.
    var allEffDates = line.Branch.AllEffectiveDates
    var editEffectiveDates = new ArrayList<DateTime>()
    if (not allEffDates.contains(branchEffDate)){
      /* <pre>
       * If the EditEffective Date lives between two slice dates, we need to include it for consideration
       * 0   10  20  30  40  50  60  70  80  90  100 110 120
       * [-A---------)[-B--------)[-C---------------------)
       * Effective Dates: 0, 30, 60.
       * Current or After:40 => 60
       * Need to check slices at: [40, 60)
       * </pre>
       */ 
      editEffectiveDates.add(branchEffDate)
    }
    editEffectiveDates.addAll(allEffDates.where(\ d -> d.afterOrEqual(branchEffDate)))
    return editEffectiveDates
  }
}
  
