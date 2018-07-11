
package extensions.pc.internal.domain.community.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import gw.pl.community.entity.GroupSearchCriteria;

public abstract class GroupSearchCriteriaExtMethodsStub
    extends AspectBase
    implements GroupSearchCriteriaExtInternalMethodsStubI
{


    protected GroupSearchCriteriaExtMethodsStub(GroupSearchCriteria owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public GroupSearchCriteria getOwner() {
        return ((GroupSearchCriteria) super.getOwner());
    }

    @Override
    public String getGroupNameKanji() {
        return ((String) getFieldValueForCodegen(GROUPNAMEKANJI_PROP.get()));
    }

    @Override
    public void setGroupNameKanji(String value) {
        setFieldValueForCodegen(GROUPNAMEKANJI_PROP.get(), value);
    }

}
