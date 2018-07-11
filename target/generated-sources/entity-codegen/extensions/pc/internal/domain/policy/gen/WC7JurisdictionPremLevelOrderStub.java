
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.proxy.AbstractKeyableBeanProxy;
import extensions.pc.policy.typekey.WC7PremiumLevelType;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7JurisdictionPremLevelOrderStub
    extends AbstractKeyableBeanProxy
    implements WC7JurisdictionPremLevelOrderInternalStubI
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
    public WC7PremiumLevelType getPremiumLevelType() {
        return ((WC7PremiumLevelType) getFieldValue(PREMIUMLEVELTYPE_PROP.get()));
    }

    @Override
    public void setPremiumLevelType(WC7PremiumLevelType value) {
        setFieldValue(PREMIUMLEVELTYPE_PROP.get(), value);
    }

    @Override
    public Integer getPremiumLevelCalcOrder() {
        return ((Integer) getFieldValue(PREMIUMLEVELCALCORDER_PROP.get()));
    }

    @Override
    public void setPremiumLevelCalcOrder(Integer value) {
        setFieldValue(PREMIUMLEVELCALCORDER_PROP.get(), value);
    }

}
