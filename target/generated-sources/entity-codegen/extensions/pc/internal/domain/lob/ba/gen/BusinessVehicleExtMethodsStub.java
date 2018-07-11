
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.ba.entity.BusinessVehicle;
import gw.pc.lob.ba.typekey.IntraInterStateUsage;
import gw.pc.lob.ba.typekey.PipCovered;

public abstract class BusinessVehicleExtMethodsStub
    extends AspectBase
    implements BusinessVehicleExtInternalMethodsStubI
{


    protected BusinessVehicleExtMethodsStub(BusinessVehicle owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public BusinessVehicle getOwner() {
        return ((BusinessVehicle) super.getOwner());
    }

    @Override
    public Boolean isDoesUMUIMApply() {
        return ((Boolean) getFieldValue(DOESUMUIMAPPLY_PROP.get()));
    }

    @Override
    public void setDoesUMUIMApply(Boolean value) {
        setFieldValue(DOESUMUIMAPPLY_PROP.get(), value);
    }

    @Override
    public Boolean isAntiLockBrakes() {
        return ((Boolean) getFieldValue(ANTILOCKBRAKES_PROP.get()));
    }

    @Override
    public void setAntiLockBrakes(Boolean value) {
        setFieldValue(ANTILOCKBRAKES_PROP.get(), value);
    }

    @Override
    public Boolean isAntiTheft() {
        return ((Boolean) getFieldValue(ANTITHEFT_PROP.get()));
    }

    @Override
    public void setAntiTheft(Boolean value) {
        setFieldValue(ANTITHEFT_PROP.get(), value);
    }

    @Override
    public Boolean isOwnedByPoliticalSub() {
        return ((Boolean) getFieldValue(OWNEDBYPOLITICALSUB_PROP.get()));
    }

    @Override
    public void setOwnedByPoliticalSub(Boolean value) {
        setFieldValue(OWNEDBYPOLITICALSUB_PROP.get(), value);
    }

    @Override
    public Boolean isSafeDrivingCert() {
        return ((Boolean) getFieldValue(SAFEDRIVINGCERT_PROP.get()));
    }

    @Override
    public void setSafeDrivingCert(Boolean value) {
        setFieldValue(SAFEDRIVINGCERT_PROP.get(), value);
    }

    @Override
    public IntraInterStateUsage getIntraInterStateUsage() {
        return ((IntraInterStateUsage) getFieldValue(INTRAINTERSTATEUSAGE_PROP.get()));
    }

    @Override
    public void setIntraInterStateUsage(IntraInterStateUsage value) {
        setFieldValue(INTRAINTERSTATEUSAGE_PROP.get(), value);
    }

    @Override
    public PipCovered getPipCovered() {
        return ((PipCovered) getFieldValue(PIPCOVERED_PROP.get()));
    }

    @Override
    public void setPipCovered(PipCovered value) {
        setFieldValue(PIPCOVERED_PROP.get(), value);
    }

}
