
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7AircraftSeat;
import extensions.pc.policy.entity.WC7AircraftSeatCost;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7AircraftSeatCostStubI
    extends WC7JurisdictionCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7AircraftSeatCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7AircraftSeatCost, PolicyPeriod>("entity.WC7AircraftSeatCost");
    LinkPropertyInfoCache WC7AIRCRAFTSEAT_PROP = new LinkPropertyInfoCache(TYPE, "WC7AircraftSeat");

    /**
     * Gets the value of the WC7AircraftSeat field.
     * 
     * 
     */
    WC7AircraftSeat getWC7AircraftSeat();

    /**
     * Sets the value of the WC7AircraftSeat field.
     * 
     */
    void setWC7AircraftSeat(WC7AircraftSeat value);

}
