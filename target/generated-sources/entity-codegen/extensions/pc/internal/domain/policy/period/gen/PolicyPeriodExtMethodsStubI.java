
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.commons.metadata.types.ArrayPropertyInfoCache;
import extensions.pc.policy.entity.WC7Transaction;
import gw.pc.lob.ba.entity.BATransaction;
import gw.pc.lob.bop.entity.BOPTransaction;
import gw.pc.lob.cp.entity.CPTransaction;
import gw.pc.lob.gl.entity.GLTransaction;
import gw.pc.lob.im.entity.IMTransaction;
import gw.pc.lob.pa.entity.PATransaction;
import gw.pc.lob.wc.entity.WCTransaction;
import gw.pc.policy.period.entity.PolicyPeriod;

public interface PolicyPeriodExtMethodsStubI {

    ArrayPropertyInfoCache BATRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "BATransactions");
    ArrayPropertyInfoCache BOPTRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "BOPTransactions");
    ArrayPropertyInfoCache CPTRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "CPTransactions");
    ArrayPropertyInfoCache GLTRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "GLTransactions");
    ArrayPropertyInfoCache IMTRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "IMTransactions");
    ArrayPropertyInfoCache PATRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "PATransactions");
    ArrayPropertyInfoCache WCTRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "WCTransactions");
    ArrayPropertyInfoCache WC7TRANSACTIONS_PROP = new ArrayPropertyInfoCache(PolicyPeriod.TYPE, "WC7Transactions");

    /**
     * Gets the value of the BATransactions field.
     * 
     * 
     */
    BATransaction[] getBATransactions();

    /**
     * Adds the given element to the BATransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToBATransactions(BATransaction value);

    /**
     * Removes the given element from the BATransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromBATransactions(BATransaction value);

    /**
     * Gets the value of the BOPTransactions field.
     * 
     * 
     */
    BOPTransaction[] getBOPTransactions();

    /**
     * Adds the given element to the BOPTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToBOPTransactions(BOPTransaction value);

    /**
     * Removes the given element from the BOPTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromBOPTransactions(BOPTransaction value);

    /**
     * Gets the value of the CPTransactions field.
     * 
     * 
     */
    CPTransaction[] getCPTransactions();

    /**
     * Adds the given element to the CPTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToCPTransactions(CPTransaction value);

    /**
     * Removes the given element from the CPTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromCPTransactions(CPTransaction value);

    /**
     * Gets the value of the GLTransactions field.
     * 
     * 
     */
    GLTransaction[] getGLTransactions();

    /**
     * Adds the given element to the GLTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToGLTransactions(GLTransaction value);

    /**
     * Removes the given element from the GLTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromGLTransactions(GLTransaction value);

    /**
     * Gets the value of the IMTransactions field.
     * 
     * 
     */
    IMTransaction[] getIMTransactions();

    /**
     * Adds the given element to the IMTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToIMTransactions(IMTransaction value);

    /**
     * Removes the given element from the IMTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromIMTransactions(IMTransaction value);

    /**
     * Gets the value of the PATransactions field.
     * 
     * 
     */
    PATransaction[] getPATransactions();

    /**
     * Adds the given element to the PATransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToPATransactions(PATransaction value);

    /**
     * Removes the given element from the PATransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromPATransactions(PATransaction value);

    /**
     * Gets the value of the WCTransactions field.
     * 
     * 
     */
    WCTransaction[] getWCTransactions();

    /**
     * Adds the given element to the WCTransactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWCTransactions(WCTransaction value);

    /**
     * Removes the given element from the WCTransactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWCTransactions(WCTransaction value);

    /**
     * Gets the value of the WC7Transactions field.
     * 
     * 
     */
    WC7Transaction[] getWC7Transactions();

    /**
     * Adds the given element to the WC7Transactions array. This is achieved by setting the parent foreign key to this entity instance.
     * 
     */
    void addToWC7Transactions(WC7Transaction value);

    /**
     * Removes the given element from the WC7Transactions array. This is achieved by marking the element for removal.
     * 
     */
    void removeFromWC7Transactions(WC7Transaction value);

}
