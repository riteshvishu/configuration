
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7JurisdictionCostImpl;

public abstract class WC7WaiverOfSubroSpecificBalanceCostStub
    extends WC7JurisdictionCostImpl
    implements WC7WaiverOfSubroSpecificBalanceCostInternalStubI
{


    @Override
    public String getJobID() {
        return ((String) getFieldValueForCodegen(JOBID_PROP.get()));
    }

    @Override
    public void setJobID(String value) {
        setFieldValueForCodegen(JOBID_PROP.get(), value);
    }

}
