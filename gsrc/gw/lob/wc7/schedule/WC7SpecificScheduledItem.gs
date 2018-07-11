package gw.lob.wc7.schedule

uses gw.api.domain.Clause

/**
 * A schedule of items backed by a specific entity.
 * 
 * <br/>
 * <br/>
 * e.g.  Included Owner/Officers ({@see WC7PolicyOwnerOfficer}) are scheduled items on the condition 'Sole Proprietors, Partners, Officers And Others Coverage Endorsement' ({@see WC7SoleProprietorsPartnersOfficersAndOthersCovCond})
 */
@ReadOnly
interface WC7SpecificScheduledItem {
  
  /**
   * The {@link Clause} that this scheduled item lives off of.
   */
  property get ParentClause() : Clause
}
