
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7PolicyContactRole;
import extensions.pc.policy.entity.WC7PolicyOwnerOfficer;
import gw.api.domain.account.AccountSyncable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;

public interface WC7PolicyOwnerOfficerStubI
    extends WC7PolicyContactRole, AccountSyncable
{

    EffDatedEntityIntrinsicTypeReference<WC7PolicyOwnerOfficer, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7PolicyOwnerOfficer, PolicyPeriod>("entity.WC7PolicyOwnerOfficer");
    ColumnPropertyInfoCache WC7OWNERSHIPPCT_PROP = new ColumnPropertyInfoCache(TYPE, "WC7OwnershipPct");
    TypekeyPropertyInfoCache RELATIONSHIPTITLEINTERNAL_PROP = new TypekeyPropertyInfoCache(TYPE, "RelationshipTitleInternal");
    TypekeyPropertyInfoCache JURISDICTION_PROP = new TypekeyPropertyInfoCache(TYPE, "Jurisdiction");

    /**
     * Gets the value of the WC7OwnershipPct field.
     * Ownership percentage
     * 
     */
    Integer getWC7OwnershipPct();

    /**
     * Sets the value of the WC7OwnershipPct field.
     * 
     */
    void setWC7OwnershipPct(Integer value);

    /**
     * Gets the value of the Jurisdiction field.
     * The jurisdiction in which this contact is defined
     * 
     */
    Jurisdiction getJurisdiction();

    /**
     * Sets the value of the Jurisdiction field.
     * 
     */
    void setJurisdiction(Jurisdiction value);

}
