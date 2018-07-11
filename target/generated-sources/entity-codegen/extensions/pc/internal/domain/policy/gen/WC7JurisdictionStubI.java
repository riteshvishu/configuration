
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7JurisdictionCov;
import extensions.pc.policy.entity.WC7Modifier;
import extensions.pc.policy.entity.WC7PremiumDiscount;
import extensions.pc.policy.entity.WC7RatingPeriodStartDate;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.coverage.entity.Coverable;
import gw.pc.policy.entity.Modifiable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7JurisdictionStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, Coverable, Modifiable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7Jurisdiction, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7Jurisdiction, PolicyPeriod>("entity.WC7Jurisdiction");
    ColumnPropertyInfoCache ANNIVERSARYDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "AnniversaryDateInternal");
    ColumnPropertyInfoCache REFERENCEDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "ReferenceDateInternal");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    ArrayPropertyInfoCache COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "Costs");
    ArrayPropertyInfoCache COVERAGES_PROP = new ArrayPropertyInfoCache(TYPE, "Coverages");
    ArrayPropertyInfoCache WC7RATINGPERIODSTARTDATES_PROP = new ArrayPropertyInfoCache(TYPE, "WC7RatingPeriodStartDates");
    ArrayPropertyInfoCache WC7PREMIUMDISCOUNTS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7PremiumDiscounts");
    ArrayPropertyInfoCache WC7MODIFIERS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7Modifiers");
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
    ColumnPropertyInfoCache INITIALCOVERAGESCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialCoveragesCreated");
    ColumnPropertyInfoCache INITIALEXCLUSIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialExclusionsCreated");
    ColumnPropertyInfoCache INITIALCONDITIONSCREATED_PROP = new ColumnPropertyInfoCache(TYPE, "InitialConditionsCreated");
    TypekeyPropertyInfoCache PREFERREDCOVERAGECURRENCY_PROP = new TypekeyPropertyInfoCache(TYPE, "PreferredCoverageCurrency");

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction that is covered
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
    WC7JurisdictionCost[] getCosts();

    /**
     * Adds the given element to the Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCosts(WC7JurisdictionCost value);

    /**
     * Removes the given element from the Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCosts(WC7JurisdictionCost value);

    /**
     * Gets the value of the Coverages field.
     * All Coverages on this Jurisdiction
     * 
     */
    WC7JurisdictionCov[] getCoverages();

    /**
     * Adds the given element to the Coverages array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCoverages(WC7JurisdictionCov value);

    /**
     * Removes the given element from the Coverages array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCoverages(WC7JurisdictionCov value);

    /**
     * Gets the value of the WC7RatingPeriodStartDates field.
     * Sub-periods within which basis amounts of basis-scalable exposures cannot change.
     * 
     */
    WC7RatingPeriodStartDate[] getWC7RatingPeriodStartDates();

    /**
     * Adds the given element to the WC7RatingPeriodStartDates array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7RatingPeriodStartDates(WC7RatingPeriodStartDate value);

    /**
     * Removes the given element from the WC7RatingPeriodStartDates array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7RatingPeriodStartDates(WC7RatingPeriodStartDate value);

    /**
     * Gets the value of the WC7PremiumDiscounts field.
     * Premium discount rate calculated based on last promoted job. 
     * 
     */
    WC7PremiumDiscount[] getWC7PremiumDiscounts();

    /**
     * Adds the given element to the WC7PremiumDiscounts array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7PremiumDiscounts(WC7PremiumDiscount value);

    /**
     * Removes the given element from the WC7PremiumDiscounts array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7PremiumDiscounts(WC7PremiumDiscount value);

    /**
     * Gets the value of the WC7Modifiers field.
     * Rating info for the jurisdiction.
     * 
     */
    WC7Modifier[] getWC7Modifiers();

    /**
     * Adds the given element to the WC7Modifiers array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Modifiers(WC7Modifier value);

    /**
     * Removes the given element from the WC7Modifiers array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Modifiers(WC7Modifier value);

    WC7Jurisdiction getBasedOn();

    WC7Jurisdiction getSlice(Date sliceDate);

    WC7Jurisdiction getUnsliced();

    PolicyPeriod getBranch();

    WC7Jurisdiction split(Date splitDate);

    WC7Jurisdiction clone();

}
