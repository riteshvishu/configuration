
package extensions.pc.internal.domain.policy.gen;

import java.util.Date;
import com.guidewire.commons.metadata.types.ColumnPropertyInfoCache;
import com.guidewire.commons.metadata.types.EffDatedEntityIntrinsicTypeReference;
import com.guidewire.commons.metadata.types.LinkPropertyInfoCache;
import com.guidewire.commons.metadata.types.TypekeyPropertyInfoCache;
import extensions.pc.policy.entity.WC7CoordinatedPolicy;
import extensions.pc.policy.entity.WC7WorkersCompCond;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.pc.account.entity.LaborContractor;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.geodata.zone.typekey.Jurisdiction;
import gw.pl.persistence.core.effdate.entity.EffDated;

public interface WC7CoordinatedPolicyStubI
    extends EffDatedCopyable, EffDatedLogicalMatcher, EffDated
{

    EffDatedEntityIntrinsicTypeReference<WC7CoordinatedPolicy, PolicyPeriod> TYPE = new EffDatedEntityIntrinsicTypeReference<WC7CoordinatedPolicy, PolicyPeriod>("entity.WC7CoordinatedPolicy");
    ColumnPropertyInfoCache LABORCONTRACTORPOLICYNUMBER_PROP = new ColumnPropertyInfoCache(TYPE, "LaborContractorPolicyNumber");
    ColumnPropertyInfoCache CONTRACTPROJECT_PROP = new ColumnPropertyInfoCache(TYPE, "ContractProject");
    TypekeyPropertyInfoCache STATEPERFORMED_PROP = new TypekeyPropertyInfoCache(TYPE, "StatePerformed");
    LinkPropertyInfoCache WCLINE_PROP = new LinkPropertyInfoCache(TYPE, "WCLine");
    LinkPropertyInfoCache LABORCONTRACTOR_PROP = new LinkPropertyInfoCache(TYPE, "LaborContractor");
    LinkPropertyInfoCache MULTIPLECOORDINDATEDPOLICYCOND_PROP = new LinkPropertyInfoCache(TYPE, "MultipleCoordindatedPolicyCond");
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
     * Gets the value of the LaborContractorPolicyNumber field.
     * 
     * 
     */
    String getLaborContractorPolicyNumber();

    /**
     * Sets the value of the LaborContractorPolicyNumber field.
     * 
     */
    void setLaborContractorPolicyNumber(String value);

    /**
     * Gets the value of the ContractProject field.
     * Contract or Project
     * 
     */
    String getContractProject();

    /**
     * Sets the value of the ContractProject field.
     * 
     */
    void setContractProject(String value);

    /**
     * Gets the value of the StatePerformed field.
     * 
     * 
     */
    Jurisdiction getStatePerformed();

    /**
     * Sets the value of the StatePerformed field.
     * 
     */
    void setStatePerformed(Jurisdiction value);

    /**
     * Gets the value of the WCLine field.
     * 
     * 
     */
    WC7WorkersCompLine getWCLine();

    /**
     * Sets the value of the WCLine field.
     * 
     */
    void setWCLine(WC7WorkersCompLine value);

    /**
     * Gets the value of the LaborContractor field.
     * 
     * 
     */
    LaborContractor getLaborContractor();

    /**
     * Sets the value of the LaborContractor field.
     * 
     */
    void setLaborContractor(LaborContractor value);

    /**
     * Gets the value of the MultipleCoordindatedPolicyCond field.
     * The parent condition for coordinated policies
     * 
     */
    WC7WorkersCompCond getMultipleCoordindatedPolicyCond();

    WC7CoordinatedPolicy getBasedOn();

    WC7CoordinatedPolicy getSlice(Date sliceDate);

    WC7CoordinatedPolicy getUnsliced();

    PolicyPeriod getBranch();

    WC7CoordinatedPolicy split(Date splitDate);

    WC7CoordinatedPolicy clone();

}
