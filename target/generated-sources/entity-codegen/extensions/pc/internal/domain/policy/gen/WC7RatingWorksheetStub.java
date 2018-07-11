
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.rating.worksheet.impl.RatingWorksheetInternal;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7Cost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pc.rating.worksheet.entity.RatingWorksheet;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;

public abstract class WC7RatingWorksheetStub
    extends EffDatedBeanProxy
    implements WC7RatingWorksheetInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7RatingWorksheet getSubtype() {
        return ((extensions.pc.policy.typekey.WC7RatingWorksheet) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7RatingWorksheet value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public WC7Cost getWC7Cost() {
        return ((WC7Cost) getFieldValue(WC7COST_PROP.get()));
    }

    @Override
    public void setWC7Cost(WC7Cost value) {
        setFieldValue(WC7COST_PROP.get(), value);
    }

    @Override
    public Key getWC7CostID() {
        return ((Key) getRawFieldValue(WC7COST_PROP.get()));
    }

    @Override
    public void setWC7CostID(Key value) {
        setFieldValue(WC7COST_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7RatingWorksheet getBasedOn() {
        return ((extensions.pc.policy.entity.WC7RatingWorksheet) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7RatingWorksheet getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7RatingWorksheet) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7RatingWorksheet getUnsliced() {
        return ((extensions.pc.policy.entity.WC7RatingWorksheet) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7RatingWorksheet split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7RatingWorksheet) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7RatingWorksheet clone() {
        return ((extensions.pc.policy.entity.WC7RatingWorksheet) cloneUntyped());
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
    public String getTextData() {
        return ((RatingWorksheetInternal) getEntityDelegate(RatingWorksheet.class)).getTextData();
    }

    @Override
    public void setTextData(String value) {
        ((RatingWorksheetInternal) getEntityDelegate(RatingWorksheet.class)).setTextData(value);
    }

}
