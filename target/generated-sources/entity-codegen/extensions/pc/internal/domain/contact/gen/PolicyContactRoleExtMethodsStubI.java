
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import gw.pc.contact.entity.PolicyContactRole;

public interface PolicyContactRoleExtMethodsStubI {

    ColumnPropertyInfoCache COMPANYNAMEKANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyContactRole.TYPE, "CompanyNameKanjiInternal");
    ColumnPropertyInfoCache FIRSTNAMEKANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyContactRole.TYPE, "FirstNameKanjiInternal");
    ColumnPropertyInfoCache LASTNAMEKANJIINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyContactRole.TYPE, "LastNameKanjiInternal");
    ColumnPropertyInfoCache PARTICLEINTERNAL_PROP = new ColumnPropertyInfoCache(PolicyContactRole.TYPE, "ParticleInternal");

    /**
     * Gets the value of the ParticleInternal field.
     * Particle for (French) name
     * 
     */
    String getParticleInternal();

    /**
     * Sets the value of the ParticleInternal field.
     * 
     */
    void setParticleInternal(String value);

}
