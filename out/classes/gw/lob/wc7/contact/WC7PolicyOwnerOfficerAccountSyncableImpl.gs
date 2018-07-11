package gw.lob.wc7.contact
uses gw.contact.AbstractPolicyContactRoleAccountSyncableImpl
uses gw.account.AccountContactRoleToPolicyContactRoleSyncedField
uses com.google.common.collect.ImmutableSet
uses gw.api.domain.account.AccountSyncedField
uses gw.api.domain.account.AccountSyncable
uses java.util.Set

/**
 * Implementation that handles {@link WC7PolicyOwnerOfficer}'s account syncing behavior.
 */
@Export
class WC7PolicyOwnerOfficerAccountSyncableImpl extends AbstractPolicyContactRoleAccountSyncableImpl<WC7PolicyOwnerOfficer> {

  static final var ACCOUNT_SYNCED_FIELDS = ImmutableSet.copyOf  (
    AbstractPolicyContactRoleAccountSyncableImpl.AccountSyncedFieldsInternal.union(
      {
        AccountContactRoleToPolicyContactRoleSyncedField.WC7RelationshipTitle
      }
    )
  )
  
  protected static property get AccountSyncedFieldsInternal() : Set<AccountSyncedField<AccountSyncable, ?>> {
    // provided so subclasses can extend this list
    return ACCOUNT_SYNCED_FIELDS
  }

  construct(accountSyncable : WC7PolicyOwnerOfficer) {
    super(accountSyncable)
  }

  override property get AccountSyncedFields() : Set<AccountSyncedField<AccountSyncable, ?>> {
    // must override to ensure that we call the correct static AccountSyncedFieldsInternal property
    return AccountSyncedFieldsInternal
  }
}
