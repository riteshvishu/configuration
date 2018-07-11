package gw.api.dsl.common

uses gw.api.builder.AccountLocationBuilder
uses gw.api.database.spatial.SpatialPoint

uses java.lang.Integer
uses java.util.Date

class AccountLocationExpression extends DataBuilderExpression<AccountLocationBuilder> {

  internal construct() {
    super(new AccountLocationBuilder())
  }
  
  internal construct(code : int) {
    super(new AccountLocationBuilder(code))
  }

  function withLocationNumber(number : Integer) : AccountLocationExpression {
    _builder.withLocationNumber(number)
    return this
  }

  function asActive() : AccountLocationExpression {
    _builder.asActive()
    return this
  }

  function asInactive() : AccountLocationExpression {
    _builder.asInactive()
    return this
  }

  function asSpecific() : AccountLocationExpression {
    _builder.asSpecific()
    return this
  }

  function asNonSpecific() : AccountLocationExpression {
    _builder.asNonSpecific()
    return this
  }

  function withCode(code : String) : AccountLocationExpression {
    _builder.withCode(code)
    return this
  }

  function withName(name : String) : AccountLocationExpression {
    _builder.withName(name)
    return this
  }

  function withEmployeeCount(count : int) : AccountLocationExpression {
    _builder.withEmployeeCount(count)
    return this
  }

  function on(account : Account) : AccountLocationExpression {
    _builder.onAccount(account)
    return this
  }

  function withAddressLine1(addressLine1 : String) : AccountLocationExpression {
    _builder.withAddressLine1(addressLine1)
    return this
  }
  
  function withAddressLine2(addressLine2 : String) : AccountLocationExpression {
    _builder.withAddressLine2(addressLine2)
    return this
  }

  function withAddressLine3(addressLine3 : String) : AccountLocationExpression {
    _builder.withAddressLine3(addressLine3)
    return this
  }

  function with(s : State) : AccountLocationExpression {
    _builder.withState(s)
    return this
  }

  function withCalifornia() : AccountLocationExpression {
    _builder.withCalifornia()
    return this
  }

  function withCity(city : String) : AccountLocationExpression {
    _builder.withCity(city)
    return this
  }

  function withPostalCode(postalCode : String) : AccountLocationExpression {
    _builder.withPostalCode(postalCode)
    return this
  }

  function withCounty(county : String) : AccountLocationExpression {
    _builder.withCounty(county)
    return this
  }

  function with(country : Country) : AccountLocationExpression {
    _builder.withCountry(country)
    return this
  }

  function asType(addressType : AddressType) : AccountLocationExpression {
    _builder.asType(addressType)
    return this
  }

  function withDescription(description : String) : AccountLocationExpression {
    _builder.withDescription(description)
    return this
  }

  function asHomeAddress() : AccountLocationExpression {
    _builder.asHomeAddress()
    return this
  }

  function withValidUntil(validUntil : Date) : AccountLocationExpression {
    _builder.withValidUntil(validUntil)
    return this
  }

  function withSpatialPoint(spatialPoint : SpatialPoint) : AccountLocationExpression  {
    _builder.withSpatialPoint(spatialPoint)
    return this;
  }

  function with(status : GeocodeStatus) : AccountLocationExpression {
    _builder.withGeocodeStatus(status)
    return this
  }

  function withPhone(phone : String) : AccountLocationExpression {
    _builder.withPhone(phone)
    return this
  }
  
  function withLastUpdateTime(lastUpdateTime : Date) : AccountLocationExpression {
    _builder.withLastUpdateTime(lastUpdateTime)
    return this
  }

  function withTemporaryLastUpdateTime(temporaryLastUpdateTime : Date) : AccountLocationExpression {
    _builder.withTemporaryLastUpdateTime(temporaryLastUpdateTime)
    return this
  }
  
  function isReferenced() : AccountLocationExpression {
    _builder.isReferenced(true)
    return this
  }
  
  function isNotReferenced() : AccountLocationExpression {
    _builder.isReferenced(false)
    return this
  }
}
