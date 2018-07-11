
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionMultiplier;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7JurisdictionMultiplierStubI
    extends EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7JurisdictionMultiplier, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7JurisdictionMultiplier, PolicyPeriod>("entity.WC7JurisdictionMultiplier");
    ColumnPropertyInfoCache FEDERALEXCESSLOSSFACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "FederalExcessLossFactor");
    ColumnPropertyInfoCache FEDERALTAXMULTIPLIER_PROP = new ColumnPropertyInfoCache(TYPE, "FederalTaxMultiplier");
    ColumnPropertyInfoCache JURISDICTIONEXCESSLOSSFACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "JurisdictionExcessLossFactor");
    ColumnPropertyInfoCache JURISDICTIONTAXMULTIPLIER_PROP = new ColumnPropertyInfoCache(TYPE, "JurisdictionTaxMultiplier");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache WC7RETROSPECTIVERATINGPLAN_PROP = new LinkPropertyInfoCache(TYPE, "WC7RetrospectiveRatingPlan");
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
     * Gets the value of the FederalExcessLossFactor field.
     * Federal Excess Loss factor
     * 
     */
    BigDecimal getFederalExcessLossFactor();

    /**
     * Sets the value of the FederalExcessLossFactor field.
     * 
     */
    void setFederalExcessLossFactor(BigDecimal value);

    /**
     * Gets the value of the FederalTaxMultiplier field.
     * The federal tax multiplier
     * 
     */
    BigDecimal getFederalTaxMultiplier();

    /**
     * Sets the value of the FederalTaxMultiplier field.
     * 
     */
    void setFederalTaxMultiplier(BigDecimal value);

    /**
     * Gets the value of the JurisdictionExcessLossFactor field.
     * Jurisdiction Excess Loss factor
     * 
     */
    BigDecimal getJurisdictionExcessLossFactor();

    /**
     * Sets the value of the JurisdictionExcessLossFactor field.
     * 
     */
    void setJurisdictionExcessLossFactor(BigDecimal value);

    /**
     * Gets the value of the JurisdictionTaxMultiplier field.
     * The Jurisdiction tax multiplier
     * 
     */
    BigDecimal getJurisdictionTaxMultiplier();

    /**
     * Sets the value of the JurisdictionTaxMultiplier field.
     * 
     */
    void setJurisdictionTaxMultiplier(BigDecimal value);

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
     * Gets the value of the WC7RetrospectiveRatingPlan field.
     * The retro plan for which this jurisdiction multiplier applies
     * 
     */
    WC7RetrospectiveRatingPlan getWC7RetrospectiveRatingPlan();

    /**
     * Sets the value of the WC7RetrospectiveRatingPlan field.
     * 
     */
    void setWC7RetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value);

    WC7JurisdictionMultiplier getBasedOn();

    WC7JurisdictionMultiplier getSlice(Date sliceDate);

    WC7JurisdictionMultiplier getUnsliced();

    PolicyPeriod getBranch();

    WC7JurisdictionMultiplier split(Date splitDate);

    WC7JurisdictionMultiplier clone();

}
