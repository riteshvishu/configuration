
package extensions.pc.internal.domain.product.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.product.entity.ClassCodeBasis;

public interface ClassCodeBasisExtMethodsStubI {

    ColumnPropertyInfoCache PRORATABLE_PROP = new ColumnPropertyInfoCache(ClassCodeBasis.TYPE, "Proratable");

    /**
     * Gets the value of the Proratable field.
     * Defines whether the basis is proratable.
     * 
     */
    Boolean isProratable();

    /**
     * Sets the value of the Proratable field.
     * 
     */
    void setProratable(Boolean value);

}
