
package extensions.pc.internal.domain.contact.impl;

import com.guidewire.pl.domain.contact.impl.PersonInternal;
import extensions.pc.contact.entity.PersonExt;

public interface PersonExtInternal
    extends PersonInternal, PersonExt, ContactExtInternal, GlobalContactNameExtInternal, GlobalPersonNameExtInternal, PersonExtInternalMethods
{


}
