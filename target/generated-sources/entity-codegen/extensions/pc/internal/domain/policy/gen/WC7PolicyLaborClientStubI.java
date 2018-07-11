
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7LaborContact;
import extensions.pc.policy.entity.WC7PolicyLaborClient;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7PolicyLaborClientStubI
    extends WC7LaborContact
{

    EffDatedEntityIntrinsicTypeReference<WC7PolicyLaborClient, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7PolicyLaborClient, PolicyPeriod>("entity.WC7PolicyLaborClient");

}
