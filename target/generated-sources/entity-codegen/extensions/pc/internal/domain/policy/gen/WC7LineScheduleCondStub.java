
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.lob.common.impl.ScheduleAutoNumberSequenceInternal;
import extensions.pc.internal.domain.policy.impl.WC7WorkersCompCondImpl;
import extensions.pc.policy.entity.WC7LineScheduleCondItem;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.Schedule;
import gw.api.productmodel.SchedulePropertyInfo;
import gw.pc.lob.common.entity.ScheduleAutoNumberSequence;
import gw.pc.productmodel.entity.ScheduledItem;
import gw.pc.sequence.entity.AutoNumberSequence;
import gw.pl.persistence.core.Bundle;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7LineScheduleCondStub
    extends WC7WorkersCompCondImpl
    implements WC7LineScheduleCondInternalStubI
{


    @Override
    public WC7LineScheduleCondItem[] getWC7LineScheduleCondItems() {
        return ((WC7LineScheduleCondItem[]) getFieldValue(WC7LINESCHEDULECONDITEMS_PROP.get()));
    }

    @Override
    public void addToWC7LineScheduleCondItems(WC7LineScheduleCondItem value) {
        addArrayElement(WC7LINESCHEDULECONDITEMS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7LineScheduleCondItems(WC7LineScheduleCondItem value) {
        removeArrayElement(WC7LINESCHEDULECONDITEMS_PROP.get(), value);
    }

    @Override
    public AutoNumberSequence getScheduleAutoNumberSeq() {
        return ((ScheduleAutoNumberSequenceInternal) getEntityDelegate(ScheduleAutoNumberSequence.class)).getScheduleAutoNumberSeq();
    }

    @Override
    public void setScheduleAutoNumberSeq(AutoNumberSequence value) {
        ((ScheduleAutoNumberSequenceInternal) getEntityDelegate(ScheduleAutoNumberSequence.class)).setScheduleAutoNumberSeq(value);
    }

    @Override
    public Key getScheduleAutoNumberSeqID() {
        return ((ScheduleAutoNumberSequenceInternal) getEntityDelegate(ScheduleAutoNumberSequence.class)).getScheduleAutoNumberSeqID();
    }

    @Override
    public void setScheduleAutoNumberSeqID(Key value) {
        ((ScheduleAutoNumberSequenceInternal) getEntityDelegate(ScheduleAutoNumberSequence.class)).setScheduleAutoNumberSeqID(value);
    }

    @Override
    public String getScheduleName() {
        return getInterfaceDelegate(Schedule.class).getScheduleName();
    }

    @Override
    public ScheduledItem[] getScheduledItems() {
        return getInterfaceDelegate(Schedule.class).getScheduledItems();
    }

    @Override
    public SchedulePropertyInfo[] getPropertyInfos() {
        return getInterfaceDelegate(Schedule.class).getPropertyInfos();
    }

    @Override
    public SchedulePropertyInfo getMostDescriptivePropertyInfo() {
        return getInterfaceDelegate(Schedule.class).getMostDescriptivePropertyInfo();
    }

    @Override
    public ScheduledItem createAndAddScheduledItem() {
        return getInterfaceDelegate(Schedule.class).createAndAddScheduledItem();
    }

    @Override
    public void removeScheduledItem(ScheduledItem p0) {
        getInterfaceDelegate(Schedule.class).removeScheduledItem(p0);
    }

    @Override
    public ClausePattern getScheduledItemPattern() {
        return getInterfaceDelegate(Schedule.class).getScheduledItemPattern();
    }

    @Override
    public void renumberAutoNumberSequence() {
        getInterfaceDelegate(Schedule.class).renumberAutoNumberSequence();
    }

    @Override
    public void renumberNewScheduledItems() {
        getInterfaceDelegate(Schedule.class).renumberNewScheduledItems();
    }

    @Override
    public void cloneAutoNumberSequence() {
        getInterfaceDelegate(Schedule.class).cloneAutoNumberSequence();
    }

    @Override
    public void resetAutoNumberSequence() {
        getInterfaceDelegate(Schedule.class).resetAutoNumberSequence();
    }

    @Override
    public void bindAutoNumberSequence() {
        getInterfaceDelegate(Schedule.class).bindAutoNumberSequence();
    }

    @Override
    public void initializeAutoNumberSequence(Bundle p0) {
        getInterfaceDelegate(Schedule.class).initializeAutoNumberSequence(p0);
    }

    @Override
    public void createAutoNumber(KeyableBean p0) {
        getInterfaceDelegate(Schedule.class).createAutoNumber(p0);
    }

    @Override
    public String getScheduledItemDescription(ScheduledItem p0) {
        return getInterfaceDelegate(Schedule.class).getScheduledItemDescription(p0);
    }

}
