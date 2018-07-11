package gw.api.databuilder.wc7
uses gw.api.databuilder.DataBuilder

@Export
class WC7EmployeeLeasingPlanBuilder extends DataBuilder<WC7EmployeeLeasingPlan, WC7EmployeeLeasingPlanBuilder> {

  construct() {
    super(WC7EmployeeLeasingPlan)
  }

  final function withProfessionalEmployeeType(val : WC7ProfessionalEmployeeType) : WC7EmployeeLeasingPlanBuilder {
    set(WC7EmployeeLeasingPlan.Type.TypeInfo.getProperty("ProfessionalEmployeeType"), val)
    return this
  }

  final function withPolicyType(val : WC7EmployeeLeasingPolicyType) : WC7EmployeeLeasingPlanBuilder {
    set(WC7EmployeeLeasingPlan.Type.TypeInfo.getProperty("PolicyType"), val)
    return this
  }
  
}
