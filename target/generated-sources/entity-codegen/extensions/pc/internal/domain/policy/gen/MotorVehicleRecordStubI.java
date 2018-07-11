
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.MotorVehicleRecord;
import gw.pc.account.entity.Driver;
import gw.pc.contact.typekey.MvrCategory;
import gw.pc.contact.typekey.MvrRecordType;
import gw.pl.persistence.core.entity.Retireable;

public interface MotorVehicleRecordStubI
    extends Retireable
{

    EntityIntrinsicTypeReference<MotorVehicleRecord> TYPE = new EntityIntrinsicTypeReference<MotorVehicleRecord>("entity.MotorVehicleRecord");
    ColumnPropertyInfoCache CODE_PROP = new ColumnPropertyInfoCache(TYPE, "Code");
    ColumnPropertyInfoCache CONVICTIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ConvictionDate");
    ColumnPropertyInfoCache DESCRIPTION_PROP = new ColumnPropertyInfoCache(TYPE, "Description");
    ColumnPropertyInfoCache POINTS_PROP = new ColumnPropertyInfoCache(TYPE, "Points");
    ColumnPropertyInfoCache VIOLATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ViolationDate");
    TypekeyPropertyInfoCache CATEGORY_PROP = new TypekeyPropertyInfoCache(TYPE, "Category");
    TypekeyPropertyInfoCache RECORDTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "RecordType");
    LinkPropertyInfoCache DRIVER_PROP = new LinkPropertyInfoCache(TYPE, "Driver");
    ColumnPropertyInfoCache RETIREDVALUE_PROP = new ColumnPropertyInfoCache(TYPE, "RetiredValue");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");

    /**
     * Gets the value of the Code field.
     * Deprecated in PC 7.0 - Cited code or statute for the violation
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Cited code or statute for the violation
     */
    @Deprecated
    String getCode();

    /**
     * Sets the value of the Code field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Cited code or statute for the violation
     */
    @Deprecated
    void setCode(String value);

    /**
     * Gets the value of the ConvictionDate field.
     * Deprecated in PC 7.0 - Date of conviction or reinstatement of license
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Date of conviction or reinstatement of license
     */
    @Deprecated
    Date getConvictionDate();

    /**
     * Sets the value of the ConvictionDate field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Date of conviction or reinstatement of license
     */
    @Deprecated
    void setConvictionDate(Date value);

    /**
     * Gets the value of the Description field.
     * Deprecated in PC 7.0 - Short description of the motor vehicle record
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Short description of the motor vehicle record
     */
    @Deprecated
    String getDescription();

    /**
     * Sets the value of the Description field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Short description of the motor vehicle record
     */
    @Deprecated
    void setDescription(String value);

    /**
     * Gets the value of the Points field.
     * Deprecated in PC 7.0 - The number of points added to the driver's record for this violation
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The number of points added to the driver's record for this violation
     */
    @Deprecated
    Integer getPoints();

    /**
     * Sets the value of the Points field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The number of points added to the driver's record for this violation
     */
    @Deprecated
    void setPoints(Integer value);

    /**
     * Gets the value of the ViolationDate field.
     * Deprecated in PC 7.0 - Date of violation or suspension of license
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Date of violation or suspension of license
     */
    @Deprecated
    Date getViolationDate();

    /**
     * Sets the value of the ViolationDate field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Date of violation or suspension of license
     */
    @Deprecated
    void setViolationDate(Date value);

    /**
     * Gets the value of the Category field.
     * Deprecated in PC 7.0 - More detailed categorization of records
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - More detailed categorization of records
     */
    @Deprecated
    MvrCategory getCategory();

    /**
     * Sets the value of the Category field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - More detailed categorization of records
     */
    @Deprecated
    void setCategory(MvrCategory value);

    /**
     * Gets the value of the RecordType field.
     * Deprecated in PC 7.0 - Broad category of motor vehicle record
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Broad category of motor vehicle record
     */
    @Deprecated
    MvrRecordType getRecordType();

    /**
     * Sets the value of the RecordType field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - Broad category of motor vehicle record
     */
    @Deprecated
    void setRecordType(MvrRecordType value);

    /**
     * Gets the value of the Driver field.
     * Deprecated in PC 7.0 - The Driver to which this report belongs
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The Driver to which this report belongs
     */
    @Deprecated
    Driver getDriver();

    /**
     * Sets the value of the Driver field.
     * 
     * @deprecated
     *     Deprecated in PC 7.0 - The Driver to which this report belongs
     */
    @Deprecated
    void setDriver(Driver value);

}
