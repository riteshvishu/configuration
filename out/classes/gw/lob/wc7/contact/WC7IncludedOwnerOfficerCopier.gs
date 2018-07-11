package gw.lob.wc7.contact
uses gw.contact.AbstractPolicyContactRoleCopier

/**
 * Copier for {@link WC7IncludedOwnerOfficer}
 */
@Export
class WC7IncludedOwnerOfficerCopier extends AbstractPolicyContactRoleCopier<WC7IncludedOwnerOfficer> {

  construct(includedOwnerOfficer : WC7IncludedOwnerOfficer) {
    super(includedOwnerOfficer)
  }
  
  override protected function copyRoleSpecificFields(includedOwnerOfficer : WC7IncludedOwnerOfficer) {
    _bean.setFieldValue("OwnerOfficerCondition", includedOwnerOfficer.getFieldValue("OwnerOfficerCondition"))
    _bean.WC7ClassCode = includedOwnerOfficer.WC7ClassCode
    
    _bean.WC7OwnershipPct = includedOwnerOfficer.WC7OwnershipPct
    _bean.Jurisdiction = includedOwnerOfficer.Jurisdiction
  }
}
