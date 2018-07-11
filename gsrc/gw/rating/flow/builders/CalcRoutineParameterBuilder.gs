package gw.rating.flow.builders

uses gw.api.databuilder.DataBuilder
uses gw.api.productmodel.CoveragePattern
uses gw.lang.reflect.IType

class CalcRoutineParameterBuilder extends DataBuilder<CalcRoutineParameter, CalcRoutineParameterBuilder> {

  construct() {
    super(CalcRoutineParameter)
  }

  function withCode(code : CalcRoutineParamName) : CalcRoutineParameterBuilder {
    set(CalcRoutineParameter.Type.TypeInfo.getProperty("Code"), code)
    return this
  }

  function withCoverageCode(coveragePattern : CoveragePattern) : CalcRoutineParameterBuilder {
    set(CalcRoutineParameter.Type.TypeInfo.getProperty("CoveragePattern"), coveragePattern.Code)
    return this
  }

  function withParamType(paramType : IType) : CalcRoutineParameterBuilder {
    set(CalcRoutineParameter.Type.TypeInfo.getProperty("ParamType"), paramType.Name)
    return this
  }

  // TODO: replace calls to this method with calls to withParamType(paramType : IType)
  function withParamType(paramtype : String) : CalcRoutineParameterBuilder {
    set(CalcRoutineParameter.Type.TypeInfo.getProperty("ParamType"), paramtype)
    return this
  }
  
  function withWritable(paramType : Boolean) : CalcRoutineParameterBuilder {
   set(CalcRoutineParameter.Type.TypeInfo.getProperty("Writable"),paramType)
   return this
  }

  function isWritable() : CalcRoutineParameterBuilder {
    set(CalcRoutineParameter.Type.TypeInfo.getProperty("Writable"), true)
    return this
  }

}
