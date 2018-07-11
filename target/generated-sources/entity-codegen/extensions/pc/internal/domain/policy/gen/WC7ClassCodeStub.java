
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import extensions.pc.policy.typekey.WC7ClassCodeProgramType;
import extensions.pc.policy.typekey.WC7ClassCodeType;
import gw.pc.product.entity.ClassCodeBasis;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;

public abstract class WC7ClassCodeStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7ClassCodeInternalStubI
{


    @Override
    public String getClassification() {
        return ((String) getFieldValueForCodegen(CLASSIFICATION_PROP.get()));
    }

    @Override
    public void setClassification(String value) {
        setFieldValueForCodegen(CLASSIFICATION_PROP.get(), value);
    }

    @Override
    public String getCode() {
        return ((String) getFieldValueForCodegen(CODE_PROP.get()));
    }

    @Override
    public void setCode(String value) {
        setFieldValueForCodegen(CODE_PROP.get(), value);
    }

    @Override
    public String getShortDesc() {
        return ((String) getFieldValueForCodegen(SHORTDESC_PROP.get()));
    }

    @Override
    public void setShortDesc(String value) {
        setFieldValueForCodegen(SHORTDESC_PROP.get(), value);
    }

    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

    @Override
    public WC7ClassCodeType getClassCodeType() {
        return ((WC7ClassCodeType) getFieldValue(CLASSCODETYPE_PROP.get()));
    }

    @Override
    public void setClassCodeType(WC7ClassCodeType value) {
        setFieldValue(CLASSCODETYPE_PROP.get(), value);
    }

    @Override
    public Boolean isConstructionType() {
        return ((Boolean) getFieldValue(CONSTRUCTIONTYPE_PROP.get()));
    }

    @Override
    public void setConstructionType(Boolean value) {
        setFieldValue(CONSTRUCTIONTYPE_PROP.get(), value);
    }

    @Override
    public Boolean isDiseaseType() {
        return ((Boolean) getFieldValue(DISEASETYPE_PROP.get()));
    }

    @Override
    public void setDiseaseType(Boolean value) {
        setFieldValue(DISEASETYPE_PROP.get(), value);
    }

    @Override
    public Boolean isCoalMineType() {
        return ((Boolean) getFieldValue(COALMINETYPE_PROP.get()));
    }

    @Override
    public void setCoalMineType(Boolean value) {
        setFieldValue(COALMINETYPE_PROP.get(), value);
    }

    @Override
    public Boolean isARatedType() {
        return ((Boolean) getFieldValue(ARATEDTYPE_PROP.get()));
    }

    @Override
    public void setARatedType(Boolean value) {
        setFieldValue(ARATEDTYPE_PROP.get(), value);
    }

    @Override
    public WC7ClassCodeProgramType getProgramType() {
        return ((WC7ClassCodeProgramType) getFieldValue(PROGRAMTYPE_PROP.get()));
    }

    @Override
    public void setProgramType(WC7ClassCodeProgramType value) {
        setFieldValue(PROGRAMTYPE_PROP.get(), value);
    }

    @Override
    public ClassCodeBasis getBasis() {
        return ((ClassCodeBasis) getFieldValue(BASIS_PROP.get()));
    }

    @Override
    public void setBasis(ClassCodeBasis value) {
        setFieldValue(BASIS_PROP.get(), value);
    }

    @Override
    public Key getBasisID() {
        return ((Key) getRawFieldValue(BASIS_PROP.get()));
    }

    @Override
    public void setBasisID(Key value) {
        setFieldValue(BASIS_PROP.get(), value);
    }

    @Override
    public Date getEffectiveDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getEffectiveDate();
    }

    @Override
    public void setEffectiveDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setEffectiveDate(value);
    }

    @Override
    public Date getExpirationDate() {
        return ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).getExpirationDate();
    }

    @Override
    public void setExpirationDate(Date value) {
        ((SimpleEffDatedInternal) getEntityDelegate(SimpleEffDated.class)).setExpirationDate(value);
    }

    @Override
    public boolean isEffectiveAt(Date p0) {
        return getEntityDelegate(SimpleEffDated.class).isEffectiveAt(p0);
    }

    @Override
    public boolean isEffective(Date p0, Date p1) {
        return getEntityDelegate(SimpleEffDated.class).isEffective(p0, p1);
    }

    @Override
    public boolean isOverlap(SimpleEffDated p0) {
        return getEntityDelegate(SimpleEffDated.class).isOverlap(p0);
    }

}
