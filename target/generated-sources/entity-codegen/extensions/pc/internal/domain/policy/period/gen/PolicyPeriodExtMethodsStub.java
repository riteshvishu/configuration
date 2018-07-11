
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pl.system.entity.aspect.AspectBase;
import com.guidewire.pl.system.entity.proxy.BeanProxy;
import extensions.pc.policy.entity.WC7Transaction;
import gw.pc.lob.ba.entity.BATransaction;
import gw.pc.lob.bop.entity.BOPTransaction;
import gw.pc.lob.cp.entity.CPTransaction;
import gw.pc.lob.gl.entity.GLTransaction;
import gw.pc.lob.im.entity.IMTransaction;
import gw.pc.lob.pa.entity.PATransaction;
import gw.pc.lob.wc.entity.WCTransaction;
import gw.pc.policy.period.entity.PolicyPeriod;

public abstract class PolicyPeriodExtMethodsStub
    extends AspectBase
    implements PolicyPeriodExtInternalMethodsStubI
{


    protected PolicyPeriodExtMethodsStub(PolicyPeriod owner) {
        super(((BeanProxy) owner));
    }

    @Override
    public PolicyPeriod getOwner() {
        return ((PolicyPeriod) super.getOwner());
    }

    @Override
    public BATransaction[] getBATransactions() {
        return ((BATransaction[]) getFieldValue(BATRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToBATransactions(BATransaction value) {
        addArrayElement(BATRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromBATransactions(BATransaction value) {
        removeArrayElement(BATRANSACTIONS_PROP.get(), value);
    }

    @Override
    public BOPTransaction[] getBOPTransactions() {
        return ((BOPTransaction[]) getFieldValue(BOPTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToBOPTransactions(BOPTransaction value) {
        addArrayElement(BOPTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromBOPTransactions(BOPTransaction value) {
        removeArrayElement(BOPTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public CPTransaction[] getCPTransactions() {
        return ((CPTransaction[]) getFieldValue(CPTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToCPTransactions(CPTransaction value) {
        addArrayElement(CPTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromCPTransactions(CPTransaction value) {
        removeArrayElement(CPTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public GLTransaction[] getGLTransactions() {
        return ((GLTransaction[]) getFieldValue(GLTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToGLTransactions(GLTransaction value) {
        addArrayElement(GLTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromGLTransactions(GLTransaction value) {
        removeArrayElement(GLTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public IMTransaction[] getIMTransactions() {
        return ((IMTransaction[]) getFieldValue(IMTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToIMTransactions(IMTransaction value) {
        addArrayElement(IMTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromIMTransactions(IMTransaction value) {
        removeArrayElement(IMTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public PATransaction[] getPATransactions() {
        return ((PATransaction[]) getFieldValue(PATRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToPATransactions(PATransaction value) {
        addArrayElement(PATRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromPATransactions(PATransaction value) {
        removeArrayElement(PATRANSACTIONS_PROP.get(), value);
    }

    @Override
    public WCTransaction[] getWCTransactions() {
        return ((WCTransaction[]) getFieldValue(WCTRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToWCTransactions(WCTransaction value) {
        addArrayElement(WCTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWCTransactions(WCTransaction value) {
        removeArrayElement(WCTRANSACTIONS_PROP.get(), value);
    }

    @Override
    public WC7Transaction[] getWC7Transactions() {
        return ((WC7Transaction[]) getFieldValue(WC7TRANSACTIONS_PROP.get()));
    }

    @Override
    public void addToWC7Transactions(WC7Transaction value) {
        addArrayElement(WC7TRANSACTIONS_PROP.get(), value);
    }

    @Override
    public void removeFromWC7Transactions(WC7Transaction value) {
        removeArrayElement(WC7TRANSACTIONS_PROP.get(), value);
    }

}
