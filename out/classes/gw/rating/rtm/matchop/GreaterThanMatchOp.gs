package gw.rating.rtm.matchop
uses gw.rating.rtm.query.RateQueryParam
uses gw.api.database.Query
uses gw.api.database.Relop
uses java.lang.ClassCastException
uses java.lang.Comparable
uses com.guidewire.pc.domain.rating.RatingException
uses gw.rating.rtm.domain.PersistenceAdapter
uses java.util.TreeMap
uses java.util.Set
uses java.math.RoundingMode

@ReadOnly
class GreaterThanMatchOp extends MatchOperation {

  construct(matchOp : RateTableMatchOp, param : RateQueryParam) {
    super(matchOp, param)
  }

  override protected function getRounding(paramIndex : int) : RoundingMode {
    return FLOOR
  }
  
  // highest score should go to highest value, which will be the one closest to the target
  // because everything that gets scored will have satisfied the <= filter.
  override function getScore(bean : PersistenceAdapter) : Comparable {
    return fieldAsComparable(bean, ColumnName)
  }

  override function filter(query : Query<KeyableBean>) : Query<KeyableBean> {
    query.compare(ColumnName, Relop.GreaterThan, InputParamValue)
    return query
  }

  override function filter(results : MatchOpResults) : List<PersistenceAdapter> {
    verify()
    if (InputParamValue == null) return {} // null should not match unless relaxed

    var res = doIndexedLookup(results)
    if (res != null) {
      return res
    }
    
    return results.CurrentResults.where(\ bean -> {
      var value = fieldAsComparable(bean, ColumnName) 
      return value != null and (value.compareTo(InputParamValue) > 0)
    })
 }

  override function relax(results : MatchOpResults) : List<PersistenceAdapter> {
    return results.CurrentResults.where(\ bean -> {
      return (fieldAsComparable(bean, ColumnName) == null)
    })  
  }

  override function filterWild(results : MatchOpResults) : List<PersistenceAdapter> {
    return results.CurrentResults.where(\ bean -> {
      return (fieldAsComparable(bean, ColumnName) != null)
    })  
  }

  override function createIndex(rows : List<PersistenceAdapter>, order : int)  : TreeMap<Comparable<Object>, Set<PersistenceAdapter>> {
    if (order > 1) return null // no use building this for 3rd matchop or later

    var physicalColName = ColumnName
    var p = rows.partition(\ k -> (k.getFieldValue(physicalColName) as Comparable))
    var m = new TreeMap<Comparable, Set<PersistenceAdapter>>()    
    p.eachKeyAndValue(\ k, v -> {
      if (k != null) {
        m.put(k, v.toSet())
      }
    })
    return m
  }

  private function doIndexedLookup(results : MatchOpResults) : List<PersistenceAdapter> {
    var ix = results.Indexes.get(this.MatchOpName) as TreeMap<Comparable, Set<PersistenceAdapter>>

    if (ix == null) {
      return null
    }
      
    if (results.PriorResults.Empty) {
      // first result -- just merge them into a list and return it
      var r : List<PersistenceAdapter> = {}
      ix.headMap(InputParamValue, true).eachValue(\ s -> r.addAll(s))
      return r
    } else if (ColumnType == TC_DECIMAL or ColumnType == TC_STRING) {
      // compareTo is expensive on those types, so this is arguably worth it
      // TODO: if there are lots of sets (esp. lots of sets with small cardinality) it
      // would probably be cheaper to merge them into one hashset.
      var keep = ix.headMap(InputParamValue, true).Values
      return results.CurrentResults.where(\ r -> keep.hasMatch(\ s -> s.contains(r)))
    }
    return null
  }

  private function fieldAsComparable(bean : PersistenceAdapter, field  : String) : Comparable {
    try {
      return bean.getFieldValue(field) as Comparable
    } catch(cce: ClassCastException) {
      if (cce == null) {} // workaround unused-variable warning
      throw new RatingException("Field ${field} is of the wrong type ${bean.getFieldValue(field)}")  
    }
  }
}
