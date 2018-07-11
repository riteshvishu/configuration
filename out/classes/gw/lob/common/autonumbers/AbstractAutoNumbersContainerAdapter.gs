package gw.lob.common.autonumbers

uses gw.lang.reflect.IPropertyInfo
uses java.util.Map
uses java.util.HashMap

/*
 * Abstract implementation of the interface has to be implemented by an entity that has auto number sequences for one or more arrays
 * The entity's implementation should subclass it
 * It implements all the methods in the interface and adda few abstact methods
 */
abstract class AbstractAutoNumbersContainerAdapter<T extends EffDated> implements AutoNumbersContainer {
  protected var _owner : T // current entity (that has auto number sequence)
  var _autoNumberInfoMap : Map<Type, AutoNumberProperties>

  construct(owner : T) {
    _owner = owner
  }

  override function initializeAutoNumberSequences() {
    // force lazy init.
    var count = NumberPropertiesMap.Count
    count++
  }

  override function cloneAutoNumberSequences() {
    NumberPropertiesMap.Values.each(\ props -> {
      var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence
      sequence = sequence.clone(_owner.Bundle)
    })
  }

  override function resetAutoNumberSequences() {
    NumberPropertiesMap.Values.each(\ props -> {
      var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence
      sequence.reset()
      sequence.renumber(currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp)
    })
  }

  override function bindAutoNumberSequences() {
    NumberPropertiesMap.Values.each(\ props -> {
      var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence
      sequence.renumber(currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp)
      sequence.bind(currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp)
    })
  }

  override function renumberAutoNumberSequences() {
    NumberPropertiesMap.Values.each(\ props -> {
      var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence
      sequence.renumberNewBeans(currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp)
    })
  }

  override function number(elementType : Type, entity : EffDated) {
    // TODO verify - entity typeis Type
    var props = NumberPropertiesMap.get(elementType)
    var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence

    sequence.number(entity, currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp) 
  }

  override function renumber(elementType : Type) {
    var props = NumberPropertiesMap.get(elementType)
    var sequence = _owner[props.SequenceProp.Name] as AutoNumberSequence

    sequence.renumber(currentAndFutureEntities(props.ArrayProp), props.NumberFieldProp)
  }
  
  private property get NumberPropertiesMap() : Map<Type, AutoNumberProperties>{
    if(_autoNumberInfoMap == null){
      _autoNumberInfoMap = new HashMap<Type, AutoNumberProperties>()
      (typeof _owner).TypeInfo.Properties
        .where(\ fieldProperties -> fieldProperties.FeatureType == AutoNumberSequence)
        .each(\ sequence -> {
          var props = new AutoNumberProperties()
          props.SequenceProp = sequence
          props.ArrayProp = arrayProperty(sequence)
          props.NumberFieldProp = numberFieldProperty(sequence)
          var elementType = props.ArrayProp.FeatureType.ComponentType
          _autoNumberInfoMap.put(elementType, props)
          if(_owner[props.SequenceProp.Name] == null){
            // lazy init. of the sequence
            _owner[props.SequenceProp.Name] = new AutoNumberSequence()
          }
        })
    }
    
    return _autoNumberInfoMap
  }
  
  private function currentAndFutureEntities(arrayProp : IPropertyInfo) : T[] {
    var branch = _owner.BranchUntyped
    if(not (branch typeis PolicyPeriod)) throw "Not in a policy period!"
    var period = branch as PolicyPeriod
    
    var currentAndFutureList = (_owner[arrayProp.Name] as EffDated[]).toList()
    period.OOSSlices.each(\p -> {
      var container = containerInBranch(p)
      if(container <> null){
        (container[arrayProp.Name] as EffDated[]).each(\ entity -> {
          if(not currentAndFutureList.contains(entity)) currentAndFutureList.add(entity)
        })
      }
    })
    return currentAndFutureList.toTypedArray()
  }
    
  abstract function containerInBranch(branch : PolicyPeriod) : T

  abstract function arrayProperty(sequence : IPropertyInfo) : IPropertyInfo
  
  abstract function numberFieldProperty(sequence : IPropertyInfo) : IPropertyInfo
  
  private class AutoNumberProperties {
    var _sequenceProp : IPropertyInfo as SequenceProp
    var _arrayProp : IPropertyInfo as ArrayProp
    var _numberFieldProp : IPropertyInfo as NumberFieldProp
  }
}
