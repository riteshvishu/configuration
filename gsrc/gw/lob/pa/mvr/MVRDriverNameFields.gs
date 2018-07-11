package gw.lob.pa.mvr

uses gw.api.name.PersonNameFieldsBase
uses gw.api.motorvehiclerecord.IMVRData

@Export
class MVRDriverNameFields extends PersonNameFieldsBase {

  var _mvrDriver : IMVRData

  construct(mvrDriver : IMVRData) {
    _mvrDriver = mvrDriver
  }

  override property get FirstName() : String {
    return _mvrDriver.FirstName
  }

  override property get LastName() : String {
    return _mvrDriver.LastName
  }

  override property get MiddleName() : String {
    return _mvrDriver.MiddleName
  }
}