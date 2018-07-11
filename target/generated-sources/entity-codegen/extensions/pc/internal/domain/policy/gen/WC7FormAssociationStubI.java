
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7FormAssociation;
import extensions.pc.policy.entity.WC7WaiverOfSubro;
import gw.pc.form.entity.FormAssociation;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7FormAssociationStubI
    extends FormAssociation
{

    EffDatedEntityIntrinsicTypeReference<WC7FormAssociation, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7FormAssociation, PolicyPeriod>("entity.WC7FormAssociation");
    LinkPropertyInfoCache WC7WAIVEROFSUBRO_PROP = new LinkPropertyInfoCache(TYPE, "WC7WaiverOfSubro");

    /**
     * Gets the value of the WC7WaiverOfSubro field.
     * 
     * 
     */
    WC7WaiverOfSubro getWC7WaiverOfSubro();

    /**
     * Sets the value of the WC7WaiverOfSubro field.
     * 
     */
    void setWC7WaiverOfSubro(WC7WaiverOfSubro value);

}
