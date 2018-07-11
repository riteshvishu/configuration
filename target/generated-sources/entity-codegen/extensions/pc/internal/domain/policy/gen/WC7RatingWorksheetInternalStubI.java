
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.rating.worksheet.impl.RatingWorksheetInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.typekey.WC7RatingWorksheet;
import gw.pl.persistence.core.Key;

public interface WC7RatingWorksheetInternalStubI
    extends RatingWorksheetInternal, EffDatedInternal, WC7RatingWorksheetStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7RatingWorksheet value);

    Key getWC7CostID();

    void setWC7CostID(Key value);

}
