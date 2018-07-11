
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7LaborContact;
import extensions.pc.policy.entity.WC7PolicyLaborContractor;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7PolicyLaborContractorStubI
    extends WC7LaborContact
{

    EffDatedEntityIntrinsicTypeReference<WC7PolicyLaborContractor, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7PolicyLaborContractor, PolicyPeriod>("entity.WC7PolicyLaborContractor");

}
