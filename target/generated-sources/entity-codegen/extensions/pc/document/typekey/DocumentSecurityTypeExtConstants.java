
package extensions.pc.document.typekey;

import gw.pl.document.typekey.DocumentSecurityType;
import gw.pl.document.typekey.DocumentSecurityType.DocumentSecurityTypeCache;

public final class DocumentSecurityTypeExtConstants {

    public final static DocumentSecurityTypeCache TC_INTERNALONLY = new DocumentSecurityTypeCache(DocumentSecurityType.TYPE, "internalonly");
    public final static DocumentSecurityTypeCache TC_SENSITIVE = new DocumentSecurityTypeCache(DocumentSecurityType.TYPE, "sensitive");
    public final static DocumentSecurityTypeCache TC_UNRESTRICTED = new DocumentSecurityTypeCache(DocumentSecurityType.TYPE, "unrestricted");

}
