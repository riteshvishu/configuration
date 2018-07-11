package gw.lob.wc7

uses java.util.ArrayList
uses gw.plugin.contact.IContactConfigPlugin
uses gw.plugin.Plugins
uses gw.api.util.DisplayableException
uses gw.api.productmodel.ConditionPattern
uses gw.api.productmodel.ExclusionPattern
uses java.util.Map
uses gw.api.productmodel.Schedule
uses java.util.LinkedHashSet
uses java.util.HashMap
uses gw.lob.wc7.schedule.WC7ScheduleJurisdictionPropertyInfo
uses gw.api.domain.Clause
uses entity.windowed.WC7LineScheduleCovItemVersionList
uses entity.windowed.WC7LineScheduleCondItemVersionList
uses entity.windowed.WC7LineScheduleExclVersionList
uses entity.windowed.WC7LineScheduleExclItemVersionList
uses entity.windowed.WC7LineScheduleCovVersionList
uses entity.windowed.WC7LineScheduleCondVersionList

/**
 * Enhancement methods for {@link WC7WorkersCompLine} that deal with schedules.
 * 
 * e.g. Owner/Officers, Waivers of Subrogation
 */
@Export
enhancement WC7WorkersCompLineScheduleEnhancement : entity.WC7WorkersCompLine {
  
  //----------------------------------------------------------------- Owner/Officer
  
  /**
   * True if this line has {@link WC7PolicyOwnerOfficer} values.
   */
  property get HasOwnerOfficer(): boolean {
    return this.Branch.WC7Line.WC7PolicyOwnerOfficers.HasElements
  }

  //----------------------------------------------------------------- Excluded Owner/Officers

  /**
   * Adds an new excluded owner/officer to the WC7Line with the given contact type as a new contact.
   * This will create the required account contact, owner officer role on the account as well as the necessary contact.
   * throws an exception if an Owner Officer for the given Account Contact already exists on this line
   *
   * @param contactType  the {@link ContactType} for the new Owner/Officer
   * @param ownerOfficerExclusion the Owner/Officer Exclusion.  This may not be null
   * @return             the newly created {@link WC7ExcludedOwnerOfficer}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addExcludedOwnerOfficer(Contact, productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl)
   */
  function addNewExcludedOwnerOfficerOfContactType(contactType : ContactType, ownerOfficerExclusion : productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl) : WC7ExcludedOwnerOfficer {
    var acctContact = this.Branch.Policy.Account.addNewAccountContactOfType(contactType)
    return addExcludedOwnerOfficer(acctContact.Contact, ownerOfficerExclusion)
  }
  
  /**
   * Adds an Excluded Owner Officer to the WC7Line and to the provided exclusion for the given {@link Contact}
   * if the {@link Contact} is attached to an account contact on this account and does not have a role of "Owner Officer" already, 
   * the role is added
   * throws an exception if an Owner Officer for the given Account Contact already exists on this line
   * 
   * @param contact      a contact to use for creating the new {@link WC7PolicyOwnerOfficer}
   * @param ownerOfficerExclusion the Owner/Officer Exclusion.  This may not be null
   * @return             the newly created {@link WC7PolicyOwnerOfficer}
   */
  function addExcludedOwnerOfficer(contact : Contact, ownerOfficerExclusion : productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl) : WC7ExcludedOwnerOfficer {
    var exclPattern : ExclusionPattern = "WC7PartnersOfficersAndOthersExclEndorsementExcl"
    if (ownerOfficerExclusion == null){
      throw new DisplayableException(displaykey.Web.Contact.WC7.PolicyOwnerOfficer.Error.ExcludedOwnerOfficerInvalidClause(exclPattern.Name))
    }
    if (this.WC7PolicyOwnerOfficers.firstWhere(\ p -> p.AccountContactRole.AccountContact.Contact == contact) != null) {
      throw new DisplayableException(displaykey.Web.Contact.PolicyOwnerOfficer.Error.AlreadyExists(contact))
    }
    var excludedOfficer = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7EXCLUDEDOWNEROFFICER) as WC7ExcludedOwnerOfficer
    excludedOfficer.setFieldValue("OwnerOfficerExclusion", ownerOfficerExclusion)
    this.addToWC7PolicyOwnerOfficers(excludedOfficer)
    return excludedOfficer
  }
  
  /**
   * For each AccountContact returned by the UnassignedOwnerOfficer property,
   * add that AccountContact as an Excluded Owner/Officer to the WC7Line
   * throws an exception the owner officer exclusion is null
   * 
   * @param ownerOfficerExclusion the owner officer exclusion to attach the unassigned owner officers to.
   * @return a list of the newly created {@link WC7ExcludedOwnerOfficer}s
   * @see #addExcludedOwnerOfficer(Contact, productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl)
   */
  function addAllExistingOwnerOfficersToExclusion(ownerOfficerExclusion : productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl) : List<WC7ExcludedOwnerOfficer> {
    var newExcludedOwnerOfficers = new ArrayList<WC7ExcludedOwnerOfficer>()
    for(ac in UnassignedOwnerOfficers) {
      newExcludedOwnerOfficers.add(addExcludedOwnerOfficer(ac.Contact, ownerOfficerExclusion))
    }
    return newExcludedOwnerOfficers
  }
  
  /**
   * {@link WC7ExcludedOwnerOfficer}s on the {@link WC7Line}
   */
  property get ExcludedOwnerOfficers() : WC7ExcludedOwnerOfficer[] {
    return this.WC7PolicyOwnerOfficers.whereTypeIs(WC7ExcludedOwnerOfficer)
  }
  
  //----------------------------------------------------------------- Included Owner Officers
  
  /**
   * Adds an new included owner/officer to the WC7Line with the given contact type as a new contact.
   * This will create the required account contact, owner officer role on the account as well as the necessary contact.
   * throws an exception if an Owner Officer for the given Account Contact already exists on this line
   *
   * @param contactType  the {@link ContactType} for the new Owner/Officer
   * @param ownerOfficerCondition the Owner/Officer Condition.  This may not be null
   * @return             the newly created {@link WC7IncludedOwnerOfficer}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addIncludedOwnerOfficer(Contact, productmodel.WC7SoleProprietorsPartnersOfficersAndOthersCovCond)
   */
  function addNewIncludedOwnerOfficerOfContactType(contactType : ContactType, ownerOfficerCondition : productmodel.WC7SoleProprietorsPartnersOfficersAndOthersCovCond) : WC7IncludedOwnerOfficer {
    var acctContact = this.Branch.Policy.Account.addNewAccountContactOfType(contactType)
    return addIncludedOwnerOfficer(acctContact.Contact, ownerOfficerCondition)
  }
  
  /**
   * Adds an Included Owner Officer to the WC7Line and to the provided condition for the given {@link Contact}
   * if the {@link Contact} is attached to an account contact on this account and does not have a role of "Owner Officer" already, 
   * the role is added
   * throws an exception if an Owner Officer for the given Account Contact already exists on this line
   * 
   * @param contact      a contact to use for creating the new {@link WC7PolicyOwnerOfficer}
   * @param ownerOfficerCondition the Owner/Officer Condition.  This may not be null
   * @return             the newly created {@link WC7PolicyOwnerOfficer}
   */
  function addIncludedOwnerOfficer(contact : Contact, ownerOfficerCondition : productmodel.WC7SoleProprietorsPartnersOfficersAndOthersCovCond) : WC7IncludedOwnerOfficer {
    var condPattern : ConditionPattern = "WC7SoleProprietorsPartnersOfficersAndOthersCovCond"
    if (ownerOfficerCondition == null){
      throw new DisplayableException(displaykey.Web.Contact.WC7.PolicyOwnerOfficer.Error.IncludedOwnerOfficerInvalidClause(condPattern.Name))
    }
    if (this.WC7PolicyOwnerOfficers.firstWhere(\ p -> p.AccountContactRole.AccountContact.Contact == contact) != null) {
      throw new DisplayableException(displaykey.Web.Contact.PolicyOwnerOfficer.Error.AlreadyExists(contact))
    }
    var includedOfficer = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7INCLUDEDOWNEROFFICER) as WC7IncludedOwnerOfficer
    includedOfficer.setFieldValue("OwnerOfficerCondition", ownerOfficerCondition)
    this.addToWC7PolicyOwnerOfficers(includedOfficer)
    return includedOfficer
  }
  
  /**
   * For each AccountContact returned by the UnassignedOwnerOfficer property,
   * add that AccountContact as an Included Owner/Officer to the WC7Line
   * throws an exception the owner officer exclusion is null
   * 
   * @param ownerOfficerExclusion the owner officer exclusion to attach the unassigned owner officers to.
   * @return a list of the newly created {@link WC7ExcludedOwnerOfficer}s
   * @see #addExcludedOwnerOfficer(Contact, productmodel.WC7PartnersOfficersAndOthersExclEndorsementExcl)
   */
  function addAllExistingOwnerOfficersToCondition(ownerOfficerCondition : productmodel.WC7SoleProprietorsPartnersOfficersAndOthersCovCond) : List<WC7IncludedOwnerOfficer> {
    var newIncludedOwnerOfficers = new ArrayList<WC7IncludedOwnerOfficer>()
    for(ac in UnassignedOwnerOfficers) {
      newIncludedOwnerOfficers.add(addIncludedOwnerOfficer(ac.Contact, ownerOfficerCondition))
    }
    return newIncludedOwnerOfficers
  }
  
  /**
   * {@link WC7IncludedOwnerOfficer}s on the {@link WC7Line}
   */
  property get IncludedOwnerOfficers() : WC7IncludedOwnerOfficer[] {
    return this.WC7PolicyOwnerOfficers.whereTypeIs(WC7IncludedOwnerOfficer)
  }

  /**
   * All the account Owner Officers that are not already assigned to this policy line.
   */
  property get UnassignedOwnerOfficers() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor("WC7PolicyOwnerOfficer")
    var assignedOwnerOfficers = this.WC7PolicyOwnerOfficers.map(\ ownerOfficer -> ownerOfficer.AccountContactRole.AccountContact)
    return this.Branch.Policy.Account
      .getAccountContactsWithRole(accountContactRoleType)
      .subtract(assignedOwnerOfficers)
      .toTypedArray()
  }

  /**
   * Any account contact that is not an Owner Officer.
   */
  property get OwnerOfficerOtherCandidates() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor(typekey.PolicyContactRole.TC_WC7POLICYOWNEROFFICER)
    return this.Branch.Policy.Account.ActiveAccountContacts
      .where(\ ac -> plugin.canBeRole(ac.ContactType, accountContactRoleType) and not ac.hasRole(accountContactRoleType))
  }
  
  //----------------------------------------------------------------- Waivers of Subrogation
  
  /**
   * True if this line has {@link WC7WaiverOfSubros} values.
   */
  property get HasWC7WaiverOfSubro() : Boolean {
    return this.WC7WaiverOfSubros.HasElements
  }
  
  /**
   * Creates and adds a new Waiver {@link WC7WaiverOfSubro} to this policy line.
   * 
   * @param waiverType      {@link typekey.WC7WaiverOfSubrogation} the waiver type
   * @param waiverCondition the parent condition
   * @return the newly created waiver.
   */
  function createAndAddWaiver(waiverType : typekey.WC7WaiverOfSubrogation, waiverCondition : productmodel.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond) : WC7WaiverOfSubro {
    var waiver = new WC7WaiverOfSubro(this.Branch)
    waiver.GoverningLaw = WC7GoverningLaw.TC_STATE
    waiver.Type = waiverType
    waiver.setFieldValue("WaiverCondition", waiverCondition)
    this.addToWC7WaiverOfSubros(waiver)
    return waiver
  }

  /**
   * Creates and adds a new Waiver of Subrogation that is 'Specific' and 
   * {@link WC7WaiverOfSubro} to this policy line in window mode. The newly 
   * created specific waiver will have an effective will have date equivalent 
   * to the edit effective date of the branch.
   * @return the newly created {@link WC7WaiverOfSubro} Specific Waiver.
   */
  function createAndAddSpecificWaiverOfSubroWM() : WC7WaiverOfSubro {
    var specificWaiver = createAndAddWaiver(WC7WaiverOfSubrogation.TC_SPECIFIC, this.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond)
    return specificWaiver.VersionList.AllVersions.single()
  }

  /**
   * Creates and adds a new Waiver of Subrogation that is 'Blanket' and 
   * {@link WC7WaiverOfSubro} to this policy line in window mode. The newly 
   * created blanket waiver will have an effective date equivalent 
   * to the edit effective date of the branch.
   * @return the newly created {@link WC7WaiverOfSubro} Blanket Waiver.
   */
  function createAndAddBlanketWaiverOfSubroWM() : WC7WaiverOfSubro {
    var blanketWaiver = createAndAddWaiver(WC7WaiverOfSubrogation.TC_BLANKET, this.WC7WaiverOfOurRightToRecoverFromOthersEndorsemCond)
    return blanketWaiver.VersionList.AllVersions.single()
  }

  //----------------------------------------------------------------- FELA

  /**
   * Creates and adds a new Federal Covered Employee {@link WC7FedCoveredEmployee} to 
   * this policy line in window mode. The newly created federal covered employee will 
   * have an effective date equivalent to the edit effective date of the branch.
   * 
   * @return the newly created Federal Covered Employee in window mode.
   */
  function createAndAddFedCoveredEmployeeWM() : WC7FedCoveredEmployee {
    var fedCovEmp = this.createAndAddWC7FedCoveredEmployee(this.WC7FederalEmployersLiabilityActACov)
    return fedCovEmp.VersionList.AllVersions.single()
  }

  /**
   * Creates and adds a new Federal Covered Employee {@link WC7FedCoveredEmployee} to this policy line.
   * 
   * @param fedEmpLiabCoverage the parent coverage
   * @return the newly created Federal Covered Employee.
   */
  function createAndAddWC7FedCoveredEmployee(fedEmpLiabCoverage : WC7FederalEmployersLiabilityActACov) : WC7FedCoveredEmployee {
    var fedCoveredEmp = new WC7FedCoveredEmployee(this.Branch)
    fedCoveredEmp.setFieldValue("FedEmpLiabCoverage", fedEmpLiabCoverage)
    fedCoveredEmp.GoverningLaw = WC7GoverningLaw.TC_FEDCOALMINE
    this.addToWC7FedCoveredEmployees(fedCoveredEmp)
    return fedCoveredEmp
  }
  
  //----------------------------------------------------------------- Maritime

  /**
   * Creates and adds a new Maritime Covered Employee {@link WC7MaritimeCoveredEmployee} 
   * to this policy line in window mode.  The newly created maritime covered employee 
   * will have an effective date equivalent to the edit effective date of the branch.
   *
   * @return the newly created Federal Covered Employee in window mode.
   */
  function createAndAddMaritimeCoveredEmployeeWM() : WC7MaritimeCoveredEmployee {
    var marCovEmp = this.createAndAddWC7MaritimeCoveredEmployee(this.WC7MaritimeACov)
    return marCovEmp.VersionList.AllVersions.single()
  }

  /**
   * Creates and adds a new Maritime Covered Employee {@link WC7MaritimeCoveredEmployee} to this policy line.
   * 
   * @param maritimeCoverage the parent coverage
   * @return the newly created Maritime Covered Employee.
   */
  function createAndAddWC7MaritimeCoveredEmployee(maritimeCoverage : WC7MaritimeACov) : WC7MaritimeCoveredEmployee {
    var maritimeCoveredEmp = new WC7MaritimeCoveredEmployee(this.Branch)
    maritimeCoveredEmp.setFieldValue("MaritimeCoverage", maritimeCoverage)
    maritimeCoveredEmp.GoverningLaw = WC7GoverningLaw.TC_LIMITEDMARITIME
    this.addToWC7MaritimeCoveredEmployees(maritimeCoveredEmp)
    return maritimeCoveredEmp
  }

  //----------------------------------------------------------------- LaborContactDetails (Labor Client & Labor Contractor)
  
  //----------------------------------------------------------------- Labor Clients (aka Employee Leasing)
  
  property get WC7PolicyLaborClientDetailExistingCandidates() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor(typekey.PolicyContactRole.TC_WC7POLICYLABORCLIENT)
    return this.Branch.Policy.Account.getAccountContactsWithRole(accountContactRoleType)
  }

  property get WC7PolicyLaborClientDetailOtherCandidates() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor(typekey.PolicyContactRole.TC_WC7POLICYLABORCLIENT)
    return this.Branch.Policy.Account.ActiveAccountContacts
      .where(\ acr -> plugin.canBeRole(acr.ContactType, accountContactRoleType) and not acr.hasRole(accountContactRoleType))
  }
  
  //----------------------------------------------------------------- Included Labor Clients
  
  /**
   * {@link WC7IncludedLaborContactDetails}s associated with {@link WC7PolicyLaborClient}
   */
  function getIncludedLaborClientDetails() : WC7IncludedLaborContactDetail[] {
    return this.WC7PolicyLaborClients*.WC7Details.whereTypeIs(WC7IncludedLaborContactDetail)
  }
  
  /**
   * Adds a new labor contactor to the line and a new included labor contact detail to the Employee Leasing condition.
   *
   * @param contactType          the {@link ContactType} for the new Owner/Officer
   * @param laborClientCondition the Employee Leasing Condition.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addIncludedLaborClientDetailForContact(Contact, productmodel.WC7EmployeeLeasingClientEndorsementCond)
   */
  function addNewIncludedLaborClientDetailForContactType(
      aContactType : ContactType,
      laborClientCondition : PolicyCondition) : WC7IncludedLaborContactDetail {
    if (laborClientCondition == null){
      throw new DisplayableException("Parent condition cannot be null")
    }
    var newAccountcontact = this.Branch.Policy.Account.addNewAccountContactOfType(aContactType)
    return addIncludedLaborClientDetailForContact(newAccountcontact.Contact, laborClientCondition)
  }

  /**
   * If a labor contactor with the given contact exists, use it, otherwise adds a new labor contactor to the line.
   * Also, add a new included labor contactor detail to the {@link WC7LaborClient} and to the Employee Leasing condition.
   * 
   * @param contact              a contact to use for creating the new {@link WC7LaborClient}
   * @param laborClientCondition the Employee Leasing Condition.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   */
  function addIncludedLaborClientDetailForContact(
      contact : Contact,
      laborClientCondition : PolicyCondition) : WC7IncludedLaborContactDetail {
    if (laborClientCondition == null){
      throw new DisplayableException("Parent condition cannot be null")
    }
    var policyLaborClient = this.WC7PolicyLaborClients.firstWhere(\ plc -> plc.AccountContactRole.AccountContact.Contact == contact)
    if (policyLaborClient == null) {
      policyLaborClient = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7POLICYLABORCLIENT) as WC7PolicyLaborClient
      this.addToWC7PolicyLaborClients(policyLaborClient)
    }
    return policyLaborClient.addNewIncludedLaborClientDetail(laborClientCondition)
  }
  
  //----------------------------------------------------------------- Excluded Labor Clients
  
  /**
   * {@link WC7ExcludedLaborContactDetails}s associated with {@link WC7PolicyLaborClient}
   */
  function getExcludedLaborClientDetails(clausePattern : gw.api.productmodel.ClausePattern) : WC7ExcludedLaborContactDetail[] {
    var excludedLaborContactDetails = this.WC7PolicyLaborClients*.WC7Details.whereTypeIs(WC7ExcludedLaborContactDetail)
    var excludedLaborContactDetailForPattern = excludedLaborContactDetails.where(\ w -> w.LaborContactExclusion.Pattern == clausePattern)
    
    
    return excludedLaborContactDetailForPattern
  }
  
  /**
   * Adds a new labor contactor to the line and a new excluded labor contact detail to the Employee Leasing exclusion.
   *
   * @param contactType          the {@link ContactType} for the new Owner/Officer
   * @param laborClientExclusion the Employee Leasing Exclusion.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addExcludedLaborClientDetailForContact(Contact, productmodel.WC7EmployeeLeasingClientEndorsementCond)
   */
    function addNewExcludedLaborClientDetailForContactType(
        aContactType : ContactType,
        laborClientExclusion : Exclusion) : WC7ExcludedLaborContactDetail {
    var newAccountcontact = this.Branch.Policy.Account.addNewAccountContactOfType(aContactType)
    return addExcludedLaborClientDetailForContact(newAccountcontact.Contact, laborClientExclusion)
  }

  /**
   * If a labor contactor with the given contact exists, use it, otherwise adds a new labor client to the line.
   * Also, add a new excluded labor contact detail to the {@link WC7LaborClient} and to the Employee Leasing exclusion.
   * 
   * @param contact              a contact to use for creating the new {@link WC7LaborClient}
   * @param laborClientExclusion the Employee Leasing Exclusion.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   */
  function addExcludedLaborClientDetailForContact(contact : Contact, laborClientExclusion : Exclusion)
      : WC7ExcludedLaborContactDetail {
    if (laborClientExclusion == null){
      throw new DisplayableException("Parent condition cannot be null")
    }
    var policyLaborClient = this.WC7PolicyLaborClients.firstWhere(\ plc -> plc.AccountContactRole.AccountContact.Contact == contact)
    if (policyLaborClient == null) {
      policyLaborClient = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7POLICYLABORCLIENT) as WC7PolicyLaborClient
      this.addToWC7PolicyLaborClients(policyLaborClient)
    }
    return policyLaborClient.addNewExcludedLaborClientDetail(laborClientExclusion)
  }

  //----------------------------------------------------------------- Labor Contractor
  
  property get WC7PolicyLaborContractorDetailExistingCandidates() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor(typekey.PolicyContactRole.TC_WC7POLICYLABORCONTRACTOR)
    return this.Branch.Policy.Account.getAccountContactsWithRole(accountContactRoleType)
  }

  property get WC7PolicyLaborContractorDetailOtherCandidates() : AccountContact[] {
    var plugin = Plugins.get(IContactConfigPlugin)
    var accountContactRoleType = plugin.getAccountContactRoleTypeFor(typekey.PolicyContactRole.TC_WC7POLICYLABORCONTRACTOR)
    return this.Branch.Policy.Account.ActiveAccountContacts
      .where(\ acr -> plugin.canBeRole(acr.ContactType, accountContactRoleType) and not acr.hasRole(accountContactRoleType))
  }
  
  //----------------------------------------------------------------- Included Labor Contractors
  
  /**
   * {@link WC7IncludedLaborContactDetails}s associated with {@link WC7PolicyLaborContractor}
   */
  function getIncludedLaborContractorDetails() : WC7IncludedLaborContactDetail[] {
    return this.WC7PolicyLaborContractors*.WC7Details.whereTypeIs(WC7IncludedLaborContactDetail)
  }
  
  /**
   * Adds a new labor contactor to the line and a new included labor contact detail to the  Employee Leasing condition.
   *
   * @param contactType         the {@link ContactType} for the new Owner/Officer
   * @param laborContractorCond the Employee Leasing Exclusion.  This may not be null
   * @return                    the newly created {@link WC7LaborContactDetail}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addIncludedLaborContractorDetailForContact(Contact, productmodel.WC7LaborContractorEndorsementACond)
   */
  function addNewIncludedLaborContractorDetailForContactType(aContactType : ContactType,
      laborContractorCond : PolicyCondition) : WC7IncludedLaborContactDetail {
    var newAccountcontact = this.Branch.Policy.Account.addNewAccountContactOfType(aContactType)
    return addIncludedLaborContractorDetailForContact(newAccountcontact.Contact, laborContractorCond)
  }

  /**
   * If a labor contactor with the given contact exists, use it, otherwise adds a new labor contactor to the line.
   * Also, add a new included labor contactor detail to the {@link WC7LaborClient} and to the  Employee Leasing condition.
   * 
   * @param contact              a contact to use for creating the new {@link WC7LaborClient}
   * @param laborContractorCond the Employee Leasing Condition.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   */
  function addIncludedLaborContractorDetailForContact(contact : Contact,
      laborContractorCond : PolicyCondition) : WC7IncludedLaborContactDetail {
    if (laborContractorCond == null){
      throw new DisplayableException("Parent condition cannot be null")
    }
    var newPolicyLaborContractor = this.WC7PolicyLaborContractors.firstWhere(\ plc -> plc.AccountContactRole.AccountContact.Contact == contact)
    if (newPolicyLaborContractor == null) {
      newPolicyLaborContractor = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7POLICYLABORCONTRACTOR) as WC7PolicyLaborContractor
      this.addToWC7PolicyLaborContractors(newPolicyLaborContractor)
    }
    return newPolicyLaborContractor.addNewIncludedLaborContractorDetail(laborContractorCond)
  }
  
  //----------------------------------------------------------------- Excluded Labor Contractors
  
  /**
   * {@link WC7ExcludedLaborContactDetails}s associated with {@link WC7PolicyLaborContractor}
   */
  function getExcludedLaborContractorDetails(clausePattern : gw.api.productmodel.ClausePattern) : WC7LaborContactDetail[] {
    var excludedLaborContractorDetails = this.WC7PolicyLaborContractors*.WC7Details.whereTypeIs(WC7ExcludedLaborContactDetail)
    var excludedLaborContractorDetailsForPattern = excludedLaborContractorDetails.where(\ w -> w.LaborContactExclusion.Pattern == clausePattern)
    return excludedLaborContractorDetailsForPattern
  }
  
  /**
   * Adds a new labor contactor to the line and a new excluded labor contact detail to the Labor Contractor exclusion.
   *
   * @param contactType         the {@link ContactType} for the new Owner/Officer
   * @param laborContractorExcl the Employee Leasing Exclusion.  This may not be null
   * @return                    the newly created {@link WC7LaborContactDetail}
   * @see Account#addNewAccountContactOfType(ContactType)
   * @see Account#addExcludedLaborContractorDetailForContact(Contact, productmodel.WC7LaborContractorExclEndorsementExcl)
   */
  function addNewExcludedLaborContractorDetailForContactType(
      aContactType : ContactType,
      laborContractorExcl : Exclusion) : WC7ExcludedLaborContactDetail {
    var newAccountcontact = this.Branch.Policy.Account.addNewAccountContactOfType(aContactType)
    return addExcludedLaborContractorDetailForContact(newAccountcontact.Contact, laborContractorExcl)
  }

  /**
   * If a labor contactor with the given contact exists, use it, otherwise adds a new labor contactor to the line.
   * Also, add a new excluded labor contactor detail to the {@link WC7LaborClient} and to the Labor Contractor exclusion.
   * 
   * @param contact              a contact to use for creating the new {@link WC7LaborClient}
   * @param laborContractorExcl the Labor Contractor Exclusion.  This may not be null
   * @return                     the newly created {@link WC7LaborContactDetail}
   */
  function addExcludedLaborContractorDetailForContact(contact : Contact, laborContractorExcl : Exclusion)
      : WC7ExcludedLaborContactDetail {
    if (laborContractorExcl == null)
      throw new DisplayableException("Parent condition cannot be null")
    var newPolicyLaborContractor = this.WC7PolicyLaborContractors.firstWhere(\ plc -> plc.AccountContactRole.AccountContact.Contact == contact)
    if (newPolicyLaborContractor == null) {
      newPolicyLaborContractor = this.Branch.addNewPolicyContactRoleForContact(contact, typekey.PolicyContactRole.TC_WC7POLICYLABORCONTRACTOR) as WC7PolicyLaborContractor
      this.addToWC7PolicyLaborContractors(newPolicyLaborContractor)
    }
    return newPolicyLaborContractor.addNewExcludedLaborContractorDetail(laborContractorExcl)
  }
  
  //----------------------------------------------------------------- WC7AircraftSeats

  property get HasWC7AircraftSeats(): boolean {
    return this.WC7AircraftSeats.HasElements
  }

  property set HasWC7AircraftSeats(hasAircraftSeat : boolean) {
    // do nothing if same selection
    if (HasWC7AircraftSeats == hasAircraftSeat) {
      return
    }

    if (hasAircraftSeat == false) {
      for (aircraftSeat in this.WC7AircraftSeats) {
        this.removeFromWC7AircraftSeats(aircraftSeat)
      }
    } else {
      this.addToWC7AircraftSeats(new WC7AircraftSeat(this.Branch))
    }
  }
  
  /**
   * Creates and adds a new {@link WC7AircraftSeat}
   */
  function createAndAddWC7AircraftSeat(aircraftSeatCond : WC7AircraftPremiumEndorsementCond) : WC7AircraftSeat {
    var seat = new WC7AircraftSeat(this.Branch)
    seat.setFieldValue("AircraftSeatCondition", aircraftSeatCond)
    this.addToWC7AircraftSeats(seat)
    return seat
  }
  
  //----------------------------------------------------------------- WC7DesignatedWorkplacesExclEndorsementExcl
  
  /**
   * Creates and adds a new Excluded Workplace {@link WC7ExcludedWorkplace} to this policy line.
   * 
   * @param desWorkplaceExcl the parent {@link WC7DesignatedWorkplacesExclEndorsementExcl} exclusion
   * @return the newly created Excluded Workplace
   */
  function createAndAddWC7ExcludedWorkplace(desWorkplaceExcl : WC7DesignatedWorkplacesExclEndorsementExcl): WC7ExcludedWorkplace {
    var excludedWorkplace = new WC7ExcludedWorkplace(this.Branch)
    excludedWorkplace.setFieldValue("DesignatedWorkplacesExcl", desWorkplaceExcl)
    this.addToWC7ExcludedWorkplaces(excludedWorkplace)
    return excludedWorkplace
  }
  
  //----------------------------------------------------------------- WC7MultipleCoordinatedPolicyEndorsement
  
  /**
   * Creates and adds a new {@link WC7CoordinatedPolicy} associated with the given condition
   */
  function createAndAddCoordinatedPolicy(multipleCoordinatedPolicyCond : WC7MultipleCoordinatedPolicyEndorsementCond, polLaborContractor : WC7PolicyLaborContractor) : WC7CoordinatedPolicy {
    var coordinatedPolicy = new WC7CoordinatedPolicy(this.Branch)
    coordinatedPolicy.setFieldValue("MultipleCoordindatedPolicyCond", multipleCoordinatedPolicyCond)
    coordinatedPolicy.LaborContractor = (polLaborContractor.AccountContactRole as LaborContractor)
    this.addToMultipleCoordinatedPolicies(coordinatedPolicy)
    return coordinatedPolicy
  }

  //----------------------------------------------------------------- Generic Schedules
  
  /**
   * <p>Find all generic schedules that include {@link WC7ScheduleJurisdictionPropertyInfo} 
   * elements and return as set of {@link Jurisdiction} values in a data structure.
   * The structure will be a map of the schedule to a set of the jurisdictions.  The jurisdiction set should appear in the order of discovery.</p>
   * <p>This is particularlly useful in answering the questions:</p>
   * <ul>
   *  <li>Do any schedules point to illegal Jurisdictions (not backed by a WC7Jurisdiction)?</li>
   *  <li>Is it safe to delete a policy location?</li>
   * </ul>
   * 
   * e.g. If a period has.
   * <ul>
   *   <li>'WC7AlternateEmployerEndorsementACond' with one item references MO at period start</li>
   *   <li>... at a future date in a policy change, the item was changed to reference FL instead of MO</li>
   *   <li>'WC7RateChangeEndorsementCond' with 5 items that reference GA</li>
   *   <li>'WC7VoluntaryCompensationAndEmployersLiabilityCovCond' with 1 item that references FL, 5 items that reference GA and 4 items that reference MO</li>
   * </ul>
   * 
   * the result would be 
   * <pre>
   * {
   *   WC7AlternateEmployerEndorsementACond -> { MO, FL },
   *   WC7RateChangeEndorsementCond -> { GA },
   *   WC7ForeignVoluntaryCompensationAndEmployersLiaCond ->  { FL, GA, MO }
   * }
   * </pre>
   * @return a map of schedules mapped to a set of jurisdictions found on their respective schedule across all versions.
   */
  function jurisdictionsForSchedules() : Map<Clause & Schedule, LinkedHashSet<typekey.Jurisdiction>> {
    var resultSet = new HashMap<Clause & Schedule, LinkedHashSet<typekey.Jurisdiction>>()
    
    //Load up version lists for every "Policy Exclusion" scheduled item.
    var scheduleExclVersionLists = this.VersionList.WC7LineExclusions.whereTypeIs(WC7LineScheduleExclVersionList)
    var scheduleExclItemsVersionLists = scheduleExclVersionLists.arrays<WC7LineScheduleExclItemVersionList>("WC7LineScheduleExclItems")
    var scheduleExclItemsVersionListMap = scheduleExclItemsVersionLists.allVersions<WC7LineScheduleExclItem>(true /* filterZeroWidth */)
    
    
    //Inspect each item.  Add all jurisdictions
    for (anElt in scheduleExclItemsVersionListMap.entrySet()){
      var itemVersions = anElt.Value
      var firstItemVersion = itemVersions.first()
      var theSchedule = firstItemVersion.Schedule
      var jurisProps = theSchedule.PropertyInfos.whereTypeIs(WC7ScheduleJurisdictionPropertyInfo)
      
      if (jurisProps.HasElements){
        var scheduleCache = resultSet.get(theSchedule)
        if (scheduleCache == null){
          scheduleCache = new LinkedHashSet<Jurisdiction>()
          resultSet.put(theSchedule, scheduleCache)
        }
        for (anItem in itemVersions){
          scheduleCache.addAll(jurisProps*.getJursidictionFromItem(anItem).toSet())
        }
      }
    }
    
    //Load up version lists for every "Policy Condition" scheduled item.
    var scheduleCondVersionLists = this.VersionList.WC7LineConditions.whereTypeIs(WC7LineScheduleCondVersionList)
    var scheduleCondItemsVersionLists = scheduleCondVersionLists.arrays<WC7LineScheduleCondItemVersionList>("WC7LineScheduleCondItems")
    var scheduleCondItemsVersionListMap = scheduleCondItemsVersionLists.allVersions<WC7LineScheduleCondItem>(true /* filterZeroWidth */)
    
    
    //Inspect each item.  Add all jurisdictions
    for (anElt in scheduleCondItemsVersionListMap.entrySet()){
      var itemVersions = anElt.Value
      var firstItemVersion = itemVersions.first()
      var theSchedule = firstItemVersion.Schedule
      var jurisProps = theSchedule.PropertyInfos.whereTypeIs(WC7ScheduleJurisdictionPropertyInfo)
      
      if (jurisProps.HasElements){
        var scheduleCache = resultSet.get(theSchedule)
        if (scheduleCache == null){
          scheduleCache = new LinkedHashSet<Jurisdiction>()
          resultSet.put(theSchedule, scheduleCache)
        }
        for (anItem in itemVersions){
          scheduleCache.addAll(jurisProps*.getJursidictionFromItem(anItem).toSet())
        }
      }
    }
    
    //Load up version lists for every "Coverage" scheduled item.
    var scheduleCovsVersionLists = this.VersionList.WC7LineCoverages.whereTypeIs(WC7LineScheduleCovVersionList)
    var scheduleCovItemsVersionLists = scheduleCovsVersionLists.arrays<WC7LineScheduleCovItemVersionList>("WC7LineScheduleCovItems")
    var scheduleCovItemsVersionListMap = scheduleCovItemsVersionLists.allVersions<WC7LineScheduleCovItem>(true /* filterZeroWidth */)
    
    
    //Inspect each item.  Add all jurisdictions
    for (anElt in scheduleCovItemsVersionListMap.entrySet()){
      var itemVersions = anElt.Value
      var firstItemVersion = itemVersions.first()
      var theSchedule = firstItemVersion.Schedule
      var jurisProps = theSchedule.PropertyInfos.whereTypeIs(WC7ScheduleJurisdictionPropertyInfo)
      
      if (jurisProps.HasElements){
        var scheduleCache = resultSet.get(theSchedule)
        if (scheduleCache == null){
          scheduleCache = new LinkedHashSet<Jurisdiction>()
          resultSet.put(theSchedule, scheduleCache)
        }
        for (anItem in itemVersions){
          scheduleCache.addAll(jurisProps*.getJursidictionFromItem(anItem).toSet())
        }
      }
    }
    return resultSet
  }
}
