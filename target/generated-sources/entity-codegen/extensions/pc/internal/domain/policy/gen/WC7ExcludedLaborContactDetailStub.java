
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7LaborContactDetailImpl;
import extensions.pc.policy.entity.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public abstract class WC7ExcludedLaborContactDetailStub
    extends WC7LaborContactDetailImpl
    implements WC7ExcludedLaborContactDetailInternalStubI
{


    @Override
    public WC7WorkersCompExcl getLaborContactExclusion() {
        return ((WC7WorkersCompExcl) getFieldValue(LABORCONTACTEXCLUSION_PROP.get()));
    }

    @Override
    public void setLaborContactExclusion(WC7WorkersCompExcl value) {
        setFieldValue(LABORCONTACTEXCLUSION_PROP.get(), value);
    }

    @Override
    public Key getLaborContactExclusionID() {
        return ((Key) getRawFieldValue(LABORCONTACTEXCLUSION_PROP.get()));
    }

    @Override
    public void setLaborContactExclusionID(Key value) {
        setFieldValue(LABORCONTACTEXCLUSION_PROP.get(), value);
    }

}
