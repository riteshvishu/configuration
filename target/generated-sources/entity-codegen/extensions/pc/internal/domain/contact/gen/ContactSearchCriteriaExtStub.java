
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pc.domain.contact.impl.ContactSearchCriteriaCoreExtImpl;
import extensions.pc.internal.domain.contact.impl.ContactSearchCriteriaExtInternal;
import extensions.pc.internal.domain.contact.impl.ContactSearchCriteriaExtMethodsImpl;

public class ContactSearchCriteriaExtStub
    extends ContactSearchCriteriaCoreExtImpl
    implements ContactSearchCriteriaExtInternal
{


    @Override
    public String getFirstNameKanji() {
        return getExtensionDelegate(ContactSearchCriteriaExtMethodsImpl.class).getFirstNameKanji();
    }

    @Override
    public void setFirstNameKanji(String value) {
        getExtensionDelegate(ContactSearchCriteriaExtMethodsImpl.class).setFirstNameKanji(value);
    }

    @Override
    public String getKeywordKanji() {
        return getExtensionDelegate(ContactSearchCriteriaExtMethodsImpl.class).getKeywordKanji();
    }

    @Override
    public void setKeywordKanji(String value) {
        getExtensionDelegate(ContactSearchCriteriaExtMethodsImpl.class).setKeywordKanji(value);
    }

}
