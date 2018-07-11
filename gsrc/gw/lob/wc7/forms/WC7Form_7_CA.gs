package gw.lob.wc7.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.forms.generic.AbstractSimpleAvailabilityForm

@Export
class WC7Form_7_CA extends AbstractSimpleAvailabilityForm {
  override function isAvailable(context : FormInferenceContext, specialCaseStates: Set<Jurisdiction>) : boolean {
    var line = context.Period.WC7Line
    return line.WC7MedicalBenefitsExclEndorsementExcl != null and line.WC7CoveredEmployeeBases.hasMatch(\w -> w.Location.State == State.TC_CA)
  }

  override function getLookupDate(context: FormInferenceContext, state : Jurisdiction) : DateTime {
    return context.Period.WC7Line.WC7MedicalBenefitsExclEndorsementExcl.ReferenceDate    
  }
}
