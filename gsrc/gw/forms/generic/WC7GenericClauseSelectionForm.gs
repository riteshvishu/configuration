package gw.forms.generic

uses java.util.Collections
uses java.util.Date
uses java.util.HashMap
uses java.util.Map
uses java.util.Set
uses gw.xml.XMLNode
uses gw.admin.FormPatternValidation
uses gw.api.domain.covterm.DateTimeCovTerm
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.util.StringUtil
uses gw.entity.TypeKey
uses gw.forms.FormData
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference

/**
 * WC7 specific generic class that can be used for any form that should be added to a policy whenever the
 * clause pattern, line level or juridiction level, is selected.
 */
@Export
class WC7GenericClauseSelectionForm extends FormData implements GenericFormInference {
  var _clausePattern : ClausePattern
  var _coverables : Coverable[]
  var _line : PolicyLine

  override property get DisplayName() : String {
    return displaykey.Web.Policy.WC7.Forms.WC7GenericClauseSelectionForm
  }

  /**
   * Returns the reference date of coverable's related clause.
   * If clause exists in more than one instance of coverable, the earliest reference date is returned
   */
  override function getLookupDates(context : FormInferenceContext) : Map<Jurisdiction, DateTime> {
    _line = getLine(context)
    if (_line == null) {
      return Collections.emptyMap()
    }
    _clausePattern = ClausePattern.getByCode(Pattern.ClausePatternCode)
    _coverables = _line.AllCoverables.where(\ cov -> cov.getCoverageConditionOrExclusion(_clausePattern) != null)
    var map = new HashMap<Jurisdiction, DateTime>()
    for (cov in _coverables) {
      var clause = cov.getCoverageConditionOrExclusion(_clausePattern)

      if (atLineLevel(clause)) {
        // go through all covered states
        for (coveredState in _line.CoveredStates) {
          map.put(coveredState, getEarliestDate(map.get(coveredState), clause.ReferenceDate))
        }
      } else if (atJurisdictionLevel(clause)) {
        map.put(cov.CoverableState, getEarliestDate(map.get(cov.CoverableState), clause.ReferenceDate))
      }
    }
    return map
  }

  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    for(cov in _coverables) {
      var clause = cov.getCoverageConditionOrExclusion(_clausePattern)
      if (atLineLevel(clause)) {
        _coverables = _coverables.where(\ c -> availableStates.intersect(_line.CoveredStates.toSet()) != null)
      } else if (atJurisdictionLevel(clause)) {
        _coverables = _coverables.where(\ c -> availableStates.contains(c.CoverableState))
      }
    }
  }

  /**
   * If patternExistsOnAll instances is false and the clause exists on at least one coverable of the appropriate type, then return true.
   * If patternExistsOnAll instances is true and the clause exists on all coverables of the appropriate type, then return true.
   * Otherwise, return false.
   */
  override property get InferredByCurrentData() : boolean {
    if (Pattern.PatternExistsOnAll) {
      var existingCoverableType = typeof _coverables.first()
      for (cov in _line.AllCoverables.where(\ i -> typeof i == existingCoverableType)) {
        if (not cov.hasCoverageConditionOrExclusion(_clausePattern)) {
          return false
        }
      }
      return true
    }
    return _coverables.hasMatch(\ c -> c.hasCoverageConditionOrExclusion(_clausePattern))
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) {
    //Add the coverables on which the clause exists
    var allCoverableNode = new XMLNode("Coverables")
    contentNode.addChild(allCoverableNode)
    for (cov in _coverables) {
      var clause = cov.CoveragesConditionsAndExclusionsFromCoverable.firstWhere(\ clause -> clause.Pattern.Code == _clausePattern.Code)
      // Add the coverable and the clause pattern
      var coverableNode = new XMLNode("Coverable")
      allCoverableNode.addChild(coverableNode)
      coverableNode.addChild(createTextNode("FixedId", cov.TypeIDString))
      coverableNode.addChild(createTextNode("ClausePattern", _clausePattern.Code))

      for (formPatternCovTerm in Pattern.FormPatternCovTerms) {
        var covTermNode = new XMLNode("CovTerm")
        coverableNode.addChild(covTermNode)
        covTermNode.addChild(createTextNode("CovTermPattern",formPatternCovTerm.CovTermPatternCode))
        var covTermFromClause = clause.CovTerms.firstWhere(\ covTerm -> covTerm.PatternCode == formPatternCovTerm.CovTermPatternCode)
        if (covTermFromClause != null) {
          // Add the covTermPattern value
          if (covTermFromClause.ValueAsString != null) {
            var value : String
            if (covTermFromClause typeis DateTimeCovTerm) {
              value = formatDateTime(covTermFromClause.Value)
            } else {
              value = covTermFromClause.ValueAsString
            }
            covTermNode.addChild(createTextNode("CovTermValue", value))
          }
        }
      }

      for (formPatternCoverableProp in Pattern.FormPatternCoverableProperties) {
        var coverablePropNode = new XMLNode("CoverableProperty")
        coverableNode.addChild(coverablePropNode)
        var coverablePropValue = cov[formPatternCoverableProp.Name]
        coverablePropNode.addChild(createTextNode("CoverablePropertyName", formPatternCoverableProp.Name))
        if (coverablePropValue != null) {
          var value : String
          if (coverablePropValue typeis Date) {
            value = formatDateTime(coverablePropValue)
          } else if (coverablePropValue typeis TypeKey) {
            value = coverablePropValue.Code
          } else {
            value = coverablePropValue.toString()
          }
          coverablePropNode.addChild(createTextNode("CoverablePropertyValue", value))
        }
      }
    }
  }

  function formatDateTime(date : Date) : String {
    return StringUtil.formatDate(date, "yyyy-MM-dd HH:mm:ss.SSS")
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePattern.getAll().where(\ p -> p == "WC7Line")
  }

  function getEarliestDate(d1 : Date, d2 : Date) : Date {
    if (d1 == null) {
      return d2
    } else if (d2 == null) {
      return d1
    } else if (d2.before(d1)) {
      return d2
    } else {
      return d1
    }
  }

  override property get PolicyLineRequired() : boolean {
    return true
  }

  override function validateCustomFields(formPattern : FormPattern, validation : FormPatternValidation) {
  }

  override function clearCustomFields(formPattern : FormPattern) {
    formPattern.ClausePattern = null
    formPattern.PatternExistsOnAll = false
    formPattern.clearDependentClausePatternSelections()
  }

  private function atLineLevel(clause : gw.api.domain.Clause) : boolean {
    return clause.Pattern.OwningEntityType == WC7WorkersCompLine.Type.RelativeName
  }

  private function atJurisdictionLevel(clause : gw.api.domain.Clause) : boolean {
    return clause.Pattern.OwningEntityType == WC7Jurisdiction.Type.RelativeName
  }

}