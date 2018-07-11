
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import extensions.pc.policy.entity.RateAdjFactorExt;
import gw.pl.persistence.core.entity.KeyableBean;

public interface RateAdjFactorExtStubI
    extends KeyableBean
{

    EntityIntrinsicTypeReference<RateAdjFactorExt> TYPE = new EntityIntrinsicTypeReference<RateAdjFactorExt>("entity.RateAdjFactorExt");
    ColumnPropertyInfoCache FACTORNAME_PROP = new ColumnPropertyInfoCache(TYPE, "factorName");
    ColumnPropertyInfoCache FACTORSTATE_PROP = new ColumnPropertyInfoCache(TYPE, "factorState");
    ColumnPropertyInfoCache STRINGOPTION_PROP = new ColumnPropertyInfoCache(TYPE, "stringOption");
    ColumnPropertyInfoCache STRINGOPTION2_PROP = new ColumnPropertyInfoCache(TYPE, "stringOption2");
    ColumnPropertyInfoCache MINNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "minNumber");
    ColumnPropertyInfoCache MAXNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "maxNumber");
    ColumnPropertyInfoCache EFFDATE_PROP = new ColumnPropertyInfoCache(TYPE, "effDate");
    ColumnPropertyInfoCache EXPDATE_PROP = new ColumnPropertyInfoCache(TYPE, "expDate");
    ColumnPropertyInfoCache FACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "factor");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the factorName field.
     * This field indicates the name of the factor that should be applied.  Look-ups are always within a named factor.  Using this allows a single table to provide rating factors for many different types of simple (single parameter) look-ups.
     * 
     */
    String getFactorName();

    /**
     * Sets the value of the factorName field.
     * 
     */
    void setFactorName(String value);

    /**
     * Gets the value of the factorState field.
     * Indicates a rate is applicable to a given state.  Null indicates a default rate which can be overridden by a rate specific to a state.
     * 
     */
    String getFactorState();

    /**
     * Sets the value of the factorState field.
     * 
     */
    void setFactorState(String value);

    /**
     * Gets the value of the stringOption field.
     * This field should store a string value, such as the code for a typecode field, which will be used for looking up a factor.
     * 
     */
    String getStringOption();

    /**
     * Sets the value of the stringOption field.
     * 
     */
    void setStringOption(String value);

    /**
     * Gets the value of the stringOption2 field.
     * This field should store a secondary string value used for looking up a factor.
     * 
     */
    String getStringOption2();

    /**
     * Sets the value of the stringOption2 field.
     * 
     */
    void setStringOption2(String value);

    /**
     * Gets the value of the minNumber field.
     * The minimum of the inclusive number range for which a given lookup value should fall within.
     * 
     */
    BigDecimal getMinNumber();

    /**
     * Sets the value of the minNumber field.
     * 
     */
    void setMinNumber(BigDecimal value);

    /**
     * Gets the value of the maxNumber field.
     * The maximum of the inclusive number range for which a given lookup value should fall within.
     * 
     */
    BigDecimal getMaxNumber();

    /**
     * Sets the value of the maxNumber field.
     * 
     */
    void setMaxNumber(BigDecimal value);

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
     * Gets the value of the factor field.
     * The base rate to be used.
     * 
     */
    BigDecimal getFactor();

    /**
     * Sets the value of the factor field.
     * 
     */
    void setFactor(BigDecimal value);

}
