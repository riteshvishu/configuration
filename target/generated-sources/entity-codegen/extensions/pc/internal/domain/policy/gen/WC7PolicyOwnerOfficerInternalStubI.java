
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyContactRoleInternal;
import gw.pc.policy.typekey.Relationship;

public interface WC7PolicyOwnerOfficerInternalStubI
    extends WC7PolicyOwnerOfficerStubI, WC7PolicyContactRoleInternal
{


    /**
     * Gets the value of the RelationshipTitleInternal field.
     * The relationship
     * 
     */
    Relationship getRelationshipTitleInternal();

    /**
     * Sets the value of the RelationshipTitleInternal field.
     * 
     */
    void setRelationshipTitleInternal(Relationship value);

}
