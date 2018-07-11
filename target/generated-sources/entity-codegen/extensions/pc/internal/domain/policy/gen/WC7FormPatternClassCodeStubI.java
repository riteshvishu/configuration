
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7FormPatternClassCode;
import gw.pc.form.entity.FormPattern;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7FormPatternClassCodeStubI
    extends Retireable
{

    EntityIntrinsicTypeReference<WC7FormPatternClassCode> TYPE = new EntityIntrinsicTypeReference<WC7FormPatternClassCode>("entity.WC7FormPatternClassCode");
    ColumnPropertyInfoCache CODE_PROP = new ColumnPropertyInfoCache(TYPE, "Code");
    ColumnPropertyInfoCache CLASSIFICATION_PROP = new ColumnPropertyInfoCache(TYPE, "Classification");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    LinkPropertyInfoCache FORMPATTERN_PROP = new LinkPropertyInfoCache(TYPE, "FormPattern");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the Code field.
     * The class code.
     * 
     */
    String getCode();

    /**
     * Sets the value of the Code field.
     * 
     */
    void setCode(String value);

    /**
     * Gets the value of the Classification field.
     * The description of the class code.
     * 
     */
    String getClassification();

    /**
     * Sets the value of the Classification field.
     * 
     */
    void setClassification(String value);

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction for which this class code value is allowed.
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

    /**
     * Gets the value of the FormPattern field.
     * The form pattern associated with this coverable property.
     * 
     */
    FormPattern getFormPattern();

    /**
     * Sets the value of the FormPattern field.
     * 
     */
    void setFormPattern(FormPattern value);

}
