package gw.lob.wc7.contact

@Export
enhancement WC7LaborContactDetailEnhancement : entity.WC7LaborContactDetail {
  
  /**
   * True if this {@link WC7LaborContactDetail} is included, false otherwise.
   */
  function isIncluded() : boolean {
    return this typeis WC7IncludedLaborContactDetail
  }
  
  property get Inclusion() : typekey.Inclusion {
    return isIncluded() ? typekey.Inclusion.TC_INCL : typekey.Inclusion.TC_EXCL
  }

  property get Address() : Address {
    return this.WC7LaborContact.AccountContactRole.AccountContact.Contact.PrimaryAddress
  }
}
