package gw.api.databuilder.wc7

uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.DataBuilder
uses gw.api.productmodel.ModifierPattern
uses java.math.BigDecimal
uses java.lang.IllegalStateException
uses gw.entity.TypeKey

@Export
class WC7ModifierBuilder extends DataBuilder<WC7Modifier, WC7ModifierBuilder> {

  var _modifierPatternCode : String

  construct(modifierPatternCode : String) {
      super(WC7Modifier)
      _modifierPatternCode = modifierPatternCode
  }

  construct(modifierPattern : ModifierPattern) {
      this(modifierPattern.Code)
  }

  protected override function createBean(context : BuilderContext) : WC7Modifier {
    var jurisdiction = context.ParentBean as WC7Jurisdiction
    var pattern = _modifierPatternCode as ModifierPattern
    if (pattern == null) {
      throw new IllegalStateException(displaykey.Builder.WCModifier.Error.InvalidPatternCode(_modifierPatternCode))
    }
    var jurisModifier = jurisdiction.getModifier(pattern)
    if (jurisModifier == null) {
      throw new IllegalStateException(displaykey.Builder.WCModifier.Error.InvalidPattern(pattern))
    }
    return jurisModifier as WC7Modifier
  }

  function withRateValue(value : double) : WC7ModifierBuilder {
    set(WC7Modifier.Type.TypeInfo.getProperty("RATEMODIFIER"), BigDecimal.valueOf(value))
    return this
  }

  function withBooleanValue(value : boolean) : WC7ModifierBuilder {
    set(WC7Modifier#BooleanModifier.PropertyInfo, value)
    return this
  }

  function withTypeKeyValue(value : TypeKey) : WC7ModifierBuilder {
    set(WC7Modifier#TypeKeyModifier.PropertyInfo, value.Code)
    return this
  }

  function withScheduleRateFactor(rateFactorBuilder : WC7RateFactorBuilder) : WC7ModifierBuilder {
    addArrayElement(WC7Modifier#WC7RateFactors.PropertyInfo, rateFactorBuilder)
    return this
  }
  
  function withEligible() : WC7ModifierBuilder {
    set(WC7Modifier.Type.TypeInfo.getProperty("ELIGIBLE"), true)
    return this
  }

  function withIneligible() : WC7ModifierBuilder {
    set(WC7Modifier.Type.TypeInfo.getProperty("ELIGIBLE"), false)
    return this
  }
  
  function withValueFinal(value : boolean) : WC7ModifierBuilder {
    set(WC7Modifier.Type.TypeInfo.getProperty("VALUEFINAL"), value)
    return this
  }
}
