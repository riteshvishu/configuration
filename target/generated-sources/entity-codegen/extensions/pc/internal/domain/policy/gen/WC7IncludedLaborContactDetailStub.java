
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7LaborContactDetailImpl;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public abstract class WC7IncludedLaborContactDetailStub
    extends WC7LaborContactDetailImpl
    implements WC7IncludedLaborContactDetailInternalStubI
{


    @Override
    public WC7WorkersCompCond getLaborContactCondition() {
        return ((WC7WorkersCompCond) getFieldValue(LABORCONTACTCONDITION_PROP.get()));
    }

    @Override
    public void setLaborContactCondition(WC7WorkersCompCond value) {
        setFieldValue(LABORCONTACTCONDITION_PROP.get(), value);
    }

    @Override
    public Key getLaborContactConditionID() {
        return ((Key) getRawFieldValue(LABORCONTACTCONDITION_PROP.get()));
    }

    @Override
    public void setLaborContactConditionID(Key value) {
        setFieldValue(LABORCONTACTCONDITION_PROP.get(), value);
    }

}
