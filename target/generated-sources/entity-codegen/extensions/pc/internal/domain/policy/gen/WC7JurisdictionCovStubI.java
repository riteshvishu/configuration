
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7Jurisdiction;
import extensions.pc.policy.entity.WC7JurisdictionCovCost;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.coverage.entity.Coverage;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7JurisdictionCovStubI
    extends SubtypeBean, EffDatedCopyable, EffDatedLogicalMatcher, Coverage, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7JurisdictionCov, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7JurisdictionCov, PolicyPeriod>("entity.WC7JurisdictionCov");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache BOOLEANTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm1");
    ColumnPropertyInfoCache BOOLEANTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm1Avl");
    ColumnPropertyInfoCache BOOLEANTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm2");
    ColumnPropertyInfoCache BOOLEANTERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm2Avl");
    ColumnPropertyInfoCache DIRECTTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm1");
    ColumnPropertyInfoCache DIRECTTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm1Avl");
    ColumnPropertyInfoCache DIRECTTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm2");
    ColumnPropertyInfoCache DIRECTTERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm2Avl");
    ColumnPropertyInfoCache DIRECTTERM3_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm3");
    ColumnPropertyInfoCache DIRECTTERM3AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm3Avl");
    ColumnPropertyInfoCache STRINGTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm1");
    ColumnPropertyInfoCache STRINGTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm1Avl");
    ColumnPropertyInfoCache STRINGTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm2");
    ColumnPropertyInfoCache STRINGTERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm2Avl");
    ColumnPropertyInfoCache STRINGTERM3_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm3");
    ColumnPropertyInfoCache STRINGTERM3AVL_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm3Avl");
    ColumnPropertyInfoCache CHOICETERM1_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm1");
    ColumnPropertyInfoCache CHOICETERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm1Avl");
    ColumnPropertyInfoCache CHOICETERM2_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm2");
    ColumnPropertyInfoCache CHOICETERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm2Avl");
    ColumnPropertyInfoCache CHOICETERM3_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm3");
    ColumnPropertyInfoCache CHOICETERM3AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm3Avl");
    ColumnPropertyInfoCache CHOICETERM4_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm4");
    ColumnPropertyInfoCache CHOICETERM4AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm4Avl");
    ColumnPropertyInfoCache CHOICETERM5_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm5");
    ColumnPropertyInfoCache CHOICETERM5AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm5Avl");
    ColumnPropertyInfoCache CHOICETERM6_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm6");
    ColumnPropertyInfoCache CHOICETERM6AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm6Avl");
    LinkPropertyInfoCache WC7JURISDICTION_PROP = new LinkPropertyInfoCache(TYPE, "WC7Jurisdiction");
    ArrayPropertyInfoCache COSTS_PROP = new ArrayPropertyInfoCache(TYPE, "Costs");
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
    ColumnPropertyInfoCache PATTERNCODE_PROP = new ColumnPropertyInfoCache(TYPE, "PatternCode");
    ColumnPropertyInfoCache REFERENCEDATEINTERNAL_PROP = new ColumnPropertyInfoCache(TYPE, "ReferenceDateInternal");
    TypekeyPropertyInfoCache CURRENCY_PROP = new TypekeyPropertyInfoCache(TYPE, "Currency");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7JurisdictionCov getSubtype();

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
     * Gets the value of the Costs field.
     * 
     * 
     */
    WC7JurisdictionCovCost[] getCosts();

    /**
     * Adds the given element to the Costs array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCosts(WC7JurisdictionCovCost value);

    /**
     * Removes the given element from the Costs array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCosts(WC7JurisdictionCovCost value);

    extensions.pc.policy.entity.WC7JurisdictionCov getBasedOn();

    extensions.pc.policy.entity.WC7JurisdictionCov getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7JurisdictionCov getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7JurisdictionCov split(Date splitDate);

    extensions.pc.policy.entity.WC7JurisdictionCov clone();

}
