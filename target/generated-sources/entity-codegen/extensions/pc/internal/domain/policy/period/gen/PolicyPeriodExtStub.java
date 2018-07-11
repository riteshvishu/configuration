
package extensions.pc.internal.domain.policy.period.gen;

import com.guidewire.pc.domain.policy.period.impl.PolicyPeriodImpl;
import extensions.pc.internal.domain.policy.period.impl.PolicyPeriodExtInternal;
import extensions.pc.internal.domain.policy.period.impl.PolicyPeriodExtMethodsImpl;
import extensions.pc.policy.entity.WC7Transaction;
import gw.pc.lob.ba.entity.BATransaction;
import gw.pc.lob.bop.entity.BOPTransaction;
import gw.pc.lob.cp.entity.CPTransaction;
import gw.pc.lob.gl.entity.GLTransaction;
import gw.pc.lob.im.entity.IMTransaction;
import gw.pc.lob.pa.entity.PATransaction;
import gw.pc.lob.wc.entity.WCTransaction;

public class PolicyPeriodExtStub
    extends PolicyPeriodImpl
    implements PolicyPeriodExtInternal
{


    @Override
    public BATransaction[] getBATransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getBATransactions();
    }

    @Override
    public void addToBATransactions(BATransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToBATransactions(value);
    }

    @Override
    public void removeFromBATransactions(BATransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromBATransactions(value);
    }

    @Override
    public BOPTransaction[] getBOPTransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getBOPTransactions();
    }

    @Override
    public void addToBOPTransactions(BOPTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToBOPTransactions(value);
    }

    @Override
    public void removeFromBOPTransactions(BOPTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromBOPTransactions(value);
    }

    @Override
    public CPTransaction[] getCPTransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getCPTransactions();
    }

    @Override
    public void addToCPTransactions(CPTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToCPTransactions(value);
    }

    @Override
    public void removeFromCPTransactions(CPTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromCPTransactions(value);
    }

    @Override
    public GLTransaction[] getGLTransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getGLTransactions();
    }

    @Override
    public void addToGLTransactions(GLTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToGLTransactions(value);
    }

    @Override
    public void removeFromGLTransactions(GLTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromGLTransactions(value);
    }

    @Override
    public IMTransaction[] getIMTransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getIMTransactions();
    }

    @Override
    public void addToIMTransactions(IMTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToIMTransactions(value);
    }

    @Override
    public void removeFromIMTransactions(IMTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromIMTransactions(value);
    }

    @Override
    public PATransaction[] getPATransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getPATransactions();
    }

    @Override
    public void addToPATransactions(PATransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToPATransactions(value);
    }

    @Override
    public void removeFromPATransactions(PATransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromPATransactions(value);
    }

    @Override
    public WCTransaction[] getWCTransactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getWCTransactions();
    }

    @Override
    public void addToWCTransactions(WCTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToWCTransactions(value);
    }

    @Override
    public void removeFromWCTransactions(WCTransaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromWCTransactions(value);
    }

    @Override
    public WC7Transaction[] getWC7Transactions() {
        return getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).getWC7Transactions();
    }

    @Override
    public void addToWC7Transactions(WC7Transaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).addToWC7Transactions(value);
    }

    @Override
    public void removeFromWC7Transactions(WC7Transaction value) {
        getExtensionDelegate(PolicyPeriodExtMethodsImpl.class).removeFromWC7Transactions(value);
    }

}
