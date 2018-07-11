package gw.account

/**
 * Handles a field synced between an AccountContactRole and a PolicyContactRole.
 */
@Export
class AccountContactRoleToPolicyContactRoleSyncedField<S extends PolicyContactRole, T> extends AbstractPolicyContactRoleSyncedField<S, T> {
  public static final var RelationshipTitle : AccountContactRoleToPolicyContactRoleSyncedField<PolicyOwnerOfficer, Relationship> = new AccountContactRoleToPolicyContactRoleSyncedField<PolicyOwnerOfficer, Relationship>("RelationshipTitle")
  
  /**
   * WC7PolicyOwnerOfficer#RelationshipTitleInternal maps to OwnerOfficer#RelationshipTitle.
   * Due to the inconsistent naming, a special constructor for the account sync'ed field must be used to ensure that the mapping is correct.
   */
  public static final var WC7RelationshipTitle : AccountContactRoleToPolicyContactRoleSyncedField<WC7PolicyOwnerOfficer, Relationship> = 
    new AccountContactRoleToPolicyContactRoleSyncedField<WC7PolicyOwnerOfficer, Relationship>(/* AccountField */ "RelationshipTitle", /* policy entity field */ "RelationshipTitleInternal")

  construct(baseFieldName : String) {
    super(baseFieldName, PendingAccountContactRoleUpdate)
  }
  
  construct(accountEntityFieldNameArg : String, policyEntityFieldNameArg : String) {
    super(accountEntityFieldNameArg, 
          policyEntityFieldNameArg, 
          accountEntityFieldNameArg /* pending update field name */, 
          accountEntityFieldNameArg + "IsNull" /* pending update isNull field name */, 
          PendingAccountContactRoleUpdate)
  }

  override function getAccountEntity(accountSyncable : S) : KeyableBean {
    return accountSyncable.AccountContactRole
  }

  override protected function setTemporaryLastUpdateTime(accountSyncable : S) {
    // AccountContactRoles will share the date field on the AccountContact
    accountSyncable.AccountContactRole.AccountContact.setFieldValue("TemporaryLastUpdateTime", accountSyncable.Branch.EditEffectiveDate)
  }

}
