package gw.lob.wc7.schedule

uses gw.api.productmodel.ScheduleTypeKeyPropertyInfo
uses gw.entity.ITypeFilter

/**
* A {@link ScheduleTypeKeyPropertyInfo} specific to {@link typekey.Jurisdiction}
*/
@Export
class WC7ScheduleJurisdictionPropertyInfo extends ScheduleTypeKeyPropertyInfo<typekey.Jurisdiction> {  
  /**
   * Constructs a new column info with the passed arguments.
   * @param wc7Line      {@link WC7WorkersCompLine}
   * @param columnName       {@link #Column}'s name
   * @param colLabel         Text to display for the column label in LVs
   * @param isRequired       Whether or not the input cell should be required
   *
   */
  construct(
      wc7Line : WC7WorkersCompLine,
      columnName : String,
      colLabel : String,
      isRequired : boolean,
      stateFilter : ITypeFilter<Jurisdiction> = null) {
    super(
        ScheduledItem,
        columnName,
        colLabel,
        Jurisdiction,
        stateFilter ?: defaultStateFilterFor(wc7Line), 
        isRequired)
  }
  
  private static function defaultStateFilterFor(line : WC7WorkersCompLine) : ITypeFilter<Jurisdiction> {
    return \ -> line.LocationJurisdictions.toList()
  }

  /**
   * @param anItem - the {@link ScheduledItem} to retrieve the value from.
   * @return the {@link typekey.Jurisdiction} associated with the given item or null if the value is null.
   * Note, this function assumes that it is being called on a {@link ScheduledItem} 
   * associated with the same {@link Schedule} that the property exists on.
   */
  function getJursidictionFromItem(anItem : ScheduledItem) : typekey.Jurisdiction{
    var jurisCode = PropertyInfo.Accessor.getValue(anItem) as String
    return jurisCode != null ? typekey.Jurisdiction.get(jurisCode) : null
  }

  /**
   * Set the jurisdiction property for this {@link WC7ScheduleJurisdictionPropertyInfo}.  
   * Note, the typekey.Jurisdiction#Code is stored rather than the actual typekey value.
   * This is done to ensure to support our generic schedule structure that may have 
   * different types of typelists.
   */
  function setJursidictionForItem(anItem : ScheduledItem, juris : typekey.Jurisdiction) {
    PropertyInfo.Accessor.setValue(anItem, juris?.Code)
  }
}
