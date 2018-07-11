
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import com.guidewire.pl.system.entity.SubtypeBean;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import extensions.pc.policy.typekey.WC7EmployeeLeasingPolicyType;
import extensions.pc.policy.typekey.WC7ProfessionalEmployeeType;
import gw.api.copier.EffDatedCopyable;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7EmployeeLeasingPlanStubI
    extends SubtypeBean, EffDatedCopyable, EffDated
{

    EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7EmployeeLeasingPlan, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<extensions.pc.policy.entity.WC7EmployeeLeasingPlan, PolicyPeriod>("entity.WC7EmployeeLeasingPlan");
    TypekeyPropertyInfoCache SUBTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "Subtype");
    TypekeyPropertyInfoCache PROFESSIONALEMPLOYEETYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ProfessionalEmployeeType");
    TypekeyPropertyInfoCache POLICYTYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "PolicyType");
    LinkPropertyInfoCache WC7WORKERSCOMPLINE_PROP = new LinkPropertyInfoCache(TYPE, "WC7WorkersCompLine");
    ColumnPropertyInfoCache EFFECTIVEDATE_PROP = new ColumnPropertyInfoCache(TYPE, "EffectiveDate");
    ColumnPropertyInfoCache EXPIRATIONDATE_PROP = new ColumnPropertyInfoCache(TYPE, "ExpirationDate");
    TypekeyPropertyInfoCache CHANGETYPE_PROP = new TypekeyPropertyInfoCache(TYPE, "ChangeType");
    ColumnPropertyInfoCache CREATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "CreateTime");
    ColumnPropertyInfoCache UPDATETIME_PROP = new ColumnPropertyInfoCache(TYPE, "UpdateTime");
    LinkPropertyInfoCache CREATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "CreateUser");
    LinkPropertyInfoCache UPDATEUSER_PROP = new LinkPropertyInfoCache(TYPE, "UpdateUser");
    ColumnPropertyInfoCache BEANVERSION_PROP = new ColumnPropertyInfoCache(TYPE, "BeanVersion");
    ColumnPropertyInfoCache ID_PROP = new ColumnPropertyInfoCache(TYPE, "ID");
    ColumnPropertyInfoCache PUBLICID_PROP = new ColumnPropertyInfoCache(TYPE, "PublicID");
    ColumnPropertyInfoCache ARCHIVEPARTITION_PROP = new ColumnPropertyInfoCache(TYPE, "ArchivePartition");

    /**
     * Gets the value of the Subtype field.
     * Auto-generated subtype column
     * 
     */
    extensions.pc.policy.typekey.WC7EmployeeLeasingPlan getSubtype();

    /**
     * Gets the value of the ProfessionalEmployeeType field.
     * The type of employee for the employee leasing plan.
     * 
     */
    WC7ProfessionalEmployeeType getProfessionalEmployeeType();

    /**
     * Sets the value of the ProfessionalEmployeeType field.
     * 
     */
    void setProfessionalEmployeeType(WC7ProfessionalEmployeeType value);

    /**
     * Gets the value of the PolicyType field.
     * The type of employee leasing policy.
     * 
     */
    WC7EmployeeLeasingPolicyType getPolicyType();

    /**
     * Sets the value of the PolicyType field.
     * 
     */
    void setPolicyType(WC7EmployeeLeasingPolicyType value);

    /**
     * Gets the value of the WC7WorkersCompLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWC7WorkersCompLine();

    /**
     * Sets the value of the WC7WorkersCompLine field.
     * 
     */
    void setWC7WorkersCompLine(WC7WorkersCompLine value);

    extensions.pc.policy.entity.WC7EmployeeLeasingPlan getBasedOn();

    extensions.pc.policy.entity.WC7EmployeeLeasingPlan getSlice(Date sliceDate);

    extensions.pc.policy.entity.WC7EmployeeLeasingPlan getUnsliced();

    PolicyPeriod getBranch();

    extensions.pc.policy.entity.WC7EmployeeLeasingPlan split(Date splitDate);

    extensions.pc.policy.entity.WC7EmployeeLeasingPlan clone();

}
