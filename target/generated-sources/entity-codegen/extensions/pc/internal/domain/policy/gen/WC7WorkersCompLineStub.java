
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.coverage.impl.CoverableInternal;
import com.guidewire.pc.domain.policy.lines.impl.PolicyLineImpl;
import com.guidewire.pc.domain.productmodel.ClauseAvailabilityContext;
import com.guidewire.pc.domain.productmodel.CovTermAvailabilityContext;
import com.guidewire.pl.system.expression.SymbolSet;
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
import gw.api.domain.Clause;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.ConditionPattern;
import gw.api.productmodel.CovTermPattern;
import gw.api.productmodel.CoveragePattern;
import gw.api.productmodel.ExclusionPattern;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.pc.coverage.entity.Coverable;
import gw.pc.coverage.entity.Coverage;
import gw.pc.coverage.entity.Exclusion;
import gw.pc.coverage.entity.PolicyCondition;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyLocation;
import gw.pl.currency.typekey.Currency;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;

public abstract class WC7WorkersCompLineStub
    extends PolicyLineImpl
    implements WC7WorkersCompLineInternalStubI
{


    @Override
    public Date getReferenceDateInternal() {
        return ((Date) getFieldValue(REFERENCEDATEINTERNAL_PROP.get()));
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        setFieldValue(REFERENCEDATEINTERNAL_PROP.get(), value);
    }

    @Override
    public WC7ClassCode getWC7GoverningClass() {
        return ((WC7ClassCode) getFieldValue(WC7GOVERNINGCLASS_PROP.get()));
    }

    @Override
    public void setWC7GoverningClass(WC7ClassCode value) {
        setFieldValue(WC7GOVERNINGCLASS_PROP.get(), value);
    }

    @Override
    public Key getWC7GoverningClassID() {
        return ((Key) getRawFieldValue(WC7GOVERNINGCLASS_PROP.get()));
    }

    @Override
    public void setWC7GoverningClassID(Key value) {
        setFieldValue(WC7GOVERNINGCLASS_PROP.get(), value);
    }

    @Override
    public WC7EmployeeLeasingPlan getEmployeeLeasingPlan() {
        return ((WC7EmployeeLeasingPlan) getFieldValue(EMPLOYEELEASINGPLAN_PROP.get()));
    }

    @Override
    public void setEmployeeLeasingPlan(WC7EmployeeLeasingPlan value) {
        setFieldValue(EMPLOYEELEASINGPLAN_PROP.get(), value);
    }

    @Override
    public Key getEmployeeLeasingPlanID() {
        return ((Key) getRawFieldValue(EMPLOYEELEASINGPLAN_PROP.get()));
    }

    @Override
    public void setEmployeeLeasingPlanID(Key value) {
        setFieldValue(EMPLOYEELEASINGPLAN_PROP.get(), value);
    }

    @Override
    public WC7ParticipatingPlan getParticipatingPlan() {
        return ((WC7ParticipatingPlan) getFieldValue(PARTICIPATINGPLAN_PROP.get()));
    }

    @Override
    public void setParticipatingPlan(WC7ParticipatingPlan value) {
        setFieldValue(PARTICIPATINGPLAN_PROP.get(), value);
    }

    @Override
    public Key getParticipatingPlanID() {
        return ((Key) getRawFieldValue(PARTICIPATINGPLAN_PROP.get()));
    }

    @Override
    public void setParticipatingPlanID(Key value) {
        setFieldValue(PARTICIPATINGPLAN_PROP.get(), value);
    }

    @Override
    public WC7Jurisdiction[] getWC7Jurisdictions() {
        return ((WC7Jurisdiction[]) getFieldValue(WC7JURISDICTIONS_PROP.get()));
    }

    @Override
    public void addToWC7Jurisdictions(WC7Jurisdiction value) {
        addArrayElement(WC7JURISDICTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Jurisdictions(WC7Jurisdiction value) {
        removeArrayElement(WC7JURISDICTIONS_PROP.get(), value);
    }

    @Override
    public WC7AircraftSeat[] getWC7AircraftSeats() {
        return ((WC7AircraftSeat[]) getFieldValue(WC7AIRCRAFTSEATS_PROP.get()));
    }

    @Override
    public void addToWC7AircraftSeats(WC7AircraftSeat value) {
        addArrayElement(WC7AIRCRAFTSEATS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7AircraftSeats(WC7AircraftSeat value) {
        removeArrayElement(WC7AIRCRAFTSEATS_PROP.get(), value);
    }

    @Override
    public WC7Cost[] getWC7Costs() {
        return ((WC7Cost[]) getFieldValue(WC7COSTS_PROP.get()));
    }

    @Override
    public void addToWC7Costs(WC7Cost value) {
        addArrayElement(WC7COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Costs(WC7Cost value) {
        removeArrayElement(WC7COSTS_PROP.get(), value);
    }

    @Override
    public WC7CoveredEmployee[] getWC7CoveredEmployees() {
        return ((WC7CoveredEmployee[]) getFieldValue(WC7COVEREDEMPLOYEES_PROP.get()));
    }

    @Override
    public void addToWC7CoveredEmployees(WC7CoveredEmployee value) {
        addArrayElement(WC7COVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7CoveredEmployees(WC7CoveredEmployee value) {
        removeArrayElement(WC7COVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public WC7CoveredEmployeeBase[] getWC7CoveredEmployeeBases() {
        return ((WC7CoveredEmployeeBase[]) getFieldValue(WC7COVEREDEMPLOYEEBASES_PROP.get()));
    }

    @Override
    public void addToWC7CoveredEmployeeBases(WC7CoveredEmployeeBase value) {
        addArrayElement(WC7COVEREDEMPLOYEEBASES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7CoveredEmployeeBases(WC7CoveredEmployeeBase value) {
        removeArrayElement(WC7COVEREDEMPLOYEEBASES_PROP.get(), value);
    }

    @Override
    public WC7PolicyLaborClient[] getWC7PolicyLaborClients() {
        return ((WC7PolicyLaborClient[]) getFieldValue(WC7POLICYLABORCLIENTS_PROP.get()));
    }

    @Override
    public void addToWC7PolicyLaborClients(WC7PolicyLaborClient value) {
        addArrayElement(WC7POLICYLABORCLIENTS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7PolicyLaborClients(WC7PolicyLaborClient value) {
        removeArrayElement(WC7POLICYLABORCLIENTS_PROP.get(), value);
    }

    @Override
    public WC7PolicyLaborContractor[] getWC7PolicyLaborContractors() {
        return ((WC7PolicyLaborContractor[]) getFieldValue(WC7POLICYLABORCONTRACTORS_PROP.get()));
    }

    @Override
    public void addToWC7PolicyLaborContractors(WC7PolicyLaborContractor value) {
        addArrayElement(WC7POLICYLABORCONTRACTORS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7PolicyLaborContractors(WC7PolicyLaborContractor value) {
        removeArrayElement(WC7POLICYLABORCONTRACTORS_PROP.get(), value);
    }

    @Override
    public WC7PolicyOwnerOfficer[] getWC7PolicyOwnerOfficers() {
        return ((WC7PolicyOwnerOfficer[]) getFieldValue(WC7POLICYOWNEROFFICERS_PROP.get()));
    }

    @Override
    public void addToWC7PolicyOwnerOfficers(WC7PolicyOwnerOfficer value) {
        addArrayElement(WC7POLICYOWNEROFFICERS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7PolicyOwnerOfficers(WC7PolicyOwnerOfficer value) {
        removeArrayElement(WC7POLICYOWNEROFFICERS_PROP.get(), value);
    }

    @Override
    public WC7ExcludedWorkplace[] getWC7ExcludedWorkplaces() {
        return ((WC7ExcludedWorkplace[]) getFieldValue(WC7EXCLUDEDWORKPLACES_PROP.get()));
    }

    @Override
    public void addToWC7ExcludedWorkplaces(WC7ExcludedWorkplace value) {
        addArrayElement(WC7EXCLUDEDWORKPLACES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7ExcludedWorkplaces(WC7ExcludedWorkplace value) {
        removeArrayElement(WC7EXCLUDEDWORKPLACES_PROP.get(), value);
    }

    @Override
    public WC7CoordinatedPolicy[] getMultipleCoordinatedPolicies() {
        return ((WC7CoordinatedPolicy[]) getFieldValue(MULTIPLECOORDINATEDPOLICIES_PROP.get()));
    }

    @Override
    public void addToMultipleCoordinatedPolicies(WC7CoordinatedPolicy value) {
        addArrayElement(MULTIPLECOORDINATEDPOLICIES_PROP.get(), value);
    }

    @Override
    public void removeFromMultipleCoordinatedPolicies(WC7CoordinatedPolicy value) {
        removeArrayElement(MULTIPLECOORDINATEDPOLICIES_PROP.get(), value);
    }

    @Override
    public WC7FedCoveredEmployee[] getWC7FedCoveredEmployees() {
        return ((WC7FedCoveredEmployee[]) getFieldValue(WC7FEDCOVEREDEMPLOYEES_PROP.get()));
    }

    @Override
    public void addToWC7FedCoveredEmployees(WC7FedCoveredEmployee value) {
        addArrayElement(WC7FEDCOVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7FedCoveredEmployees(WC7FedCoveredEmployee value) {
        removeArrayElement(WC7FEDCOVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public WC7MaritimeCoveredEmployee[] getWC7MaritimeCoveredEmployees() {
        return ((WC7MaritimeCoveredEmployee[]) getFieldValue(WC7MARITIMECOVEREDEMPLOYEES_PROP.get()));
    }

    @Override
    public void addToWC7MaritimeCoveredEmployees(WC7MaritimeCoveredEmployee value) {
        addArrayElement(WC7MARITIMECOVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7MaritimeCoveredEmployees(WC7MaritimeCoveredEmployee value) {
        removeArrayElement(WC7MARITIMECOVEREDEMPLOYEES_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCov[] getWC7LineCoverages() {
        return ((WC7WorkersCompCov[]) getFieldValue(WC7LINECOVERAGES_PROP.get()));
    }

    @Override
    public void addToWC7LineCoverages(WC7WorkersCompCov value) {
        addArrayElement(WC7LINECOVERAGES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7LineCoverages(WC7WorkersCompCov value) {
        removeArrayElement(WC7LINECOVERAGES_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompExcl[] getWC7LineExclusions() {
        return ((WC7WorkersCompExcl[]) getFieldValue(WC7LINEEXCLUSIONS_PROP.get()));
    }

    @Override
    public void addToWC7LineExclusions(WC7WorkersCompExcl value) {
        addArrayElement(WC7LINEEXCLUSIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7LineExclusions(WC7WorkersCompExcl value) {
        removeArrayElement(WC7LINEEXCLUSIONS_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCond[] getWC7LineConditions() {
        return ((WC7WorkersCompCond[]) getFieldValue(WC7LINECONDITIONS_PROP.get()));
    }

    @Override
    public void addToWC7LineConditions(WC7WorkersCompCond value) {
        addArrayElement(WC7LINECONDITIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7LineConditions(WC7WorkersCompCond value) {
        removeArrayElement(WC7LINECONDITIONS_PROP.get(), value);
    }

    @Override
    public WC7WaiverOfSubro[] getWC7WaiverOfSubros() {
        return ((WC7WaiverOfSubro[]) getFieldValue(WC7WAIVEROFSUBROS_PROP.get()));
    }

    @Override
    public void addToWC7WaiverOfSubros(WC7WaiverOfSubro value) {
        addArrayElement(WC7WAIVEROFSUBROS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7WaiverOfSubros(WC7WaiverOfSubro value) {
        removeArrayElement(WC7WAIVEROFSUBROS_PROP.get(), value);
    }

    @Override
    public WC7ManuscriptOption[] getWC7ManuscriptOptions() {
        return ((WC7ManuscriptOption[]) getFieldValue(WC7MANUSCRIPTOPTIONS_PROP.get()));
    }

    @Override
    public void addToWC7ManuscriptOptions(WC7ManuscriptOption value) {
        addArrayElement(WC7MANUSCRIPTOPTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7ManuscriptOptions(WC7ManuscriptOption value) {
        removeArrayElement(WC7MANUSCRIPTOPTIONS_PROP.get(), value);
    }

    @Override
    public WC7SupplDiseaseExposure[] getWC7SupplDiseaseExposures() {
        return ((WC7SupplDiseaseExposure[]) getFieldValue(WC7SUPPLDISEASEEXPOSURES_PROP.get()));
    }

    @Override
    public void addToWC7SupplDiseaseExposures(WC7SupplDiseaseExposure value) {
        addArrayElement(WC7SUPPLDISEASEEXPOSURES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7SupplDiseaseExposures(WC7SupplDiseaseExposure value) {
        removeArrayElement(WC7SUPPLDISEASEEXPOSURES_PROP.get(), value);
    }

    @Override
    public WC7AtomicEnergyExposure[] getWC7AtomicEnergyExposures() {
        return ((WC7AtomicEnergyExposure[]) getFieldValue(WC7ATOMICENERGYEXPOSURES_PROP.get()));
    }

    @Override
    public void addToWC7AtomicEnergyExposures(WC7AtomicEnergyExposure value) {
        addArrayElement(WC7ATOMICENERGYEXPOSURES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7AtomicEnergyExposures(WC7AtomicEnergyExposure value) {
        removeArrayElement(WC7ATOMICENERGYEXPOSURES_PROP.get(), value);
    }

    @Override
    public WC7RetrospectiveRatingPlan getRetrospectiveRatingPlan() {
        return ((WC7RetrospectiveRatingPlan) getFieldValue(RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setRetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value) {
        setFieldValue(RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public Key getRetrospectiveRatingPlanID() {
        return ((Key) getRawFieldValue(RETROSPECTIVERATINGPLAN_PROP.get()));
    }

    @Override
    public void setRetrospectiveRatingPlanID(Key value) {
        setFieldValue(RETROSPECTIVERATINGPLAN_PROP.get(), value);
    }

    @Override
    public Boolean isInitialCoveragesCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialCoveragesCreated();
    }

    @Override
    public void setInitialCoveragesCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialCoveragesCreated(value);
    }

    @Override
    public Boolean isInitialExclusionsCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialExclusionsCreated();
    }

    @Override
    public void setInitialExclusionsCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialExclusionsCreated(value);
    }

    @Override
    public Boolean isInitialConditionsCreated() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).isInitialConditionsCreated();
    }

    @Override
    public void setInitialConditionsCreated(Boolean value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setInitialConditionsCreated(value);
    }

    @Override
    public Currency getPreferredCoverageCurrency() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getPreferredCoverageCurrency();
    }

    @Override
    public void setPreferredCoverageCurrency(Currency value) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).setPreferredCoverageCurrency(value);
    }

    @Override
    public void setCoverageExists(CoveragePattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setCoverageExists(p0, p1);
    }

    @Override
    public void setExclusionExists(ExclusionPattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setExclusionExists(p0, p1);
    }

    @Override
    public void setConditionExists(ConditionPattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setConditionExists(p0, p1);
    }

    @Override
    public void setCoverageConditionOrExclusionExists(ClausePattern p0, Boolean p1) {
        getEntityDelegate(Coverable.class).setCoverageConditionOrExclusionExists(p0, p1);
    }

    @Override
    public void createCoverages() {
        getEntityDelegate(Coverable.class).createCoverages();
    }

    @Override
    public void createExclusions() {
        getEntityDelegate(Coverable.class).createExclusions();
    }

    @Override
    public void createConditions() {
        getEntityDelegate(Coverable.class).createConditions();
    }

    @Override
    public void createCoveragesConditionsAndExclusions() {
        getEntityDelegate(Coverable.class).createCoveragesConditionsAndExclusions();
    }

    @Override
    public Coverage createCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).createCoverage(p0);
    }

    @Override
    public Exclusion createExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).createExclusion(p0);
    }

    @Override
    public PolicyCondition createCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).createCondition(p0);
    }

    @Override
    public Clause createCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).createCoverageConditionOrExclusion(p0);
    }

    @Override
    public void removeCoverageFromCoverable(Coverage p0) {
        getEntityDelegate(Coverable.class).removeCoverageFromCoverable(p0);
    }

    @Override
    public void removeExclusionFromCoverable(Exclusion p0) {
        getEntityDelegate(Coverable.class).removeExclusionFromCoverable(p0);
    }

    @Override
    public void removeConditionFromCoverable(PolicyCondition p0) {
        getEntityDelegate(Coverable.class).removeConditionFromCoverable(p0);
    }

    @Override
    public void removeCoverageConditionOrExclusionFromCoverable(Clause p0) {
        getEntityDelegate(Coverable.class).removeCoverageConditionOrExclusionFromCoverable(p0);
    }

    @Override
    public Coverage getCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).getCoverage(p0);
    }

    @Override
    public Exclusion getExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).getExclusion(p0);
    }

    @Override
    public PolicyCondition getCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).getCondition(p0);
    }

    @Override
    public Clause getCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).getCoverageConditionOrExclusion(p0);
    }

    @Override
    public Coverage[] getCoveragesFromCoverable() {
        return getEntityDelegate(Coverable.class).getCoveragesFromCoverable();
    }

    @Override
    public Exclusion[] getExclusionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getExclusionsFromCoverable();
    }

    @Override
    public PolicyCondition[] getConditionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getConditionsFromCoverable();
    }

    @Override
    public Clause[] getCoveragesConditionsAndExclusionsFromCoverable() {
        return getEntityDelegate(Coverable.class).getCoveragesConditionsAndExclusionsFromCoverable();
    }

    @Override
    public boolean hasCoverage(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).hasCoverage(p0);
    }

    @Override
    public boolean hasExclusion(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).hasExclusion(p0);
    }

    @Override
    public boolean hasCondition(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).hasCondition(p0);
    }

    @Override
    public boolean hasCoverageConditionOrExclusion(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).hasCoverageConditionOrExclusion(p0);
    }

    @Override
    public Date getCoverableReferenceDate() {
        return getEntityDelegate(Coverable.class).getCoverableReferenceDate();
    }

    @Override
    public void denormalizeCoverableReferenceDate() {
        getEntityDelegate(Coverable.class).denormalizeCoverableReferenceDate();
    }

    @Override
    public void clearCoverableReferenceDateInternal() {
        getEntityDelegate(Coverable.class).clearCoverableReferenceDateInternal();
    }

    @Override
    public PolicyLine getPolicyLine() {
        return getEntityDelegate(Coverable.class).getPolicyLine();
    }

    @Override
    public PolicyLocation[] getPolicyLocations() {
        return getEntityDelegate(Coverable.class).getPolicyLocations();
    }

    @Override
    public Jurisdiction getCoverableState() {
        return getEntityDelegate(Coverable.class).getCoverableState();
    }

    @Override
    public Boolean isCoverageAvailable(CoveragePattern p0) {
        return getEntityDelegate(Coverable.class).isCoverageAvailable(p0);
    }

    @Override
    public Boolean isExclusionAvailable(ExclusionPattern p0) {
        return getEntityDelegate(Coverable.class).isExclusionAvailable(p0);
    }

    @Override
    public Boolean isConditionAvailable(ConditionPattern p0) {
        return getEntityDelegate(Coverable.class).isConditionAvailable(p0);
    }

    @Override
    public Boolean isCoverageConditionOrExclusionAvailable(ClausePattern p0) {
        return getEntityDelegate(Coverable.class).isCoverageConditionOrExclusionAvailable(p0);
    }

    @Override
    public Boolean isCovTermAvailable(CovTermPattern p0) {
        return getEntityDelegate(Coverable.class).isCovTermAvailable(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModel(CoveragePattern[] p0) {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModel(ExclusionPattern[] p0) {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModel(ConditionPattern[] p0) {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesConditionsAndExclusionsAgainstProductModel() {
        return getEntityDelegate(Coverable.class).checkCoveragesConditionsAndExclusionsAgainstProductModel();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCoveragesAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkCoveragesAgainstProductModelwLine(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkConditionsAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkConditionsAgainstProductModelwLine(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkExclusionsAgainstProductModelwLine(PolicyLine p0) {
        return getEntityDelegate(Coverable.class).checkExclusionsAgainstProductModelwLine(p0);
    }

    @Override
    public void initializeCurrency() {
        getEntityDelegate(Coverable.class).initializeCurrency();
    }

    @Override
    public Coverage createCoverage(CoveragePattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCoverage(p0, p1);
    }

    @Override
    public Exclusion createExclusion(ExclusionPattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createExclusion(p0, p1);
    }

    @Override
    public PolicyCondition createCondition(ConditionPattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCondition(p0, p1);
    }

    @Override
    public Clause createCoverageConditionOrExclusion(ClausePattern p0, CovTermAvailabilityContext p1) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).createCoverageConditionOrExclusion(p0, p1);
    }

    @Override
    public void removeCoverage(CoveragePattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCoverage(p0);
    }

    @Override
    public void removeExclusion(ExclusionPattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeExclusion(p0);
    }

    @Override
    public void removeCondition(ConditionPattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCondition(p0);
    }

    @Override
    public void removeCoverageConditionOrExclusion(ClausePattern p0) {
        ((CoverableInternal) getEntityDelegate(Coverable.class)).removeCoverageConditionOrExclusion(p0);
    }

    @Override
    public SymbolSet makeAvailabilitySymbolSet() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).makeAvailabilitySymbolSet();
    }

    @Override
    public SymbolSet makeExistenceSymbolSet() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).makeExistenceSymbolSet();
    }

    @Override
    public ClauseAvailabilityContext getAvailabilityContext(ClausePattern p0) {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getAvailabilityContext(p0);
    }

    @Override
    public CoveragePattern[] getCoverageTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getCoverageTypesForCoverable();
    }

    @Override
    public ExclusionPattern[] getExclusionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getExclusionTypesForCoverable();
    }

    @Override
    public ConditionPattern[] getConditionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getConditionTypesForCoverable();
    }

    @Override
    public ClausePattern[] getCoverageConditionAndExclusionTypesForCoverable() {
        return ((CoverableInternal) getEntityDelegate(Coverable.class)).getCoverageConditionAndExclusionTypesForCoverable();
    }

}
