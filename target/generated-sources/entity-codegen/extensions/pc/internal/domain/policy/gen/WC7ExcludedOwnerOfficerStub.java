
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyOwnerOfficerImpl;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public abstract class WC7ExcludedOwnerOfficerStub
    extends WC7PolicyOwnerOfficerImpl
    implements WC7ExcludedOwnerOfficerInternalStubI
{


    @Override
    public WC7WorkersCompExcl getOwnerOfficerExclusion() {
        return ((WC7WorkersCompExcl) getFieldValue(OWNEROFFICEREXCLUSION_PROP.get()));
    }

    @Override
    public void setOwnerOfficerExclusion(WC7WorkersCompExcl value) {
        setFieldValue(OWNEROFFICEREXCLUSION_PROP.get(), value);
    }

    @Override
    public Key getOwnerOfficerExclusionID() {
        return ((Key) getRawFieldValue(OWNEROFFICEREXCLUSION_PROP.get()));
    }

    @Override
    public void setOwnerOfficerExclusionID(Key value) {
        setFieldValue(OWNEROFFICEREXCLUSION_PROP.get(), value);
    }

}
