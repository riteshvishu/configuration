package gw.webservice.pc.pc800

uses gw.api.util.LocaleUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.SOAPException
uses gw.api.webservice.pc.templateTools.PCTemplateToolsImpl
uses gw.api.webservice.templateTools.TemplateImportResults
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiAvailability
uses gw.xml.ws.annotation.WsiGenInToolkit
uses gw.xml.ws.annotation.WsiWebService

uses java.lang.IllegalArgumentException

/**
 * ITemplateToolsAPI provides adminstrative and programmer support tools for document
 * templates.
 */
@WsiWebService("http://guidewire.com/pc/ws/gw/webservice/pc/pc800/TemplateToolsAPI")
@WsiAvailability(MAINTENANCE)
@WsiGenInToolkit
@Export
class TemplateToolsAPI {

  /**
   * Validate that the format of the given template descriptor is valid, and
   * that, given the current datamodel all of the Gosu used in the descriptor 
   * (for ContextObjects and FormFields) is valid. Validation currently
   * includes the following items:
   * 1) Check the Gosu expressions in the descriptor:
   *    a) ContextObject default and possible value expressions are
   *       defined in terms of the available objects
   *    b) FormField expressions are defined in terms of either available 
   *       objects or ContestObjects.
   * 2) Check that the permissionRequired attribute, if specified, is a valid 
   *    system permission code.
   * 3) Check that the default-security-type attribute, if specified, is a 
   *    valid document security type code.
   * 4) Check that the type attribute, if specified, is a valid document type 
   *    code.
   * 5) Check that the section attribute, if specified, is a valid section 
   *    type code.
   *
   * @param - templateID - The ID of the template (e.g. ReservationRights.doc); cannot be null.
   * @return - A human-readable string detailing the operations performed and 
   *           any errors encountered.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Throws(BadIdentifierException, "If templateID is null")
  @Param("templateID", "The ID of the template (e.g. ReservationRights.doc); cannot be null.")
  @Returns("A human-readable string detailing the operations performed and any errors encountered.")
  function validateTemplate(templateID : String) : String {
    SOAPUtil.require(templateID, "templateID");
    return getDelegate().validateTemplate( templateID, LocaleUtil.getDefaultLanguage() )
  }
  
  /**
   * Validate that the given template descriptor is in a valid format, and that all of the Gosu used in the descriptor
   * (for ContextObjects and FormFields) is valid given the current datamodel.
   * Current Validation includes the following items:
   * 1) Check that the Gosu expressions in the descriptor (including ContextObject default and possible
   *    value expressions, which must be defined in terms of the available objects, and FormField expressions, which
   *    must be defined in terms of those objects plus the ContestObjects).
   * 2) Check that the permissionRequired attribute, if specified, is a valid system permission code.
   * 3) Check that the default-security-type attribute, if specified, is a valid document security type code.
   * 4) Check that the type attribute, if specified, is a valid document type code.
   * 5) Check that the section attribute, if specified, is a valid section type code.
   *
   * @param templateID - The ID of the template (e.g. ReservationRights.doc)
   * @param locale - the locale to use for validation
   * @return A human-readable string detailing the operations performed and any errors encountered.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Throws(BadIdentifierException, "If templateID or locale are null")
  @Param("templateID", "The ID of the template (e.g. ReservationRights.doc); cannot be null.")
  @Param("locale", "the locale to use for validation")
  @Returns("A human-readable string detailing the operations performed and any errors encountered.")
  public function validateTemplateInLocale(templateID : String, locale : String) : String {
    SOAPUtil.require(templateID, "templateID");
    SOAPUtil.require(locale, "locale");
    var localeType = LocaleType.get(locale)
    if (localeType == null) {
      throw new IllegalArgumentException(displayKey.TemplateToolsAPI.Error.UndefinedLocale(locale));
    }
    return getDelegate().validateTemplate(templateID, LocaleUtil.toLocale(localeType))
  }

  /**
   * Performs the validation done in validateTemplate for all of the template 
   * descriptors the server can find
   *
   * @return - A human-readable string detailing the operations performed and 
   *           any errors encountered.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Returns("A human-readable string detailing the operations performed and any errors encountered.")
  function validateAllTemplates() : String {
    return getDelegate().validateAllTemplates( LocaleUtil.getDefaultLanguage() )
  }
  
  /**
   * Performs the validation done in validateTemplate for all of the template descriptors the server can find
   *
   * @return A human-readable string detailing the operations performed and any errors encountered.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Throws(BadIdentifierException, "If locale is null")
  @Param("locale", "the locale whose templates should be validated")
  @Returns("A human-readable string detailing the operations performed and any errors encountered.")
  public function validateAllTemplatesInLocale(locale : String) : String {
    SOAPUtil.require(locale, "locale");
    var localeType = LocaleType.get(locale)
    if (localeType == null) {
      throw new IllegalArgumentException(displayKey.TemplateToolsAPI.Error.UndefinedLocale(locale));
    }
    return getDelegate().validateAllTemplates( LocaleUtil.toLocale(localeType) )
  }

  /**
   * List the templates which the server currently knows about. Useful for 
   * sanity-checking the arguments to validation commands.
   *
   * @return - A human-readable string detailing the templates available to the 
   *           server.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Returns("A human-readable string detailing the templates available to the server")
  function listTemplates() : String {
    return getDelegate().listTemplates()
  }

  /**
   * Imports context objects, field groups, and fields from the provided .csv 
   * file into the corresponding template descriptor file.
   *
   * @param - contextObjectFileContents -- The contents of a file containing 
   *          the context objects to be imported, in CSV format
   * @param - fieldGroupFileContents The contents of a file containing the
   *          field groups to be imported, in CSV format
   * @param - fieldFileContents The contents of a file containing the fields 
   *          to be imported, in CSV format.
   * @param - descriptorFileContents The contents of the descriptor file.
   *
   * @return - A results object with fields for the new contents of the 
   *           descriptor file, and a human-readable string detailing the 
   *           operations performed  and any errors encountered.
   */
  @Throws(SOAPException, "If a communication error occurs")
  @Param("contextObjectFileContents", "The contents of a file containing the context objects to be imported, in CSV format")
  @Param("fieldGroupFileContents", "The contents of a file containing the field groups to be imported, in CSV format")
  @Param("fieldFileContents", "The contents of a file containing the fields to be imported, in CSV format.")
  @Param("descriptorFileContents", "The contents of the descriptor file.")
  @Returns("A results object with fields for the new contents of the descriptor file, and a human-readable string detailing the operations performed and any errors encountered.")
  public function importFormFields(
      contextObjectFileContents : String, 
      fieldGroupFileContents : String, 
      fieldFileContents : String, 
      descriptorFileContents : String) 
  : TemplateImportResults {
    return getDelegate().importFormFields(
      contextObjectFileContents, 
      fieldGroupFileContents, 
      fieldFileContents, 
      descriptorFileContents)
  }

  //------------------------ private helper methods
  private function getDelegate() : PCTemplateToolsImpl {
    return new PCTemplateToolsImpl()
  }
}