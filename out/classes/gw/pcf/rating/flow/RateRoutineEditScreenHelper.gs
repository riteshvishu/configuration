package gw.pcf.rating.flow

uses gw.api.web.PebblesUtil
uses gw.rating.flow.util.InScopeUsage
uses gw.rating.flow.util.RatingEntityGraphTraverser
uses java.lang.IllegalArgumentException
uses java.util.Map
uses java.util.Set
uses pcf.EditRateRoutine
uses java.util.HashMap
uses java.lang.Integer
uses java.lang.IllegalStateException
uses gw.rating.flow.validation.RateRoutineValidation
uses gw.rating.flow.validation.ValidationGroup
uses gw.rating.flow.util.CostDataWrapperUtil
uses pcf.RateRoutines

/**
 * Helper class for _rateRoutineEditScreen.pcf
 */
@Export
class RateRoutineEditScreenHelper {

  // this helper needs to be bound to the CalcRoutineDefinition and PCF Page
  var _rateRoutine : CalcRoutineDefinition
  var _currentLocation : pcf.api.Location
  var _parameterSetHelper : RateRoutineParameterSetHelper

  // Used to restore checkmarks after certain operations.   This set is used by startChecked()
  // to return a per-row boolean value to the RowIterator's "startChecked" property.
  //
  // IMPORTANT: in order for this to give correct results, all operations that modify rows must
  // update _lastCheckedSet.
  //
  // IMPORTANT: This implementation assumes that there will be an instance of _rateRoutineEditScreenHelper
  // bound to an instance of the edit screen.  If this changes (e.g. changing the helper to be stateless)
  // the value _lastCheckedSet will need to be stored in a PCF variable instead.
  var _lastCheckedSet : Set<CalcStepDefinition> = {}

  /**
   * Create a helper class instance bound to the given CalcRoutineDefinition and PCF Location.
   * @param routine The CalcRoutine being edited
   * @location The associated PCF page (probably New_rateRoutine or Edit_rateRoutine)
   */
  construct(routine : CalcRoutineDefinition, location : pcf.api.Location) {
    _rateRoutine = routine
    _currentLocation = location
    _parameterSetHelper = new RateRoutineParameterSetHelper(routine)
  }

  /**
   * Implementation for the "save draft" button.
   */
   function saveDraft() {
     _currentLocation.commit()
     EditRateRoutine.push(_rateRoutine.refresh() as CalcRoutineDefinition)
   }

  /**
   * Create a Map of in-scope usages for the parameters that are in scope.
   * This is used to initialize a PCF variable; eventually we will just go to a cache for this info.
   * @param routine: the CalcStepDefinition being edited
   * @return a map of CalcRoutineParameter -> InScopeUsage references rooted to that parameter
   */
  static function initializeInScopeParamInScopeUsageMap(routine : CalcRoutineDefinition) : Map<CalcRoutineParamName, List<InScopeUsage>> {
    return RatingEntityGraphTraverser.initializeMapFromParameterSet(routine.ParameterSet)
  }

  /**
   * Consults the set of rows that were checked at the beginning of the last operation,
   * returning true for any row that was checked.   This is used in conjuction with startChecked
   * on the RowIterator, to maintain checked status after an operation.
   *
   * @param calcStep the CalcStepDefinition corresponding to a row on the screen
   * @return true if the Operator field on calcStep's row should be available, false otherwise.
   */
  static function operatorAvailable(calcStep : CalcStepDefinition) : boolean {
    return (calcStep.StepType == null) or !(calcStep.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL) or calcStep.IsSectionCommentStep)
  }

  /**
   * Provide values to RowIterator's startChecked parameter.
   * @param row the CalcStepDefinition instance corresponding to the ListView row
   * @return true if the row should have its checkbox set, false otherwise
   */
  function startChecked(row : CalcStepDefinition) : boolean {
    return _lastCheckedSet.contains(row)
  }

  function indentLevel(orderedSteps : java.util.List<entity.CalcStepDefinition>) : HashMap<CalcStepDefinition, Integer> {
    var indentation = 0
    var indentMap = new HashMap<CalcStepDefinition, Integer> ()
    for (step in orderedSteps) {
      if (step.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL) and step.StepType <> TC_IF) {
        if (indentation > 0) {
          // in case the rate routine starts with something funny like an else, don't go negative.
          indentation--
        }
      }
        indentMap.put(step, indentation)

      if (step.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL) and step.StepType <> TC_ENDIF) {
        indentation++
      }
    }
   return indentMap
  }

  function indented(row : CalcStepDefinition, value : String, orderedStepMap : HashMap<CalcStepDefinition, Integer>) : String {
    if (value == null) return ""
    var indent = orderedStepMap.get(row)
    if (indent == null) {
      throw new IllegalStateException("row was not in rateRoutine's list of steps!")
    }
    return indent > 4 ? displaykey.Web.Rating.Flow.CalcRoutine.IndentationLevelFive(value)
          : (indent > 3) ? displaykey.Web.Rating.Flow.CalcRoutine.IndentationLevelFour(value)
          : (indent > 2) ? displaykey.Web.Rating.Flow.CalcRoutine.IndentationLevelThree(value)
          : (indent > 1) ? displaykey.Web.Rating.Flow.CalcRoutine.IndentationLevelTwo(value)
          : (indent > 0) ? displaykey.Web.Rating.Flow.CalcRoutine.IndentationLevelOne(value) : value
  }

  /**
   * Make duplicates of the given (checked) rows, storing the "checked" status
   * of the original rows.
   *
   * Given any set of rows, insert a copy of all the checked rows, after the last checked row
   *
   * @param rows The list of checked rows
   */
  function copySteps(rows : CalcStepDefinition[]) {
    updateCheckedSet(rows)
    var sortedRows = rows.sortBy(\ step -> step.SortOrder)
    var lastIndex = sortedRows.last().SortOrder
    for (step in sortedRows) {
      makeSpaceAfter(lastIndex)
      var newStep = step.copy() as entity.CalcStepDefinition
      newStep.SortOrder = lastIndex + 1
      lastIndex = lastIndex + 1
      _rateRoutine.addToSteps(newStep) // is this necessary, or is the copy properly owned already?
    }
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  /**
   * Append numRows rows to the end of the list.
   * @param numRows the number of rows to insert
   */
  function appendRows(numRows : int) {
    if (numRows < 1) throw new IllegalArgumentException("numRows must be at least 1")
    updateCheckedSet(null)
    var n = _rateRoutine.Steps.Count
    for (location in n|..(n + numRows)) {
      createAndAdd(location)
    }
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  function changeParameterSet(highlightedRows : Map<CalcStepDefinition, List<Integer>>) {
    if (_rateRoutine.Steps.Count > 0) {
      RateRoutineValidation.validateForRateRoutineEditScreen(_rateRoutine, "default", ValidationGroup.PARAM_SET, highlightedRows)
    } else {
      appendRows(1)
    }
  }

  /**
   * Updates the operand on the given step when switching operators.
   * @param step The CalcStepDefinition for the step whose operator is being changed.
   */
  function updateOperandForOperatorChange(step: CalcStepDefinition) {
    // updateOperandForOperatorChange doesn't change row locations, so it doesn't need to clear checkedSet
    var operatorType = step.PrimaryOperand.OperatorType
    step.setStepTypeFromOperatorType(operatorType)

    // For conditional operands, we may need to clear out suboperands. Only clean them out
    // if the new step is not a flow control step.  NOTE:  You can't actually change the
    // operator type for FLOW CONTROL steps so it really only applies for TC_CONTINUE steps.
    //   e.g. "IF" -> "ELSE" will not reset the operand; "IF" -> "+" will.
    if ((step.PrimaryOperand.OperandType == TC_CONDITIONAL) and
        (!step.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL))) {
      step.Operands.each(\ opAd -> step.removeFromOperands(opAd))
      var operand = new CalcStepDefinitionOperand()
      operand.OperandType = TC_CONSTANT // default operand is an untyped constant
      operand.OperatorType = operatorType
      step.addToOperands(operand)
    }
    if (step.PrimaryOperand.OperatorType != null and step.PrimaryOperand.OperatorType.Categories.contains(CalcStepOperatorCategory.TC_ROUNDING)) {
      step.PrimaryOperand.OperandType = TC_ROUNDING
    } else if (step.PrimaryOperand.OperandType == TC_ROUNDING) {
      // if the Operator type is not in the rounding category but the Operand type is still rounding, reset it to constant.
      step.PrimaryOperand.OperandType = TC_CONSTANT
    }
  }

  /**
   * Remove a step from the list.
   * @step The CalcStepDefinition of the step that should be removed.
   */
  function removeRow(step : CalcStepDefinition) {
    updateCheckedSet(null)
    _rateRoutine.removeFromSteps(step)
    removeSpaceAt(step.SortOrder)
  }

  /**
   * Move checked rows up one line, retaining their checked status.   Will move a block of rows <i>en masse</i>,
   * so if, for example, rows 3 and 4 are both checked, moveUp will put both of them above row 2.
   * @param The rows which should be moved up
   */
  function moveUp(rows : CalcStepDefinition[]) {
    updateCheckedSet(rows)
    // Used to prevent movement of contiguous steps where the first step is checked
    var lowWaterMark = rows.hasMatch(\ r -> r.SortOrder == 1) ? 1 : 0
    rows.each(\currentStep -> {
      if (currentStep.SortOrder > (lowWaterMark + 1)) {
        var indexBefore = currentStep.SortOrder - 1
        var beforeStep = currentStep.CalcRoutineDefinition.Steps.singleWhere(\ step -> step.SortOrder == indexBefore)
        beforeStep.SortOrder = currentStep.SortOrder
        currentStep.SortOrder--
      } else {
        lowWaterMark = currentStep.SortOrder
      }
    })
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  /**
   * Move checked rows down one line, retaining their checked status.   Will move a block of rows <i>en masse</i>,
   * so if, for example, rows 3 and 4 are both checked, moveDown will put both of them below row 5.
   * @param The rows which should be moved down
   */
  function moveDown(rows : CalcStepDefinition[]) {
    updateCheckedSet(rows)
    // Used to prevent movement of contiguous steps where the last step is checked
    var highWaterMark =
      rows.hasMatch(\r -> r.SortOrder == _rateRoutine.Steps.Count) ? _rateRoutine.Steps.Count : _rateRoutine.Steps.Count+1
    rows.sortByDescending(\r -> r.SortOrder)
        .each(\r -> {
          if (r.SortOrder < (highWaterMark - 1)) {
            var indexAfter = r.SortOrder + 1
            var afterAction = r.CalcRoutineDefinition.Steps.singleWhere(\ rateAction -> rateAction.SortOrder == indexAfter)
            afterAction.SortOrder = r.SortOrder
            r.SortOrder++
          } else {
            highWaterMark = r.SortOrder
          }
        })
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  /**
   * Insert a new, blank row above each of the checked rows.   Unlike move, insertion is not <i>en masse</i> so if
   * rows 2 and 3 are checked, you will get a new blank row above 2 and another one between 2 and 3.
   * @rows the insertion points
   */
  function insertBefore(rows : CalcStepDefinition[]) {
    updateCheckedSet(rows)
    for (step in rows.sortByDescending(\ step -> step.SortOrder)) {
      makeSpaceAfter(step.SortOrder - 1)
      createAndAdd(step.SortOrder - 1)
    }
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  /**
   * Insert a new, blank row below each of the checked rows.   Unlike move, insertion is not <i>en masse</i> so if
   * rows 2 and 3 are checked, you will get a new blank row between 2 and 3 and another one below 3.
   * @rows the insertion points
   */
  function insertAfter(rows : CalcStepDefinition[]) {
    updateCheckedSet(rows)
    for (step in rows.sortByDescending(\ step -> step.SortOrder)) {
      makeSpaceAfter(step.SortOrder)
      createAndAdd(step.SortOrder + 1)
    }
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  /**
   * Clears last checked set
   */
  function resetLastCheckedSet() {
    updateCheckedSet(null)
  }

  /**
   * update _lastCheckedSet to contain the new rows.  Existing contents are cleared.
   * null is a legal value, in which case the result is to empty _lastCheckedSet
   */
  private function updateCheckedSet(newRows : CalcStepDefinition[]) {
    _lastCheckedSet.clear()
    if (newRows != null) {
      _lastCheckedSet.addAll(newRows.toSet())
    }
  }

  /**
   * Increment the SortOrder of all rows whose SortOrder is higher than stepNum; the effect
   * is to open up an empty space beneath step #stepNum.
   * @param stepNum: the insertion point; insertion is always below
   */
  private function makeSpaceAfter(stepNum : int) {
    var rowsToMove = _rateRoutine.Steps.where(\ row -> row.SortOrder > stepNum)
    rowsToMove.each(\ row -> {row.SortOrder = row.SortOrder+1})
  }

  /**
   * Decrement the SortOrder of all rows whose SortOrder is higher than stepNum; the effect
   * is to close up an empty space beneath step #stepNum.
   * @param stepNum: the deletion point
   */
  private function removeSpaceAt(stepNum : int) {
    var rowsToMove = _rateRoutine.Steps.where(\ row -> row.SortOrder > stepNum)
    rowsToMove.each(\row -> {row.SortOrder = row.SortOrder - 1})
  }


  /**
   * create and add a new blank row with its SortOrder = location
   * @param location the insertion point
   */
  private function createAndAdd(location : int) : CalcStepDefinition {
    return NewRateRoutineHelper.createNewRow(_rateRoutine, location)
  }

  function getAllParamSets() : List<CalcRoutineParameterSet> {
    return _parameterSetHelper.getAllParamSets()
  }

  function getAllLOBsWithParamSets() : String[] {
    return _parameterSetHelper.getAllLOBsWithParamSets()
  }

  function getParamSets() : List<CalcRoutineParameterSet> {
    return _parameterSetHelper.getParamSets(getAllParamSets(), _rateRoutine.PolicyLinePatternCode)
  }

  function getHelpStringForParamTypes() : String {
    return _parameterSetHelper.getHelpStringForParamTypes()
  }

  function getStringForParamTypes() : String {
    return _parameterSetHelper.getStringForParamTypes()
  }

  function resetCalcRoutine(resetParamSet : boolean) {
    if (resetParamSet) {
      _rateRoutine.ParameterSet = null
    }
    _rateRoutine.Steps.each(\step -> {
      step.remove()
    })
    PebblesUtil.invalidateIterators(_currentLocation, entity.CalcStepDefinition)
  }

  static function getCostDataUsages(paramSet : CalcRoutineParameterSet) : List<InScopeUsage> {
    return CostDataWrapperUtil.getCostDataUsages(paramSet).sortBy(\ costDataItem -> costDataItem.Path)
  }

  static function getRateRoutineStepOperandMode(ratingRoutineStep : entity.CalcStepDefinition) : String {
    if (ratingRoutineStep.PrimaryOperand.IsRounding) {
      return "rounding"
    } else if (ratingRoutineStep.PrimaryOperand.IsEditableConstant) {
      return "constant"
    } else {
      return "default"
    }
  }

  function deleteRoutine() {
    if (!_rateRoutine.New) {
      _rateRoutine.canDelete()
      _rateRoutine.remove()
      _rateRoutine.Bundle.commit()
    }
    RateRoutines.go()
  }

  function getParamSetValidation() : String {
    var validationResults = ""
    _rateRoutine.Steps.each(\ c -> {
      if (c.StoreLocation.HasContent) {
        var validateResult = c.validateVariableNameAgainstParamSet()
        if (validateResult != null) {
          validationResults = validationResults + "\n"+ validateResult
        }
      }})
    return validationResults.Empty ? null : validationResults
  }

  function getStepEditInstructionMode(ratingRoutineStep : CalcStepDefinition) : String {
    if (ratingRoutineStep.IsSectionCommentStep) {
      return "comment"
    }
    var stepCategory = ratingRoutineStep.StepType.Categories.whereTypeIs(CalcStepCategory).first()
    switch (stepCategory) {
      case (CalcStepCategory.TC_ASSIGNMENT):
          if (ratingRoutineStep.InScopeParam == null) {
            return "assignment"
          } else {
            return "inscope"
          }
      case (CalcStepCategory.TC_FLOWCONTROL):
          return "flowcontrol"
      case (CalcStepCategory.TC_CONTINUE):
          return "continue"
        default:
        break
    }
    return "default"
  }
}
