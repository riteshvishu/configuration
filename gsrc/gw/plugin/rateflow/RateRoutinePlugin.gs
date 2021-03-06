package gw.plugin.rateflow

uses gw.api.productmodel.Product
uses gw.api.util.Logger
uses gw.entity.IEntityPropertyInfo
uses gw.lang.reflect.IType
uses gw.lang.reflect.TypeSystem
uses gw.plugin.InitializablePlugin
uses gw.rating.CostData
uses gw.rating.flow.domain.CalcRoutineCostData
uses gw.util.AutoMap
uses java.lang.IllegalStateException
uses java.lang.Integer
uses java.lang.Throwable
uses java.math.RoundingMode
uses java.util.ArrayList
uses java.util.Map
uses gw.rating.RateFlowLogger
uses gw.policy.PolicyLineConfiguration
uses gw.rating.flow.util.InScopeUsage
uses gw.lang.reflect.IPropertyInfo
uses gw.pc.rating.flow.util.InScopeUsageBase
uses java.util.Set
uses java.util.regex.Pattern
uses gw.api.productmodel.PolicyLinePattern

@Export
class RateRoutinePlugin implements IRateRoutinePlugin, InitializablePlugin {
  // Parameter name for enabling/disabling worksheets on a global level.
  public static final var WORKSHEETS_ENABLED : String = "WorksheetsEnabled"

  function getLOBClassForCode(patternCode : String): IRateRoutineConfig {
   return PolicyLineConfiguration.getByCode(patternCode).RateRoutineConfig
  }

  /**
   * This plugin takes the config parameter "WorksheetsEnabled".  If set, this value
   * overrides the value of the property on the plugin.
   */
  override function setParameters(params : Map<Object, Object>) {
    _useWorksheets = (params.get(WORKSHEETS_ENABLED) ?: _useWorksheets) as boolean
  }

  // A global setting which overrides the LOB-specific configurations.   If WorksheetsEnabled
  // is false, no worksheets will be generated by the system.  If it is true, the behavior
  // is determined on a LOB-specific basis by consulting the config class for the LOB.
  var _useWorksheets : boolean as WorksheetsEnabled = true

  override function getCostDataWrapperType(paramSet : CalcRoutineParameterSet) : IType {
    var lobClass = getLOBClassForCode(paramSet.PolicyLinePatternCode)
    if (lobClass != null) {
      return lobClass.getCostDataWrapperType(paramSet)
    }

    RateFlowLogger.get().warn("Could not find RateRoutineConfig for line " +paramSet.PolicyLinePatternCode+ "; using default CalcRoutineCostData class.")
    return CalcRoutineCostData
  }

  override function makeCostDataWrapper(
          paramSet : CalcRoutineParameterSet,
          costData : CostDataBase,
          defaultRoundingLevel : Integer,
          defaultRoundingMode : RoundingMode) : ICostDataWrapper {

    var lobClass = getLOBClassForCode(paramSet.PolicyLinePatternCode)
    if (lobClass != null) {
      return lobClass.makeCostDataWrapper(paramSet, costData, defaultRoundingLevel, defaultRoundingMode)
    }

    RateFlowLogger.get().warn("Could not find RateRoutineConfig for line " +paramSet.PolicyLinePatternCode+ "; using default CalcRoutineCostData class.")
    return new CalcRoutineCostData(costData as CostData, defaultRoundingLevel, defaultRoundingMode)
  }


  override function worksheetsEnabledForLine(linePatternCode : String) : boolean {
    var lobClass = getLOBClassForCode(linePatternCode)

    if (lobClass == null) {
      RateFlowLogger.get().warn("Could not find RateRoutineConfig for line " +linePatternCode+ "; worksheets will not be enabled.")
    }

    return _useWorksheets and (lobClass != null and lobClass.worksheetsEnabledForLine(linePatternCode))
  }

  override property get BranchingFields() : IEntityPropertyInfo[] {
    var fields : ArrayList<String> = {"Jurisdiction"}
    var properties = fields.map(\ field -> CalcRoutineDefinition.Type.TypeInfo.getProperty(field) as IEntityPropertyInfo)
    if (properties.hasMatch(\ p -> p == null)) {
      var illegalFields = fields.where(\ f -> CalcRoutineDefinition.Type.TypeInfo.getProperty(f) == null)
      throw new IllegalStateException("The following fields are not valid fields on CalcRoutineDefinition. ${illegalFields.join(", ")}")
    }
    return properties.toTypedArray()
  }

  /**
   * Filtering function to control whether to include a property.  Unlike filterIrrelevantItems(),
   * this operates during the traversal of the policy graph, and controls whether a reference from one class
   * to another will be traversed.
   *
   * For example, PolicyLocation has a foreign key to an AccountLocation.  By default,
   * PolicyLocation.AccountLocation is not traversed.   To change this behavior, you might
   * add the condition
   * <code>
   *   if (prop.OwnersType.isAssignableFrom(entity.PolicyLocation) and prop.Name == "AccountLocation") {
   *     return true
   *   }
   * </code>
   *
   * Note that this function can return one of THREE values: true (if you want this property to
   * be included); false (if you want this property to be excluded); or null (for properties which
   * should retain their default behavior).  It is recommended that this function end with a catch-all "return null"
   * so that any property which is not explicitly handled gets default behavior.
   *
   * @param prop The property descriptor for the reference
   * @return true to include owner.prop; false to exclude it; null to use default behavior
   */
  override function includeProperty(prop : IPropertyInfo) : Boolean {
    return null
  }

  /**
   * Removes irrelevant items based on <code>IgnoredPaths</code> and <code>IgnoredTypes</code> and
   * arrays or maps of types.   This is a postfilter, which runs after traversal of the data structures.
   */
  override function filterIrrelevantItems(input : List<InScopeUsageBase>, policyLinePatternCode : String) : List<InScopeUsageBase> {
    var usagesSet = input.toSet()

    filterCollectionsOfTypes(usagesSet)
    usagesSet.removeWhere(\ usage -> _ignoredTypes.contains(usage.FeatureType))
    usagesSet.removeWhere(\ usage -> _ignoredPaths.hasMatch(\ element -> usage.Path != null and usage.Path.endsWith(element)))

    /**
     * Optionally filter by policyLinePatternCode.
     */

    return usagesSet.toList()
  }

  /**
   * List of Paths which will be filtered out, by looking at the end of the Path to see if it matches the string below.
   * IMPORTANT: ignored paths should generally start with "." so that we don't unintentionally filter away names that
   * incorporate one of thse paths.  (E.g. this was erroneously eliminating "HasScheduleModifiers")
   */
  final static var _ignoredPaths : Set<String> as readonly IgnoredPaths = {
      ".EffectiveDate",
      ".ExpirationDate",
      ".Modifiers",
      ".ReferenceDateInternal"
  }

  /**
   * List of Types which will be filtered out.  By default, this list includes types which are considered irrelevant.
   *
   * Note that 'boolean' and 'Boolean' are separate types even though both are displayed on the page as 'Boolean'.
   * (This is noted even though it is not likely that you would want to ignore all InScopeUsages which are boolean or Boolean types).
   */
  final static var _ignoredTypes : Set<IType> as readonly IgnoredTypes = {
      AutoNumberSequence,
      EffDatedChangeType,
      PolicyLinePattern,
      PolicyPeriod
  }

  final static var _pattern = Pattern.compile("^[^ \\[ \\] \\< \\> ]*$", Pattern.COMMENTS) // accepts characters which are not '[', ']' , '<', '>'
  /**
   * Removes collections of types by excluding square-brackets and angle-brackets.
   * Those with brackets, for example QuestionSet[] and Map<CoverageCategory, List<PolicyCondition>>, are removed.
   */
  private static function filterCollectionsOfTypes(input : Set<InScopeUsageBase>) {
    input.retainWhere(\ i -> _pattern.matcher(i.FeatureType.RelativeName).matches())
  }

}
