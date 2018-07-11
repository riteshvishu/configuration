package gw.plugin.billing
uses gw.plugin.Plugins
uses gw.search.SearchCriteria

/**
 * Extension of the Java interface which is created in order to define it in the Java plugin
 * interface.
 */

/*
Stop! If your doing work on this class you should be aware of :

PC-16824
BillingAccountSearchCriteria passes off the job of searching to a plugin, which in term makes a SOAP call to BC in the OOTB configuration.
The plugin takes an instance of BillingAccountSearchCriteriaJava as its parameter. Then, the OOTB plugin checks that the passed instance
is actually the specific implementation BillingAccountSearchCriteria, and uses the extra fields in that particular implementation to make
the SOAP call. Whatever the original intent of this design was, it needs to be cleaned up. Additionally, this creates a circular dependency
between the interface and the plugin.

We should refactor BASC to accomplish the following :

1) The billing account search plugin should take a new, richer interface that allows for account number, account name, and list bill.
2) The OOTB plugin should take any instance of this new interface, not just one specific implementation.
3) The object passed to the plugin should not be the same as the search criteria; we should break this circular dependancy
4) All of these interfaces should be in GoSu, not java

It would also be nice if we could agree on a mechanism where customers could extend the interface to specific plugins. For instance,
possibly passing an additional object as part of the interface, which customers could replace with something that includes their
specific data requirements. 

*/

@Export
class BillingAccountSearchCriteria extends SearchCriteria<BillingAccountSearchResult> implements BillingAccountSearchCriteriaJava {
  /**
   * The account number search criteria
   */
  var _accountNumber : String as AccountNumber
  /**
   * The account name search criteria
   */
  var _accountName : String as AccountName
  var _accountNameKanji : String as AccountNameKanji
  /**
   * True if only search for list bill account
   */
  var _listBill : Boolean as ListBill
  
  var _plugin : IBillingSystemPlugin
  
  construct(){
    _plugin = Plugins.get(IBillingSystemPlugin)
  }
  
  override function doSearch() : BillingAccountSearchResult[] {    
    return _plugin.searchForAccounts(this, 50) as BillingAccountSearchResult[]
  }

  override property get HasMinimumSearchCriteria() : boolean {
    return ( (AccountName != null && AccountName.NotBlank) ||
        (AccountNameKanji != null && AccountNameKanji.NotBlank) ||
        (AccountNumber != null && AccountNumber.NotBlank))
  }

  override property get MinimumSearchCriteriaMessage() : String {
    if (HasMinimumSearchCriteria) {
      return null
    }
    return displaykey.Web.Search.SearchCriteria.BillingAccountSearchCriteriaMinimumCriteriaNotMet
  }
  
}
