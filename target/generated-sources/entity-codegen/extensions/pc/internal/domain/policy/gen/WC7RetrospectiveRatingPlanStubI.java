
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7JurisdictionMultiplier;
import extensions.pc.policy.entity.WC7RetroRatingLetterOfCredit;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7RetrospectiveRatingPlanStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7RetrospectiveRatingPlan, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7RetrospectiveRatingPlan, PolicyPeriod>("entity.WC7RetrospectiveRatingPlan");
    ColumnPropertyInfoCache BASICPREMIUMFACTOR1_PROP = new ColumnPropertyInfoCache(TYPE, "BasicPremiumFactor1");
    ColumnPropertyInfoCache BASICPREMIUMFACTOR2_PROP = new ColumnPropertyInfoCache(TYPE, "BasicPremiumFactor2");
    ColumnPropertyInfoCache BASICPREMIUMFACTOR3_PROP = new ColumnPropertyInfoCache(TYPE, "BasicPremiumFactor3");
    ColumnPropertyInfoCache COMPUTATIONINTERVAL_PROP = new ColumnPropertyInfoCache(TYPE, "ComputationInterval");
    ColumnPropertyInfoCache ESTIMATEDSTANDARDPREMIUM_PROP = new ColumnPropertyInfoCache(TYPE, "EstimatedStandardPremium");
    ColumnPropertyInfoCache FIRSTCOMPUTATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "FirstComputationDate");
    ColumnPropertyInfoCache INCLUDEALAE_PROP = new ColumnPropertyInfoCache(TYPE, "IncludeALAE");
    ColumnPropertyInfoCache LASTCOMPUTATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "LastComputationDate");
    ColumnPropertyInfoCache LOSSCONVERSIONFACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "LossConversionFactor");
    ColumnPropertyInfoCache LOSSLIMITAMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "LossLimitAmount");
    ColumnPropertyInfoCache MAXRETROPREMIUMRATIO_PROP = new ColumnPropertyInfoCache(TYPE, "MaxRetroPremiumRatio");
    ColumnPropertyInfoCache MINRETROPREMIUMRATIO_PROP = new ColumnPropertyInfoCache(TYPE, "MinRetroPremiumRatio");
    ColumnPropertyInfoCache PERCENTSTANDARDPREMIUM1_PROP = new ColumnPropertyInfoCache(TYPE, "PercentStandardPremium1");
    ColumnPropertyInfoCache PERCENTSTANDARDPREMIUM2_PROP = new ColumnPropertyInfoCache(TYPE, "PercentStandardPremium2");
    ColumnPropertyInfoCache PERCENTSTANDARDPREMIUM3_PROP = new ColumnPropertyInfoCache(TYPE, "PercentStandardPremium3");
    LinkPropertyInfoCache WC7WORKERSCOMPLINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompLine");
    ArrayPropertyInfoCache LETTERSOFCREDIT_PROP = new ArrayPropertyInfoCache(TYPE, "LettersOfCredit");
    ArrayPropertyInfoCache JURISDICTIONMULTIPLIERS_PROP = new ArrayPropertyInfoCache(TYPE, "JurisdictionMultipliers");
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
     * Gets the value of the BasicPremiumFactor1 field.
     * The (50%) premium factor
     * 
     */
    BigDecimal getBasicPremiumFactor1();

    /**
     * Sets the value of the BasicPremiumFactor1 field.
     * 
     */
    void setBasicPremiumFactor1(BigDecimal value);

    /**
     * Gets the value of the BasicPremiumFactor2 field.
     * The (100%) premium factor
     * 
     */
    BigDecimal getBasicPremiumFactor2();

    /**
     * Sets the value of the BasicPremiumFactor2 field.
     * 
     */
    void setBasicPremiumFactor2(BigDecimal value);

    /**
     * Gets the value of the BasicPremiumFactor3 field.
     * The (150%) premium factor
     * 
     */
    BigDecimal getBasicPremiumFactor3();

    /**
     * Sets the value of the BasicPremiumFactor3 field.
     * 
     */
    void setBasicPremiumFactor3(BigDecimal value);

    /**
     * Gets the value of the ComputationInterval field.
     * The computation interval
     * 
     */
    Integer getComputationInterval();

    /**
     * Sets the value of the ComputationInterval field.
     * 
     */
    void setComputationInterval(Integer value);

    /**
     * Gets the value of the EstimatedStandardPremium field.
     * The estimated standard premium
     * 
     */
    BigDecimal getEstimatedStandardPremium();

    /**
     * Sets the value of the EstimatedStandardPremium field.
     * 
     */
    void setEstimatedStandardPremium(BigDecimal value);

    /**
     * Gets the value of the FirstComputationDate field.
     * The data of the first computation
     * 
     */
    Date getFirstComputationDate();

    /**
     * Sets the value of the FirstComputationDate field.
     * 
     */
    void setFirstComputationDate(Date value);

    /**
     * Gets the value of the IncludeALAE field.
     * Include ALocated Loss Adjustment
     * 
     */
    Boolean isIncludeALAE();

    /**
     * Sets the value of the IncludeALAE field.
     * 
     */
    void setIncludeALAE(Boolean value);

    /**
     * Gets the value of the LastComputationDate field.
     * The data of the last computation
     * 
     */
    Date getLastComputationDate();

    /**
     * Sets the value of the LastComputationDate field.
     * 
     */
    void setLastComputationDate(Date value);

    /**
     * Gets the value of the LossConversionFactor field.
     * Loss Conversion Factor
     * 
     */
    BigDecimal getLossConversionFactor();

    /**
     * Sets the value of the LossConversionFactor field.
     * 
     */
    void setLossConversionFactor(BigDecimal value);

    /**
     * Gets the value of the LossLimitAmount field.
     * Loss limitation amount
     * 
     */
    BigDecimal getLossLimitAmount();

    /**
     * Sets the value of the LossLimitAmount field.
     * 
     */
    void setLossLimitAmount(BigDecimal value);

    /**
     * Gets the value of the MaxRetroPremiumRatio field.
     * The maximum retro premium ratio
     * 
     */
    BigDecimal getMaxRetroPremiumRatio();

    /**
     * Sets the value of the MaxRetroPremiumRatio field.
     * 
     */
    void setMaxRetroPremiumRatio(BigDecimal value);

    /**
     * Gets the value of the MinRetroPremiumRatio field.
     * The minimum retro premium ratio
     * 
     */
    BigDecimal getMinRetroPremiumRatio();

    /**
     * Sets the value of the MinRetroPremiumRatio field.
     * 
     */
    void setMinRetroPremiumRatio(BigDecimal value);

    /**
     * Gets the value of the PercentStandardPremium1 field.
     * The (50%) standard premium
     * 
     */
    BigDecimal getPercentStandardPremium1();

    /**
     * Sets the value of the PercentStandardPremium1 field.
     * 
     */
    void setPercentStandardPremium1(BigDecimal value);

    /**
     * Gets the value of the PercentStandardPremium2 field.
     * The (100%) standard premium
     * 
     */
    BigDecimal getPercentStandardPremium2();

    /**
     * Sets the value of the PercentStandardPremium2 field.
     * 
     */
    void setPercentStandardPremium2(BigDecimal value);

    /**
     * Gets the value of the PercentStandardPremium3 field.
     * The (150%) standard premium
     * 
     */
    BigDecimal getPercentStandardPremium3();

    /**
     * Sets the value of the PercentStandardPremium3 field.
     * 
     */
    void setPercentStandardPremium3(BigDecimal value);

    /**
     * Gets the value of the WC7WorkersCompLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWC7WorkersCompLine();

    /**
     * Sets the value of the WC7WorkersCompLine field.
     * 
     */
    void setWC7WorkersCompLine(WC7WorkersCompLine value);

    /**
     * Gets the value of the LettersOfCredit field.
     * The list of Letters Of Credit
     * 
     */
    WC7RetroRatingLetterOfCredit[] getLettersOfCredit();

    /**
     * Adds the given element to the LettersOfCredit array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToLettersOfCredit(WC7RetroRatingLetterOfCredit value);

    /**
     * Removes the given element from the LettersOfCredit array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromLettersOfCredit(WC7RetroRatingLetterOfCredit value);

    /**
     * Gets the value of the JurisdictionMultipliers field.
     * The list of Multipliers by Jurisdiction
     * 
     */
    WC7JurisdictionMultiplier[] getJurisdictionMultipliers();

    /**
     * Adds the given element to the JurisdictionMultipliers array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToJurisdictionMultipliers(WC7JurisdictionMultiplier value);

    /**
     * Removes the given element from the JurisdictionMultipliers array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromJurisdictionMultipliers(WC7JurisdictionMultiplier value);

    WC7RetrospectiveRatingPlan getBasedOn();

    WC7RetrospectiveRatingPlan getSlice(Date sliceDate);

    WC7RetrospectiveRatingPlan getUnsliced();

    PolicyPeriod getBranch();

    WC7RetrospectiveRatingPlan split(Date splitDate);

    WC7RetrospectiveRatingPlan clone();

}
