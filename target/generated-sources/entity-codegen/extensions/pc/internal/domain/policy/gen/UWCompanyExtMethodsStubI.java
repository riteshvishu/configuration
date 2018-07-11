
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import gw.pc.policy.entity.UWCompany;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public interface UWCompanyExtMethodsStubI {

    ColumnPropertyInfoCache NAICCODE_PROP = new ColumnPropertyInfoCache(UWCompany.TYPE, "NAICCode");
    TypekeyPropertyInfoCache STATE_PROP = new TypekeyPropertyInfoCache(UWCompany.TYPE, "State");

    /**
     * Gets the value of the NAICCode field.
     * In the US, the regulatory ID is the NAIC code: 4-digit group code followed by 5-digit code assigned by the National Association of Insurance Commisioners (NAIC).  Other countries may have similar identifying codes issued by their regulatory bodies.
     * 
     */
    String getNAICCode();

    /**
     * Sets the value of the NAICCode field.
     * 
     */
    void setNAICCode(String value);

    /**
     * Gets the value of the State field.
     * For US underwriters, the state in which the company has its permanent legal residence.
     * 
     */
    Jurisdiction getState();

    /**
     * Sets the value of the State field.
     * 
     */
    void setState(Jurisdiction value);

}
