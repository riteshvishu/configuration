
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.coverage.entity.Exclusion;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7WorkersCompExclStubI
    extends SubtypeBean, EffDatedCopyable, EffDatedLogicalMatcher, Exclusion, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7WorkersCompExcl, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7WorkersCompExcl, PolicyPeriod>("entity.WC7WorkersCompExcl");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    ColumnPropertyInfoCache BOOLEANTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm1");
    ColumnPropertyInfoCache BOOLEANTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm1Avl");
    ColumnPropertyInfoCache BOOLEANTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm2");
    ColumnPropertyInfoCache BOOLEANTERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "BooleanTerm2Avl");
    ColumnPropertyInfoCache CHOICETERM1_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm1");
    ColumnPropertyInfoCache CHOICETERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm1Avl");
    ColumnPropertyInfoCache CHOICETERM2_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm2");
    ColumnPropertyInfoCache CHOICETERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "ChoiceTerm2Avl");
    ColumnPropertyInfoCache DIRECTTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm1");
    ColumnPropertyInfoCache DIRECTTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm1Avl");
    ColumnPropertyInfoCache DIRECTTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm2");
    ColumnPropertyInfoCache DIRECTTERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DirectTerm2Avl");
    ColumnPropertyInfoCache DATETERM1_PROP = new ColumnPropertyInfoCache(TYPE, "DateTerm1");
    ColumnPropertyInfoCache DATETERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DateTerm1Avl");
    ColumnPropertyInfoCache DATETERM2_PROP = new ColumnPropertyInfoCache(TYPE, "DateTerm2");
    ColumnPropertyInfoCache DATETERM2AVL_PROP = new ColumnPropertyInfoCache(TYPE, "DateTerm2Avl");
    ColumnPropertyInfoCache STRINGTERM1_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm1");
    ColumnPropertyInfoCache STRINGTERM1AVL_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm1Avl");
    ColumnPropertyInfoCache STRINGTERM2_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm2");
    ColumnPropertyInfoCache STRINGTERM1AV2_PROP = new ColumnPropertyInfoCache(TYPE, "StringTerm1Av2");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
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
    extensions.pc.policy.typekey.WC7WorkersCompExcl getSubtype();

    /**
     * Gets the value of the WCLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWCLine();

    /**
     * Sets the value of the WCLine field.
     * 
     */
    void setWCLine(WC7WorkersCompLine value);

    extensions.pc.policy.entity.WC7WorkersCompExcl getBasedOn();

    extensions.pc.policy.entity.WC7WorkersCompExcl getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7WorkersCompExcl getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7WorkersCompExcl split(Date splitDate);

    extensions.pc.policy.entity.WC7WorkersCompExcl clone();

}
