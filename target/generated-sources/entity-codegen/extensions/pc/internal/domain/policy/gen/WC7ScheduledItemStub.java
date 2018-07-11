
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.WC7ScheduledItem;

public abstract class WC7ScheduledItemStub
    extends AspectBase
    implements WC7ScheduledItemInternalStubI
{


    protected WC7ScheduledItemStub(WC7ScheduledItem owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public WC7ScheduledItem getOwner() {
        return ((WC7ScheduledItem) super.getOwner());
    }

    @Override
    public String getStringCol3() {
        return ((String) getFieldValueForCodegen(STRINGCOL3_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setStringCol3(String value) {
        setFieldValueForCodegen(STRINGCOL3_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public String getStringCol4() {
        return ((String) getFieldValueForCodegen(STRINGCOL4_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setStringCol4(String value) {
        setFieldValueForCodegen(STRINGCOL4_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

    @Override
    public Integer getIntCol2() {
        return ((Integer) getFieldValue(INTCOL2_DYNPROP.get(getOwner().getIntrinsicType())));
    }

    @Override
    public void setIntCol2(Integer value) {
        setFieldValue(INTCOL2_DYNPROP.get(getOwner().getIntrinsicType()), value);
    }

}
