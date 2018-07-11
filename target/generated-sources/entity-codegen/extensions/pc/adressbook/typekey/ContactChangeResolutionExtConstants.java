
package extensions.pc.adressbook.typekey;

import gw.pl.adressbook.typekey.ContactChangeResolution;
import gw.pl.adressbook.typekey.ContactChangeResolution.ContactChangeResolutionCache;

public final class ContactChangeResolutionExtConstants {

    public final static ContactChangeResolutionCache TC_ALREADY_APPLIED = new ContactChangeResolutionCache(ContactChangeResolution.TYPE, "already_applied");
    public final static ContactChangeResolutionCache TC_APPROVED = new ContactChangeResolutionCache(ContactChangeResolution.TYPE, "approved");
    public final static ContactChangeResolutionCache TC_MORE_INFO_REQ = new ContactChangeResolutionCache(ContactChangeResolution.TYPE, "more_info_req");
    public final static ContactChangeResolutionCache TC_REJECTED = new ContactChangeResolutionCache(ContactChangeResolution.TYPE, "rejected");

}
