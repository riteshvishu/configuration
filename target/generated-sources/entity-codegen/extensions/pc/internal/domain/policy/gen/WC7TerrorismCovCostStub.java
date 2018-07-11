
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CovCostImpl;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7TerrorismCovCostStub
    extends WC7CovCostImpl
    implements WC7TerrorismCovCostInternalStubI
{


    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

}
