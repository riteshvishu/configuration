
package extensions.pc.contact.entity;

import extensions.pc.internal.domain.contact.impl.PersonExtMethods;
import gw.pl.contact.entity.Person;

public interface PersonExt
    extends ContactExt, GlobalContactNameExt, GlobalPersonNameExt, PersonExtMethods, Person
{


}
