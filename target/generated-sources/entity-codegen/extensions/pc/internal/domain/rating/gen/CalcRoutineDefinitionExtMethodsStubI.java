
package extensions.pc.internal.domain.rating.gen;

import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import gw.pc.rating.entity.CalcRoutineDefinition;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public interface CalcRoutineDefinitionExtMethodsStubI {

    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(CalcRoutineDefinition.TYPE, "Jurisdiction");

    /**
     * Gets the value of the Jurisdiction field.
     * The Jurisdiction, if any, of this CalcRoutineDefinition.
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

}
