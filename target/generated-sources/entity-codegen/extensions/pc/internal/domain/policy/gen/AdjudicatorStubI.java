
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import extensions.pc.policy.entity.Adjudicator;
import gw.pl.contact.entity.Person;

public interface AdjudicatorStubI
    extends Person
{

    EntityIntrinsicTypeReference<Adjudicator> TYPE = new EntityIntrinsicTypeReference<Adjudicator>("entity.Adjudicator");
    ColumnPropertyInfoCache ADJUDICATORLICENSE_PROP = new ColumnPropertyInfoCache(TYPE, "AdjudicatorLicense");

    /**
     * Gets the value of the AdjudicatorLicense field.
     * Adjudicator's business license number.
     * 
     */
    String getAdjudicatorLicense();

    /**
     * Sets the value of the AdjudicatorLicense field.
     * 
     */
    void setAdjudicatorLicense(String value);

}
