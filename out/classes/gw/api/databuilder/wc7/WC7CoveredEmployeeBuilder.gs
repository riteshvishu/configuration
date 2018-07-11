package gw.api.databuilder.wc7

uses gw.api.databuilder.BuilderContext

@Export
class WC7CoveredEmployeeBuilder extends WC7CoveredEmployeeBuilderBase<WC7CoveredEmployee, WC7CoveredEmployeeBuilder> {
  construct() {
    super(WC7CoveredEmployee)    
  }

  protected override function createBean(context : BuilderContext) : WC7CoveredEmployee {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    return line.createAndAddWC7CoveredEmployee()
  }
}
