
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import com.guidewire.pc.domain.coverage.impl.CoverageInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7WorkersCompCov;
import gw.pl.persistence.core.Key;

public interface WC7WorkersCompCovInternalStubI
    extends CoverageInternal, EffDatedInternal, WC7WorkersCompCovStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7WorkersCompCov value);

    /**
     * Gets the value of the BooleanTerm1 field.
     * boolean cov term field
     * 
     */
    Boolean isBooleanTerm1();

    /**
     * Sets the value of the BooleanTerm1 field.
     * 
     */
    void setBooleanTerm1(Boolean value);

    /**
     * Gets the value of the BooleanTerm2 field.
     * boolean cov term field
     * 
     */
    Boolean isBooleanTerm2();

    /**
     * Sets the value of the BooleanTerm2 field.
     * 
     */
    void setBooleanTerm2(Boolean value);

    /**
     * Gets the value of the DirectTerm1 field.
     * direct cov term field
     * 
     */
    BigDecimal getDirectTerm1();

    /**
     * Sets the value of the DirectTerm1 field.
     * 
     */
    void setDirectTerm1(BigDecimal value);

    /**
     * Gets the value of the DirectTerm1Avl field.
     * whether or not the DirectTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isDirectTerm1Avl();

    /**
     * Sets the value of the DirectTerm1Avl field.
     * 
     */
    void setDirectTerm1Avl(Boolean value);

    /**
     * Gets the value of the DirectTerm2 field.
     * direct cov term field
     * 
     */
    BigDecimal getDirectTerm2();

    /**
     * Sets the value of the DirectTerm2 field.
     * 
     */
    void setDirectTerm2(BigDecimal value);

    /**
     * Gets the value of the DirectTerm2Avl field.
     * whether or not the DirectTerm2 field was available the last time availability was checked
     * 
     */
    Boolean isDirectTerm2Avl();

    /**
     * Sets the value of the DirectTerm2Avl field.
     * 
     */
    void setDirectTerm2Avl(Boolean value);

    /**
     * Gets the value of the DirectTerm3 field.
     * direct cov term field
     * 
     */
    BigDecimal getDirectTerm3();

    /**
     * Sets the value of the DirectTerm3 field.
     * 
     */
    void setDirectTerm3(BigDecimal value);

    /**
     * Gets the value of the DirectTerm3Avl field.
     * whether or not the DirectTerm3 field was available the last time availability was checked
     * 
     */
    Boolean isDirectTerm3Avl();

    /**
     * Sets the value of the DirectTerm3Avl field.
     * 
     */
    void setDirectTerm3Avl(Boolean value);

    /**
     * Gets the value of the StringTerm1 field.
     * string cov term field
     * 
     */
    String getStringTerm1();

    /**
     * Sets the value of the StringTerm1 field.
     * 
     */
    void setStringTerm1(String value);

    /**
     * Gets the value of the StringTerm1Avl field.
     * whether or not the StringTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isStringTerm1Avl();

    /**
     * Sets the value of the StringTerm1Avl field.
     * 
     */
    void setStringTerm1Avl(Boolean value);

    /**
     * Gets the value of the StringTerm2 field.
     * string cov term field
     * 
     */
    String getStringTerm2();

    /**
     * Sets the value of the StringTerm2 field.
     * 
     */
    void setStringTerm2(String value);

    /**
     * Gets the value of the StringTerm2Avl field.
     * whether or not the StringTerm2 field was available the last time availability was checked
     * 
     */
    Boolean isStringTerm2Avl();

    /**
     * Sets the value of the StringTerm2Avl field.
     * 
     */
    void setStringTerm2Avl(Boolean value);

    /**
     * Gets the value of the StringTerm3 field.
     * string cov term field
     * 
     */
    String getStringTerm3();

    /**
     * Sets the value of the StringTerm3 field.
     * 
     */
    void setStringTerm3(String value);

    /**
     * Gets the value of the StringTerm3Avl field.
     * whether or not the StringTerm3 field was available the last time availability was checked
     * 
     */
    Boolean isStringTerm3Avl();

    /**
     * Sets the value of the StringTerm3Avl field.
     * 
     */
    void setStringTerm3Avl(Boolean value);

    /**
     * Gets the value of the ChoiceTerm1 field.
     * choice cov term field
     * 
     */
    String getChoiceTerm1();

    /**
     * Sets the value of the ChoiceTerm1 field.
     * 
     */
    void setChoiceTerm1(String value);

    /**
     * Gets the value of the ChoiceTerm1Avl field.
     * whether or not the ChoiceTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isChoiceTerm1Avl();

    /**
     * Sets the value of the ChoiceTerm1Avl field.
     * 
     */
    void setChoiceTerm1Avl(Boolean value);

    /**
     * Gets the value of the ChoiceTerm2 field.
     * choice cov term field
     * 
     */
    String getChoiceTerm2();

    /**
     * Sets the value of the ChoiceTerm2 field.
     * 
     */
    void setChoiceTerm2(String value);

    /**
     * Gets the value of the ChoiceTerm2Avl field.
     * whether or not the ChoiceTerm2 field was available the last time availability was checked
     * 
     */
    Boolean isChoiceTerm2Avl();

    /**
     * Sets the value of the ChoiceTerm2Avl field.
     * 
     */
    void setChoiceTerm2Avl(Boolean value);

    /**
     * Gets the value of the ChoiceTerm3 field.
     * choice cov term field
     * 
     */
    String getChoiceTerm3();

    /**
     * Sets the value of the ChoiceTerm3 field.
     * 
     */
    void setChoiceTerm3(String value);

    /**
     * Gets the value of the ChoiceTerm3Avl field.
     * whether or not the ChoiceTerm3 field was available the last time availability was checked
     * 
     */
    Boolean isChoiceTerm3Avl();

    /**
     * Sets the value of the ChoiceTerm3Avl field.
     * 
     */
    void setChoiceTerm3Avl(Boolean value);

    /**
     * Gets the value of the ChoiceTerm4 field.
     * choice cov term field
     * 
     */
    String getChoiceTerm4();

    /**
     * Sets the value of the ChoiceTerm4 field.
     * 
     */
    void setChoiceTerm4(String value);

    /**
     * Gets the value of the ChoiceTerm4Avl field.
     * whether or not the ChoiceTerm4 field was available the last time availability was checked
     * 
     */
    Boolean isChoiceTerm4Avl();

    /**
     * Sets the value of the ChoiceTerm4Avl field.
     * 
     */
    void setChoiceTerm4Avl(Boolean value);

    /**
     * Gets the value of the FedEmpLiabLawTerm1 field.
     * choice cov term field
     * 
     */
    String getFedEmpLiabLawTerm1();

    /**
     * Sets the value of the FedEmpLiabLawTerm1 field.
     * 
     */
    void setFedEmpLiabLawTerm1(String value);

    /**
     * Gets the value of the FedEmpLiabLawTerm1Avl field.
     * whether or not the FedEmpLiabLawTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isFedEmpLiabLawTerm1Avl();

    /**
     * Sets the value of the FedEmpLiabLawTerm1Avl field.
     * 
     */
    void setFedEmpLiabLawTerm1Avl(Boolean value);

    Key getWCLineID();

    void setWCLineID(Key value);

}
