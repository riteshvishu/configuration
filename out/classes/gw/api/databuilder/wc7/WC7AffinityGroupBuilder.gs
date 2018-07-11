package gw.api.databuilder.wc7

uses gw.api.databuilder.DataBuilder
uses java.util.Date
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.builder.OrganizationBuilder

@Export
class WC7AffinityGroupBuilder extends DataBuilder<WC7AffinityGroup, WC7AffinityGroupBuilder> {

  construct() {
    super(WC7AffinityGroup)
    var rn = UniqueKeyGenerator.get().nextID()
    withName("Grp-"+rn)
    withAffinityGroupType("Open")
    withOrganization(new OrganizationBuilder()
        .withName("Org"+rn).create())
  }
   
  function withName(name : String) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("Name"), name) 
    return this
  }
   
  function withAffinityGroupType(type : WC7AffinityGroupType) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("AffinityGroupType"),type)
    return this
  }
  
  function withOrganization(organization : Organization) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("Organization"), organization)
    return this
  }
  
   function withPrimaryContactFirstName(firstName : String) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("PrimaryContactFirstName"), firstName)
    return this
  }
  
   function withPrimaryContactLastName(lastName : String) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("PrimaryContactLastName"),lastName)
    return this
  }
  
  function withPrimaryContactPhone(phone : String) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("PrimaryContactPhone"),phone)
    return this
  }
  
  function withStartDate(startDate : Date) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("StartDate"),startDate)
    return this
  }
  
  function withEndDate(endDate : Date) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("EndDate"),endDate)
    return this
  }
  
  function withDescription(description : String) : WC7AffinityGroupBuilder {
    set(WC7AffinityGroup.Type.TypeInfo.getProperty("Description"),description)
    return this
  }
  
  function withJurisdiction(jurisdictionBuilder : WC7AffinityGroupJurisdictionBuilder) : WC7AffinityGroupBuilder {
    addArrayElement(WC7AffinityGroup.Type.TypeInfo.getProperty("Jurisdictions"), jurisdictionBuilder)
    return this
  }
  
  function withProduct(productBuilder : WC7AffinityGroupProductBuilder) : WC7AffinityGroupBuilder {
    addArrayElement(WC7AffinityGroup.Type.TypeInfo.getProperty("Products"), productBuilder)
    return this
  }
  
  function withProducerCode(producerCodeBuilder : WC7AffinityGroupProducerCodeBuilder) : WC7AffinityGroupBuilder {
    addArrayElement(WC7AffinityGroup.Type.TypeInfo.getProperty("AffinityGroupProducerCodes"), producerCodeBuilder)
    return this
  }
}