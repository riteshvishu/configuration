
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.typekey.WC7ClassCodeProgramType;
import extensions.pc.policy.typekey.WC7ClassCodeType;
import gw.pc.product.entity.ClassCodeBasis;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.entity.Retireable;

public interface WC7ClassCodeStubI
    extends SimpleEffDated, Retireable
{

    EntityIntrinsicTypeReference<WC7ClassCode> TYPE = new EntityIntrinsicTypeReference<WC7ClassCode>("entity.WC7ClassCode");
    ColumnPropertyInfoCache CLASSIFICATION_PROP = new ColumnPropertyInfoCache(TYPE, "Classification");
    ColumnPropertyInfoCache CODE_PROP = new ColumnPropertyInfoCache(TYPE, "Code");
    ColumnPropertyInfoCache SHORTDESC_PROP = new ColumnPropertyInfoCache(TYPE, "ShortDesc");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");
    TypekeyPropertyInfoCache CLASSCODETYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ClassCodeType");
    ColumnPropertyInfoCache CONSTRUCTIONTYPE_PROP = new ColumnPropertyInfoCache(TYPE, "ConstructionType");
    ColumnPropertyInfoCache DISEASETYPE_PROP = new ColumnPropertyInfoCache(TYPE, "DiseaseType");
    ColumnPropertyInfoCache COALMINETYPE_PROP = new ColumnPropertyInfoCache(TYPE, "CoalMineType");
    ColumnPropertyInfoCache ARATEDTYPE_PROP = new ColumnPropertyInfoCache(TYPE, "ARatedType");
    TypekeyPropertyInfoCache PROGRAMTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ProgramType");
    LinkPropertyInfoCache BASIS_PROP = new LinkPropertyInfoCache(TYPE, "Basis");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");

    /**
     * Gets the value of the Classification field.
     * The Classification of the code
     * 
     */
    String getClassification();

    /**
     * Sets the value of the Classification field.
     * 
     */
    void setClassification(String value);

    /**
     * Gets the value of the Code field.
     * The Class Code for a line of insurance
     * 
     */
    String getCode();

    /**
     * Sets the value of the Code field.
     * 
     */
    void setCode(String value);

    /**
     * Gets the value of the ShortDesc field.
     * Short description for the class code
     * 
     */
    String getShortDesc();

    /**
     * Sets the value of the ShortDesc field.
     * 
     */
    void setShortDesc(String value);

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
     * Gets the value of the ClassCodeType field.
     * Type of this classcode
     * 
     */
    WC7ClassCodeType getClassCodeType();

    /**
     * Sets the value of the ClassCodeType field.
     * 
     */
    void setClassCodeType(WC7ClassCodeType value);

    /**
     * Gets the value of the ConstructionType field.
     * Specify whether class code is of construction type as well
     * 
     */
    Boolean isConstructionType();

    /**
     * Sets the value of the ConstructionType field.
     * 
     */
    void setConstructionType(Boolean value);

    /**
     * Gets the value of the DiseaseType field.
     * Specify whether class code is of disease type as well
     * 
     */
    Boolean isDiseaseType();

    /**
     * Sets the value of the DiseaseType field.
     * 
     */
    void setDiseaseType(Boolean value);

    /**
     * Gets the value of the CoalMineType field.
     * Specify whether class code is of coal mine disease type as well
     * 
     */
    Boolean isCoalMineType();

    /**
     * Sets the value of the CoalMineType field.
     * 
     */
    void setCoalMineType(Boolean value);

    /**
     * Gets the value of the ARatedType field.
     * Specify whether class code is A Rated
     * 
     */
    Boolean isARatedType();

    /**
     * Sets the value of the ARatedType field.
     * 
     */
    void setARatedType(Boolean value);

    /**
     * Gets the value of the ProgramType field.
     * Type of program
     * 
     */
    WC7ClassCodeProgramType getProgramType();

    /**
     * Sets the value of the ProgramType field.
     * 
     */
    void setProgramType(WC7ClassCodeProgramType value);

    /**
     * Gets the value of the Basis field.
     * Rating basis for this class code.
     * 
     */
    ClassCodeBasis getBasis();

    /**
     * Sets the value of the Basis field.
     * 
     */
    void setBasis(ClassCodeBasis value);

}
