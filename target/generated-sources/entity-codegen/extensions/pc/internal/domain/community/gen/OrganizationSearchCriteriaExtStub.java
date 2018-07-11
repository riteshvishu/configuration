
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pc.domain.community.impl.OrganizationSearchCriteriaCoreExtImpl;
import extensions.pc.internal.domain.community.impl.OrganizationSearchCriteriaExtInternal;
import extensions.pc.internal.domain.community.impl.OrganizationSearchCriteriaExtMethodsImpl;

public class OrganizationSearchCriteriaExtStub
    extends OrganizationSearchCriteriaCoreExtImpl
    implements OrganizationSearchCriteriaExtInternal
{


    @Override
    public String getNameKanji() {
        return getExtensionDelegate(OrganizationSearchCriteriaExtMethodsImpl.class).getNameKanji();
    }

    @Override
    public void setNameKanji(String value) {
        getExtensionDelegate(OrganizationSearchCriteriaExtMethodsImpl.class).setNameKanji(value);
    }

    @Override
    public String getContactCityKanji() {
        return getExtensionDelegate(OrganizationSearchCriteriaExtMethodsImpl.class).getContactCityKanji();
    }

    @Override
    public void setContactCityKanji(String value) {
        getExtensionDelegate(OrganizationSearchCriteriaExtMethodsImpl.class).setContactCityKanji(value);
    }

}
