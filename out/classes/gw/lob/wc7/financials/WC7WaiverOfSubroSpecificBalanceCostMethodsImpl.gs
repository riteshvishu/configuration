package gw.lob.wc7.financials

class WC7WaiverOfSubroSpecificBalanceCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7WaiverOfSubroSpecificBalanceCost> {

  construct(owner : WC7WaiverOfSubroSpecificBalanceCost) {
    super(owner)
  }
  
  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7Jurisdiction.Jurisdiction
  }

  override property get Description() : String {
    return displaykey.Web.Policy.WC7.SpecificWaiverBalanceCostDisplay(Cost.JobID)
  }
}