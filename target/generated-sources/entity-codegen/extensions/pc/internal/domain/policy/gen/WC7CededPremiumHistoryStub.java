
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.reinsurance.impl.RICededPremiumHistoryInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import extensions.pc.policy.entity.WC7CededPremium;
import gw.pc.reinsurance.entity.RICededPremiumHistory;
import gw.pc.reinsurance.typekey.RIRecalcReason;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7CededPremiumHistoryStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7CededPremiumHistoryInternalStubI
{


    @Override
    public WC7CededPremium getWC7CededPremium() {
        return ((WC7CededPremium) getFieldValue(WC7CEDEDPREMIUM_PROP.get()));
    }

    @Override
    public void setWC7CededPremium(WC7CededPremium value) {
        setFieldValue(WC7CEDEDPREMIUM_PROP.get(), value);
    }

    @Override
    public Key getWC7CededPremiumID() {
        return ((Key) getRawFieldValue(WC7CEDEDPREMIUM_PROP.get()));
    }

    @Override
    public void setWC7CededPremiumID(Key value) {
        setFieldValue(WC7CEDEDPREMIUM_PROP.get(), value);
    }

    @Override
    public Date getDateOfRecalculation() {
        return ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).getDateOfRecalculation();
    }

    @Override
    public void setDateOfRecalculation(Date value) {
        ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).setDateOfRecalculation(value);
    }

    @Override
    public String getCommentText() {
        return ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).getCommentText();
    }

    @Override
    public void setCommentText(String value) {
        ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).setCommentText(value);
    }

    @Override
    public RIRecalcReason getReason() {
        return ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).getReason();
    }

    @Override
    public void setReason(RIRecalcReason value) {
        ((RICededPremiumHistoryInternal) getEntityDelegate(RICededPremiumHistory.class)).setReason(value);
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

}
