
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.pc.domain.financials.impl.CostInternal;
import com.guidewire.pl.domain.persistence.core.effdate.impl.EffDatedInternal;
import extensions.pc.policy.entity.WC7Transaction;
import extensions.pc.policy.typekey.WC7Cost;
import gw.pl.persistence.core.Key;

public interface WC7CostInternalStubI
    extends CostInternal, EffDatedInternal, WC7CostStubI
{


    /**
     * Sets the value of the Subtype field.
     * 
     */
    void setSubtype(WC7Cost value);

    Key getWC7WorkersCompLineID();

    void setWC7WorkersCompLineID(Key value);

    /**
     * Gets the value of the Transactions field.
     * 
     * 
     */
    WC7Transaction[] getTransactions();

    /**
     * Adds the given element to the Transactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToTransactions(WC7Transaction value);

    /**
     * Removes the given element from the Transactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromTransactions(WC7Transaction value);

    Key getWC7RatingWorksheetID();

    void setWC7RatingWorksheetID(Key value);

}
