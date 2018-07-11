package gw.lob.wc7.rating

uses gw.rating.flow.RatingFunctionSource

/**
 * Rating functions that apply to {@link WC7ClassCode} for WC7 Rate Routines.
 */
@Export
class WC7ClassCodeRatingFunctionSource extends RatingFunctionSource {
 
  /**
   * @return true if the given class code pertains to Admiralty
   */
  function classCodeIsAdmiralty(classCode : WC7ClassCode) : boolean {
    return classCode.ClassCodeType == WC7ClassCodeType.TC_ADMIRALTY
  }
  
  /**
   * @return true if the Basis for this Class code is Payroll
   */
  function classCodeIsPayroll(classCode : WC7ClassCode) : boolean {
    return classCode.Basis.Code == "Payroll - per $100"
  }

  /**
   * @return true if the Basis for this Class Code is Per Cord
   */
  function classCodeIsPerCord(classCode : WC7ClassCode) : boolean {
    return classCode.Basis.Code == "Per Cord"
  }
  
  /**
   * @return true if the given class code pertains to FELA (Federal Liability)
   */
  function classCodeIsFELA(classCode : WC7ClassCode) : boolean {
    return classCode.ClassCodeType == WC7ClassCodeType.TC_FELA
  }
  
  /**
   * @return the {@link WC7ClassCode#Code) for the given class code.
   */
  function codeOfClassCode(classCode : WC7ClassCode) : String {
    return classCode.Code
  }

  /**
  * @return true if the given class code is a Disease class code
  */
  function classCodeIsDisease(classCode : WC7ClassCode) : boolean {
      return classCode.DiseaseType
  }

   /**
  * @return true if the given class code is an ARatedType class code
  */
  function classCodeIsARatedType(classCode : WC7ClassCode) : boolean {
      return classCode.ARatedType
  }

   /**
  * @return true if the given class code is non Ratable class code
  */
  function classCodeIsNonRatable(classCode : WC7ClassCode) : boolean {
      return (classCode.ClassCodeType == WC7ClassCodeType.TC_NONRATABLE)
  }

  /**
  * @return true if the given class code is a coal mine class code
  */
  function classCodeIsCoalMine(classCode : WC7ClassCode) : boolean {
      return classCode.CoalMineType
  }
  
  function governingLawIsFedCoalMineAct(covEmp : WC7CoveredEmployeeBase) : boolean {
    return (covEmp.GoverningLaw == WC7GoverningLaw.TC_FEDCOALMINE)
  }

  override function availableForLine(policyLineCode : String) : boolean {
    return policyLineCode.equals("WC7Line")
  }

  /**
  * @return true if the given class code should multiply by an effective time based
  * proration factor when rating.  As ClassCodes that are Proratable already
  * prorate their values during splits & merges, we only want to use the Proration
  * Factor when the Class Code is not Proratable
  */
  function classCodeUsesProrationFactorInRating(classCode : WC7ClassCode) : boolean {
    return not classCode.Basis.Proratable
  }
}
  