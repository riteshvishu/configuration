
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.coverage.impl.PolicyConditionInternal;
import com.guidewire.pc.domain.productmodel.CovTermAvailabilityContext;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.covterm.CovTerm;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.CovTermPattern;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.lang.reflect.IType;
import gw.pc.coverage.entity.Coverable;
import gw.pc.coverage.entity.PolicyCondition;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7WorkersCompCondStub
    extends EffDatedBeanProxy
    implements WC7WorkersCompCondInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7WorkersCompCond getSubtype() {
        return ((extensions.pc.policy.typekey.WC7WorkersCompCond) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7WorkersCompCond value) {
        setFieldValue(SUBTYPE_PROP.get(), value);
    }

    @Override
    public Boolean isBooleanTerm1() {
        return ((Boolean) getFieldValue(BOOLEANTERM1_PROP.get()));
    }

    @Override
    public void setBooleanTerm1(Boolean value) {
        setFieldValue(BOOLEANTERM1_PROP.get(), value);
    }

    @Override
    public Boolean isBooleanTerm1Avl() {
        return ((Boolean) getFieldValue(BOOLEANTERM1AVL_PROP.get()));
    }

    @Override
    public void setBooleanTerm1Avl(Boolean value) {
        setFieldValue(BOOLEANTERM1AVL_PROP.get(), value);
    }

    @Override
    public Boolean isBooleanTerm2() {
        return ((Boolean) getFieldValue(BOOLEANTERM2_PROP.get()));
    }

    @Override
    public void setBooleanTerm2(Boolean value) {
        setFieldValue(BOOLEANTERM2_PROP.get(), value);
    }

    @Override
    public Boolean isBooleanTerm2Avl() {
        return ((Boolean) getFieldValue(BOOLEANTERM2AVL_PROP.get()));
    }

    @Override
    public void setBooleanTerm2Avl(Boolean value) {
        setFieldValue(BOOLEANTERM2AVL_PROP.get(), value);
    }

    @Override
    public String getChoiceTerm1() {
        return ((String) getFieldValueForCodegen(CHOICETERM1_PROP.get()));
    }

    @Override
    public void setChoiceTerm1(String value) {
        setFieldValueForCodegen(CHOICETERM1_PROP.get(), value);
    }

    @Override
    public Boolean isChoiceTerm1Avl() {
        return ((Boolean) getFieldValue(CHOICETERM1AVL_PROP.get()));
    }

    @Override
    public void setChoiceTerm1Avl(Boolean value) {
        setFieldValue(CHOICETERM1AVL_PROP.get(), value);
    }

    @Override
    public String getChoiceTerm2() {
        return ((String) getFieldValueForCodegen(CHOICETERM2_PROP.get()));
    }

    @Override
    public void setChoiceTerm2(String value) {
        setFieldValueForCodegen(CHOICETERM2_PROP.get(), value);
    }

    @Override
    public Boolean isChoiceTerm2Avl() {
        return ((Boolean) getFieldValue(CHOICETERM2AVL_PROP.get()));
    }

    @Override
    public void setChoiceTerm2Avl(Boolean value) {
        setFieldValue(CHOICETERM2AVL_PROP.get(), value);
    }

    @Override
    public BigDecimal getDirectTerm1() {
        return ((BigDecimal) getFieldValue(DIRECTTERM1_PROP.get()));
    }

    @Override
    public void setDirectTerm1(BigDecimal value) {
        setFieldValue(DIRECTTERM1_PROP.get(), value);
    }

    @Override
    public Boolean isDirectTerm1Avl() {
        return ((Boolean) getFieldValue(DIRECTTERM1AVL_PROP.get()));
    }

    @Override
    public void setDirectTerm1Avl(Boolean value) {
        setFieldValue(DIRECTTERM1AVL_PROP.get(), value);
    }

    @Override
    public BigDecimal getDirectTerm2() {
        return ((BigDecimal) getFieldValue(DIRECTTERM2_PROP.get()));
    }

    @Override
    public void setDirectTerm2(BigDecimal value) {
        setFieldValue(DIRECTTERM2_PROP.get(), value);
    }

    @Override
    public Boolean isDirectTerm2Avl() {
        return ((Boolean) getFieldValue(DIRECTTERM2AVL_PROP.get()));
    }

    @Override
    public void setDirectTerm2Avl(Boolean value) {
        setFieldValue(DIRECTTERM2AVL_PROP.get(), value);
    }

    @Override
    public Date getDateTerm1() {
        return ((Date) getFieldValue(DATETERM1_PROP.get()));
    }

    @Override
    public void setDateTerm1(Date value) {
        setFieldValue(DATETERM1_PROP.get(), value);
    }

    @Override
    public Boolean isDateTerm1Avl() {
        return ((Boolean) getFieldValue(DATETERM1AVL_PROP.get()));
    }

    @Override
    public void setDateTerm1Avl(Boolean value) {
        setFieldValue(DATETERM1AVL_PROP.get(), value);
    }

    @Override
    public Date getDateTerm2() {
        return ((Date) getFieldValue(DATETERM2_PROP.get()));
    }

    @Override
    public void setDateTerm2(Date value) {
        setFieldValue(DATETERM2_PROP.get(), value);
    }

    @Override
    public Boolean isDateTerm2Avl() {
        return ((Boolean) getFieldValue(DATETERM2AVL_PROP.get()));
    }

    @Override
    public void setDateTerm2Avl(Boolean value) {
        setFieldValue(DATETERM2AVL_PROP.get(), value);
    }

    @Override
    public String getStringTerm1() {
        return ((String) getFieldValueForCodegen(STRINGTERM1_PROP.get()));
    }

    @Override
    public void setStringTerm1(String value) {
        setFieldValueForCodegen(STRINGTERM1_PROP.get(), value);
    }

    @Override
    public Boolean isStringTerm1Avl() {
        return ((Boolean) getFieldValue(STRINGTERM1AVL_PROP.get()));
    }

    @Override
    public void setStringTerm1Avl(Boolean value) {
        setFieldValue(STRINGTERM1AVL_PROP.get(), value);
    }

    @Override
    public String getStringTerm2() {
        return ((String) getFieldValueForCodegen(STRINGTERM2_PROP.get()));
    }

    @Override
    public void setStringTerm2(String value) {
        setFieldValueForCodegen(STRINGTERM2_PROP.get(), value);
    }

    @Override
    public Boolean isStringTerm1Av2() {
        return ((Boolean) getFieldValue(STRINGTERM1AV2_PROP.get()));
    }

    @Override
    public void setStringTerm1Av2(Boolean value) {
        setFieldValue(STRINGTERM1AV2_PROP.get(), value);
    }

    @Override
    public WC7WorkersCompLine getWCLine() {
        return ((WC7WorkersCompLine) getFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLine(WC7WorkersCompLine value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public Key getWCLineID() {
        return ((Key) getRawFieldValue(WCLINE_PROP.get()));
    }

    @Override
    public void setWCLineID(Key value) {
        setFieldValue(WCLINE_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCond getBasedOn() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCond) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCond getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7WorkersCompCond) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCond getUnsliced() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCond) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCond split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7WorkersCompCond) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCond clone() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCond) cloneUntyped());
    }

    @Override
    public Long getArchivePartition() {
        return ((ExtractableInternal) getEntityDelegate(Extractable.class)).getArchivePartition();
    }

    @Override
    public void setArchivePartition(Long value) {
        ((ExtractableInternal) getEntityDelegate(Extractable.class)).setArchivePartition(value);
    }

    @Override
    public String getPatternCode() {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getPatternCode();
    }

    @Override
    public void setPatternCode(String value) {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).setPatternCode(value);
    }

    @Override
    public Date getReferenceDateInternal() {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getReferenceDateInternal();
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).setReferenceDateInternal(value);
    }

    @Override
    public Currency getCurrency() {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getCurrency();
    }

    @Override
    public void setCurrency(Currency value) {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).setCurrency(value);
    }

    @Override
    public ClausePattern getPattern() {
        return getEntityDelegate(PolicyCondition.class).getPattern();
    }

    @Override
    public Coverable getOwningCoverable() {
        return getEntityDelegate(PolicyCondition.class).getOwningCoverable();
    }

    @Override
    public Date getReferenceDate() {
        return getEntityDelegate(PolicyCondition.class).getReferenceDate();
    }

    @Override
    public void denormalizeReferenceDate() {
        getEntityDelegate(PolicyCondition.class).denormalizeReferenceDate();
    }

    @Override
    public void clearReferenceDateInternal() {
        getEntityDelegate(PolicyCondition.class).clearReferenceDateInternal();
    }

    @Override
    public CovTerm getCovTerm(CovTermPattern p0) {
        return getEntityDelegate(PolicyCondition.class).getCovTerm(p0);
    }

    @Override
    public CovTerm[] getCovTerms() {
        return getEntityDelegate(PolicyCondition.class).getCovTerms();
    }

    @Override
    public PolicyLine getPolicyLine() {
        return getEntityDelegate(PolicyCondition.class).getPolicyLine();
    }

    @Override
    public PolicyCondition copyCondition() {
        return getEntityDelegate(PolicyCondition.class).copyCondition();
    }

    @Override
    public boolean hasCovTerm(CovTermPattern p0) {
        return getEntityDelegate(PolicyCondition.class).hasCovTerm(p0);
    }

    @Override
    public boolean hasCovTerm(String p0) {
        return getEntityDelegate(PolicyCondition.class).hasCovTerm(p0);
    }

    @Override
    public boolean isCovTermChangedFromBasedOn(CovTermPattern p0) {
        return getEntityDelegate(PolicyCondition.class).isCovTermChangedFromBasedOn(p0);
    }

    @Override
    public EffDated getBean() {
        return getEntityDelegate(PolicyCondition.class).getBean();
    }

    @Override
    public void syncCovTermsWithProductModel(CovTermAvailabilityContext p0) {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).syncCovTermsWithProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCovTermsAgainstProductModel(CovTermAvailabilityContext p0) {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).checkCovTermsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCovTermsAgainstProductModelwLine(CovTermAvailabilityContext p0, PolicyLine p1, boolean p2) {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).checkCovTermsAgainstProductModelwLine(p0, p1, p2);
    }

    @Override
    public void fireInitializeEvent() {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).fireInitializeEvent();
    }

    @Override
    public void fireRemovalEvent() {
        ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).fireRemovalEvent();
    }

    @Override
    public String getProductModelTypeName() {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getProductModelTypeName();
    }

    @Override
    public IType getProductModelType() {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getProductModelType();
    }

    @Override
    public CovTerm getCovTerm(String p0) {
        return ((PolicyConditionInternal) getEntityDelegate(PolicyCondition.class)).getCovTerm(p0);
    }

    @Override
    public void copyFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyFromBeanUntyped(p0);
    }

    @Override
    public void copyBasicFieldsFromBeanUntyped(EffDated p0) {
        getInterfaceDelegate(EffDatedCopyable.class).copyBasicFieldsFromBeanUntyped(p0);
    }

    @Override
    public List<EffDated> findMatchesInPeriodUntyped(PolicyPeriod p0, boolean p1) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).findMatchesInPeriodUntyped(p0, p1);
    }

    @Override
    public boolean isLogicalMatchUntyped(KeyableBean p0) {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).isLogicalMatchUntyped(p0);
    }

    @Override
    public Object genKey() {
        return getInterfaceDelegate(EffDatedLogicalMatcher.class).genKey();
    }

}
