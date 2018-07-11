package gw.plugin.billing.bc300

@Export
enhancement NewProducerCodeInfoEnhancement : soap.BCBillingSystemAPI.entity.NewProducerCodeInfo
{
  function sync(producerCode : ProducerCode){
    this.PublicID = producerCode.PublicID
    this.Code = producerCode.Code
    var status = producerCode.ProducerStatus
    this.Active = status == ProducerStatus.TC_ACTIVE or status ==  ProducerStatus.TC_LIMITED
    this.ProducerPublicID = producerCode.Organization.PublicID
    this.CommissionPlanID = producerCode.CommissionPlanID
  }
}
