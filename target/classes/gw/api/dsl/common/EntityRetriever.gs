package gw.api.dsl.common

uses gw.api.databuilder.DataBuilder
uses gw.entity.IEntityType
uses gw.api.database.Query

class EntityRetriever<T extends EffDated> {
  var _builder : DataBuilder

  construct(builder: DataBuilder) {
    _builder = builder
  }

  function fromPeriod(period : PolicyPeriod) : T {
    var fixedId = (_builder.LastCreatedBean as EffDated).FixedId
    var entity = period.Bundle.loadByKey(fixedId) as T
    if(entity == null or entity.BranchUntyped != period){
      var q = new Query<T>(T as IEntityType)
      q.compare("BranchValue", Equals , period)
      q.compare("Fixed", Equals , fixedId)
      var foundObject = q.select().first()
      if(foundObject != null){
        entity = period.Bundle.add(foundObject.getSliceUntyped(period.SliceDate) as T)
      }
    }
    return entity
  }
}
