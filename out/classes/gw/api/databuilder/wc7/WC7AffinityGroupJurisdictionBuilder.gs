package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder

@Export
class WC7AffinityGroupJurisdictionBuilder extends DataBuilder<WC7AffinityGroupJurisdiction, WC7AffinityGroupJurisdictionBuilder> {

  construct() {
    super(WC7AffinityGroupJurisdiction)
  }
   
  function withJurisdition(jurisdiction : Jurisdiction) : WC7AffinityGroupJurisdictionBuilder {
    set(WC7AffinityGroupJurisdiction.Type.TypeInfo.getProperty("Jurisdiction"), jurisdiction) 
    return this
  }
   
  function withAffinityGroup(affinityGroup : WC7AffinityGroup) : WC7AffinityGroupJurisdictionBuilder {
    set(WC7AffinityGroupJurisdiction.Type.TypeInfo.getProperty("AffinityGroup"), affinityGroup)
    return this
  }
  
  function withAffinityGroup(affinityGroupBuilder : WC7AffinityGroupBuilder) : WC7AffinityGroupJurisdictionBuilder {
    var affinityGroup = affinityGroupBuilder.create()
    set(WC7AffinityGroupJurisdiction.Type.TypeInfo.getProperty("AffinityGroup"), affinityGroup)
    return this
  }
}