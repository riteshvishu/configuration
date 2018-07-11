package gw.plugin.contact.impl

uses gw.plugin.contact.IAccountContactRolePlugin
uses gw.api.database.Query


@Export
class AccountContactRolePlugin implements IAccountContactRolePlugin {

  construct() {
  }

  override function cloneExtensions(oldAccountContactRole : AccountContactRole, newAccountContactRole : AccountContactRole) {
  }
  
  override function copyPendingUpdatesForAccountContactRole(sourceAccountContactRole : AccountContactRole, targetAccountContactRole : AccountContactRole) {    
    var isSameRoleType = typeof sourceAccountContactRole == typeof targetAccountContactRole
    var isSameContact = sourceAccountContactRole.AccountContact.Contact == targetAccountContactRole.AccountContact.Contact
    if (sourceAccountContactRole != targetAccountContactRole and isSameRoleType and isSameContact){
      var updates = findUpdatesForRole(sourceAccountContactRole)
      var bundle = targetAccountContactRole.Bundle
      for (update in updates){
        update = bundle.add(update)
        var anUpdate = update.copy() as PendingAccountContactRoleUpdate
        anUpdate.TargetAccountContactRole = targetAccountContactRole
      }     
    }
  }
  
  private function findUpdatesForRole(targetRole : AccountContactRole) : List<PendingAccountContactRoleUpdate> {
     return Query.make(PendingAccountContactRoleUpdate)
       .compare("TargetAccountContactRole", Equals, targetRole)
       .select().toList()
  }


}
