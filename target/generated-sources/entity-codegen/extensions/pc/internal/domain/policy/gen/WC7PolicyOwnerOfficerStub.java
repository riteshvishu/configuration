
package extensions.pc.internal.domain.policy.gen;

import extensions.pc.internal.domain.policy.impl.WC7PolicyContactRoleImpl;
import gw.pc.policy.typekey.Relationship;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class WC7PolicyOwnerOfficerStub
    extends WC7PolicyContactRoleImpl
    implements WC7PolicyOwnerOfficerInternalStubI
{


    @Override
    public Integer getWC7OwnershipPct() {
        return ((Integer) getFieldValue(WC7OWNERSHIPPCT_PROP.get()));
    }

    @Override
    public void setWC7OwnershipPct(Integer value) {
        setFieldValue(WC7OWNERSHIPPCT_PROP.get(), value);
    }

    @Override
    public Relationship getRelationshipTitleInternal() {
        return ((Relationship) getFieldValue(RELATIONSHIPTITLEINTERNAL_PROP.get()));
    }

    @Override
    public void setRelationshipTitleInternal(Relationship value) {
        setFieldValue(RELATIONSHIPTITLEINTERNAL_PROP.get(), value);
    }

    @Override
    public Jurisdiction getJurisdiction() {
        return ((Jurisdiction) getFieldValue(JURISDICTION_PROP.get()));
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        setFieldValue(JURISDICTION_PROP.get(), value);
    }

}
