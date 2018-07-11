
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyOwnerOfficerImpl;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.pl.persistence.core.Key;

public abstract class WC7IncludedOwnerOfficerStub
    extends WC7PolicyOwnerOfficerImpl
    implements WC7IncludedOwnerOfficerInternalStubI
{


    @Override
    public WC7ClassCode getWC7ClassCode() {
        return ((WC7ClassCode) getFieldValue(WC7CLASSCODE_PROP.get()));
    }

    @Override
    public void setWC7ClassCode(WC7ClassCode value) {
        setFieldValue(WC7CLASSCODE_PROP.get(), value);
    }

    @Override
    public Key getWC7ClassCodeID() {
        return ((Key) getRawFieldValue(WC7CLASSCODE_PROP.get()));
    }

    @Override
    public void setWC7ClassCodeID(Key value) {
        setFieldValue(WC7CLASSCODE_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompCond getOwnerOfficerCondition() {
        return ((WC7WorkersCompCond) getFieldValue(OWNEROFFICERCONDITION_PROP.get()));
    }

    @Override
    public void setOwnerOfficerCondition(WC7WorkersCompCond value) {
        setFieldValue(OWNEROFFICERCONDITION_PROP.get(), value);
    }

    @Override
    public Key getOwnerOfficerConditionID() {
        return ((Key) getRawFieldValue(OWNEROFFICERCONDITION_PROP.get()));
    }

    @Override
    public void setOwnerOfficerConditionID(Key value) {
        setFieldValue(OWNEROFFICERCONDITION_PROP.get(), value);
    }

    @Override
    public Integer getPayroll() {
        return ((Integer) getFieldValue(PAYROLL_PROP.get()));
    }

    @Override
    public void setPayroll(Integer value) {
        setFieldValue(PAYROLL_PROP.get(), value);
    }

}
