package gw.api.databuilder.wc7

uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.CoveragePattern

@Export
class WC7MaritimeCoveredEmployeeBuilder extends WC7CoveredEmployeeBuilderBase<WC7MaritimeCoveredEmployee, WC7MaritimeCoveredEmployeeBuilder> {
  construct() {
    super(WC7MaritimeCoveredEmployee)
  }

  protected override function createBean(context : BuilderContext) : WC7MaritimeCoveredEmployee {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var maritimeCovPattern : CoveragePattern = "WC7MaritimeACov"
    line.setCoverageExists(maritimeCovPattern, true)
    return line.createAndAddWC7MaritimeCoveredEmployee(line.WC7MaritimeACov)
  }

  final function withVessel(vessel : String) : WC7MaritimeCoveredEmployeeBuilder {
    set(WC7MaritimeCoveredEmployee.Type.TypeInfo.getProperty("Vessel"), vessel)
    return this
  }
}