package gw.rating

uses gw.rating.worksheet.domain.WorksheetEntryContainer
uses gw.rating.worksheet.domain.WorksheetEntry


@Export
class NoCostWorksheetContainer implements WorksheetEntryContainer{

  var _entries : List<WorksheetEntry> as WorksheetEntries = {}

}
