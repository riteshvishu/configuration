
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import gw.pc.form.entity.FormPattern;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.Key;

public abstract class WC7FormPatternClassCodeStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7FormPatternClassCodeInternalStubI
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
    public String getClassification() {
        return ((String) getFieldValueForCodegen(CLASSIFICATION_PROP.get()));
    }

    @Override
    public void setClassification(String value) {
        setFieldValueForCodegen(CLASSIFICATION_PROP.get(), value);
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
    public FormPattern getFormPattern() {
        return ((FormPattern) getFieldValue(FORMPATTERN_PROP.get()));
    }

    @Override
    public void setFormPattern(FormPattern value) {
        setFieldValue(FORMPATTERN_PROP.get(), value);
    }

    @Override
    public Key getFormPatternID() {
        return ((Key) getRawFieldValue(FORMPATTERN_PROP.get()));
    }

    @Override
    public void setFormPatternID(Key value) {
        setFieldValue(FORMPATTERN_PROP.get(), value);
    }

}
