package gw.lob.wc7.contact

@Export
enhancement WC7LaborContactEnhancement : entity.WC7LaborContact {

  /**
   * Remove the detail from this WC7LaborContact, and furthermore remove this WC7LaborContact
   * if it is the very last detail.  NOTE: use this method instead of removeFromDetails.
   */
  function removeDetail(toRemove : WC7LaborContactDetail) {
    this.removeFromWC7Details(toRemove)
    if (this.WC7Details.Count == 0) {
      this.Branch.removeFromPolicyContactRoles(this)
    }
  }
}
