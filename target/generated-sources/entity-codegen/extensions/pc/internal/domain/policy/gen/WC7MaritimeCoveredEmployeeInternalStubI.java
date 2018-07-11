
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7CoveredEmployeeBaseInternal;
import extensions.pc.policy.entity.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public interface WC7MaritimeCoveredEmployeeInternalStubI
    extends WC7MaritimeCoveredEmployeeStubI, WC7CoveredEmployeeBaseInternal
{


    /**
     * Sets the value of the MaritimeCoverage field.
     * 
     */
    void setMaritimeCoverage(WC7WorkersCompCov value);

    Key getMaritimeCoverageID();

    void setMaritimeCoverageID(Key value);

}
