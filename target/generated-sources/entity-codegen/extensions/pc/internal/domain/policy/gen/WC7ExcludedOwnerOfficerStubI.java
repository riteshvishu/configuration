
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7ExcludedOwnerOfficer;
import extensions.pc.policy.entity.WC7PolicyOwnerOfficer;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.account.AccountSyncable;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7ExcludedOwnerOfficerStubI
    extends WC7PolicyOwnerOfficer, EffDatedCopyable, AccountSyncable
{

    EffDatedEntityIntrinsicTypeReference<WC7ExcludedOwnerOfficer, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7ExcludedOwnerOfficer, PolicyPeriod>("entity.WC7ExcludedOwnerOfficer");
    LinkPropertyInfoCache OWNEROFFICEREXCLUSION_PROP = new LinkPropertyInfoCache(TYPE, "OwnerOfficerExclusion");

    /**
     * Gets the value of the OwnerOfficerExclusion field.
     * The owning Clause (Exclusion) for this specific scheduled item
     * 
     */
    WC7WorkersCompExcl getOwnerOfficerExclusion();

}
