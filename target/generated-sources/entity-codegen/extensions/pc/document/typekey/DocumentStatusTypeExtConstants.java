
package extensions.pc.document.typekey;

import gw.pl.document.typekey.DocumentStatusType;
import gw.pl.document.typekey.DocumentStatusType.DocumentStatusTypeCache;

public final class DocumentStatusTypeExtConstants {

    public final static DocumentStatusTypeCache TC_APPROVED = new DocumentStatusTypeCache(DocumentStatusType.TYPE, "approved");
    public final static DocumentStatusTypeCache TC_APPROVING = new DocumentStatusTypeCache(DocumentStatusType.TYPE, "approving");
    public final static DocumentStatusTypeCache TC_DRAFT = new DocumentStatusTypeCache(DocumentStatusType.TYPE, "draft");
    public final static DocumentStatusTypeCache TC_FILED = new DocumentStatusTypeCache(DocumentStatusType.TYPE, "filed");
    public final static DocumentStatusTypeCache TC_FINAL = new DocumentStatusTypeCache(DocumentStatusType.TYPE, "final");

}
