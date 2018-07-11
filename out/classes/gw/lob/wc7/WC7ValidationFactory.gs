package gw.lob.wc7
uses gw.validation.PCValidationContext
uses gw.policy.PolicyLineValidation

/**
 * Overridable factory class so we can use a slightly different PolicyLineValidation for standards based
 * vs. basic template
 */
class WC7ValidationFactory {
  
  public static function getPolicyLineValidation(validationContext : PCValidationContext, line : WC7Line) : PolicyLineValidation {    
    return new WC7LineValidation(validationContext, line)
  }

  /**
   * Get post-quote validation messages for display on the quote page.
   */
  public static function getPostQuoteValidation(line : WC7Line) : List<String> {
    return {}
  }

}
