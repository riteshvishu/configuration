package gw.job

enhancement RenewalEnhancement : Renewal {
  
  function hasOpenCancellationInPriorPeriod() : boolean {
    var openCancellations = this.Policy.OpenJobs.whereTypeIs( Cancellation )
    return openCancellations.hasMatch( \ job -> not job.PolicyPeriod.PeriodEnd.after(this.LatestPeriod.PeriodStart) )
  }

  function withdrawOrRaiseIssue() : boolean {
    if (this.RenewalNotifDate != null) {
      this.ActivePeriods.each( \ p -> p.RenewalProcess.raiseIssueForNotificationDateSet() )
      return false
    } else {
      this.withdraw()
      return true
    }
  }

  /**
   * Determines if any other periods for the renewal is in renewing, non-renewing, or not-taking states.
   */
  function hasAnotherPendingPeriod(period : PolicyPeriod) : boolean {
    return this.Periods.hasMatch( \ policyPeriod -> policyPeriod != period and hasPendingStatus(policyPeriod) )
  }

  /**
   * Given a Renewal job, this method groups it into the appropriate Renewal group
   * or creates a new one if a valid group does not exist.
   *
   * See the comments on Enhancement for an explanation of the timeWindow parameter
   * and the core grouping algorithm.
   */
  function addToGroup() {
    var group = this.findJobGroupWithinWindow(entity.RenewalGroup, -1)
    if (group == null) {
      group = new RenewalGroup(this)
      this.initializeGroup(group, "RG")
    }
    group.addJob(this)
  }
  
  // ---------------------------------------------------------- Private methods

  private function hasPendingStatus(branch : PolicyPeriod) : boolean {
    return branch.Status == "Renewing" or branch.Status == "NonRenewing" or branch.Status == "NotTaking"
  }
}
