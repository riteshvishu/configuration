
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.OrganizationSearchCriteria;

public abstract class OrganizationSearchCriteriaExtMethodsStub
    extends AspectBase
    implements OrganizationSearchCriteriaExtInternalMethodsStubI
{


    protected OrganizationSearchCriteriaExtMethodsStub(OrganizationSearchCriteria owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public OrganizationSearchCriteria getOwner() {
        return ((OrganizationSearchCriteria) super.getOwner());
    }

    @Override
    public String getNameKanji() {
        return ((String) getFieldValueForCodegen(NAMEKANJI_PROP.get()));
    }

    @Override
    public void setNameKanji(String value) {
        setFieldValueForCodegen(NAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getContactCityKanji() {
        return ((String) getFieldValueForCodegen(CONTACTCITYKANJI_PROP.get()));
    }

    @Override
    public void setContactCityKanji(String value) {
        setFieldValueForCodegen(CONTACTCITYKANJI_PROP.get(), value);
    }

}
