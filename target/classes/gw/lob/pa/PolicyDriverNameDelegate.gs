package gw.lob.pa

uses gw.api.name.PersonNameFieldsBase

@Export
class PolicyDriverNameDelegate extends PersonNameFieldsBase {

    private var _policyDriver : PolicyDriver

    construct(policyDriver : PolicyDriver) {
      _policyDriver = policyDriver
    }

    override property get FirstName(): java.lang.String {
      return _policyDriver.FirstName
    }

    override property set FirstName(value: java.lang.String) {
      _policyDriver.FirstName = value
    }

    override property get LastName(): java.lang.String {
      return _policyDriver.LastName
    }

    override property set LastName(value: java.lang.String) {
      _policyDriver.LastName = value
    }

}