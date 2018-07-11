
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WCRatingStepExt;
import extensions.pc.policy.typekey.RateConversionType;
import extensions.pc.policy.typekey.RateSubtotalType;
import extensions.pc.policy.typekey.WCRateStepAction;
import gw.pc.financials.typekey.RateAmountType;
import gw.pc.lob.wc.typekey.WCJurisdictionCostType;
import gw.pl.persistence.core.entity.KeyableBean;

public interface WCRatingStepExtStubI
    extends KeyableBean
{

    EntityIntrinsicTypeReference<WCRatingStepExt> TYPE = new EntityIntrinsicTypeReference<WCRatingStepExt>("entity.WCRatingStepExt");
    ColumnPropertyInfoCache RATESTATE_PROP = new ColumnPropertyInfoCache(TYPE, "rateState");
    ColumnPropertyInfoCache EFFDATE_PROP = new ColumnPropertyInfoCache(TYPE, "effDate");
    ColumnPropertyInfoCache EXPDATE_PROP = new ColumnPropertyInfoCache(TYPE, "expDate");
    ColumnPropertyInfoCache CALCORDER_PROP = new ColumnPropertyInfoCache(TYPE, "calcOrder");
    TypekeyPropertyInfoCache STEPACTION_PROP = new TypekeyPropertyInfoCache(TYPE, "stepAction");
    ColumnPropertyInfoCache CUSTOMACTION_PROP = new ColumnPropertyInfoCache(TYPE, "customAction");
    TypekeyPropertyInfoCache SUBTOTAL_PROP = new TypekeyPropertyInfoCache(TYPE, "subtotal");
    ColumnPropertyInfoCache MODIFIERID_PROP = new ColumnPropertyInfoCache(TYPE, "modifierID");
    ColumnPropertyInfoCache FACTORNAME_PROP = new ColumnPropertyInfoCache(TYPE, "factorName");
    TypekeyPropertyInfoCache RATECONVERSIONTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "rateConversionType");
    ColumnPropertyInfoCache CLASSCODE_PROP = new ColumnPropertyInfoCache(TYPE, "classcode");
    TypekeyPropertyInfoCache AGGCOSTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "aggCostType");
    TypekeyPropertyInfoCache AMOUNTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "amountType");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "description");
    ColumnPropertyInfoCache INCLUDEINREPORTS_PROP = new ColumnPropertyInfoCache(TYPE, "includeInReports");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the rateState field.
     * Indicates a row is applicable to a given jurisdiction.  Null indicates a default row which is applicable to all jurisdictions which have no jurisdiction-specific rows for the given effective date. This should be the string value of a typecode in the Jurisdiction typelist. For example, if this is a typecode allowed in the US state of California, the value should be 'CA'. 
     * 
     */
    String getRateState();

    /**
     * Sets the value of the rateState field.
     * 
     */
    void setRateState(String value);

    /**
     * Gets the value of the effDate field.
     * The date on which this factor becomes effective (inclusive).  A null date means this has always been effective.
     * 
     */
    Date getEffDate();

    /**
     * Sets the value of the effDate field.
     * 
     */
    void setEffDate(Date value);

    /**
     * Gets the value of the expDate field.
     * The date on which this factor expires (exclusive).  A null date means this will always be effective.
     * 
     */
    Date getExpDate();

    /**
     * Sets the value of the expDate field.
     * 
     */
    void setExpDate(Date value);

    /**
     * Gets the value of the calcOrder field.
     * Determines the order in which the steps should be executed.
     * 
     */
    Integer getCalcOrder();

    /**
     * Sets the value of the calcOrder field.
     * 
     */
    void setCalcOrder(Integer value);

    /**
     * Gets the value of the stepAction field.
     * Explains what action should be taken for this step.  Some steps reuse generic actions and others require a Custom action.
     * 
     */
    WCRateStepAction getStepAction();

    /**
     * Sets the value of the stepAction field.
     * 
     */
    void setStepAction(WCRateStepAction value);

    /**
     * Gets the value of the customAction field.
     * If stepAction is Custom, then this indicates which custom action to execute.
     * 
     */
    String getCustomAction();

    /**
     * Sets the value of the customAction field.
     * 
     */
    void setCustomAction(String value);

    /**
     * Gets the value of the subtotal field.
     * If step action is Subtotal, then this defines which subtotal to calc and store.  Other step actions also optionally use this to lookup a previously saved subtotal as the basis for the step's calculation.
     * 
     */
    RateSubtotalType getSubtotal();

    /**
     * Sets the value of the subtotal field.
     * 
     */
    void setSubtotal(RateSubtotalType value);

    /**
     * Gets the value of the modifierID field.
     * Should match the modifier pattern's public ID.  If stepAction is Modifier, then this should be non-null to indicate which modifier to look-up for the calculation.
     * 
     */
    String getModifierID();

    /**
     * Sets the value of the modifierID field.
     * 
     */
    void setModifierID(String value);

    /**
     * Gets the value of the factorName field.
     * This field should match the factorName for the correct factor in RateAdjFactor.  Used for taxes and fees.  Also used if the modifier is a boolean type because, if true, the system needs to look up the rate to apply.
     * 
     */
    String getFactorName();

    /**
     * Sets the value of the factorName field.
     * 
     */
    void setFactorName(String value);

    /**
     * Gets the value of the rateConversionType field.
     * If step action looks up a rate and uses it to calculate a new amount, then this field defines how the rate should be interpreted.  (See typelist for a description of options.)
     * 
     */
    RateConversionType getRateConversionType();

    /**
     * Sets the value of the rateConversionType field.
     * 
     */
    void setRateConversionType(RateConversionType value);

    /**
     * Gets the value of the classcode field.
     * Indicates the class code that should be used for the resulting premiums, if any.  Should be non-null unless this row is not expected to result in a new rating line (e.g. just stores a sub-total).
     * 
     */
    String getClasscode();

    /**
     * Sets the value of the classcode field.
     * 
     */
    void setClasscode(String value);

    /**
     * Gets the value of the aggCostType field.
     * Indicates the type of aggregate cost (not specific to a single location/class code exposure unit) to be used for the resulting costs, if any.  Should be non-null unless this row is not expected to result in a new cost (e.g. just stores a sub-total).
     * 
     */
    WCJurisdictionCostType getAggCostType();

    /**
     * Sets the value of the aggCostType field.
     * 
     */
    void setAggCostType(WCJurisdictionCostType value);

    /**
     * Gets the value of the amountType field.
     * Indicates the type (standard vs non-standard premium or taxes/surcharges) of the amount calculated, if any.  Should be non-null unless this row is not expected to result in a new rating line (e.g. just stores a sub-total).
     * 
     */
    RateAmountType getAmountType();

    /**
     * Sets the value of the amountType field.
     * 
     */
    void setAmountType(RateAmountType value);

    /**
     * Gets the value of the description field.
     * If non-null, this description will be used instead of that of the AggRatingLineType for describing the resulting premiums.
     * 
     */
    String getDescription();

    /**
     * Sets the value of the description field.
     * 
     */
    void setDescription(String value);

    /**
     * Gets the value of the includeInReports field.
     * Indicates whether or not this rating step should be performed for premium report jobs
     * 
     */
    Boolean isIncludeInReports();

    /**
     * Sets the value of the includeInReports field.
     * 
     */
    void setIncludeInReports(Boolean value);

}
