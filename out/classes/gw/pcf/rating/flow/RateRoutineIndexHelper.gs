package gw.pcf.rating.flow

@Export
class RateRoutineIndexHelper {

  static class RateRoutineSection {
    var _startRow : int   as readonly Start
    var _endRow : int     as readonly End
    var _header : String  as readonly Label
    
    construct(startRow : int, endRow : int, header : String) {
      _startRow = startRow
      _endRow   = endRow
      _header   = header
    }
  }


  private static function getIndex0(orderedSteps : List<CalcStepDefinition>, 
                                    lastSection : int,
                                    lastLabel : String,
                                    isSection : block(s : CalcStepDefinition) : boolean, 
                                    makeLabel : block(s : CalcStepDefinition) : String) : List<RateRoutineSection> {

    var result : List<RateRoutineSection> = {}

    for (s in orderedSteps) {
      if (isSection(s)) {
        if (lastLabel != null and lastSection != s.SortOrder) {
          result.add(new RateRoutineSection(lastSection, s.SortOrder, lastLabel))
        }
        lastLabel = makeLabel(s)
        lastSection = s.SortOrder
      }
    }

    if (lastLabel != null) {
      var endIndex = orderedSteps.last().SortOrder
      if (lastSection != endIndex) {
        result.add(new RateRoutineSection(lastSection, endIndex + 1, lastLabel))
      }
    }
    return result
  }

  static function helpText(section : RateRoutineSection) : String {
    var lastLine = section.End - 1 // section.End is first line of next section
    return displaykey.Web.Rating.Flow.CalcRoutine.IndexHelpText(
        lastLine - section.Start, section.Start, lastLine)
  }
  
  static function getIndex(routine : CalcRoutineDefinition) : List<RateRoutineSection> {
    var steps = routine.Steps.OrderedByStepSortOrder
    var indexList = getIndex0(steps, steps.first().SortOrder, 
                              displaykey.Web.Rating.Flow.CalcRoutine.IndexFirstSection,
                              \ s -> s.IsSectionCommentStep, 
                              \ s -> (s.SectionComment == null) ? displaykey.Web.Rating.Flow.CalcRoutine.BlankComment : s.SectionComment.split("\n").first())

    var numSteps = routine.Steps.Count
    // Q: if numSteps is really large, do we even want this?
    var all = new RateRoutineSection(0, indexList.last()._endRow, 
                        displaykey.Web.Rating.Flow.CalcRoutine.IndexAllSteps(numSteps))
    indexList.add(all)
    
    return indexList
  }
}
