
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.UWIssueHistoryStatus;
import gw.pc.policy.typekey.UWIssueHistoryStatus.UWIssueHistoryStatusCache;

public final class UWIssueHistoryStatusExtConstants {

    public final static UWIssueHistoryStatusCache TC_APPROVED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Approved");
    public final static UWIssueHistoryStatusCache TC_CHANGEEFFDATE = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "ChangeEffDate");
    public final static UWIssueHistoryStatusCache TC_CREATED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Created");
    public final static UWIssueHistoryStatusCache TC_EXPIRED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Expired");
    public final static UWIssueHistoryStatusCache TC_REJECTED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Rejected");
    public final static UWIssueHistoryStatusCache TC_REMOVED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Removed");
    public final static UWIssueHistoryStatusCache TC_REOPENED = new UWIssueHistoryStatusCache(UWIssueHistoryStatus.TYPE, "Reopened");

}
