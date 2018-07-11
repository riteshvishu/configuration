package gw.lob.common.util
uses java.util.Map
uses java.util.HashMap

enhancement LOBListEnhancement<T> : java.util.List<T> {

  function distinctPartition<Q>(mapper(elt : T) : Q) : Map<Q, T> {  
    var returnMap = new HashMap<Q, T>()
    this.each(\ elt -> {returnMap[mapper(elt)] = elt})
    return returnMap
  }
}
