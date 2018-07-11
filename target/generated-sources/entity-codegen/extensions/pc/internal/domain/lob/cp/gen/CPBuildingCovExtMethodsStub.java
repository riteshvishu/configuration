
package extensions.pc.internal.domain.lob.cp.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.lob.cp.entity.CPBuildingCov;

public abstract class CPBuildingCovExtMethodsStub
    extends AspectBase
    implements CPBuildingCovExtInternalMethodsStubI
{


    protected CPBuildingCovExtMethodsStub(CPBuildingCov owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public CPBuildingCov getOwner() {
        return ((CPBuildingCov) super.getOwner());
    }

}
