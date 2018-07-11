
package extensions.pc.product.typekey;

import gw.pc.product.typekey.ProductSelectionReason;
import gw.pc.product.typekey.ProductSelectionReason.ProductSelectionReasonCache;

public final class ProductSelectionReasonExtConstants {

    public final static ProductSelectionReasonCache TC_LOSSHISTORY = new ProductSelectionReasonCache(ProductSelectionReason.TYPE, "LossHistory");
    public final static ProductSelectionReasonCache TC_NOTOFFERED = new ProductSelectionReasonCache(ProductSelectionReason.TYPE, "NotOffered");
    public final static ProductSelectionReasonCache TC_PAYMENTHISTORY = new ProductSelectionReasonCache(ProductSelectionReason.TYPE, "PaymentHistory");

}
