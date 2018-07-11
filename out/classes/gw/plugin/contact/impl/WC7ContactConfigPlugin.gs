package gw.plugin.contact.impl

uses gw.plugin.contact.IContactConfigPlugin

/**
 * An implementation of {@link IContactConfigPlugin} that includes WC7 
 * policy contact roles in addition to any normal OOTB (out of the box) contact roles:  
 * <ul>
 *   <li>WC7PolicyOwnerOfficer</li>
 *   <li>WC7PolicyLaborContractor</li>
 *   <li>WC7PolicyLaborClient</li>
 *   <li>WC7ExcludedOwnerOfficer</li>
 *   <li>WC7IncludedOwnerOfficer</li>
 * </ul>
 */
@Export
class WC7ContactConfigPlugin extends ContactConfigPlugin implements IContactConfigPlugin {
  
  override protected property get DefaultConfigs() : ContactConfig[] {
    return {
      new ContactConfig(true, {"company", "person"}, "AccountHolder",      {}),
      new ContactConfig(true, {"company", "person"}, "AccountingContact",  {}),
      new ContactConfig(true, {"company", "person"}, "AdditionalInsured",  {"PolicyAddlInsured"}),
      new ContactConfig(true, {"company", "person"}, "AdditionalInterest", {"PolicyAddlInterest"}),
      new ContactConfig(true, {"company", "person"}, "BillingContact",     {"PolicyBillingContact"}),
      new ContactConfig(true, {"company", "person"}, "ClaimsInfoContact",  {}),
      new ContactConfig(true, {           "person"}, "Driver",             {"PolicyDriver"}),
      new ContactConfig(true, {"company", "person"}, "InspectionContact",  {}),
      new ContactConfig(true, {"company"          }, "LaborClient",        {"PolicyLaborClient", "WC7PolicyLaborClient"}),
      new ContactConfig(true, {"company"          }, "LaborContractor",    {"PolicyLaborContractor", "WC7PolicyLaborContractor"}),
      new ContactConfig(true, {"company", "person"}, "NamedInsured",       {"PolicyPriNamedInsured", "PolicySecNamedInsured", "PolicyAddlNamedInsured"}),
      new ContactConfig(true, {           "person"}, "OwnerOfficer",       {"PolicyOwnerOfficer", "WC7PolicyOwnerOfficer", "WC7ExcludedOwnerOfficer", "WC7IncludedOwnerOfficer" }),
      new ContactConfig(true, {"company", "person"}, "SecondaryContact",   {})
    }
  }
}
