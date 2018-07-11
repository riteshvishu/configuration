package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder

class WC7AffinityGroupProductBuilder extends DataBuilder<WC7AffinityGroupProduct, WC7AffinityGroupProductBuilder> { 

  construct() {
    super(WC7AffinityGroupProduct)
  }

  function withProductCode(productCode : String) : WC7AffinityGroupProductBuilder {
    set(WC7AffinityGroupProduct.Type.TypeInfo.getProperty("ProductCode"), productCode) 
    return this
  }
  
  function withAffinityGroup(affinityGroup : WC7AffinityGroup) : WC7AffinityGroupProductBuilder {
    set(WC7AffinityGroupProduct.Type.TypeInfo.getProperty("AffinityGroup"), affinityGroup)
    return this
  }
  
  function withAffinityGroup(affinityGroupBuilder : WC7AffinityGroupBuilder) : WC7AffinityGroupProductBuilder {
    var affinityGroup = affinityGroupBuilder.create()
    withAffinityGroup(affinityGroup)
    return this
  }
}
