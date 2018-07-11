package gw.rating.rtm

uses gw.api.database.Query
uses gw.rating.rtm.matchop.MatchOperation
uses gw.rating.rtm.query.RateQueryParam
uses java.lang.Comparable
uses gw.pl.persistence.core.Bundle
uses gw.api.rating.RatingException
uses java.util.LinkedList
uses java.util.Map

enhancement RateTableEnhancement : entity.RateTable {

  property get Empty() : boolean {
    return Owned and Factors.Empty
  }
  
  property get Owned() : boolean {
    return this.RefTable == null
  }
  
  property get Reference() : boolean {
    return !Owned
  }
  
  // backward compatibility.
  @Deprecated("Use getMatchOperations(Map<String, RateQueryParam>) instead")
  function getMatchOperations<Q extends Comparable>(params : List<RateQueryParam<Q>>) : List<MatchOperation> {    
    return getMatchOperations(params.partitionUniquely(\ r -> r.Name))
  }

  // NOTE: this function is exercised heavily and is therefore performance critical.
  function getMatchOperations<Q extends Comparable>(params : Map<String, RateQueryParam<Q>>) : List<MatchOperation> {    
      
    var matchOps = new LinkedList<MatchOperation>()
    var oparray = this.Definition.SortedMatchOpArray
    
    if (oparray.length != params.size()) {
      throw new RatingException(displaykey.Web.Rating.Errors.TableArgumentListMismatch(params.Values, this.Definition.TableCode))
    }

//     for (op in this.Definition.SortedMatchOp) { // for() or each() -- either way, makeiterator costs dearly
    var i = 0
    while (i < oparray.Count) {
      var op = oparray[i]; i++
      var queryParam = params.get(op.Name)
      if (queryParam == null) {
        throw new RatingException(displaykey.Web.Rating.Errors.TableArgumentListMismatch(params.Values, this.Definition.TableCode))
      } else {
        matchOps.add(op.newInstance(queryParam))
      }
    }
      
    return matchOps
  }
  
  property get TableOwningFactors() : RateTable {
    return this.Owned ? this : this.RefTable  
  }
  
  property get Factors() : List<KeyableBean> {
    return getFactors(TableOwningFactors)
  }
  
  private function getFactors(table : RateTable) : List<KeyableBean> {
    var q = Query.make<KeyableBean>(this.Definition.FactorRowEntity)
      .compare("RateTable", Equals, table)  
    return q.select().toList()  
  }

  function makeOwned() {
    var bundle = gw.transaction.Transaction.getCurrent()
    for (row in this.RefTable.Factors) {
      var r = bundle.add(row)
      var copy = r.copy()
      copy.setFieldValue("RateTable", this)   
    }
    this.RefTable = null
  }
  
  function removeFactors() {
    removeFactors(gw.transaction.Transaction.getCurrent())
  }
  
  function removeWithFactors() {
    var bundle = gw.transaction.Transaction.getCurrent()
    removeFactors(bundle)
    bundle.remove(this)
  }

  private function removeFactors(bundle : Bundle) {
    if (!Owned) return
    this.Factors.each(\ f -> {
      f = bundle.add(f)
      f.remove()
    })
  }  

  property get ReferencingRateTables() : List<RateTable> {
    return Query.make(RateTable).compare("RefTable", Equals, this).select().toList()
  }
}
