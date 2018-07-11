
package extensions.pc.internal.domain.lob.ba.gen;

import com.guidewire.pc.domain.lob.ba.impl.BusinessVehicleImpl;
import extensions.pc.internal.domain.lob.ba.impl.BusinessVehicleExtInternal;
import extensions.pc.internal.domain.lob.ba.impl.BusinessVehicleExtMethodsImpl;
import gw.pc.lob.ba.typekey.IntraInterStateUsage;
import gw.pc.lob.ba.typekey.PipCovered;

public class BusinessVehicleExtStub
    extends BusinessVehicleImpl
    implements BusinessVehicleExtInternal
{


    @Override
    public Boolean isDoesUMUIMApply() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).isDoesUMUIMApply();
    }

    @Override
    public void setDoesUMUIMApply(Boolean value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setDoesUMUIMApply(value);
    }

    @Override
    public Boolean isAntiLockBrakes() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).isAntiLockBrakes();
    }

    @Override
    public void setAntiLockBrakes(Boolean value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setAntiLockBrakes(value);
    }

    @Override
    public Boolean isAntiTheft() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).isAntiTheft();
    }

    @Override
    public void setAntiTheft(Boolean value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setAntiTheft(value);
    }

    @Override
    public Boolean isOwnedByPoliticalSub() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).isOwnedByPoliticalSub();
    }

    @Override
    public void setOwnedByPoliticalSub(Boolean value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setOwnedByPoliticalSub(value);
    }

    @Override
    public Boolean isSafeDrivingCert() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).isSafeDrivingCert();
    }

    @Override
    public void setSafeDrivingCert(Boolean value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setSafeDrivingCert(value);
    }

    @Override
    public IntraInterStateUsage getIntraInterStateUsage() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).getIntraInterStateUsage();
    }

    @Override
    public void setIntraInterStateUsage(IntraInterStateUsage value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setIntraInterStateUsage(value);
    }

    @Override
    public PipCovered getPipCovered() {
        return getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).getPipCovered();
    }

    @Override
    public void setPipCovered(PipCovered value) {
        getExtensionDelegate(BusinessVehicleExtMethodsImpl.class).setPipCovered(value);
    }

}
