
package extensions.pc.internal.domain.policy.gen;

import com.guidewire.commons.metadata.types.ColumnDynPropertyInfo;
import com.guidewire.commons.metadata.types.EntityIntrinsicTypeReference;
import extensions.pc.policy.entity.WC7ScheduledItem;
import gw.pl.persistence.core.Bean;

public interface WC7ScheduledItemStubI
    extends Bean
{

    EntityIntrinsicTypeReference<WC7ScheduledItem> TYPE = new EntityIntrinsicTypeReference<WC7ScheduledItem>("entity.WC7ScheduledItem");
    ColumnDynPropertyInfo STRINGCOL3_DYNPROP = new ColumnDynPropertyInfo("StringCol3", "StringCol3");
    ColumnDynPropertyInfo STRINGCOL4_DYNPROP = new ColumnDynPropertyInfo("StringCol4", "StringCol4");
    ColumnDynPropertyInfo INTCOL2_DYNPROP = new ColumnDynPropertyInfo("IntCol2", "IntCol2");

}
