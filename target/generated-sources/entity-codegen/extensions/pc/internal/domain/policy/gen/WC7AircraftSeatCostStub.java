
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostImpl;
import extensions.pc.policy.entity.WC7AircraftSeat;
import gw.pl.persistence.core.Key;

public abstract class WC7AircraftSeatCostStub
    extends WC7JurisdictionCostImpl
    implements WC7AircraftSeatCostInternalStubI
{


    @Override
    public WC7AircraftSeat getWC7AircraftSeat() {
        return ((WC7AircraftSeat) getFieldValue(WC7AIRCRAFTSEAT_PROP.get()));
    }

    @Override
    public void setWC7AircraftSeat(WC7AircraftSeat value) {
        setFieldValue(WC7AIRCRAFTSEAT_PROP.get(), value);
    }

    @Override
    public Key getWC7AircraftSeatID() {
        return ((Key) getRawFieldValue(WC7AIRCRAFTSEAT_PROP.get()));
    }

    @Override
    public void setWC7AircraftSeatID(Key value) {
        setFieldValue(WC7AIRCRAFTSEAT_PROP.get(), value);
    }

}
