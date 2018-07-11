
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7JurisdictionSplittableARDStub
    extends AbstractKeyableBeanProxy
    implements WC7JurisdictionSplittableARDInternalStubI
{


    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public Boolean isSplittableARD() {
        return ((Boolean) getFieldValue(SPLITTABLEARD_PROP.get()));
    }

    @Override
    public void setSplittableARD(Boolean value) {
        setFieldValue(SPLITTABLEARD_PROP.get(), value);
    }

    @Override
    public Date getEffectiveDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getEffectiveDate();
    }

    @Override
    public void setEffectiveDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setEffectiveDate(value);
    }

    @Override
    public Date getExpirationDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getExpirationDate();
    }

    @Override
    public void setExpirationDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setExpirationDate(value);
    }

    @Override
    public boolean isEffectiveAt(Date p0) {
        return getEntityDelegate(SimpleEffDated.class).isEffectiveAt(p0);
    }

    @Override
    public boolean isEffective(Date p0, Date p1) {
        return getEntityDelegate(SimpleEffDated.class).isEffective(p0, p1);
    }

    @Override
    public boolean isOverlap(SimpleEffDated p0) {
        return getEntityDelegate(SimpleEffDated.class).isOverlap(p0);
    }

}
