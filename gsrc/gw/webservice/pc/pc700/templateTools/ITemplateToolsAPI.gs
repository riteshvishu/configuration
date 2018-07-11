package gw.webservice.pc.pc700.templateTools

uses gw.api.webservice.WSRunlevel
uses gw.api.webservice.exception.SOAPException
uses gw.api.webservice.templateTools.TemplateImportResults
uses gw.api.webservice.pc.templateTools.PCTemplateToolsImpl

/**
 * ITemplateToolsAPI provides adminstrative and programmer support tools for
 * document templates.
 */
// TODO wsi: cannot convert to wsi because of TemplateImportResults. Jira PC-16428
@RpcWebService(WSRunlevel.NODAEMONS)
@Export
@Deprecated("As of 8.0 use gw.webservice.pc.pc800.TemplateToolsAPI instead")
class ITemplateToolsAPI
{
  construct()
  {
  }

  /**
   * Validate that the format of thegiven template descriptor is valid, and
   * that, given the current datamodel all of the Gosu used in the descriptor
   * (for ContextObjects and FormFields) is valid . Validation currently
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
   * @param - templateID - The ID of the template (e.g. ReservationRights.doc)
   * @return - A human-readable string detailing the operations performed and
   *           any errors encountered.
   */
  @Throws(SOAPException, "")
  function validateTemplate(templateID : String) : String {
    return getDelegate().validateTemplate( templateID )
  }

  /**
   * Performs the validation done in validateTemplate for all of the template
   * descriptors the server can find
   * @return - A human-readable string detailing the operations performed and
   *           any errors encountered.
   */
  @Throws(SOAPException, "")
  function validateAllTemplates() : String {
    return getDelegate().validateAllTemplates()
  }

  /**
   * List the templates which the server currently knows about. Useful for
   * sanity-checking the arguments to validation commands.
   * @return - A human-readable string detailing the templates available to the
   *           server.
   */
  @Throws(SOAPException, "")
  function listTemplates() : String {
    return getDelegate().listTemplates()
  }

  /**
   * Imports context objects, field groups, and fields from the provided .csv
   * file into the corresponding template descriptor file.
   * @param - contextObjectFileContents -- The contents of a file containing
   *          the context objects to be imported, in CSV format
   * @param - fieldGroupFileContents The contents of a file contianing the
   *          field groups to be imported, in CSV format
   * @param - fieldFileContents The contents of a file containing the fields
   *          to be imported, in CSV format.
   * @param - descriptorFileContents The contents of the descriptor file.
   * @return - A results object with fields for the new contents of the
   *           descriptor file, and a human-readable string detailing the
   *           operations performed  and any errors encountered.
   */
  @Throws(SOAPException, "")
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
