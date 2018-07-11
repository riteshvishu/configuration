
package extensions.pc.internal.domain.rating.gen;

import com.guidewire.pc.domain.rating.impl.CalcRoutineDefinitionImpl;
import extensions.pc.internal.domain.rating.impl.CalcRoutineDefinitionExtInternal;
import extensions.pc.internal.domain.rating.impl.CalcRoutineDefinitionExtMethodsImpl;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public class CalcRoutineDefinitionExtStub
    extends CalcRoutineDefinitionImpl
    implements CalcRoutineDefinitionExtInternal
{


    @Override
    public Jurisdiction getJurisdiction() {
        return getExtensionDelegate(CalcRoutineDefinitionExtMethodsImpl.class).getJurisdiction();
    }

    @Override
    public void setJurisdiction(Jurisdiction value) {
        getExtensionDelegate(CalcRoutineDefinitionExtMethodsImpl.class).setJurisdiction(value);
    }

}
