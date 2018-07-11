package gw.api.database
uses gw.entity.IEntityPropertyInfo
uses gw.entity.IEntityType
uses java.lang.Integer
uses java.math.BigDecimal
uses java.util.Date

enhancement GWDBFunctionEnhancement : DBFunction
{
  /**
   * @param propertyName the name of the property to wrap
   * @return the sum value for the given property
   */
  static function Sum(type : IEntityType, propertyName : String) : DBFunction {
    return DBFunction.Type.TypeInfo.getMethod( "Sum", {IEntityPropertyInfo}).CallHandler.handleCall( 
      null, {PropertyResolver.getProperty( type, propertyName )}) as DBFunction
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the sum value for the given property
   */
  static function Sum<T extends java.lang.Number>(protoValue : T) : T {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the sum value for the given property
   */
  static function Sum<T extends java.lang.Number>(protoValue : T[]) : T {
    return null
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given property
   */
  static function Max(type : IEntityType, propertyName : String) : DBFunction {
    return DBFunction.Type.TypeInfo.getMethod( "Max", {IEntityPropertyInfo}).CallHandler.handleCall( 
      null, {PropertyResolver.getProperty( type, propertyName )}) as DBFunction
  }

  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given property
   */
  static function Max<T extends java.lang.Number>(protoValue : T) : T {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given property
   */
  static function Max<T extends java.lang.Number>(protoValue : T[]) : T {
    return null
  }
  
  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given date
   */

  static function Max(protoValue : Date) : Date {
    return protoValue
  }

  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given dates
   */

  static function Max(protoValue : Date[]) : Date {
    return null
  }

  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given property
   */
  static function Max(protoValue : Key) : Key {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the max value for the given property
   */
  static function Max(protoValue : Key[]) : Key {
    return null
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min(type : IEntityType, propertyName : String) : DBFunction {
    return DBFunction.Type.TypeInfo.getMethod( "Min", {IEntityPropertyInfo}).CallHandler.handleCall( 
      null, {PropertyResolver.getProperty( type, propertyName )}) as DBFunction
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min<T extends java.lang.Number>(protoValue : T) : T {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min<T extends java.lang.Number>(protoValue : T[]) : T {
    return null
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given date
   */
  static function Min(protoValue : Date) : Date {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min(protoValue : Date[]) : Date {
    return null
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min(protoValue : Key) : Key {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the min value for the given property
   */
  static function Min(protoValue : Key[]) : Key {
    return null
  }
  /** 
   * @param propertyName the name of the property to wrap
   * @return the average value for the given property
   */
  static function Avg(type : IEntityType, propertyName : String) : DBFunction {
    return DBFunction.Type.TypeInfo.getMethod( "Avg", {IEntityPropertyInfo}).CallHandler.handleCall( 
      null, {PropertyResolver.getProperty( type, propertyName )}) as DBFunction
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the average value for the given property
   */
  static function Avg<T extends java.lang.Number>(protoValue : T) : BigDecimal {
    return protoValue
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the average value for the given property
   */
  static function Avg<T extends java.lang.Number>(protoValue : T[]) : BigDecimal {
    return null
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the count value for the given property
   */
  static function Count(type : IEntityType, propertyName : String) : DBFunction {
    return DBFunction.Type.TypeInfo.getMethod( "Count", {IEntityPropertyInfo}).CallHandler.handleCall( 
      null, {PropertyResolver.getProperty( type, propertyName )}) as DBFunction
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the count value for the given property
   */
  static function Count(protoValue : Object) : Integer {
    return 0
  }
  /**
   * @param propertyName the name of the property to wrap
   * @return the count value for the given property
   */
  static function Count(protoValue : Object[]) : Integer {
    return null
  }
}
