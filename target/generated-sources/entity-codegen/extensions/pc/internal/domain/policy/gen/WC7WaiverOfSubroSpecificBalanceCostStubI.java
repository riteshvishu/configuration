
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7JurisdictionCost;
import extensions.pc.policy.entity.WC7WaiverOfSubroSpecificBalanceCost;
import gw.pc.financials.entity.Cost;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7WaiverOfSubroSpecificBalanceCostStubI
    extends WC7JurisdictionCost, Cost
{

    EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubroSpecificBalanceCost, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7WaiverOfSubroSpecificBalanceCost, PolicyPeriod>("entity.WC7WaiverOfSubroSpecificBalanceCost");
    ColumnPropertyInfoCache JOBID_PROP = new ColumnPropertyInfoCache(TYPE, "JobID");

    /**
     * Gets the value of the JobID field.
     * The job identifier
     * 
     */
    String getJobID();

    /**
     * Sets the value of the JobID field.
     * 
     */
    void setJobID(String value);

}
