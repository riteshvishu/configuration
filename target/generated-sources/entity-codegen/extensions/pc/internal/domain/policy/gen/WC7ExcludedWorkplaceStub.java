
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7ExcludedWorkplace;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7ExcludedWorkplaceStub
    extends EffDatedBeanProxy
    implements WC7ExcludedWorkplaceInternalStubI
{


    @Override
    public String getAddressLine1() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE1_PROP.get()));
    }

    @Override
    public void setAddressLine1(String value) {
        setFieldValueForCodegen(ADDRESSLINE1_PROP.get(), value);
    }

    @Override
    public String getAddressLine2() {
        return ((String) getFieldValueForCodegen(ADDRESSLINE2_PROP.get()));
    }

    @Override
    public void setAddressLine2(String value) {
        setFieldValueForCodegen(ADDRESSLINE2_PROP.get(), value);
    }

    @Override
    public String getCity() {
        return ((String) getFieldValueForCodegen(CITY_PROP.get()));
    }

    @Override
    public void setCity(String value) {
        setFieldValueForCodegen(CITY_PROP.get(), value);
    }

    @Override
    public String getExcludedItem() {
        return ((String) getFieldValueForCodegen(EXCLUDEDITEM_PROP.get()));
    }

    @Override
    public void setExcludedItem(String value) {
        setFieldValueForCodegen(EXCLUDEDITEM_PROP.get(), value);
    }

    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWCLine() {
        return ((WC7WorkersCompLine) getFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLine(WC7WorkersCompLine value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public Key getWCLineID() {
        return ((Key) getRawFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLineID(Key value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompExcl getDesignatedWorkplacesExcl() {
        return ((WC7WorkersCompExcl) getFieldValue(DESIGNATEDWORKPLACESEXCL_PROP.get()));
    }

    @Override
    public void setDesignatedWorkplacesExcl(WC7WorkersCompExcl value) {
        setFieldValue(DESIGNATEDWORKPLACESEXCL_PROP.get(), value);
    }

    @Override
    public Key getDesignatedWorkplacesExclID() {
        return ((Key) getRawFieldValue(DESIGNATEDWORKPLACESEXCL_PROP.get()));
    }

    @Override
    public void setDesignatedWorkplacesExclID(Key value) {
        setFieldValue(DESIGNATEDWORKPLACESEXCL_PROP.get(), value);
    }

    @Override
    public WC7ExcludedWorkplace getBasedOn() {
        return ((WC7ExcludedWorkplace) getBasedOnUntyped());
    }

    @Override
    public WC7ExcludedWorkplace getSlice(Date sliceDate) {
        return ((WC7ExcludedWorkplace) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7ExcludedWorkplace getUnsliced() {
        return ((WC7ExcludedWorkplace) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7ExcludedWorkplace split(Date splitDate) {
        return ((WC7ExcludedWorkplace) splitUntyped(splitDate));
    }

    @Override
    public WC7ExcludedWorkplace clone() {
        return ((WC7ExcludedWorkplace) cloneUntyped());
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

    @Override
    public List<EffDated> findMatchesInPeriodUntyped(PolicyPeriod p0, boolean p1) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).findMatchesInPeriodUntyped(p0, p1);
    }

    @Override
    public boolean isLogicalMatchUntyped(KeyableBean p0) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).isLogicalMatchUntyped(p0);
    }

    @Override
    public Object genKey() {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).genKey();
    }

}
