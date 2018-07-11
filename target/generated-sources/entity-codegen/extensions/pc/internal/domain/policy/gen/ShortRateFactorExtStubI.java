
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import extensions.pc.policy.entity.ShortRateFactorExt;
import gw.pl.persistence.core.entity.KeyableBean;

public interface ShortRateFactorExtStubI
    extends KeyableBean
{

    EntityIntrinsicTypeReference<ShortRateFactorExt> TYPE = new EntityIntrinsicTypeReference<ShortRateFactorExt>("entity.ShortRateFactorExt");
    ColumnPropertyInfoCache RATESTATE_PROP = new ColumnPropertyInfoCache(TYPE, "rateState");
    ColumnPropertyInfoCache EFFDATE_PROP = new ColumnPropertyInfoCache(TYPE, "effDate");
    ColumnPropertyInfoCache EXPDATE_PROP = new ColumnPropertyInfoCache(TYPE, "expDate");
    ColumnPropertyInfoCache DAYSINPERIOD_PROP = new ColumnPropertyInfoCache(TYPE, "daysInPeriod");
    ColumnPropertyInfoCache SHORTRATEPERCENT_PROP = new ColumnPropertyInfoCache(TYPE, "shortRatePercent");
    ColumnPropertyInfoCache SHORTRATEFACTOR_PROP = new ColumnPropertyInfoCache(TYPE, "shortRateFactor");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the rateState field.
     * Indicates a rate is applicable to a given state.  Null indicates a default rate which can be overridden by a rate specific to a state.
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
     * Gets the value of the daysInPeriod field.
     * The number of non-canceled days that the policy was in effect.
     * 
     */
    Integer getDaysInPeriod();

    /**
     * Sets the value of the daysInPeriod field.
     * 
     */
    void setDaysInPeriod(Integer value);

    /**
     * Gets the value of the shortRatePercent field.
     * The proration factor (vs. the full term) that should be used.  For example, if (non-canceled length / term length) = 50%, the short rate % might be 60%.  Stored as a decimal, so 50% should be 0.5000.
     * 
     */
    BigDecimal getShortRatePercent();

    /**
     * Sets the value of the shortRatePercent field.
     * 
     */
    void setShortRatePercent(BigDecimal value);

    /**
     * Gets the value of the shortRateFactor field.
     * The amount that an already prorated value should be multiplied by to get to the short rate proration %.  For example, if premiums were already prorated by 50%, then a factor of 1.2 would get the amount up to the intended 60% (amount * 0.5 * 1.2 = amount * 0.6).
     * 
     */
    BigDecimal getShortRateFactor();

    /**
     * Sets the value of the shortRateFactor field.
     * 
     */
    void setShortRateFactor(BigDecimal value);

}
