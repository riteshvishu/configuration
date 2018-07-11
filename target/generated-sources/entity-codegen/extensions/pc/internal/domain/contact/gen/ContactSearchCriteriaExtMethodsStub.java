
package extensions.pc.internal.domain.contact.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.contact.entity.ContactSearchCriteria;

public abstract class ContactSearchCriteriaExtMethodsStub
    extends AspectBase
    implements ContactSearchCriteriaExtInternalMethodsStubI
{


    protected ContactSearchCriteriaExtMethodsStub(ContactSearchCriteria owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public ContactSearchCriteria getOwner() {
        return ((ContactSearchCriteria) super.getOwner());
    }

    @Override
    public String getFirstNameKanji() {
        return ((String) getFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get()));
    }

    @Override
    public void setFirstNameKanji(String value) {
        setFieldValueForCodegen(FIRSTNAMEKANJI_PROP.get(), value);
    }

    @Override
    public String getKeywordKanji() {
        return ((String) getFieldValueForCodegen(KEYWORDKANJI_PROP.get()));
    }

    @Override
    public void setKeywordKanji(String value) {
        setFieldValueForCodegen(KEYWORDKANJI_PROP.get(), value);
    }

}
