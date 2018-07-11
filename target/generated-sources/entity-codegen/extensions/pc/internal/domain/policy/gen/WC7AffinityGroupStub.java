
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.pl.system.entity.proxy.AbstractEditableRetireableBeanProxy;
import extensions.pc.policy.entity.WC7AffinityGroupJurisdiction;
import extensions.pc.policy.entity.WC7AffinityGroupProducerCode;
import extensions.pc.policy.entity.WC7AffinityGroupProduct;
import extensions.pc.policy.typekey.WC7AffinityGroupType;
import gw.pl.community.entity.Organization;
import gw.pl.persistence.core.Key;

public abstract class WC7AffinityGroupStub
    extends AbstractEditableRetireableBeanProxy
    implements WC7AffinityGroupInternalStubI
{


    @Override
    public String getName() {
        return ((String) getFieldValueForCodegen(NAME_PROP.get()));
    }

    @Override
    public void setName(String value) {
        setFieldValueForCodegen(NAME_PROP.get(), value);
    }

    @Override
    public String getNameDenorm() {
        return ((String) getFieldValueForCodegen(NAMEDENORM_PROP.get()));
    }

    @Override
    public void setNameDenorm(String value) {
        setFieldValueForCodegen(NAMEDENORM_PROP.get(), value);
    }

    @Override
    public WC7AffinityGroupType getAffinityGroupType() {
        return ((WC7AffinityGroupType) getFieldValue(AFFINITYGROUPTYPE_PROP.get()));
    }

    @Override
    public void setAffinityGroupType(WC7AffinityGroupType value) {
        setFieldValue(AFFINITYGROUPTYPE_PROP.get(), value);
    }

    @Override
    public Organization getOrganization() {
        return ((Organization) getFieldValue(ORGANIZATION_PROP.get()));
    }

    @Override
    public void setOrganization(Organization value) {
        setFieldValue(ORGANIZATION_PROP.get(), value);
    }

    @Override
    public Key getOrganizationID() {
        return ((Key) getRawFieldValue(ORGANIZATION_PROP.get()));
    }

    @Override
    public void setOrganizationID(Key value) {
        setFieldValue(ORGANIZATION_PROP.get(), value);
    }

    @Override
    public String getPrimaryContactFirstName() {
        return ((String) getFieldValueForCodegen(PRIMARYCONTACTFIRSTNAME_PROP.get()));
    }

    @Override
    public void setPrimaryContactFirstName(String value) {
        setFieldValueForCodegen(PRIMARYCONTACTFIRSTNAME_PROP.get(), value);
    }

    @Override
    public String getPrimaryContactFirstNameDenorm() {
        return ((String) getFieldValueForCodegen(PRIMARYCONTACTFIRSTNAMEDENORM_PROP.get()));
    }

    @Override
    public void setPrimaryContactFirstNameDenorm(String value) {
        setFieldValueForCodegen(PRIMARYCONTACTFIRSTNAMEDENORM_PROP.get(), value);
    }

    @Override
    public String getPrimaryContactLastName() {
        return ((String) getFieldValueForCodegen(PRIMARYCONTACTLASTNAME_PROP.get()));
    }

    @Override
    public void setPrimaryContactLastName(String value) {
        setFieldValueForCodegen(PRIMARYCONTACTLASTNAME_PROP.get(), value);
    }

    @Override
    public String getPrimaryContactLastNameDenorm() {
        return ((String) getFieldValueForCodegen(PRIMARYCONTACTLASTNAMEDENORM_PROP.get()));
    }

    @Override
    public void setPrimaryContactLastNameDenorm(String value) {
        setFieldValueForCodegen(PRIMARYCONTACTLASTNAMEDENORM_PROP.get(), value);
    }

    @Override
    public String getPrimaryContactPhone() {
        return ((String) getFieldValueForCodegen(PRIMARYCONTACTPHONE_PROP.get()));
    }

    @Override
    public void setPrimaryContactPhone(String value) {
        setFieldValueForCodegen(PRIMARYCONTACTPHONE_PROP.get(), value);
    }

    @Override
    public Date getStartDate() {
        return ((Date) getFieldValue(STARTDATE_PROP.get()));
    }

    @Override
    public void setStartDate(Date value) {
        setFieldValue(STARTDATE_PROP.get(), value);
    }

    @Override
    public Date getEndDate() {
        return ((Date) getFieldValue(ENDDATE_PROP.get()));
    }

    @Override
    public void setEndDate(Date value) {
        setFieldValue(ENDDATE_PROP.get(), value);
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
    public WC7AffinityGroupJurisdiction[] getJurisdictions() {
        return ((WC7AffinityGroupJurisdiction[]) getFieldValue(JURISDICTIONS_PROP.get()));
    }

    @Override
    public void addToJurisdictions(WC7AffinityGroupJurisdiction value) {
        addArrayElement(JURISDICTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromJurisdictions(WC7AffinityGroupJurisdiction value) {
        removeArrayElement(JURISDICTIONS_PROP.get(), value);
    }

    @Override
    public WC7AffinityGroupProducerCode[] getAffinityGroupProducerCodes() {
        return ((WC7AffinityGroupProducerCode[]) getFieldValue(AFFINITYGROUPPRODUCERCODES_PROP.get()));
    }

    @Override
    public void addToAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        addArrayElement(AFFINITYGROUPPRODUCERCODES_PROP.get(), value);
    }

    @Override
    public void removeFromAffinityGroupProducerCodes(WC7AffinityGroupProducerCode value) {
        removeArrayElement(AFFINITYGROUPPRODUCERCODES_PROP.get(), value);
    }

    @Override
    public WC7AffinityGroupProduct[] getProducts() {
        return ((WC7AffinityGroupProduct[]) getFieldValue(PRODUCTS_PROP.get()));
    }

    @Override
    public void addToProducts(WC7AffinityGroupProduct value) {
        addArrayElement(PRODUCTS_PROP.get(), value);
    }

    @Override
    public void removeFromProducts(WC7AffinityGroupProduct value) {
        removeArrayElement(PRODUCTS_PROP.get(), value);
    }

}
