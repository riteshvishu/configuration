package gw.lob.wc7.schedule

uses gw.api.domain.Clause
uses java.lang.IllegalArgumentException

class WC7ScheduleClientPresenter {
  enum Input {
    State,
    ContractDates
  }
  
  var _contactType: ContactType as readonly ContactType
  var _parentClausePresenter : ScheduleClausePresenter
  var _popupTitle : String as readonly PopupTitle
  var _hiddenInputs : List<Input>

  construct(
      aContactType: ContactType,
      aParentClause : Clause,
      aPopupTitle : String = null,
      hiddenInputs : List<Input> = null) {
    _contactType = aContactType
    _parentClausePresenter = parentClausePresenterFor(aParentClause)
    _popupTitle = aPopupTitle ?: defaultPopupTitle()
    _hiddenInputs = hiddenInputs ?: {}
  }
  
  property get Line() : WC7Line {
    return _parentClausePresenter.Clause.PolicyLine as WC7Line
  }
  
  property get ScheduleLabel() : String {
    return _parentClausePresenter.ScheduleLabel
  }
  
  property get ParentClause() : Clause {
    return _parentClausePresenter.Clause
  }
  
  property get ShowState() : boolean {
    return not _hiddenInputs.contains(Input.State)
  }
  
  property get ShowContractDates() : boolean {
    return not _hiddenInputs.contains(Input.ContractDates)
  }
  
  function addNewDetail() : WC7LaborContactDetail {
    return _parentClausePresenter.addNewDetail()
  }
    
  private function parentClausePresenterFor(aClause : Clause) : ScheduleClausePresenter {
    if (aClause typeis PolicyCondition)
      return new ScheduleConditionPresenter(aClause)
    else if (aClause typeis Exclusion)
      return new ScheduleExclusionPresenter(aClause)
    else
      throw new IllegalArgumentException("Unsupported schedule clause type: " + typeof aClause)
  }
  
  private function defaultPopupTitle() : String {
    return displaykey.Web.Contact.NewContact(entity.WC7PolicyLaborClient.Type.TypeInfo.DisplayName)
  }

  
  private abstract class ScheduleClausePresenter {
    abstract property get Clause() : Clause
    abstract property get ScheduleLabel() : String
    abstract function addNewDetail() : WC7LaborContactDetail    
  }
  
  
  private class ScheduleConditionPresenter extends ScheduleClausePresenter {
    var _condition : PolicyCondition
    
    construct(condition : PolicyCondition) {
      _condition = condition
    }
    
    override property get Clause() : Clause {
      return _condition
    }
    
    override property get ScheduleLabel() : String {
      return displaykey.Java.ProductModel.Name.Condition
    }
    
    override function addNewDetail() : WC7LaborContactDetail {
      return Line.addNewIncludedLaborClientDetailForContactType(ContactType, _condition)
    }
  }
  
  
  private class ScheduleExclusionPresenter extends ScheduleClausePresenter {
    var _exclusion : Exclusion
    
    construct(exclusion: Exclusion) {
      _exclusion = exclusion
    }
    
    override property get Clause() : Clause {
      return _exclusion
    }
    
    override property get ScheduleLabel() : String {
      return displaykey.Java.ProductModel.Name.Exclusion
    }
    
    override function addNewDetail() : WC7LaborContactDetail {
      return Line.addNewExcludedLaborClientDetailForContactType(ContactType, _exclusion)
    }
  }  
}
