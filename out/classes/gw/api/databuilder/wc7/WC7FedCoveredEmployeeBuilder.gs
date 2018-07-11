package gw.api.databuilder.wc7

uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.CoveragePattern

@Export
class WC7FedCoveredEmployeeBuilder extends WC7CoveredEmployeeBuilderBase<WC7FedCoveredEmployee, WC7FedCoveredEmployeeBuilder> {
  construct() {
    super(WC7FedCoveredEmployee)
  }

  protected override function createBean(context : BuilderContext) : WC7FedCoveredEmployee {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    var fedEmpLiabCovPattern : CoveragePattern = "WC7FederalEmployersLiabilityActACov"
    line.setCoverageExists(fedEmpLiabCovPattern, true)
    return line.createAndAddWC7FedCoveredEmployee(line.WC7FederalEmployersLiabilityActACov)
  }
}