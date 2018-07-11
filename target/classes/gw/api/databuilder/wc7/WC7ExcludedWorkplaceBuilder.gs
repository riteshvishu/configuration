package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ExclusionPattern

@Export
class WC7ExcludedWorkplaceBuilder extends DataBuilder<WC7ExcludedWorkplace, WC7ExcludedWorkplaceBuilder> {

  construct() {
    super(WC7ExcludedWorkplace)
  }

  protected override function createBean(context : BuilderContext) : WC7ExcludedWorkplace {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var desWorkplacesExclPattern : ExclusionPattern = "WC7DesignatedWorkplacesExclEndorsementExcl"
    line.setExclusionExists(desWorkplacesExclPattern, true)
    return line.createAndAddWC7ExcludedWorkplace(line.WC7DesignatedWorkplacesExclEndorsementExcl)
  }
  
  final function withExcludedItem(item : String) : WC7ExcludedWorkplaceBuilder {
    set(WC7ExcludedWorkplace.Type.TypeInfo.getProperty("ExcludedItem"), item)
    return this
  }

  final function withState(aJurisdiction : Jurisdiction) : WC7ExcludedWorkplaceBuilder {
    set(WC7ExcludedWorkplace.Type.TypeInfo.getProperty("Jurisdiction"), aJurisdiction)
    return this
  }

  final function withAddressLine1(addrLine : String) : WC7ExcludedWorkplaceBuilder {
    set(WC7ExcludedWorkplace.Type.TypeInfo.getProperty("AddressLine1"), addrLine)
    return this
  }
}
