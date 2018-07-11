package gw.web.admin

@Export
class ProducerCodeUIHelper {

  public static function performBranchSearch(name : String) : Group {
    var criteria = new GroupSearchCriteria().asBranchSearch()
    criteria.BranchName = name
    var qp = criteria.performSearch()
    try {
      var rtn = qp.getAtMostOneRow()
      if (rtn == null) {
        throw new gw.api.util.DisplayableException( displaykey.Web.Admin.ProducerCodeDetail.Error.NoBranchFound( name ) )
      }
      return rtn as Group
    } catch(e : com.guidewire.commons.system.exception.MultipleMatchesException) {
      throw new gw.api.util.DisplayableException(displaykey.Web.Admin.ProducerCodeDetail.Error.MultipleBranchesFound( name ))
    }
  }

  public static function getCommissionPlans(tier : typekey.Tier) : gw.plugin.billing.CommissionPlanSummary[]{
    try{
      var BillingSystem = gw.plugin.Plugins.get( gw.plugin.billing.IBillingSystemPlugin )
      var producerTier = tier == null ? typekey.Tier.TC_BRONZE : tier
      var plans = BillingSystem.retrieveAllCommissionPlans().where( \ c -> c.AllowedTiers.contains( producerTier ))
      if(plans.Count == 0){
        throw new gw.api.util.DisplayableException(displaykey.Web.Admin.ProducerCodeDetail.Error.NoCommissionPlan(producerTier))
      }
      return plans
    }catch(e : java.lang.Exception){
      gw.api.util.LocationUtil.addRequestScopedErrorMessage(displaykey.Web.Errors.BillingSystem(e.Message))
      return new gw.plugin.billing.CommissionPlanSummary[0]
    }
  }
}