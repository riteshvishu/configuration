package gw.lob.wc7.financials
uses gw.lob.wc7.WC7RatingEffDatedExposure

class WC7WaiverOfSubroCostMethodsImpl extends WC7GenericWC7CostMethodsImpl<WC7WaiverOfSubroCost> {

  construct(owner : WC7WaiverOfSubroCost) {
    super(owner)
  }
  
  override property get JurisdictionState() : Jurisdiction {
    return Cost.WC7WaiverOfSubro.Jurisdiction
  }

  override property get ClassCode() : String {
    return Cost.WC7WaiverOfSubro.ClassCode.Code
  }

  override property get Description() : String {
    if (Cost.WC7WaiverOfSubro.Type == WC7WaiverOfSubrogation.TC_BLANKET) {
      return displaykey.Web.Policy.WC7.Cost.BlanketWaiver(Cost.WC7WaiverOfSubro.Description)
    } else if (Cost.WC7WaiverOfSubro.Type == WC7WaiverOfSubrogation.TC_SPECIFIC) {
      return displaykey.Web.Policy.WC7.Cost.SpecificWaiver(Cost.WC7WaiverOfSubro.JobID, Cost.WC7WaiverOfSubro.Description)
    } else {
      return Cost.WC7WaiverOfSubro.Description
    }
  }

  override property get AuditableRatingEffDated() : Auditable & WC7RatingEffDatedExposure  {
    return Cost.WC7WaiverOfSubro
  }
}
