
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7AircraftSeat;
import extensions.pc.policy.entity.WC7AtomicEnergyExposure;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7CoordinatedPolicy;
import extensions.pc.policy.entity.WC7Cost;
import extensions.pc.policy.entity.WC7CoveredEmployee;
import extensions.pc.policy.entity.WC7CoveredEmployeeBase;
import extensions.pc.policy.entity.WC7EmployeeLeasingPlan;
import extensions.pc.policy.entity.WC7ExcludedWorkplace;
import extensions.pc.policy.entity.WC7FedCoveredEmployee;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7ManuscriptOption;
import extensions.pc.policy.entity.WC7MaritimeCoveredEmployee;
import extensions.pc.policy.entity.WC7ParticipatingPlan;
import extensions.pc.policy.entity.WC7PolicyLaborClient;
import extensions.pc.policy.entity.WC7PolicyLaborContractor;
import extensions.pc.policy.entity.WC7PolicyOwnerOfficer;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import extensions.pc.policy.entity.WC7SupplDiseaseExposure;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.pc.coverage.entity.Coverable;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7WorkersCompLineStubI
    extends Coverable, PolicyLine
{

    EffDatedEntityIntrinsicTypeReference<WC7WorkersCompLine, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7WorkersCompLine, PolicyPeriod>("entity.WC7WorkersCompLine");
    ColumnPropertyInfoCache REFERENCEDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "ReferenceDateInternal");
    LinkPropertyInfoCache WC7GOVERNINGCLASS_PROP = new LinkPropertyInfoCache(TYPE, "WC7GoverningClass");
    LinkPropertyInfoCache EMPLOYEELEASINGPLAN_PROP = new LinkPropertyInfoCache(TYPE, "EmployeeLeasingPlan");
    LinkPropertyInfoCache PARTICIPATINGPLAN_PROP = new LinkPropertyInfoCache(TYPE, "ParticipatingPlan");
    ArrayPropertyInfoCache WC7JURISDICTIONS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Jurisdictions");
    ArrayPropertyInfoCache WC7AIRCRAFTSEATS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7AircraftSeats");
    ArrayPropertyInfoCache WC7COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Costs");
    ArrayPropertyInfoCache WC7COVEREDEMPLOYEES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7CoveredEmployees");
    ArrayPropertyInfoCache WC7COVEREDEMPLOYEEBASES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7CoveredEmployeeBases");
    ArrayPropertyInfoCache WC7POLICYLABORCLIENTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7PolicyLaborClients");
    ArrayPropertyInfoCache WC7POLICYLABORCONTRACTORS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7PolicyLaborContractors");
    ArrayPropertyInfoCache WC7POLICYOWNEROFFICERS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7PolicyOwnerOfficers");
    ArrayPropertyInfoCache WC7EXCLUDEDWORKPLACES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7ExcludedWorkplaces");
    ArrayPropertyInfoCache MULTIPLECOORDINATEDPOLICIES_PROP = new ArrayPropertyInfoCache(TYPE, "MultipleCoordinatedPolicies");
    ArrayPropertyInfoCache WC7FEDCOVEREDEMPLOYEES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7FedCoveredEmployees");
    ArrayPropertyInfoCache WC7MARITIMECOVEREDEMPLOYEES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7MaritimeCoveredEmployees");
    ArrayPropertyInfoCache WC7LINECOVERAGES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineCoverages");
    ArrayPropertyInfoCache WC7LINEEXCLUSIONS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineExclusions");
    ArrayPropertyInfoCache WC7LINECONDITIONS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7LineConditions");
    ArrayPropertyInfoCache WC7WAIVEROFSUBROS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7WaiverOfSubros");
    ArrayPropertyInfoCache WC7MANUSCRIPTOPTIONS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7ManuscriptOptions");
    ArrayPropertyInfoCache WC7SUPPLDISEASEEXPOSURES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7SupplDiseaseExposures");
    ArrayPropertyInfoCache WC7ATOMICENERGYEXPOSURES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7AtomicEnergyExposures");
    LinkPropertyInfoCache RETROSPECTIVERATINGPLAN_PROP = new LinkPropertyInfoCache(TYPE, "RetrospectiveRatingPlan");
    ColumnPropertyInfoCache INITIALCOVERAGESCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialCoveragesCreated");
    ColumnPropertyInfoCache INITIALEXCLUSIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialExclusionsCreated");
    ColumnPropertyInfoCache INITIALCONDITIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialConditionsCreated");
    TypekeyPropertyInfoCache PREFERREDCOVERAGECURRENCY_PROP = new TypekeyPropertyInfoCache(TYPE, "PreferredCoverageCurrency");

    /**
     * Gets the value of the ReferenceDateInternal field.
     * Internal field for storing the reference date of this entity on bound policy periods.
     * 
     */
    Date getReferenceDateInternal();

    /**
     * Sets the value of the ReferenceDateInternal field.
     * 
     */
    void setReferenceDateInternal(Date value);

    /**
     * Gets the value of the WC7GoverningClass field.
     * Governing Class Code of policy line.
     * 
     */
    WC7ClassCode getWC7GoverningClass();

    /**
     * Sets the value of the WC7GoverningClass field.
     * 
     */
    void setWC7GoverningClass(WC7ClassCode value);

    /**
     * Gets the value of the EmployeeLeasingPlan field.
     * 
     * 
     */
    WC7EmployeeLeasingPlan getEmployeeLeasingPlan();

    /**
     * Sets the value of the EmployeeLeasingPlan field.
     * 
     */
    void setEmployeeLeasingPlan(WC7EmployeeLeasingPlan value);

    /**
     * Gets the value of the ParticipatingPlan field.
     * 
     * 
     */
    WC7ParticipatingPlan getParticipatingPlan();

    /**
     * Sets the value of the ParticipatingPlan field.
     * 
     */
    void setParticipatingPlan(WC7ParticipatingPlan value);

    /**
     * Gets the value of the WC7Jurisdictions field.
     * 
     * 
     */
    WC7Jurisdiction[] getWC7Jurisdictions();

    /**
     * Adds the given element to the WC7Jurisdictions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Jurisdictions(WC7Jurisdiction value);

    /**
     * Removes the given element from the WC7Jurisdictions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Jurisdictions(WC7Jurisdiction value);

    /**
     * Gets the value of the WC7AircraftSeats field.
     * 
     * 
     */
    WC7AircraftSeat[] getWC7AircraftSeats();

    /**
     * Adds the given element to the WC7AircraftSeats array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7AircraftSeats(WC7AircraftSeat value);

    /**
     * Removes the given element from the WC7AircraftSeats array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7AircraftSeats(WC7AircraftSeat value);

    /**
     * Gets the value of the WC7Costs field.
     * 
     * 
     */
    WC7Cost[] getWC7Costs();

    /**
     * Adds the given element to the WC7Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Costs(WC7Cost value);

    /**
     * Removes the given element from the WC7Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Costs(WC7Cost value);

    /**
     * Gets the value of the WC7CoveredEmployees field.
     * 
     * 
     */
    WC7CoveredEmployee[] getWC7CoveredEmployees();

    /**
     * Adds the given element to the WC7CoveredEmployees array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7CoveredEmployees(WC7CoveredEmployee value);

    /**
     * Removes the given element from the WC7CoveredEmployees array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7CoveredEmployees(WC7CoveredEmployee value);

    /**
     * Gets the value of the WC7CoveredEmployeeBases field.
     * 
     * 
     */
    WC7CoveredEmployeeBase[] getWC7CoveredEmployeeBases();

    /**
     * Adds the given element to the WC7CoveredEmployeeBases array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7CoveredEmployeeBases(WC7CoveredEmployeeBase value);

    /**
     * Removes the given element from the WC7CoveredEmployeeBases array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7CoveredEmployeeBases(WC7CoveredEmployeeBase value);

    /**
     * Gets the value of the WC7PolicyLaborClients field.
     * Employees that are leased by a company/person from another.
     * 
     */
    WC7PolicyLaborClient[] getWC7PolicyLaborClients();

    /**
     * Adds the given element to the WC7PolicyLaborClients array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7PolicyLaborClients(WC7PolicyLaborClient value);

    /**
     * Removes the given element from the WC7PolicyLaborClients array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7PolicyLaborClients(WC7PolicyLaborClient value);

    /**
     * Gets the value of the WC7PolicyLaborContractors field.
     * Employees that are contracted by a company/person to another.
     * 
     */
    WC7PolicyLaborContractor[] getWC7PolicyLaborContractors();

    /**
     * Adds the given element to the WC7PolicyLaborContractors array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7PolicyLaborContractors(WC7PolicyLaborContractor value);

    /**
     * Removes the given element from the WC7PolicyLaborContractors array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7PolicyLaborContractors(WC7PolicyLaborContractor value);

    /**
     * Gets the value of the WC7PolicyOwnerOfficers field.
     * Owner/officers on this line.
     * 
     */
    WC7PolicyOwnerOfficer[] getWC7PolicyOwnerOfficers();

    /**
     * Adds the given element to the WC7PolicyOwnerOfficers array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7PolicyOwnerOfficers(WC7PolicyOwnerOfficer value);

    /**
     * Removes the given element from the WC7PolicyOwnerOfficers array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7PolicyOwnerOfficers(WC7PolicyOwnerOfficer value);

    /**
     * Gets the value of the WC7ExcludedWorkplaces field.
     * 
     * 
     */
    WC7ExcludedWorkplace[] getWC7ExcludedWorkplaces();

    /**
     * Adds the given element to the WC7ExcludedWorkplaces array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7ExcludedWorkplaces(WC7ExcludedWorkplace value);

    /**
     * Removes the given element from the WC7ExcludedWorkplaces array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7ExcludedWorkplaces(WC7ExcludedWorkplace value);

    /**
     * Gets the value of the MultipleCoordinatedPolicies field.
     * 
     * 
     */
    WC7CoordinatedPolicy[] getMultipleCoordinatedPolicies();

    /**
     * Adds the given element to the MultipleCoordinatedPolicies array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToMultipleCoordinatedPolicies(WC7CoordinatedPolicy value);

    /**
     * Removes the given element from the MultipleCoordinatedPolicies array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromMultipleCoordinatedPolicies(WC7CoordinatedPolicy value);

    /**
     * Gets the value of the WC7FedCoveredEmployees field.
     * 
     * 
     */
    WC7FedCoveredEmployee[] getWC7FedCoveredEmployees();

    /**
     * Adds the given element to the WC7FedCoveredEmployees array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7FedCoveredEmployees(WC7FedCoveredEmployee value);

    /**
     * Removes the given element from the WC7FedCoveredEmployees array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7FedCoveredEmployees(WC7FedCoveredEmployee value);

    /**
     * Gets the value of the WC7MaritimeCoveredEmployees field.
     * 
     * 
     */
    WC7MaritimeCoveredEmployee[] getWC7MaritimeCoveredEmployees();

    /**
     * Adds the given element to the WC7MaritimeCoveredEmployees array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7MaritimeCoveredEmployees(WC7MaritimeCoveredEmployee value);

    /**
     * Removes the given element from the WC7MaritimeCoveredEmployees array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7MaritimeCoveredEmployees(WC7MaritimeCoveredEmployee value);

    /**
     * Gets the value of the WC7LineCoverages field.
     * Line-level coverages for Workers' Comp.
     * 
     */
    WC7WorkersCompCov[] getWC7LineCoverages();

    /**
     * Adds the given element to the WC7LineCoverages array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineCoverages(WC7WorkersCompCov value);

    /**
     * Removes the given element from the WC7LineCoverages array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineCoverages(WC7WorkersCompCov value);

    /**
     * Gets the value of the WC7LineExclusions field.
     * Line-level exclusions for Workers' Comp.
     * 
     */
    WC7WorkersCompExcl[] getWC7LineExclusions();

    /**
     * Adds the given element to the WC7LineExclusions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineExclusions(WC7WorkersCompExcl value);

    /**
     * Removes the given element from the WC7LineExclusions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineExclusions(WC7WorkersCompExcl value);

    /**
     * Gets the value of the WC7LineConditions field.
     * Line-level conditions for Workers' Comp.
     * 
     */
    WC7WorkersCompCond[] getWC7LineConditions();

    /**
     * Adds the given element to the WC7LineConditions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7LineConditions(WC7WorkersCompCond value);

    /**
     * Removes the given element from the WC7LineConditions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7LineConditions(WC7WorkersCompCond value);

    /**
     * Gets the value of the WC7WaiverOfSubros field.
     * 
     * 
     */
    WC7WaiverOfSubro[] getWC7WaiverOfSubros();

    /**
     * Adds the given element to the WC7WaiverOfSubros array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7WaiverOfSubros(WC7WaiverOfSubro value);

    /**
     * Removes the given element from the WC7WaiverOfSubros array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7WaiverOfSubros(WC7WaiverOfSubro value);

    /**
     * Gets the value of the WC7ManuscriptOptions field.
     * 
     * 
     */
    WC7ManuscriptOption[] getWC7ManuscriptOptions();

    /**
     * Adds the given element to the WC7ManuscriptOptions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7ManuscriptOptions(WC7ManuscriptOption value);

    /**
     * Removes the given element from the WC7ManuscriptOptions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7ManuscriptOptions(WC7ManuscriptOption value);

    /**
     * Gets the value of the WC7SupplDiseaseExposures field.
     * 
     * 
     */
    WC7SupplDiseaseExposure[] getWC7SupplDiseaseExposures();

    /**
     * Adds the given element to the WC7SupplDiseaseExposures array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7SupplDiseaseExposures(WC7SupplDiseaseExposure value);

    /**
     * Removes the given element from the WC7SupplDiseaseExposures array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7SupplDiseaseExposures(WC7SupplDiseaseExposure value);

    /**
     * Gets the value of the WC7AtomicEnergyExposures field.
     * 
     * 
     */
    WC7AtomicEnergyExposure[] getWC7AtomicEnergyExposures();

    /**
     * Adds the given element to the WC7AtomicEnergyExposures array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7AtomicEnergyExposures(WC7AtomicEnergyExposure value);

    /**
     * Removes the given element from the WC7AtomicEnergyExposures array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7AtomicEnergyExposures(WC7AtomicEnergyExposure value);

    /**
     * Gets the value of the RetrospectiveRatingPlan field.
     * 
     * 
     */
    WC7RetrospectiveRatingPlan getRetrospectiveRatingPlan();

    /**
     * Sets the value of the RetrospectiveRatingPlan field.
     * 
     */
    void setRetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value);

}
