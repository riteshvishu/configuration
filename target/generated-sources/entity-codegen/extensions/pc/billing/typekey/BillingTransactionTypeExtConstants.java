
package extensions.pc.billing.typekey;

import gw.pc.billing.typekey.BillingTransactionType;
import gw.pc.billing.typekey.BillingTransactionType.BillingTransactionTypeCache;

public final class BillingTransactionTypeExtConstants {

    public final static BillingTransactionTypeCache TC_ASSESSMENT = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "assessment");
    public final static BillingTransactionTypeCache TC_COINSURANCE = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "coinsurance");
    public final static BillingTransactionTypeCache TC_COMMISSION = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "commission");
    public final static BillingTransactionTypeCache TC_DEDUCTIBLECLAIM = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "deductibleclaim");
    public final static BillingTransactionTypeCache TC_DEPOSIT = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "deposit");
    public final static BillingTransactionTypeCache TC_DEPOSITADDITION = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "depositaddition");
    public final static BillingTransactionTypeCache TC_DEPOSITTRANSFER = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "deposittransfer");
    public final static BillingTransactionTypeCache TC_FEEINSTALLMENT = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "feeinstallment");
    public final static BillingTransactionTypeCache TC_INSTALLMENT = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "installment");
    public final static BillingTransactionTypeCache TC_LATEFEE = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "latefee");
    public final static BillingTransactionTypeCache TC_MIDTERMCHANGE = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "midtermchange");
    public final static BillingTransactionTypeCache TC_PAYMENT = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "payment");
    public final static BillingTransactionTypeCache TC_PREMIUMADDITIONAL = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "premiumadditional");
    public final static BillingTransactionTypeCache TC_PREMIUMRETURN = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "premiumreturn");
    public final static BillingTransactionTypeCache TC_SURCHARGEEXTERNAL = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "surchargeexternal");
    public final static BillingTransactionTypeCache TC_SURCHARGEINTERNAL = new BillingTransactionTypeCache(BillingTransactionType.TYPE, "surchargeinternal");

}
