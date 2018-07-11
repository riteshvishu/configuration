
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CoveredEmployeeBaseInternal;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public interface WC7FedCoveredEmployeeInternalStubI
    extends WC7FedCoveredEmployeeStubI, WC7CoveredEmployeeBaseInternal
{


    /**
     * Sets the value of the FedEmpLiabCoverage field.
     * 
     */
    void setFedEmpLiabCoverage(WC7WorkersCompCov value);

    Key getFedEmpLiabCoverageID();

    void setFedEmpLiabCoverageID(Key value);

}
