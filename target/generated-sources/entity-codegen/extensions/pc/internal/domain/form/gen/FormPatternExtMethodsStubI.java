
package extensions.pc.internal.domain.form.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7FormPatternClassCode;
import extensions.pc.policy.typekey.WC7GoverningLaw;
import gw.pc.form.entity.FormPattern;

public interface FormPatternExtMethodsStubI {

    TypekeyPropertyInfoCache GOVERNINGLAWTYPE_PROP = new TypekeyPropertyInfoCache(FormPattern.TYPE, "GoverningLawType");
    ArrayPropertyInfoCache WC7FORMPATTERNCLASSCODES_PROP = new ArrayPropertyInfoCache(FormPattern.TYPE, "WC7FormPatternClassCodes");

    /**
     * Gets the value of the GoverningLawType field.
     * The type of the Governing law
     * 
     */
    WC7GoverningLaw getGoverningLawType();

    /**
     * Sets the value of the GoverningLawType field.
     * 
     */
    void setGoverningLawType(WC7GoverningLaw value);

    /**
     * Gets the value of the WC7FormPatternClassCodes field.
     * WC7ClassCodes associated with this form pattern.
     * 
     */
    WC7FormPatternClassCode[] getWC7FormPatternClassCodes();

    /**
     * Adds the given element to the WC7FormPatternClassCodes array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7FormPatternClassCodes(WC7FormPatternClassCode value);

    /**
     * Removes the given element from the WC7FormPatternClassCodes array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7FormPatternClassCodes(WC7FormPatternClassCode value);

}
