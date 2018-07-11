package gw.lob.gl.rating
uses gw.rating.CostData

@Export
abstract class GLCostData<T extends GLCost> extends CostData<T, GeneralLiabilityLine> {
  var _subline : GLCostSubline as Subline
  var _splitType : GLCostSplitType as SplitType
  var _state : Jurisdiction as State

  construct(effDate : DateTime, expDate : DateTime, __state : Jurisdiction) {
    super(effDate, expDate)
    _state = __state
  }

  construct(effDate : DateTime, expDate : DateTime, c : Currency, __state : Jurisdiction) {
    super(effDate, expDate, c)
    _state = __state
  }

  construct(cost : GLCost) {
    super(cost)
    _state = cost.State
    _subline = cost.Subline
    _splitType = cost.SplitType  
  }

  override function setSpecificFieldsOnCost(line : GeneralLiabilityLine, costEntity: T) : void {
    costEntity.Subline = Subline
    costEntity.SplitType = SplitType
    costEntity.setFieldValue("GeneralLiabilityLine", line.FixedId)
  }

  override final protected property get KeyValues() : List<Object> {
    var result : List<Object> = {Subline, SplitType}
    result.addAll(GLKeyValues)
    return result
  }

  abstract property get GLKeyValues() : List<Object>

}
