package gw.lob.common.util
uses gw.api.database.Query
uses gw.entity.IEntityType
uses java.util.Map
uses java.lang.IllegalArgumentException

class SystemTableQuery {

  static function query(entityType : IEntityType, arguments : Map<String, String>, returnColumn : String) : List<String> {
    return addFilter(Query.make(entityType), arguments)
      .select().map(\ result -> result.getFieldValue(returnColumn).toString())
  }

  static function query(entityType : IEntityType, arguments : Map<String, String>) : List<String> {
    return query(entityType, arguments, "Value")
  }

  static function queryRange(entityType : IEntityType, arguments : Map<String, String>) : BigDecimalRange {
    assertNonEmpty(arguments)
    return createRange(addFilter(Query.make(entityType), arguments))
  }
  
  private static function assertNonEmpty(arguments : Map<String, String>) {
    if (arguments.Empty) 
      throw new IllegalArgumentException("argument list must not be empty")
  }
  
  private static function addFilter(query : Query, arguments : Map<String, String>) : Query {
    arguments.eachKeyAndValue(\ argKey, argValue -> query.compare(argKey, Equals, argValue))
    return query
  }
  
  private static function createRange(query : Query) : BigDecimalRange {
    var select = query.select()
    if (select.isEmpty()) 
      return BigDecimalRange.emptyRange()
      
    var result = select.first()
    return new BigDecimalRange(
      result.getFieldValue("minValue").toString(), 
      result.getFieldValue("maxValue").toString())  
  }
}