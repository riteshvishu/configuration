package gw.policy
uses gw.api.productmodel.Offering

enhancement EffectiveDatedFieldsEnhancement : EffectiveDatedFields {

  function getOfferingName(offeringCode : String) : String {
    var offering = Offering.getByCode(offeringCode)
    return offering.Name
  }
}