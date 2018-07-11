
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pc.domain.product.impl.SimpleEffDatedInternal;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import gw.pc.product.entity.SimpleEffDated;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7DiseaseCodeStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7DiseaseCodeInternalStubI
{


    @Override
    public String getCode() {
        return ((String) getFieldValueForCodegen(CODE_PROP.get()));
    }

    @Override
    public void setCode(String value) {
        setFieldValueForCodegen(CODE_PROP.get(), value);
    }

    @Override
    public String getSupplDiseaseLoadingType() {
        return ((String) getFieldValueForCodegen(SUPPLDISEASELOADINGTYPE_PROP.get()));
    }

    @Override
    public void setSupplDiseaseLoadingType(String value) {
        setFieldValueForCodegen(SUPPLDISEASELOADINGTYPE_PROP.get(), value);
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
