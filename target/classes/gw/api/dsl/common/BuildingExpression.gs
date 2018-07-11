package gw.api.dsl.common
uses gw.api.builder.BuildingBuilder
uses java.lang.Integer

class BuildingExpression extends DataBuilderExpression<BuildingBuilder> {

  internal construct() {
    super(new BuildingBuilder())
  }

  function withDescription(description : String) : BuildingExpression {
    _builder.withDescription(description)
    return this
  }

  function withBuildingNum(buildingNumber : Integer) : BuildingExpression {
    _builder.withBuildingNum(buildingNumber)
    return this
  }
}
