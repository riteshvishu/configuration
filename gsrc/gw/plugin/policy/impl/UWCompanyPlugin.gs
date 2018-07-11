package gw.plugin.policy.impl

uses gw.api.system.PCDependenciesGateway
uses gw.plugin.policy.IUWCompanyPlugin
uses java.util.Set


@Export
class UWCompanyPlugin implements IUWCompanyPlugin {
  /**
   * Finds all the underwriting companies that are available for the states in the set.
   * Also allows filtering of the States by product and effective date.
   * Does not return UWCompanies of "retired" status.
   *
   * @param period The Policy Period
   * @param allStates If true, *all* states must be found on the UWCompany
   *                  if false, *any* must be found.
   * @return A query of underwriting companies
   */
  override function findUWCompaniesForStates(period : PolicyPeriod, allStates : boolean) : Set<UWCompany> {
    // This OOTB implementation goes through Guidewire's UWCompanyFinder to retrieve the UWCompanies
    // The finder queries on the UWCompany table with a conjunctive or disjunctive reverse join through
    // the LicensedState table per state, depending on the value of allStates.
    return PCDependenciesGateway.getUWCompanyFinder().findUWCompaniesByStatesAndProductAndValidOnDate(period.AllCoveredStates, allStates, period.Policy.Product, period.PeriodStart).toSet()
  }
}
