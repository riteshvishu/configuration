
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import extensions.pc.policy.entity.RateGLClassCodeExt;
import gw.pl.persistence.core.entity.KeyableBean;

public interface RateGLClassCodeExtStubI
    extends KeyableBean
{

    EntityIntrinsicTypeReference<RateGLClassCodeExt> TYPE = new EntityIntrinsicTypeReference<RateGLClassCodeExt>("entity.RateGLClassCodeExt");
    ColumnPropertyInfoCache CLASSCODE_PROP = new ColumnPropertyInfoCache(TYPE, "classcode");
    ColumnPropertyInfoCache RATESTATE_PROP = new ColumnPropertyInfoCache(TYPE, "rateState");
    ColumnPropertyInfoCache SUBLINE_PROP = new ColumnPropertyInfoCache(TYPE, "subline");
    ColumnPropertyInfoCache SPLITTYPE_PROP = new ColumnPropertyInfoCache(TYPE, "splitType");
    ColumnPropertyInfoCache EFFDATE_PROP = new ColumnPropertyInfoCache(TYPE, "effDate");
    ColumnPropertyInfoCache EXPDATE_PROP = new ColumnPropertyInfoCache(TYPE, "expDate");
    ColumnPropertyInfoCache RATE_PROP = new ColumnPropertyInfoCache(TYPE, "rate");
    ColumnPropertyInfoCache MINPREMIUM_PROP = new ColumnPropertyInfoCache(TYPE, "minPremium");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the classcode field.
     * This field indicates the class code we are doing a rate lookup on.
     * 
     */
    String getClasscode();

    /**
     * Sets the value of the classcode field.
     * 
     */
    void setClasscode(String value);

    /**
     * Gets the value of the rateState field.
     * Indicates a rate is applicable to a given jurisdiction.  Null indicates a default rate which can be overridden by a rate specific to a jurisdiction. This should be the string value of a typecode in the Jurisdiction typelist. For example, if this is a typecode allowed in the US state of California, the value should be 'CA'.
     * 
     */
    String getRateState();

    /**
     * Sets the value of the rateState field.
     * 
     */
    void setRateState(String value);

    /**
     * Gets the value of the subline field.
     * The subline (Product/Premises) for which this rate is applicable.
     * 
     */
    String getSubline();

    /**
     * Sets the value of the subline field.
     * 
     */
    void setSubline(String value);

    /**
     * Gets the value of the splitType field.
     * The split type (BI/PD/CSL) for which this rate is applicable.
     * 
     */
    String getSplitType();

    /**
     * Sets the value of the splitType field.
     * 
     */
    void setSplitType(String value);

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
     * Gets the value of the rate field.
     * The base rate to be used
     * 
     */
    BigDecimal getRate();

    /**
     * Sets the value of the rate field.
     * 
     */
    void setRate(BigDecimal value);

    /**
     * Gets the value of the minPremium field.
     * The minimum premium associated with a classcode
     * 
     */
    Integer getMinPremium();

    /**
     * Sets the value of the minPremium field.
     * 
     */
    void setMinPremium(Integer value);

}
