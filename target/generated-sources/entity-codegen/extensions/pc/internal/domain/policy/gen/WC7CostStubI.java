
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.MonetaryAmountPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7RatingWorksheet;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7PremiumLevelType;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7CostStubI
    extends SubtypeBean, Cost, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7Cost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7Cost, PolicyPeriod>("entity.WC7Cost");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache CALCORDER_PROP = new ColumnPropertyInfoCache(TYPE, "CalcOrder");
    ColumnPropertyInfoCache DISPLAYORDER_PROP = new ColumnPropertyInfoCache(TYPE, "DisplayOrder");
    ColumnPropertyInfoCache STATCODE_PROP = new ColumnPropertyInfoCache(TYPE, "StatCode");
    TypekeyPropertyInfoCache PREMIUMLEVELTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "PremiumLevelType");
    LinkPropertyInfoCache WC7WORKERSCOMPLINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompLine");
    ArrayPropertyInfoCache TRANSACTIONS_PROP = new ArrayPropertyInfoCache(TYPE, "Transactions");
    LinkPropertyInfoCache WC7RATINGWORKSHEET_PROP = new LinkPropertyInfoCache(TYPE, "WC7RatingWorksheet");
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
    MonetaryAmountPropertyInfoCache ACTUALAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "ActualAmount");
    ColumnPropertyInfoCache ACTUALAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "ActualAmount_amt");
    TypekeyPropertyInfoCache ACTUALAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "ActualAmount_cur");
    MonetaryAmountPropertyInfoCache ACTUALAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "ActualAmountBilling");
    ColumnPropertyInfoCache ACTUALAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "ActualAmountBilling_amt");
    TypekeyPropertyInfoCache ACTUALAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "ActualAmountBilling_cur");
    MonetaryAmountPropertyInfoCache STANDARDAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "StandardAmount");
    ColumnPropertyInfoCache STANDARDAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "StandardAmount_amt");
    TypekeyPropertyInfoCache STANDARDAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "StandardAmount_cur");
    MonetaryAmountPropertyInfoCache STANDARDAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "StandardAmountBilling");
    ColumnPropertyInfoCache STANDARDAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "StandardAmountBilling_amt");
    TypekeyPropertyInfoCache STANDARDAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "StandardAmountBilling_cur");
    MonetaryAmountPropertyInfoCache OVERRIDEAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "OverrideAmount");
    ColumnPropertyInfoCache OVERRIDEAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideAmount_amt");
    TypekeyPropertyInfoCache OVERRIDEAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "OverrideAmount_cur");
    MonetaryAmountPropertyInfoCache OVERRIDEAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "OverrideAmountBilling");
    ColumnPropertyInfoCache OVERRIDEAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideAmountBilling_amt");
    TypekeyPropertyInfoCache OVERRIDEAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "OverrideAmountBilling_cur");
    MonetaryAmountPropertyInfoCache ACTUALTERMAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "ActualTermAmount");
    ColumnPropertyInfoCache ACTUALTERMAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "ActualTermAmount_amt");
    TypekeyPropertyInfoCache ACTUALTERMAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "ActualTermAmount_cur");
    MonetaryAmountPropertyInfoCache ACTUALTERMAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "ActualTermAmountBilling");
    ColumnPropertyInfoCache ACTUALTERMAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "ActualTermAmountBilling_amt");
    TypekeyPropertyInfoCache ACTUALTERMAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "ActualTermAmountBilling_cur");
    MonetaryAmountPropertyInfoCache STANDARDTERMAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "StandardTermAmount");
    ColumnPropertyInfoCache STANDARDTERMAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "StandardTermAmount_amt");
    TypekeyPropertyInfoCache STANDARDTERMAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "StandardTermAmount_cur");
    MonetaryAmountPropertyInfoCache STANDARDTERMAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "StandardTermAmountBilling");
    ColumnPropertyInfoCache STANDARDTERMAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "StandardTermAmountBilling_amt");
    TypekeyPropertyInfoCache STANDARDTERMAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "StandardTermAmountBilling_cur");
    MonetaryAmountPropertyInfoCache OVERRIDETERMAMOUNT_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "OverrideTermAmount");
    ColumnPropertyInfoCache OVERRIDETERMAMOUNT_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideTermAmount_amt");
    TypekeyPropertyInfoCache OVERRIDETERMAMOUNT_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "OverrideTermAmount_cur");
    MonetaryAmountPropertyInfoCache OVERRIDETERMAMOUNTBILLING_PROP = new MonetaryAmountPropertyInfoCache(TYPE, "OverrideTermAmountBilling");
    ColumnPropertyInfoCache OVERRIDETERMAMOUNTBILLING_AMT_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideTermAmountBilling_amt");
    TypekeyPropertyInfoCache OVERRIDETERMAMOUNTBILLING_CUR_PROP = new TypekeyPropertyInfoCache(TYPE, "OverrideTermAmountBilling_cur");
    ColumnPropertyInfoCache BASIS_PROP = new ColumnPropertyInfoCache(TYPE, "Basis");
    ColumnPropertyInfoCache ACTUALADJRATE_PROP = new ColumnPropertyInfoCache(TYPE, "ActualAdjRate");
    ColumnPropertyInfoCache STANDARDADJRATE_PROP = new ColumnPropertyInfoCache(TYPE, "StandardAdjRate");
    ColumnPropertyInfoCache OVERRIDEADJRATE_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideAdjRate");
    ColumnPropertyInfoCache ACTUALBASERATE_PROP = new ColumnPropertyInfoCache(TYPE, "ActualBaseRate");
    ColumnPropertyInfoCache STANDARDBASERATE_PROP = new ColumnPropertyInfoCache(TYPE, "StandardBaseRate");
    ColumnPropertyInfoCache OVERRIDEBASERATE_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideBaseRate");
    ColumnPropertyInfoCache OVERRIDEREASON_PROP = new ColumnPropertyInfoCache(TYPE, "OverrideReason");
    ColumnPropertyInfoCache NUMDAYSINRATEDTERM_PROP = new ColumnPropertyInfoCache(TYPE, "NumDaysInRatedTerm");
    ColumnPropertyInfoCache OVERRIDABLE_PROP = new ColumnPropertyInfoCache(TYPE, "Overridable");
    ColumnPropertyInfoCache SUBJECTTOREPORTING_PROP = new ColumnPropertyInfoCache(TYPE, "SubjectToReporting");
    ColumnPropertyInfoCache CHARGEGROUP_PROP = new ColumnPropertyInfoCache(TYPE, "ChargeGroup");
    ColumnPropertyInfoCache FXRATECONVERSIONUSED_PROP = new ColumnPropertyInfoCache(TYPE, "FXRateConversionUsed");
    TypekeyPropertyInfoCache RATEAMOUNTTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "RateAmountType");
    TypekeyPropertyInfoCache CHARGEPATTERN_PROP = new TypekeyPropertyInfoCache(TYPE, "ChargePattern");
    ColumnPropertyInfoCache ROUNDINGLEVEL_PROP = new ColumnPropertyInfoCache(TYPE, "RoundingLevel");
    TypekeyPropertyInfoCache ROUNDINGMODE_PROP = new TypekeyPropertyInfoCache(TYPE, "RoundingMode");
    TypekeyPropertyInfoCache PRORATIONMETHOD_PROP = new TypekeyPropertyInfoCache(TYPE, "ProrationMethod");
    LinkPropertyInfoCache RATEBOOK_PROP = new LinkPropertyInfoCache(TYPE, "RateBook");
    TypekeyPropertyInfoCache OVERRIDESOURCE_PROP = new TypekeyPropertyInfoCache(TYPE, "OverrideSource");
    LinkPropertyInfoCache POLICYFXRATE_PROP = new LinkPropertyInfoCache(TYPE, "PolicyFXRate");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7Cost getSubtype();

    /**
     * Gets the value of the CalcOrder field.
     * The order in which this cost was rated.
     * 
     */
    Integer getCalcOrder();

    /**
     * Sets the value of the CalcOrder field.
     * 
     */
    void setCalcOrder(Integer value);

    /**
     * Gets the value of the DisplayOrder field.
     * The order in which this cost is displayed.
     * 
     */
    Integer getDisplayOrder();

    /**
     * Sets the value of the DisplayOrder field.
     * 
     */
    void setDisplayOrder(Integer value);

    /**
     * Gets the value of the StatCode field.
     * The statistic code for classifying premiums and surcharges that are not attributable to a specific employment class code, such as experience modification, premium for increased employer liability limits, expense constant, taxes, etc.
     * 
     */
    String getStatCode();

    /**
     * Sets the value of the StatCode field.
     * 
     */
    void setStatCode(String value);

    /**
     * Gets the value of the PremiumLevelType field.
     * 
     * 
     */
    WC7PremiumLevelType getPremiumLevelType();

    /**
     * Sets the value of the PremiumLevelType field.
     * 
     */
    void setPremiumLevelType(WC7PremiumLevelType value);

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
     * Gets the value of the WC7RatingWorksheet field.
     * The associated rating worksheet
     * 
     */
    WC7RatingWorksheet getWC7RatingWorksheet();

    /**
     * Sets the value of the WC7RatingWorksheet field.
     * 
     */
    void setWC7RatingWorksheet(WC7RatingWorksheet value);

    extensions.pc.policy.entity.WC7Cost getBasedOn();

    extensions.pc.policy.entity.WC7Cost getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7Cost getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7Cost split(Date splitDate);

    extensions.pc.policy.entity.WC7Cost clone();

}
