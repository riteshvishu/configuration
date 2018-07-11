package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses java.math.BigDecimal


@Export
class WC7ManuscriptOptionBuilder extends DataBuilder<WC7ManuscriptOption, WC7ManuscriptOptionBuilder> {

  construct() {
    super(WC7ManuscriptOption)
  }

  protected override function createBean(context : BuilderContext) : WC7ManuscriptOption {
    var line = context.getParentBean() as entity.WC7WorkersCompLine
    return line.createAndAddWC7ManuscriptOption()
  }

  final function withDescription(desc : String) : WC7ManuscriptOptionBuilder {
    set(WC7ManuscriptOption.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  final function withPremium(premium : BigDecimal) : WC7ManuscriptOptionBuilder {
    set(WC7ManuscriptOption.Type.TypeInfo.getProperty("Premium"), premium)
    return this
  }
}
