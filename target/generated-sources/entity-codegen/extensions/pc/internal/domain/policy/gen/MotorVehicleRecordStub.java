
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import gw.pc.account.entity.Driver;
import gw.pc.contact.typekey.MvrCategory;
import gw.pc.contact.typekey.MvrRecordType;
import gw.pl.persistence.core.Key;

public abstract class MotorVehicleRecordStub
    extends AbstractEditableRetireableBeanProxy
    implements MotorVehicleRecordInternalStubI
{


    @Override
    public String getCode() {
        return ((String) getFieldValueForCodegen(CODE_PROP.get()));
    }

    @Override
    public void setCode(String value) {
        setFieldValueForCodegen(CODE_PROP.get(), value);
    }

    @Override
    public Date getConvictionDate() {
        return ((Date) getFieldValue(CONVICTIONDATE_PROP.get()));
    }

    @Override
    public void setConvictionDate(Date value) {
        setFieldValue(CONVICTIONDATE_PROP.get(), value);
    }

    @Override
    public String getDescription() {
        return ((String) getFieldValueForCodegen(DESCRIPTION_PROP.get()));
    }

    @Override
    public void setDescription(String value) {
        setFieldValueForCodegen(DESCRIPTION_PROP.get(), value);
    }

    @Override
    public Integer getPoints() {
        return ((Integer) getFieldValue(POINTS_PROP.get()));
    }

    @Override
    public void setPoints(Integer value) {
        setFieldValue(POINTS_PROP.get(), value);
    }

    @Override
    public Date getViolationDate() {
        return ((Date) getFieldValue(VIOLATIONDATE_PROP.get()));
    }

    @Override
    public void setViolationDate(Date value) {
        setFieldValue(VIOLATIONDATE_PROP.get(), value);
    }

    @Override
    public MvrCategory getCategory() {
        return ((MvrCategory) getFieldValue(CATEGORY_PROP.get()));
    }

    @Override
    public void setCategory(MvrCategory value) {
        setFieldValue(CATEGORY_PROP.get(), value);
    }

    @Override
    public MvrRecordType getRecordType() {
        return ((MvrRecordType) getFieldValue(RECORDTYPE_PROP.get()));
    }

    @Override
    public void setRecordType(MvrRecordType value) {
        setFieldValue(RECORDTYPE_PROP.get(), value);
    }

    @Override
    public Driver getDriver() {
        return ((Driver) getFieldValue(DRIVER_PROP.get()));
    }

    @Override
    public void setDriver(Driver value) {
        setFieldValue(DRIVER_PROP.get(), value);
    }

    @Override
    public Key getDriverID() {
        return ((Key) getRawFieldValue(DRIVER_PROP.get()));
    }

    @Override
    public void setDriverID(Key value) {
        setFieldValue(DRIVER_PROP.get(), value);
    }

}
