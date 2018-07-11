
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import java.util.List;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7AircraftSeat;
import extensions.pc.policy.entity.WC7AircraftSeatCost;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.extract.entity.Extractable;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7AircraftSeatStub
    extends EffDatedBeanProxy
    implements WC7AircraftSeatInternalStubI
{


    @Override
    public String getDescription() {
        return ((String) getFieldValueForCodegen(DESCRIPTION_PROP.get()));
    }

    @Override
    public void setDescription(String value) {
        setFieldValueForCodegen(DESCRIPTION_PROP.get(), value);
    }

    @Override
    public String getAircraftNumber() {
        return ((String) getFieldValueForCodegen(AIRCRAFTNUMBER_PROP.get()));
    }

    @Override
    public void setAircraftNumber(String value) {
        setFieldValueForCodegen(AIRCRAFTNUMBER_PROP.get(), value);
    }

    @Override
    public Integer getPassengerSeats() {
        return ((Integer) getFieldValue(PASSENGERSEATS_PROP.get()));
    }

    @Override
    public void setPassengerSeats(Integer value) {
        setFieldValue(PASSENGERSEATS_PROP.get(), value);
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
    public WC7AircraftSeatCost[] getCosts() {
        return ((WC7AircraftSeatCost[]) getFieldValue(COSTS_PROP.get()));
    }

    @Override
    public void addToCosts(WC7AircraftSeatCost value) {
        addArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromCosts(WC7AircraftSeatCost value) {
        removeArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCond getAircraftSeatCondition() {
        return ((WC7WorkersCompCond) getFieldValue(AIRCRAFTSEATCONDITION_PROP.get()));
    }

    @Override
    public void setAircraftSeatCondition(WC7WorkersCompCond value) {
        setFieldValue(AIRCRAFTSEATCONDITION_PROP.get(), value);
    }

    @Override
    public Key getAircraftSeatConditionID() {
        return ((Key) getRawFieldValue(AIRCRAFTSEATCONDITION_PROP.get()));
    }

    @Override
    public void setAircraftSeatConditionID(Key value) {
        setFieldValue(AIRCRAFTSEATCONDITION_PROP.get(), value);
    }

    @Override
    public WC7AircraftSeat getBasedOn() {
        return ((WC7AircraftSeat) getBasedOnUntyped());
    }

    @Override
    public WC7AircraftSeat getSlice(Date sliceDate) {
        return ((WC7AircraftSeat) getSliceUntyped(sliceDate));
    }

    @Override
    public WC7AircraftSeat getUnsliced() {
        return ((WC7AircraftSeat) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public WC7AircraftSeat split(Date splitDate) {
        return ((WC7AircraftSeat) splitUntyped(splitDate));
    }

    @Override
    public WC7AircraftSeat clone() {
        return ((WC7AircraftSeat) cloneUntyped());
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
