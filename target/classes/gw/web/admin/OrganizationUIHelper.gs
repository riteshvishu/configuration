package gw.web.admin

@Export
class OrganizationUIHelper {

  public static function createUser(organization : entity.Organization) : User {
    var user = new User()
    user.ExternalUser = not organization.Carrier
    user.UseOrgAddress = false
    user.setOrganizationWithUpdate(organization)
    user.Credential = new Credential()
    organization.Contact = user.Contact
    return user
  }

  public static function getUser(c : Contact) : User{
    var u = gw.api.database.Query.make(User).compare(User#Contact.PropertyInfo.Name, Equals, c).select().FirstResult
    if(u == null){
      u = c.Bundle.InsertedBeans.toCollection().whereTypeIs(User).firstWhere(\ x -> x.Contact == c)
    }
    return u
  }

  public static function getAgencyBillPlans() : gw.plugin.billing.AgencyBillPlanSummary[]{
    try{
      var BillingSystem = gw.plugin.Plugins.get( gw.plugin.billing.IBillingSystemPlugin )
      return BillingSystem.retrieveAllAgencyBillPlans()
    }catch(e : java.lang.Exception){
      gw.api.util.LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Errors.BillingSystem(e.Message))
      return new gw.plugin.billing.AgencyBillPlanSummary[0]
    }
  }

  public static function getAllOrganizationUsers(organization : entity.Organization) : List<User>{
    var users = organization.AllUsers.toList()
    users = users.Count > 10 ? users.subList(0, 10) : users
    var newUsers = organization.Bundle.InsertedBeans.toCollection().whereTypeIs( User ).toList()
    users.addAll( newUsers )
    return users
  }

  public static function createCriteria(activeProducersOnly : java.lang.Boolean, includesCarrier : java.lang.Boolean) : OrganizationSearchCriteria {
    var criteria = new OrganizationSearchCriteria()
    if( activeProducersOnly )
    {
      criteria.ProducerStatus = "Active"
    }
    criteria.Carrier = includesCarrier
    return criteria
  }
}