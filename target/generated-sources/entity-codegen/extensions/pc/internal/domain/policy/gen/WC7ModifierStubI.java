
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7RateFactor;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.policy.entity.Modifier;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7ModifierStubI
    extends SubtypeBean, EffDatedCopyable, EffDatedLogicalMatcher, Modifier, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7Modifier, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7Modifier, PolicyPeriod>("entity.WC7Modifier");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    LinkPropertyInfoCache WC7JURISDICTION_PROP = new LinkPropertyInfoCache(TYPE, "WC7Jurisdiction");
    ArrayPropertyInfoCache WC7RATEFACTORS_PROP = new ArrayPropertyInfoCache(TYPE, "WC7RateFactors");
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
    ColumnPropertyInfoCache BOOLEANMODIFIER_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanModifier");
    ColumnPropertyInfoCache DATEMODIFIER_PROP = new ColumnPropertyInfoCache(TYPE, "DateModifier");
    ColumnPropertyInfoCache ELIGIBLE_PROP = new ColumnPropertyInfoCache(TYPE, "Eligible");
    ColumnPropertyInfoCache JUSTIFICATION_PROP = new ColumnPropertyInfoCache(TYPE, "Justification");
    ColumnPropertyInfoCache PATTERNCODE_PROP = new ColumnPropertyInfoCache(TYPE, "PatternCode");
    ColumnPropertyInfoCache RATEMODIFIER_PROP = new ColumnPropertyInfoCache(TYPE, "RateModifier");
    ColumnPropertyInfoCache REFERENCEDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "ReferenceDateInternal");
    ColumnPropertyInfoCache TYPEKEYMODIFIER_PROP = new ColumnPropertyInfoCache(TYPE, "TypeKeyModifier");
    ColumnPropertyInfoCache VALUEFINAL_PROP = new ColumnPropertyInfoCache(TYPE, "ValueFinal");
    TypekeyPropertyInfoCache STATE_PROP = new TypekeyPropertyInfoCache(TYPE, "State");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7Modifier getSubtype();

    /**
     * Gets the value of the WC7Jurisdiction field.
     * 
     * 
     */
    WC7Jurisdiction getWC7Jurisdiction();

    /**
     * Sets the value of the WC7Jurisdiction field.
     * 
     */
    void setWC7Jurisdiction(WC7Jurisdiction value);

    /**
     * Gets the value of the WC7RateFactors field.
     * Individual components of the rating factor
     * 
     */
    WC7RateFactor[] getWC7RateFactors();

    /**
     * Adds the given element to the WC7RateFactors array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7RateFactors(WC7RateFactor value);

    /**
     * Removes the given element from the WC7RateFactors array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7RateFactors(WC7RateFactor value);

    extensions.pc.policy.entity.WC7Modifier getBasedOn();

    extensions.pc.policy.entity.WC7Modifier getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7Modifier getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7Modifier split(Date splitDate);

    extensions.pc.policy.entity.WC7Modifier clone();

}
