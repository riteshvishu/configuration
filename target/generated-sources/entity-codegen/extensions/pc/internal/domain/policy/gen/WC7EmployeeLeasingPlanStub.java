
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType;
import extensions.pc.policy.typekey.WC7ProfessionalEmployeeType;
import gw.api.copier.EffDatedCopyable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;

public abstract class WC7EmployeeLeasingPlanStub
    extends EffDatedBeanProxy
    implements WC7EmployeeLeasingPlanInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7EmployeeLeasingPlan getSubtype() {
        return ((extensions.pc.policy.typekey.WC7EmployeeLeasingPlan) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7EmployeeLeasingPlan value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public WC7ProfessionalEmployeeType getProfessionalEmployeeType() {
        return ((WC7ProfessionalEmployeeType) getFieldValue(PROFESSIONALEMPLOYEETYPE_PROP.get()));
    }

    @Override
    public void setProfessionalEmployeeType(WC7ProfessionalEmployeeType value) {
        setFieldValue(PROFESSIONALEMPLOYEETYPE_PROP.get(), value);
    }

    @Override
    public WC7EmployeeLeasingPolicyType getPolicyType() {
        return ((WC7EmployeeLeasingPolicyType) getFieldValue(POLICYTYPE_PROP.get()));
    }

    @Override
    public void setPolicyType(WC7EmployeeLeasingPolicyType value) {
        setFieldValue(POLICYTYPE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWC7WorkersCompLine() {
        return ((WC7WorkersCompLine) getFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLine(WC7WorkersCompLine value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public Key getWC7WorkersCompLineID() {
        return ((Key) getRawFieldValue(WC7WORKERSCOMPLINE_PROP.get()));
    }

    @Override
    public void setWC7WorkersCompLineID(Key value) {
        setFieldValue(WC7WORKERSCOMPLINE_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7EmployeeLeasingPlan getBasedOn() {
        return ((extensions.pc.policy.entity.WC7EmployeeLeasingPlan) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7EmployeeLeasingPlan getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7EmployeeLeasingPlan) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7EmployeeLeasingPlan getUnsliced() {
        return ((extensions.pc.policy.entity.WC7EmployeeLeasingPlan) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7EmployeeLeasingPlan split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7EmployeeLeasingPlan) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7EmployeeLeasingPlan clone() {
        return ((extensions.pc.policy.entity.WC7EmployeeLeasingPlan) cloneUntyped());
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

    @Override
    public void copyFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyFromBeanUntyped(p0);
    }

    @Override
    public void copyBasicFieldsFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyBasicFieldsFromBeanUntyped(p0);
    }

}
