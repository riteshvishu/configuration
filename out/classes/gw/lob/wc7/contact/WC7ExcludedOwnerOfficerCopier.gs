package gw.lob.wc7.contact

uses gw.contact.AbstractPolicyContactRoleCopier

/**
 * Copier for {@link WC7ExcludedOwnerOfficer}
 */
@Export
class WC7ExcludedOwnerOfficerCopier extends AbstractPolicyContactRoleCopier<WC7ExcludedOwnerOfficer> {

  construct(excludedOwnerOfficer : WC7ExcludedOwnerOfficer) {
    super(excludedOwnerOfficer)
  }
  
  override protected function copyRoleSpecificFields(excludedOwnerOfficer : WC7ExcludedOwnerOfficer) {
    _bean.setFieldValue("OwnerOfficerCondition", excludedOwnerOfficer.getFieldValue("OwnerOfficerCondition"))
    
    _bean.WC7OwnershipPct = excludedOwnerOfficer.WC7OwnershipPct
    _bean.Jurisdiction = excludedOwnerOfficer.Jurisdiction
  }
}
