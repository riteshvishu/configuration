package gw.plugin.billing.bc700
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCProducerInfo
uses wsi.remote.gw.webservice.bc.bc700.entity.types.complex.PCContactInfo

@Export
enhancement PCProducerInfoEnhancement : PCProducerInfo
{
  function sync(organization : Organization){
    this.ProducerName = organization.Name
    this.AgencyBillPlanID = organization.AgencyBillPlanID
    this.PublicID = organization.PublicID
    this.Tier = organization.Tier.Code
    var contactInfo = new PCContactInfo()
    contactInfo.sync( organization.Contact )
    this.PrimaryContact.$TypeInstance = contactInfo
  }
}
