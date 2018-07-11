
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import com.guidewire.pc.domain.coverage.impl.CoverageInternal;
import com.guidewire.pc.domain.productmodel.CovTermAvailabilityContext;
import com.guidewire.pl.domain.extract.impl.ExtractableInternal;
import com.guidewire.pl.system.entity.proxy.EffDatedBeanProxy;
import extensions.pc.policy.entity.WC7CovCost;
import extensions.pc.policy.entity.WC7WorkersCompLine;
import gw.api.copier.EffDatedCopyable;
import gw.api.domain.covterm.CovTerm;
import gw.api.logicalmatch.EffDatedLogicalMatcher;
import gw.api.productmodel.ClausePattern;
import gw.api.productmodel.CovTermPattern;
import gw.api.reinsurance.ReinsurableCoverable;
import gw.api.web.productmodel.ProductModelSyncIssue;
import gw.lang.reflect.IType;
import gw.pc.coverage.entity.Coverable;
import gw.pc.coverage.entity.Coverage;
import gw.pc.policy.lines.entity.PolicyLine;
import gw.pc.policy.period.entity.PolicyPeriod;
import gw.pl.currency.typekey.Currency;
import gw.pl.extract.entity.Extractable;
import gw.pl.persistence.core.Key;
import gw.pl.persistence.core.effdate.entity.EffDated;
import gw.pl.persistence.core.entity.KeyableBean;

public abstract class WC7WorkersCompCovStub
    extends EffDatedBeanProxy
    implements WC7WorkersCompCovInternalStubI
{


    @Override
    public extensions.pc.policy.typekey.WC7WorkersCompCov getSubtype() {
        return ((extensions.pc.policy.typekey.WC7WorkersCompCov) getFieldValue(SUBTYPE_PROP.get()));
    }

    @Override
    public void setSubtype(extensions.pc.policy.typekey.WC7WorkersCompCov value) {
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
    public Boolean isBooleanTerm2() {
        return ((Boolean) getFieldValue(BOOLEANTERM2_PROP.get()));
    }

    @Override
    public void setBooleanTerm2(Boolean value) {
        setFieldValue(BOOLEANTERM2_PROP.get(), value);
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
    public BigDecimal getDirectTerm3() {
        return ((BigDecimal) getFieldValue(DIRECTTERM3_PROP.get()));
    }

    @Override
    public void setDirectTerm3(BigDecimal value) {
        setFieldValue(DIRECTTERM3_PROP.get(), value);
    }

    @Override
    public Boolean isDirectTerm3Avl() {
        return ((Boolean) getFieldValue(DIRECTTERM3AVL_PROP.get()));
    }

    @Override
    public void setDirectTerm3Avl(Boolean value) {
        setFieldValue(DIRECTTERM3AVL_PROP.get(), value);
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
    public Boolean isStringTerm2Avl() {
        return ((Boolean) getFieldValue(STRINGTERM2AVL_PROP.get()));
    }

    @Override
    public void setStringTerm2Avl(Boolean value) {
        setFieldValue(STRINGTERM2AVL_PROP.get(), value);
    }

    @Override
    public String getStringTerm3() {
        return ((String) getFieldValueForCodegen(STRINGTERM3_PROP.get()));
    }

    @Override
    public void setStringTerm3(String value) {
        setFieldValueForCodegen(STRINGTERM3_PROP.get(), value);
    }

    @Override
    public Boolean isStringTerm3Avl() {
        return ((Boolean) getFieldValue(STRINGTERM3AVL_PROP.get()));
    }

    @Override
    public void setStringTerm3Avl(Boolean value) {
        setFieldValue(STRINGTERM3AVL_PROP.get(), value);
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
    public String getChoiceTerm3() {
        return ((String) getFieldValueForCodegen(CHOICETERM3_PROP.get()));
    }

    @Override
    public void setChoiceTerm3(String value) {
        setFieldValueForCodegen(CHOICETERM3_PROP.get(), value);
    }

    @Override
    public Boolean isChoiceTerm3Avl() {
        return ((Boolean) getFieldValue(CHOICETERM3AVL_PROP.get()));
    }

    @Override
    public void setChoiceTerm3Avl(Boolean value) {
        setFieldValue(CHOICETERM3AVL_PROP.get(), value);
    }

    @Override
    public String getChoiceTerm4() {
        return ((String) getFieldValueForCodegen(CHOICETERM4_PROP.get()));
    }

    @Override
    public void setChoiceTerm4(String value) {
        setFieldValueForCodegen(CHOICETERM4_PROP.get(), value);
    }

    @Override
    public Boolean isChoiceTerm4Avl() {
        return ((Boolean) getFieldValue(CHOICETERM4AVL_PROP.get()));
    }

    @Override
    public void setChoiceTerm4Avl(Boolean value) {
        setFieldValue(CHOICETERM4AVL_PROP.get(), value);
    }

    @Override
    public String getFedEmpLiabLawTerm1() {
        return ((String) getFieldValueForCodegen(FEDEMPLIABLAWTERM1_PROP.get()));
    }

    @Override
    public void setFedEmpLiabLawTerm1(String value) {
        setFieldValueForCodegen(FEDEMPLIABLAWTERM1_PROP.get(), value);
    }

    @Override
    public Boolean isFedEmpLiabLawTerm1Avl() {
        return ((Boolean) getFieldValue(FEDEMPLIABLAWTERM1AVL_PROP.get()));
    }

    @Override
    public void setFedEmpLiabLawTerm1Avl(Boolean value) {
        setFieldValue(FEDEMPLIABLAWTERM1AVL_PROP.get(), value);
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
    public WC7CovCost[] getCosts() {
        return ((WC7CovCost[]) getFieldValue(COSTS_PROP.get()));
    }

    @Override
    public void addToCosts(WC7CovCost value) {
        addArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public void removeFromCosts(WC7CovCost value) {
        removeArrayElement(COSTS_PROP.get(), value);
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCov getBasedOn() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCov) getBasedOnUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCov getSlice(Date sliceDate) {
        return ((extensions.pc.policy.entity.WC7WorkersCompCov) getSliceUntyped(sliceDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCov getUnsliced() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCov) getUnslicedUntyped());
    }

    @Override
    public PolicyPeriod getBranch() {
        return ((PolicyPeriod) getBranchUntyped());
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCov split(Date splitDate) {
        return ((extensions.pc.policy.entity.WC7WorkersCompCov) splitUntyped(splitDate));
    }

    @Override
    public extensions.pc.policy.entity.WC7WorkersCompCov clone() {
        return ((extensions.pc.policy.entity.WC7WorkersCompCov) cloneUntyped());
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
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getPatternCode();
    }

    @Override
    public void setPatternCode(String value) {
        ((CoverageInternal) getEntityDelegate(Coverage.class)).setPatternCode(value);
    }

    @Override
    public Date getReferenceDateInternal() {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getReferenceDateInternal();
    }

    @Override
    public void setReferenceDateInternal(Date value) {
        ((CoverageInternal) getEntityDelegate(Coverage.class)).setReferenceDateInternal(value);
    }

    @Override
    public Currency getCurrency() {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getCurrency();
    }

    @Override
    public void setCurrency(Currency value) {
        ((CoverageInternal) getEntityDelegate(Coverage.class)).setCurrency(value);
    }

    @Override
    public ReinsurableCoverable getReinsurableCoverable() {
        return getEntityDelegate(Coverage.class).getReinsurableCoverable();
    }

    @Override
    public CovTerm[] getCovTerms() {
        return getEntityDelegate(Coverage.class).getCovTerms();
    }

    @Override
    public PolicyLine getPolicyLine() {
        return getEntityDelegate(Coverage.class).getPolicyLine();
    }

    @Override
    public Coverage copyCoverage() {
        return getEntityDelegate(Coverage.class).copyCoverage();
    }

    @Override
    public void fireInitializeEvent() {
        getEntityDelegate(Coverage.class).fireInitializeEvent();
    }

    @Override
    public void fireRemovalEvent() {
        getEntityDelegate(Coverage.class).fireRemovalEvent();
    }

    @Override
    public boolean isCovTermChangedFromBasedOn(CovTermPattern p0) {
        return getEntityDelegate(Coverage.class).isCovTermChangedFromBasedOn(p0);
    }

    @Override
    public ClausePattern getPattern() {
        return getEntityDelegate(Coverage.class).getPattern();
    }

    @Override
    public Coverable getOwningCoverable() {
        return getEntityDelegate(Coverage.class).getOwningCoverable();
    }

    @Override
    public CovTerm getCovTerm(CovTermPattern p0) {
        return getEntityDelegate(Coverage.class).getCovTerm(p0);
    }

    @Override
    public EffDated getBean() {
        return getEntityDelegate(Coverage.class).getBean();
    }

    @Override
    public Date getReferenceDate() {
        return getEntityDelegate(Coverage.class).getReferenceDate();
    }

    @Override
    public void denormalizeReferenceDate() {
        getEntityDelegate(Coverage.class).denormalizeReferenceDate();
    }

    @Override
    public void clearReferenceDateInternal() {
        getEntityDelegate(Coverage.class).clearReferenceDateInternal();
    }

    @Override
    public boolean hasCovTerm(CovTermPattern p0) {
        return getEntityDelegate(Coverage.class).hasCovTerm(p0);
    }

    @Override
    public boolean hasCovTerm(String p0) {
        return getEntityDelegate(Coverage.class).hasCovTerm(p0);
    }

    @Override
    public void syncCovTermsWithProductModel(CovTermAvailabilityContext p0) {
        ((CoverageInternal) getEntityDelegate(Coverage.class)).syncCovTermsWithProductModel(p0);
    }

    @Override
    public IType getProductModelType() {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getProductModelType();
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCovTermsAgainstProductModel(CovTermAvailabilityContext p0) {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).checkCovTermsAgainstProductModel(p0);
    }

    @Override
    public List<? extends ProductModelSyncIssue> checkCovTermsAgainstProductModelwLine(CovTermAvailabilityContext p0, PolicyLine p1, boolean p2) {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).checkCovTermsAgainstProductModelwLine(p0, p1, p2);
    }

    @Override
    public CovTerm getCovTerm(String p0) {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getCovTerm(p0);
    }

    @Override
    public String getProductModelTypeName() {
        return ((CoverageInternal) getEntityDelegate(Coverage.class)).getProductModelTypeName();
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
