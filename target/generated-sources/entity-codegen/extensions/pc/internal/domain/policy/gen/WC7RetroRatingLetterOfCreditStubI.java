
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7RetroRatingLetterOfCredit;
import extensions.pc.policy.entity.WC7RetrospectiveRatingPlan;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7RetroRatingLetterOfCreditStubI
    extends EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7RetroRatingLetterOfCredit, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7RetroRatingLetterOfCredit, PolicyPeriod>("entity.WC7RetroRatingLetterOfCredit");
    ColumnPropertyInfoCache AMOUNT_PROP = new ColumnPropertyInfoCache(TYPE, "Amount");
    ColumnPropertyInfoCache ISSUERNAME_PROP = new ColumnPropertyInfoCache(TYPE, "IssuerName");
    ColumnPropertyInfoCache VALIDFROM_PROP = new ColumnPropertyInfoCache(TYPE, "ValidFrom");
    ColumnPropertyInfoCache VALIDTO_PROP = new ColumnPropertyInfoCache(TYPE, "ValidTo");
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
     * Gets the value of the Amount field.
     * The amount this letter is providing
     * 
     */
    BigDecimal getAmount();

    /**
     * Sets the value of the Amount field.
     * 
     */
    void setAmount(BigDecimal value);

    /**
     * Gets the value of the IssuerName field.
     * The name of the issuer
     * 
     */
    String getIssuerName();

    /**
     * Sets the value of the IssuerName field.
     * 
     */
    void setIssuerName(String value);

    /**
     * Gets the value of the ValidFrom field.
     * Date (inclusive) from which this letter of credit is valid.
     * 
     */
    Date getValidFrom();

    /**
     * Sets the value of the ValidFrom field.
     * 
     */
    void setValidFrom(Date value);

    /**
     * Gets the value of the ValidTo field.
     * Date (exclusive) at which this letter of credit is no longer valid.
     * 
     */
    Date getValidTo();

    /**
     * Sets the value of the ValidTo field.
     * 
     */
    void setValidTo(Date value);

    /**
     * Gets the value of the WC7RetrospectiveRatingPlan field.
     * The retro plan for which this letter applies
     * 
     */
    WC7RetrospectiveRatingPlan getWC7RetrospectiveRatingPlan();

    /**
     * Sets the value of the WC7RetrospectiveRatingPlan field.
     * 
     */
    void setWC7RetrospectiveRatingPlan(WC7RetrospectiveRatingPlan value);

    WC7RetroRatingLetterOfCredit getBasedOn();

    WC7RetroRatingLetterOfCredit getSlice(Date sliceDate);

    WC7RetroRatingLetterOfCredit getUnsliced();

    PolicyPeriod getBranch();

    WC7RetroRatingLetterOfCredit split(Date splitDate);

    WC7RetroRatingLetterOfCredit clone();

}
