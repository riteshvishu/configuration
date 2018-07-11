package gw.rating.worksheet

uses gw.rating.worksheet.domain.WorksheetOperator
uses java.lang.String
uses gw.lang.parser.ISymbolTable
uses gw.xml.parser2.PLXMLNode
uses gw.rating.worksheet.domain.WorksheetXmlSerializable
uses gw.rating.worksheet.domain.WorksheetOperand
uses gw.rating.worksheet.domain.WorksheetEntry
uses gw.xml.parser2.PLXMLParser
uses java.util.HashMap
uses java.lang.Class
uses gw.rating.worksheet.domain.WorksheetOperandContainer
uses gw.rating.worksheet.domain.WorksheetEntryContainer
uses java.math.BigDecimal
uses java.util.Date
uses gw.xml.date.XmlDateTime
uses java.lang.Integer
uses java.lang.Double
uses java.lang.Float
uses java.lang.Short
uses java.lang.Long
uses java.lang.Exception
uses gw.rating.worksheet.domain.WorksheetArgument
uses gw.rating.worksheet.domain.WorksheetCalculation
uses gw.rating.worksheet.domain.WorksheetConditional
uses gw.rating.worksheet.domain.WorksheetConstant
uses gw.rating.worksheet.domain.WorksheetFunction
uses gw.rating.worksheet.domain.WorksheetNegation
uses gw.rating.worksheet.domain.WorksheetNewObject
uses gw.rating.worksheet.domain.WorksheetNote
uses gw.rating.worksheet.domain.WorksheetObjectProperty
uses gw.rating.worksheet.domain.WorksheetRateQuery
uses gw.rating.worksheet.domain.WorksheetRateQueryParam
uses gw.rating.worksheet.domain.WorksheetRoutine
uses gw.rating.worksheet.domain.WorksheetVariable
uses gw.lang.reflect.IType
uses java.util.Map
uses gw.rating.worksheet.domain.Worksheet
uses gw.rating.worksheet.domain.WorksheetInstanceSubroutine
uses gw.rating.worksheet.domain.WorksheetStaticSubroutine
uses gw.rating.worksheet.domain.WorksheetFunctionReturn
uses com.guidewire.pl.system.util.NumberFormatUtil
uses java.io.StringReader
uses java.text.DecimalFormat
uses java.util.Locale
uses gw.entity.TypeKey
uses gw.lang.reflect.TypeSystem
uses gw.entity.ITypeList

/**
 *
 * Handy utility functions for worksheets
 *
 */
class WorksheetUtil {

  public static final var LOGGER_NAME : String = "_log"
  public static final var ARRAY_VALUE_TOKEN : String = "{...}"
  public static final var DISPLAY_HINT : String = "DisplayHint"

  private static final var NODES_TO_IGNORE_WHEN_DESERIALIZING = {
    WorksheetConditional.CONDITION_NODE_NAME,
    WorksheetConditional.CONDITIONALS_GROUP_NODE_NAME,
    DISPLAY_HINT
  }

  private static final var DOMAIN_NODE_MAP : Map<String, IType> = {
    "Worksheet" -> Worksheet,
    "Argument" -> WorksheetArgument,
    "PropertySet" -> WorksheetCalculation,
    "Store" -> WorksheetCalculation,
    "If" -> WorksheetConditional,
    "Else" -> WorksheetConditional,
    "ElseIf" -> WorksheetConditional,
    "EndIf" -> WorksheetConditional,
    "Constant" -> WorksheetConstant,
    "Function" -> WorksheetFunction,
    "Not" -> WorksheetNegation,
    "New" -> WorksheetNewObject,
    "Note" -> WorksheetNote,
    "PropertyGet" -> WorksheetObjectProperty,
    "RateQuery" -> WorksheetRateQuery,
    "QueryParam" -> WorksheetRateQueryParam,
    "Routine" -> WorksheetRoutine,
    "InstanceMethod" -> WorksheetInstanceSubroutine,
    "StaticMethod" -> WorksheetStaticSubroutine,
    "Variable" -> WorksheetVariable,
    "Return" -> WorksheetFunctionReturn}

  /**
   * Serialize a worksheet object to a string
   * @param the worksheet object
   * @return the worksheet object'
   */
  static function serialize(serializable : WorksheetXmlSerializable) : String{
    return serializable.toXml().asUTFString()
  }

  /**
   * Rehydrate a worksheet from its serialized string representation
   * @param the serialized string
   * @return the Worksheet object
   */
  static function deserialize(str : String) : WorksheetXmlSerializable{

    return deserializeXml(parseXml(str))

  }

  /**
   * Rehydrate a worksheet object from an xml node
   * @param xml The xml node
   * @return the Worksheet
   */
  static function deserializeXml(xml : PLXMLNode) : WorksheetXmlSerializable{

    var domainObject = createDomainObject(xml.ElementName)
    domainObject.fromXml(xml)
    return domainObject

  }

  /**
   * Serialize an object to its string representation.  Used only in the context of serializing
   * worksheet objects
   *
   * @param o Object
   * @return the string representation of the object
   */
  static function serializeObject(o : Object) : String{

    if (o == null) {
      return ""
    } else if (o typeis Date) {
      return serializeDate(o)
    } else if ((typeof o).Array) {
      return ARRAY_VALUE_TOKEN
    } else if (o typeis TypeKey) {
      return o.Code
    } else {
      return o.toString()
    }
  }

  /**
   * Deserialize an object from its string representation.  Used only in the context
   * of deserializing values for worksheet objects
   *
   * @param state the string representation of the object
   * @param type the data type of the object
   * @return a deserialized object
   */
  static function deserializeObject(value: String, type : String) : Object {

    if (!value.HasContent) {
      return null
    } else if (type == "java.math.BigDecimal") {
      return new BigDecimal(value)
    } else if(type == "java.lang.Integer") {
      return new Integer(value)
    } else if(type == "java.lang.Boolean") {
      return new Boolean(value)
    } else if(type == "java.lang.Double") {
      return new Double(value)
    } else if(type == "java.lang.Short") {
      return new Short(value)
    } else if(type == "java.lang.Float") {
      return new Float(value)
    } else if(type == "java.lang.Long") {
      return new Long(value)
    } else if(type == "java.util.Date") {
      return deserializeDate(value)
    // This breaks worksheets in the ISO LOB branches, commented out due to PC-22424.
    // When that fix is in, remove our change
    //} else if (type?.contains("typelist.")) {
    //  return getTypekeyFromName(type, value)
    } else if (type.HasContent and type.contains("[]")) {
      // Special case for arrays
      return value
    } else {
      return value
    }
  }

  /**
   * Serialize a date into a string
   * @param date Date
   * @return the string representation of the date
   */
  static function serializeDate(date : Date) : String{
    return date.XmlDateTime.toString()
  }

  /**
   * Deserialize a date from a string
   * @param s the serialized date
   * @return the date
   */
  static function deserializeDate(s : String) : Date{
    return new XmlDateTime(s).toCalendar().Time
  }

  /**
  * Serialize a typekey into a string
  * @param typeKey TypeKey
  * @return the string representation of a typekey
  * */
   static function serializeTypeKey(typeKey : TypeKey) : String {
    return "@${typeKey.IntrinsicType.TypeInfo.Name}:${typeKey.Code}"
  }

  static function getTypekeyFromName(typeName : String, code: String): TypeKey {
    try {
      var t = TypeSystem.getByRelativeName(typeName) as ITypeList
      return t.getTypeKey(code)
    } catch (e : java.lang.ClassNotFoundException) {
      return null
    }
  }
  /**
   * Deserialize a typekey from a string
   * @param s the serialized typekey
   * @return the typekey
   *
   * example: @typelist.Jurisdiction:AK deserializes to Jurisdiction.TC_AK
   */
  static function deserializeTypeKey(s : String) : TypeKey {
    var strs = s.substring(1).split(":")
    return getTypekeyFromName(strs[0], strs[1])
  }

  /**
   * Serialize a big decimal to a string
   *
   * @param bd BigDecimal
   * @return the string representation of the big decimal
   *
   */
  static function serializeBigDecimal(bd : BigDecimal) : String{

    if (bd.scale() > 6)  {
      return NumberFormatUtil.renderForInput(bd.setScale(6, BigDecimal.ROUND_HALF_UP), false)
    }
    else if (bd.scale() < 0) {
      return NumberFormatUtil.renderForInput(bd.setScale(0, BigDecimal.ROUND_HALF_UP), false)
    } else {
      return NumberFormatUtil.renderForInput(bd, false)
    }

  }

  /**
   * Parse an xml string
   *
   * @param str Xml string
   * @return An xml node
   *
   */
  static function parseXml(str : String) : PLXMLNode{

    var reader = new StringReader(str)
    var node = PLXMLParser.parseReader(new HashMap<String, Class<PLXMLNode>>(), reader, null)
    return node

  }

  /**
   * build a flat list of all worksheet domain objects in a hierarchy
   *
   * @param parent
   * @param list
   * @param includeParent include the parent in the list
   *
   */
  static function recurseWorksheetHierarchy(parent : Object, list : List<Object>, includeParent : boolean = false) {

    if (includeParent and parent typeis WorksheetXmlSerializable) {
      list.add(parent)
    }

    if (parent typeis WorksheetOperandContainer) {
      (parent).WorksheetOperands.each(\ o -> {
        recurseWorksheetHierarchy(o, list, true)
      })
    }

    if (parent typeis WorksheetEntryContainer) {
      (parent).WorksheetEntries.each(\ e -> {
        recurseWorksheetHierarchy(e, list, true)
      })
    }

  }

  private static function createDomainObject(elementName : String) : WorksheetXmlSerializable {

    var type = worksheetClass(elementName)
    var constructor = type.TypeInfo.Constructors.firstWhere(\ i -> i.Parameters.IsEmpty)
    if (constructor == null){
      throw new Exception("Worksheet ${elementName} lacks public no-arg constructor")
    }

    return constructor.Constructor.newInstance({}) as WorksheetXmlSerializable

  }

  /**
   * Helper function for writing all child operands to xml
   *
   * @param parent the container xml node
   * @param operands the list of worksheet operands
   *
   */
  public static function writeOperandsXml(parent : PLXMLNode, operands : List<WorksheetOperand>){
    operands.each(\ o -> parent.addChild(o.toXml()))
  }

  /**
   * Helper method for deserializing all child nodes of an xml node
   *
   * @param parent the parent worksheet object
   * @param node the xml node
   *
   */
  public static function deserializeChildren(parent : WorksheetXmlSerializable, node : PLXMLNode){
    node.Children.each(\ c -> {
      if (NODES_TO_IGNORE_WHEN_DESERIALIZING.contains(c.QName.LocalPart)){
        deserializeChildren(parent, c)
      } else {
        var child =  WorksheetUtil.deserializeXml(c)
        if (child typeis WorksheetOperand) {
          (parent as WorksheetOperandContainer).addWorksheetOperand(child)
        } else {
          (parent as WorksheetEntryContainer).addWorksheetEntry(child as WorksheetEntry)
        }
      }
    })
  }

  public static function deserializeDisplayHints(operand : WorksheetOperand, node : PLXMLNode) {
    var hints : List<String> = {}
    node.Children.where(\ c -> c.QName.LocalPart == DISPLAY_HINT).each(\ c -> {
      hints.add(c.getAttributeValue("Value"))
    })
    operand.DisplayHints = hints.toTypedArray()
  }

  /**
   * Helper function for writing display hints of an operand to xml
   *
   * @param parent the container xml node
   * @param operand the operand
   *
   */
  public static function writeDisplayHintsXml(parent : PLXMLNode, operand : WorksheetOperand){
    operand.DisplayHints?.each(\ hint -> {
      var node = new PLXMLNode(DISPLAY_HINT)
      node.setAttributeValue("Value", hint)
      parent.addChild(node)
    })
 }

  /**
   * Helper function for writing all child entries to xml
   *
   * @param parent the container xml node
   * @param operands the list of worksheet entries
   */
  public static function writeEntriesXml(parent : PLXMLNode, entries : List<WorksheetEntry>){
    entries.eachWithIndex(\ e, i -> {

      // Wrap a group of conditionals in a node for easier reading
      if (e typeis WorksheetConditional and e.Type == IfCondition and i < entries.Count - 1){
        var next = entries.get(i + 1)
        if (next typeis WorksheetConditional and (next.Type == ElseIfCondition or next.Type == ElseCondition)) {
          var conditionalsGroupNode = new PLXMLNode(WorksheetConditional.CONDITIONALS_GROUP_NODE_NAME)
          parent.addChild(conditionalsGroupNode)
          parent = conditionalsGroupNode
        }

      }

      parent.addChild(e.toXml())
    })
  }


  /**
   * Map a CalcStepOperatorType to a WorksheetOperator
   *
   * @param op The calc step operator
   * @return the Worksheet operator
   *
   */
  public static function mapOperator(op : CalcStepOperatorType) : WorksheetOperator{
    switch(op){
      case CalcStepOperatorType.TC_ADDITION:
        return WorksheetOperator.Plus
      case CalcStepOperatorType.TC_AND:
        return WorksheetOperator.AndOperator
      case CalcStepOperatorType.TC_DIVISION:
        return WorksheetOperator.Divide
      case CalcStepOperatorType.TC_EQUAL:
        return WorksheetOperator.EqualsEquals
      case CalcStepOperatorType.TC_GREATERTHAN:
        return WorksheetOperator.GreaterThan
      case CalcStepOperatorType.TC_GREATERTHANOREQUAL:
        return WorksheetOperator.GreaterOrEquals
      case CalcStepOperatorType.TC_LESSTHAN:
        return WorksheetOperator.LessThan
      case CalcStepOperatorType.TC_LESSTHANOREQUAL:
        return WorksheetOperator.LessOrEquals
      case CalcStepOperatorType.TC_MULTIPLICATION:
        return WorksheetOperator.Multiply
      case CalcStepOperatorType.TC_NOTEQUAL:
        return WorksheetOperator.NotEquals
      case CalcStepOperatorType.TC_OR:
        return WorksheetOperator.OrOperator
      case CalcStepOperatorType.TC_SUBTRACTION:
        return WorksheetOperator.Minus
      default:
        return null
    }
  }

  /**
   * Map a WorksheetOperator to a CalcStepOperatorType
   *
   * @param op The worksheet operator
   * @return the calc step operator
   *
   */
  public static function mapOperator(op : WorksheetOperator) : CalcStepOperatorType{
    switch(op){
      case WorksheetOperator.Plus:
        return CalcStepOperatorType.TC_ADDITION
      case WorksheetOperator.AndOperator:
        return CalcStepOperatorType.TC_AND
      case WorksheetOperator.Divide:
        return CalcStepOperatorType.TC_DIVISION
      case WorksheetOperator.EqualsEquals:
        return CalcStepOperatorType.TC_EQUAL
      case WorksheetOperator.GreaterThan:
        return CalcStepOperatorType.TC_GREATERTHAN
      case WorksheetOperator.GreaterOrEquals:
        return CalcStepOperatorType.TC_GREATERTHANOREQUAL
      case WorksheetOperator.LessThan:
        return CalcStepOperatorType.TC_LESSTHAN
      case WorksheetOperator.LessOrEquals:
        return CalcStepOperatorType.TC_LESSTHANOREQUAL
      case WorksheetOperator.Multiply:
        return CalcStepOperatorType.TC_MULTIPLICATION
      case WorksheetOperator.NotEquals:
        return CalcStepOperatorType.TC_NOTEQUAL
      case WorksheetOperator.OrOperator:
        return CalcStepOperatorType.TC_OR
      case WorksheetOperator.Minus:
        return CalcStepOperatorType.TC_SUBTRACTION
      default:
        return null
    }
  }

  /**
   * Prepares a symbol table with all necessary symbols for capturing rating worksheets
   *
   * @param symbolTable the symbol table
   * @param logger the worksheet logger
   */
  public static function prepareSymbolTable(symbolTable : ISymbolTable, logger : WorksheetLogger){

    symbolTable.putSymbol(GosuShop.createSymbol(LOGGER_NAME, WorksheetLogger.Type, logger))
    symbolTable.putSymbol(GosuShop.createSymbol("_a", WorksheetTermWrapper.Type, logger.Addition))
    symbolTable.putSymbol(GosuShop.createSymbol("_m", WorksheetTermWrapper.Type, logger.Multiplication))
    symbolTable.putSymbol(GosuShop.createSymbol("_s", WorksheetTermWrapper.Type, logger.Subtraction))
    symbolTable.putSymbol(GosuShop.createSymbol("_d", WorksheetTermWrapper.Type, logger.Division))
    symbolTable.putSymbol(GosuShop.createSymbol("_f", WorksheetTermWrapper.Type, logger.Term))
    symbolTable.putSymbol(GosuShop.createSymbol("_eq", WorksheetTermWrapper.Type, logger.EqualTo))
    symbolTable.putSymbol(GosuShop.createSymbol("_lt", WorksheetTermWrapper.Type, logger.LessThan))
    symbolTable.putSymbol(GosuShop.createSymbol("_gt", WorksheetTermWrapper.Type, logger.GreaterThan))
    symbolTable.putSymbol(GosuShop.createSymbol("_lte", WorksheetTermWrapper.Type, logger.LessThanEqual))
    symbolTable.putSymbol(GosuShop.createSymbol("_gte", WorksheetTermWrapper.Type, logger.GreaterThanEqual))
    symbolTable.putSymbol(GosuShop.createSymbol("_ne", WorksheetTermWrapper.Type, logger.NotEqual))
    symbolTable.putSymbol(GosuShop.createSymbol("_or", WorksheetTermWrapper.Type, logger.LogicalOr))
    symbolTable.putSymbol(GosuShop.createSymbol("_and", WorksheetTermWrapper.Type, logger.LogicalAnd))

  }

  /**
   * @return the xml node name for a type
   */
  public static function nodeName(type : IType) : String{
    return DOMAIN_NODE_MAP.entrySet().singleWhere(\ m -> m.Value == type).Key
  }

  /**
   * @return the worksheet class for the node name
   */
  public static function worksheetClass(nodeName : String) : IType{
    var type = DOMAIN_NODE_MAP.get(nodeName)
    if (type == null) {
      throw new Exception("Unknown type for ${nodeName}")
    }
    return type
  }


}
