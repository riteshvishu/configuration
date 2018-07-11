
package extensions.pc.internal.domain.form.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.WC7FormPatternClassCode;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import gw.pc.form.entity.FormPattern;

public abstract class FormPatternExtMethodsStub
    extends AspectBase
    implements FormPatternExtInternalMethodsStubI
{


    protected FormPatternExtMethodsStub(FormPattern owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public FormPattern getOwner() {
        return ((FormPattern) super.getOwner());
    }

    @Override
    public WC7GoverningLaw getGoverningLawType() {
        return ((WC7GoverningLaw) getFieldValue(GOVERNINGLAWTYPE_PROP.get()));
    }

    @Override
    public void setGoverningLawType(WC7GoverningLaw value) {
        setFieldValue(GOVERNINGLAWTYPE_PROP.get(), value);
    }

    @Override
    public WC7FormPatternClassCode[] getWC7FormPatternClassCodes() {
        return ((WC7FormPatternClassCode[]) getFieldValue(WC7FORMPATTERNCLASSCODES_PROP.get()));
    }

    @Override
    public void addToWC7FormPatternClassCodes(WC7FormPatternClassCode value) {
        addArrayElement(WC7FORMPATTERNCLASSCODES_PROP.get(), value);
    }

    @Override
    public void removeFromWC7FormPatternClassCodes(WC7FormPatternClassCode value) {
        removeArrayElement(WC7FORMPATTERNCLASSCODES_PROP.get(), value);
    }

}
