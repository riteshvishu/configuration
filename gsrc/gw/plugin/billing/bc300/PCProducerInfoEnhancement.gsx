package gw.plugin.billing.bc300
uses soap.BCBillingSystemAPI.entity.PCProducerInfo
uses soap.BCBillingSystemAPI.entity.PCContactInfo

@Export
enhancement PCProducerInfoEnhancement : PCProducerInfo
{
  function sync(organization : Organization){
    this.ProducerName = organization.Name
    this.AgencyBillPlanID = organization.AgencyBillPlanID
    this.PublicID = organization.PublicID
    this.Tier = organization.Tier.Code
    var PCContactInfo = new PCContactInfo()
    PCContactInfo.sync( organization.Contact )
    this.PrimaryContact = PCContactInfo
  }
}
