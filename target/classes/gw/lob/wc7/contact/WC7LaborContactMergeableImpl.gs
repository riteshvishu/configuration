package gw.lob.wc7.contact
uses gw.contact.PolicyContactRoleMergeableImpl

/**
 * Handle role merging for {@link WC7LaborContact}
 */
@Export
class WC7LaborContactMergeableImpl extends PolicyContactRoleMergeableImpl {
  construct(mergeable : WC7LaborContact) {
    super(mergeable)
  }

  override function performMerge(merged : PolicyContactRole) {
    super.performMerge(merged)

    mergeChildren(Survivor, merged,
            \ laborContact -> (laborContact as WC7LaborContact).WC7Details,
            \ detail, laborContact -> {
              detail.setFieldValueForChunk("WC7LaborContact", laborContact,
                      detail.SliceDate, detail.getNextEventDate(detail.SliceDate))
            })
  }
}