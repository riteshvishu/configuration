package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder

@Export
class WC7AffinityGroupProducerCodeBuilder extends DataBuilder<WC7AffinityGroupProducerCode, WC7AffinityGroupProducerCodeBuilder> {

  construct() {
    super(WC7AffinityGroupProducerCode)
  }
   
  function withProducerCode(producerCode : ProducerCode) : WC7AffinityGroupProducerCodeBuilder {
    set(WC7AffinityGroupProducerCode.Type.TypeInfo.getProperty("ProducerCode"), producerCode) 
    return this
  }
   
  function withAffinityGroup(affinityGroup : WC7AffinityGroup) : WC7AffinityGroupProducerCodeBuilder {
    set(WC7AffinityGroupProducerCode.Type.TypeInfo.getProperty("AffinityGroup"), affinityGroup)
    return this
  }
  
  function withAffinityGroup(affinityGroupBuilder : WC7AffinityGroupBuilder) : WC7AffinityGroupProducerCodeBuilder {
    var affinityGroup = affinityGroupBuilder.create()
    set(WC7AffinityGroupProducerCode.Type.TypeInfo.getProperty("AffinityGroup"), affinityGroup)
    return this
  }
}
