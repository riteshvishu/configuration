
package extensions.pc.internal.domain.policy.gen;

import java.math.BigDecimal;
import java.util.Date;
import com.guidewire.pc.domain.coverage.impl.ExclusionInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7WorkersCompExcl;
import gw.pl.persistence.core.Key;

public interface WC7WorkersCompExclInternalStubI
    extends ExclusionInternal, EffDatedInternal, WC7WorkersCompExclStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7WorkersCompExcl value);

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
     * Gets the value of the BooleanTerm1Avl field.
     * whether or not the BooleanTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isBooleanTerm1Avl();

    /**
     * Sets the value of the BooleanTerm1Avl field.
     * 
     */
    void setBooleanTerm1Avl(Boolean value);

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
     * Gets the value of the BooleanTerm2Avl field.
     * whether or not the BooleanTerm2 field was available the last time availability was checked
     * 
     */
    Boolean isBooleanTerm2Avl();

    /**
     * Sets the value of the BooleanTerm2Avl field.
     * 
     */
    void setBooleanTerm2Avl(Boolean value);

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
     * Gets the value of the DateTerm1 field.
     * datetime cov term field
     * 
     */
    Date getDateTerm1();

    /**
     * Sets the value of the DateTerm1 field.
     * 
     */
    void setDateTerm1(Date value);

    /**
     * Gets the value of the DateTerm1Avl field.
     * whether or not the DateTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isDateTerm1Avl();

    /**
     * Sets the value of the DateTerm1Avl field.
     * 
     */
    void setDateTerm1Avl(Boolean value);

    /**
     * Gets the value of the DateTerm2 field.
     * datetime cov term field
     * 
     */
    Date getDateTerm2();

    /**
     * Sets the value of the DateTerm2 field.
     * 
     */
    void setDateTerm2(Date value);

    /**
     * Gets the value of the DateTerm2Avl field.
     * whether or not the DateTerm2 field was available the last time availability was checked
     * 
     */
    Boolean isDateTerm2Avl();

    /**
     * Sets the value of the DateTerm2Avl field.
     * 
     */
    void setDateTerm2Avl(Boolean value);

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
     * Gets the value of the StringTerm1Av2 field.
     * whether or not the StringTerm1 field was available the last time availability was checked
     * 
     */
    Boolean isStringTerm1Av2();

    /**
     * Sets the value of the StringTerm1Av2 field.
     * 
     */
    void setStringTerm1Av2(Boolean value);

    Key getWCLineID();

    void setWCLineID(Key value);

}
