
package extensions.pc.internal.domain.product.gen;

import com.guidewire.pc.domain.product.impl.ClassCodeBasisImpl;
import extensions.pc.internal.domain.product.impl.ClassCodeBasisExtInternal;
import extensions.pc.internal.domain.product.impl.ClassCodeBasisExtMethodsImpl;

public class ClassCodeBasisExtStub
    extends ClassCodeBasisImpl
    implements ClassCodeBasisExtInternal
{


    @Override
    public Boolean isProratable() {
        return getExtensionDelegate(ClassCodeBasisExtMethodsImpl.class).isProratable();
    }

    @Override
    public void setProratable(Boolean value) {
        getExtensionDelegate(ClassCodeBasisExtMethodsImpl.class).setProratable(value);
    }

}
