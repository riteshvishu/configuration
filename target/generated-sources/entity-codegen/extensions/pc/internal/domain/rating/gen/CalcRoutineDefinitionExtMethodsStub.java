
package extensions.pc.internal.domain.rating.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pc.rating.entity.CalcRoutineDefinition;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public abstract class CalcRoutineDefinitionExtMethodsStub
    extends AspectBase
    implements CalcRoutineDefinitionExtInternalMethodsStubI
{


    protected CalcRoutineDefinitionExtMethodsStub(CalcRoutineDefinition owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public CalcRoutineDefinition getOwner() {
        return ((CalcRoutineDefinition) super.getOwner());
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
