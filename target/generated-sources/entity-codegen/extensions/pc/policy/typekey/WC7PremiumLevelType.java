
package extensions.pc.policy.typekey;

import java.util.List;
import com.guidewire.commons.metadata.types.TypeKeyCache;
import com.guidewire.commons.metadata.types.TypeListIntrinsicTypeCache;
import com.guidewire.commons.typelist.TypeKeyImpl;
import gw.entity.ITypeList;

public final class WC7PremiumLevelType
    extends TypeKeyImpl
{

    public final static TypeListIntrinsicTypeCache<WC7PremiumLevelType> TYPE = new TypeListIntrinsicTypeCache<WC7PremiumLevelType>("WC7PremiumLevelType");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_ESTIMATEDANNUALPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "EstimatedAnnualPremium");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_SUBJECTPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "SubjectPremium");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_TOTALAMOUNTDUE = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "TotalAmountDue");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_TOTALMANUALPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "TotalManualPremium");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_TOTALMODIFIEDPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "TotalModifiedPremium");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_TOTALSTANDARDPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "TotalStandardPremium");
    public final static extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache TC_TOTALSUBJECTPREMIUM = new extensions.pc.policy.typekey.WC7PremiumLevelType.WC7PremiumLevelTypeCache(extensions.pc.policy.typekey.WC7PremiumLevelType.TYPE, "TotalSubjectPremium");

    public WC7PremiumLevelType(ITypeList type, String code) {
        super(type, code);
    }

    public static WC7PremiumLevelType getTypeKey(String code) {
        return TYPE.get().getTypeKey(code);
    }

    public static List<WC7PremiumLevelType> getAllTypeKeys() {
        return TYPE.get().getTypeKeys(true);
    }

    @Override
    protected Object readResolve() {
        return getTypeKey(getCode());
    }

    public static class WC7PremiumLevelTypeCache
        extends TypeKeyCache
    {


        public WC7PremiumLevelTypeCache(TypeListIntrinsicTypeCache cache, String code) {
            super(cache, code);
        }

        public WC7PremiumLevelType get() {
            return ((WC7PremiumLevelType) super.getKey());
        }

    }

}
