
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import extensions.pc.policy.entity.WC7ClassCode;
import extensions.pc.policy.entity.WC7IncludedOwnerOfficer;
import extensions.pc.policy.entity.WC7PolicyOwnerOfficer;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.account.AccountSyncable;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface WC7IncludedOwnerOfficerStubI
    extends WC7PolicyOwnerOfficer, EffDatedCopyable, AccountSyncable
{

    EffDatedEntityIntrinsicTypeReference<WC7IncludedOwnerOfficer, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7IncludedOwnerOfficer, PolicyPeriod>("entity.WC7IncludedOwnerOfficer");
    LinkPropertyInfoCache WC7CLASSCODE_PROP = new LinkPropertyInfoCache(TYPE, "WC7ClassCode");
    LinkPropertyInfoCache OWNEROFFICERCONDITION_PROP = new LinkPropertyInfoCache(TYPE, "OwnerOfficerCondition");
    ColumnPropertyInfoCache PAYROLL_PROP = new ColumnPropertyInfoCache(TYPE, "Payroll");

    /**
     * Gets the value of the WC7ClassCode field.
     * Class Code of this contact
     * 
     */
    WC7ClassCode getWC7ClassCode();

    /**
     * Sets the value of the WC7ClassCode field.
     * 
     */
    void setWC7ClassCode(WC7ClassCode value);

    /**
     * Gets the value of the OwnerOfficerCondition field.
     * The owning Clause (Condition) for this specific scheduled item
     * 
     */
    WC7WorkersCompCond getOwnerOfficerCondition();

    /**
     * Gets the value of the Payroll field.
     * Payroll for the officer
     * 
     */
    Integer getPayroll();

    /**
     * Sets the value of the Payroll field.
     * 
     */
    void setPayroll(Integer value);

}
