
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.Organization;

public abstract class OrganizationExtMethodsStub
    extends AspectBase
    implements OrganizationExtInternalMethodsStubI
{


    protected OrganizationExtMethodsStub(Organization owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public Organization getOwner() {
        return ((Organization) super.getOwner());
    }

    @Override
    public String getNameKanji() {
        return ((String) getFieldValueForCodegen(NAMEKANJI_PROP.get()));
    }

    @Override
    public void setNameKanji(String value) {
        setFieldValueForCodegen(NAMEKANJI_PROP.get(), value);
    }

}
