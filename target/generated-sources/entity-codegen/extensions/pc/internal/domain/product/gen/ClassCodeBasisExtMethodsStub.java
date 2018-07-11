
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.product.entity.ClassCodeBasis;

public abstract class ClassCodeBasisExtMethodsStub
    extends AspectBase
    implements ClassCodeBasisExtInternalMethodsStubI
{


    protected ClassCodeBasisExtMethodsStub(ClassCodeBasis owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public ClassCodeBasis getOwner() {
        return ((ClassCodeBasis) super.getOwner());
    }

    @Override
    public Boolean isProratable() {
        return ((Boolean) getFieldValue(PRORATABLE_PROP.get()));
    }

    @Override
    public void setProratable(Boolean value) {
        setFieldValue(PRORATABLE_PROP.get(), value);
    }

}
