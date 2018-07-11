package gw.lob.wc7.contact
uses gw.account.AccountContactRoleToPolicyContactRoleSyncedField

@Export
enhancement WC7PolicyOwnerOfficerEnhancement : entity.WC7PolicyOwnerOfficer {

  /**
   * True if this {@link WC7PolicyOwnerOfficer} is included, false otherwise.
   */
  function isIncluded() : boolean {
    return this typeis WC7IncludedOwnerOfficer
  }

  /**
   * @deprecated  Please use {@link #isIncluded()} instead.
   */
  property get Inclusion() : typekey.Inclusion {
    return isIncluded() ? typekey.Inclusion.TC_INCL : typekey.Inclusion.TC_EXCL
  }

  /**
   * Shared and revisioned relationship/title.
   */
  property get RelationshipTitle() : Relationship {
    return AccountContactRoleToPolicyContactRoleSyncedField.WC7RelationshipTitle.getValue(this)
  }

  /**
   * Shared and revisioned relationship/title.
   */
  property set RelationshipTitle(arg : Relationship) {
    AccountContactRoleToPolicyContactRoleSyncedField.WC7RelationshipTitle.setValue(this, arg)
  }

}