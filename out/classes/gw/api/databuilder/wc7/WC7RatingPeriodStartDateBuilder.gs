package gw.api.databuilder.wc7

uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.DataBuilder
uses java.lang.IllegalStateException
uses java.util.Date

@Export
class WC7RatingPeriodStartDateBuilder extends DataBuilder<WC7RatingPeriodStartDate, WC7RatingPeriodStartDateBuilder> {

  var _rpsdDate : Date
  var _rpsdType : RPSDType

  construct() {
    super(WC7RatingPeriodStartDate)
  }

  protected override function createBean(context : BuilderContext) : WC7RatingPeriodStartDate {
    var period = context.ParentBean as WC7Jurisdiction
    var rpsd = period.addWC7RatingPeriodStartDate(_rpsdDate, _rpsdType)
    if (rpsd == null) {
      throw new IllegalStateException(displaykey.Builder.RatingPeriodStartDate.Error.CannotCreate(_rpsdType, _rpsdDate))
    }
    return rpsd
  }

  function withDate(rpsdDate : Date) : WC7RatingPeriodStartDateBuilder {
    _rpsdDate = rpsdDate
    return this
  }

  function withType(rpsdType : RPSDType) : WC7RatingPeriodStartDateBuilder {
    _rpsdType = rpsdType
    return this
  }
}
