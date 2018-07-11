package gw.plugin.billing.bc300

uses soap.BCBillingSystemAPI.entity.PCAccountInfo
uses soap.BCBillingSystemAPI.entity.PCContactInfo
uses java.util.ArrayList

@Export
enhancement PCAccountInfoEnhancement : PCAccountInfo
{
  function sync(account : Account){
    this.AccountNumber = account.AccountNumber
    this.AccountName = account.AccountHolderContact.DisplayName
    var insuredContact = new PCContactInfo()
    insuredContact.sync( account.AccountHolderContact )
    this.InsuredContact = insuredContact
    
    var insuredContactID = account.AccountHolderContact.ID
    
    var billingContacts = new ArrayList<PCContactInfo>()
    var accountBillingContacts = account.getAccountContactsWithRole( typekey.AccountContactRole.TC_BILLINGCONTACT)
    for(b in accountBillingContacts){
      if(insuredContactID == b.Contact.ID){
        this.InsuredIsBilling = true
      }else{
        var PCContactInfo = new PCContactInfo()
        PCContactInfo.sync( b.Contact )
        billingContacts.add( PCContactInfo )
      }
    }
    this.BillingContacts = new PCContactInfo[billingContacts.Count]
    this.BillingContacts = billingContacts.toArray(this.BillingContacts)
  }
}
