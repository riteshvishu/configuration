package gw.lob.wc7.forms
uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.forms.FormData

@Export
abstract class WC7FormData extends FormData {
  
  protected static function mapEmployeeBases<O>(context : FormInferenceContext, 
                                                 pred(employee : WC7CoveredEmployeeBase) : boolean, 
                                                 op(employee : WC7CoveredEmployeeBase) : O ) : Set<O> {                                                 
    return mapArrayToSet(context.Period.WC7Line.WC7CoveredEmployeeBases, pred, op)  
  }
  
  protected static function mapEmployees<O>(context : FormInferenceContext, 
                                             pred(employee : WC7CoveredEmployee) : boolean, 
                                             op(employee : WC7CoveredEmployee) : O ) : Set<O> {                                                  
    return mapArrayToSet(context.Period.WC7Line.WC7CoveredEmployees, pred, op)  
  }
}
