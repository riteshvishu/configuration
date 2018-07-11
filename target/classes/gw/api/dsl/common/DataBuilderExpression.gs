package gw.api.dsl.common

uses gw.api.databuilder.DataBuilder

abstract class DataBuilderExpression<T extends DataBuilder> {

  protected var _builder : T
  
  construct(builder : T) {
    _builder = builder
  }

  property get DataBuilder() : T {
    return _builder 
  }
}
