
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7AircraftSeat;
import extensions.pc.policy.entity.WC7AircraftSeatCost;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7AircraftSeatStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7AircraftSeat, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7AircraftSeat, PolicyPeriod>("entity.WC7AircraftSeat");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "Description");
    ColumnPropertyInfoCache AIRCRAFTNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "AircraftNumber");
    ColumnPropertyInfoCache PASSENGERSEATS_PROP = new ColumnPropertyInfoCache(TYPE, "PassengerSeats");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    ArrayPropertyInfoCache COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "Costs");
    LinkPropertyInfoCache AIRCRAFTSEATCONDITION_PROP = new LinkPropertyInfoCache(TYPE, "AircraftSeatCondition");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");
    TypekeyPropertyInfoCache CHANGETYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ChangeType");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache ARCHIVEPARTITION_PROP = new ColumnPropertyInfoCache(TYPE, "ArchivePartition");

    /**
     * Gets the value of the Description field.
     * Description
     * 
     */
    String getDescription();

    /**
     * Sets the value of the Description field.
     * 
     */
    void setDescription(String value);

    /**
     * Gets the value of the AircraftNumber field.
     * Aircraft N-Number
     * 
     */
    String getAircraftNumber();

    /**
     * Sets the value of the AircraftNumber field.
     * 
     */
    void setAircraftNumber(String value);

    /**
     * Gets the value of the PassengerSeats field.
     * Number of rateable passenger seats
     * 
     */
    Integer getPassengerSeats();

    /**
     * Sets the value of the PassengerSeats field.
     * 
     */
    void setPassengerSeats(Integer value);

    /**
     * Gets the value of the Jurisdiction field.
     * 
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the WCLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWCLine();

    /**
     * Sets the value of the WCLine field.
     * 
     */
    void setWCLine(WC7WorkersCompLine value);

    /**
     * Gets the value of the Costs field.
     * 
     * 
     */
    WC7AircraftSeatCost[] getCosts();

    /**
     * Adds the given element to the Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCosts(WC7AircraftSeatCost value);

    /**
     * Removes the given element from the Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCosts(WC7AircraftSeatCost value);

    /**
     * Gets the value of the AircraftSeatCondition field.
     * The parent coverage for maritime covered employees
     * 
     */
    WC7WorkersCompCond getAircraftSeatCondition();

    WC7AircraftSeat getBasedOn();

    WC7AircraftSeat getSlice(Date sliceDate);

    WC7AircraftSeat getUnsliced();

    PolicyPeriod getBranch();

    WC7AircraftSeat split(Date splitDate);

    WC7AircraftSeat clone();

}
