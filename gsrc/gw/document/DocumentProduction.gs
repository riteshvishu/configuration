package gw.document

uses gw.document.DocumentContentsInfo
uses gw.plugin.document.IDocumentContentSource
uses gw.plugin.document.IDocumentProduction
uses gw.plugin.document.IDocumentTemplateSource

uses gw.plugin.document.IDocumentTemplateDescriptor
uses gw.plugin.document.IDocumentTemplateSource
uses java.util.ArrayList
uses java.lang.IllegalArgumentException
uses java.lang.RuntimeException

uses java.lang.RuntimeException
uses java.util.HashMap
uses java.util.Map
uses java.util.Date
uses gw.api.util.Logger
uses gw.api.util.LocaleUtil
uses gw.plugin.Plugins

/**
 * The DocumentProduction class contains methods which can be used in both.pcf configuration
 * and from rules to create Document entities from Document Templates.
 */
@Export
class DocumentProduction {
  
  public static final var LOB_ATTRIB : String = "lob"
  public static final var SECTION_ATTRIB : String = "section"
  public static final var STATE_ATTRIB : String = "state"
  public static final var ID_ATTRIB : String = "id"
  public static final var IDENTIFIER_ATTRIB : String = "identifier"
  public static final var NAME_ATTRIB : String = "name"
  public static final var SCOPE_ATTRIB : String = "scope"
  public static final var KEYWORDS_ATTRIB : String = "keywords"
  public static final var TYPE_ATTRIB : String = "type"
  public static final var PRODUCTION_TYPE_ATTRIB : String = "production-type"
  public static final var PASSWORD_ATTRIB : String = "password"
  public static final var MIME_TYPE_ATTRIB : String = "mime-type"
  
  construct() {
  }

  /*******************************************************************************************
  *  Document Creation functions
  *******************************************************************************************/

  /*
   * Determine whether synchronous creation is supported by the IDocumentProduction plugin for
   * the specified template. Returns true if so, false otherwise. Returns false if a template cannot be found
   * with the specified name.
   *
   * @param template the template
   * @return true if synchronous creation supported
   */
  public static function synchronousDocumentCreationSupported(template : IDocumentTemplateDescriptor) : boolean {
    if (template == null) {
      return false
    } else {
      return getDocumentProductionPlugin().synchronousCreationSupported( template )
    }
  }

  /*
   * Determine whether asynchronous creation is supported by the IDocumentProduction plugin for
   * the specified template. Returns true if so, false otherwise. Returns false if a template cannot be found
   * with the specified name.
   *
   * @param template the template
   * @return true if asynchronous creation supported
   */
  public static function asynchronousDocumentCreationSupported(template : IDocumentTemplateDescriptor) : boolean {
    if (template == null) {
      return false
    } else {
      return getDocumentProductionPlugin().asynchronousCreationSupported( template )
    }
  }

  /** This will search for the best template to use to create the desired document and then create and store it.  This
  * is based on the docType, requiring PolicyPeriod, and other matches coming from the policy.
  *
  * @param docType the type of document to create
  * @param document the initialized document object, will be populated with additional fields
  * @param policyPeriod the policy period
  */
  static function createAndStoreBestDocumentSynchronously( docType : DocumentType, document : Document, policyPeriod : PolicyPeriod) : boolean {
    var template = getBestMatchPolicyPeriodDocumentTemplate( policyPeriod.PeriodStart, docType, policyPeriod )
    if (template == null) {
      Logger.logWarning(displaykey.DocumentProduction.Warning.NoTemplateForPeriod(policyPeriod, docType, policyPeriod.PeriodStart))
      return false
    }
    Logger.logDebug(displaykey.DocumentProduction.Debug.SelectedTemplate(policyPeriod, docType, template.TemplateId))
    createAndStoreDocumentSynchronously( template, new HashMap() { "PolicyPeriod" -> policyPeriod }, document )
    return true
  }

  /*
   * Create a document synchronously and pass it to the IDocumentContentSource plugin for persistence
   * This method should be used when the document should be created and stored without any further user interaction.
   *
   * template - the id of the template to be used to create the document
   * parameters - the set of objects, keyed by name, which will be supplied to the template generation process to create the document
   * document - the Document entity corresponding to the newly generated content
   */
  public static function createAndStoreDocumentSynchronously(template : IDocumentTemplateDescriptor, parameters : Map, document : Document) {
    var documentContentSource : IDocumentContentSource = getDocumentContentSourcePlugin()
    adjustDocumentName(documentContentSource, document)
    var dci = createDocumentSynchronously(template, parameters, document)

    if (dci.ResponseType != DocumentContentsInfo.DOCUMENT_CONTENTS) {
      throw new RuntimeException(displaykey.DocumentProduction.Error.ResponseNotDocumentContents)
    }

    document.DMS = true
    if (document.DateModified == null) {
      document.DateModified = Date.CurrentDate
    }
    if (document.Author == null) {
      document.Author = displaykey.Java.Document.DefaultAuthor
    }
    if (document.Status == null) {
      document.Status =  "draft"
    }
    document.MimeType = dci.ResponseMimeType
    if (documentContentSource.addDocument( dci.InputStream, document )) {
      document.setPersistenceRequired( false )
    }
  }

  /*
   * Create a document synchronously. Does not persist the newly generated content.
   * This method should be used when the generated content is desired for display in the UI.
   *
   * templateName - the id of the template to be used to create the document
   * parameters - the set of objects, keyed by name, which will be supplied to the template generation process to create the document
   * document - the Document entity corresponding to the newly generated content
   */
  public static function createDocumentSynchronously(template : IDocumentTemplateDescriptor, parameters : Map, document : Document) : DocumentContentsInfo {
    var locale = template.Locale
    if (locale == null) {
      locale = LocaleUtil.getDefaultLanguage()
    }
    var rtn : DocumentContentsInfo
    LocaleUtil.runAsCurrentLanguage( locale , \ ->  {
        document.Locale = User.util.CurrentLanguage // does the translation to language
        rtn = getDocumentProductionPlugin().createDocumentSynchronously( template, parameters, document )
      }
    )
    return rtn
  }

  /**
   * Creates a document asynchronously. This means that the function will return immediately, but the actual document
   * creation will take place over an extended period of time.
   * This method should be called when the creation process will take place over an extended period of time. The external
   * document production system is responsible for creating a Document entity (if desired) when the creation is complete.
   *
   * @param templateName - the id of the template to be used to create the document
   * @param parameters - the set of objects, keyed by name, which will be supplied to the template generation process to create the document
   * @param fieldValues - a set of values, keyed by field name, which should be set on the Document entity which is eventually created
   *                      at the end of the asynchronous creation process.
   */
  static function createDocumentAsynchronously(templateName : String, parameters : Map, fieldValues : Map) : String {
    return getDocumentProductionPlugin().createDocumentAsynchronously( 
            getDocumentTemplateSourcePlugin().getDocumentTemplate( templateName, null ), parameters, fieldValues )
  }

  /*
   * Create a document asynchronously. This means that the function will return immediately, but the actual document
   * creation will take place over an extended period of time.
   * This method should be called when the creation process will take place over an extended period of time. The external
   * document production system is responsible for creating a Document entity (if desired) when the creation is complete.
   *
   * templateName - the id of the template to be used to create the document
   * parameters - the set of objects, keyed by name, which will be supplied to the template generation process to create the document
   * fieldValues - a set of values, keyed by field name, which should be set on the Document entity which is eventually created
   * at the end of the asynchronous creation process.
   */
  public static function createDocumentAsynchronously(template : IDocumentTemplateDescriptor, parameters : Map, fieldValues : Map) : String {
    var documentProductionPlugin = getDocumentProductionPlugin()
    var locale = template.Locale
    if (locale == null) {
      locale = LocaleUtil.getDefaultLocale()
    }
    var rtn : String
    LocaleUtil.runAsCurrentLocale( locale , \ ->  {
     rtn = documentProductionPlugin.createDocumentAsynchronously( template, parameters, fieldValues )
    })
    return rtn
  }

  /**********************************************************************************************
  * Helper functions
  **********************************************************************************************/

  /**
   * Retrieves the configured IDocumentProduction implementation.
   */
  private static function getDocumentProductionPlugin() : IDocumentProduction  {
    return Plugins.get(IDocumentProduction)
  }

  /**
   * Retrieves the configured IDocumentTemplateSource implementation.
   */
  private static function getDocumentTemplateSourcePlugin() : IDocumentTemplateSource {
    return Plugins.get(IDocumentTemplateSource)
  }

  /**
   * Retrieves the configured IDocumentContentSource implementation.
   */
  private static function getDocumentContentSourcePlugin() : IDocumentContentSource {
    return Plugins.get(IDocumentContentSource)
  }

  /**
   * Adjusts the supplied document's name to avoid conflicts with documents already in the system. This
   * will supply a numeric argument to a display key, producing alternate names like "Foo (2)", "Foo (3)", etc.
   * until a unique name is generated.
   */
  private static function adjustDocumentName(documentContentSource : IDocumentContentSource, document : Document) {
    var i=1
    var originalName = document.Name
    while(documentContentSource.isDocument( document )) {
      //As long as the DocumentSource rejects the document name, tweak it to avoid conflicts.
      //This assumes that the name is all that needs to be changed; that may not be true for
      // every DMS integration.
      i = i+1 //Start the index at 2, since by definition there's already one
     document.Name = displaykey.Java.Document.DocumentDuplicateNameAdjustment(originalName, i)
    }
  }

  private static function getBestMatchPolicyPeriodDocumentTemplate(date : Date, docType : DocumentType, policyPeriod : PolicyPeriod) : IDocumentTemplateDescriptor {
    var valuesToMatch = new HashMap<String, Object>()
     var keywords = new ArrayList<String>()
     valuesToMatch.put(STATE_ATTRIB, policyPeriod.BaseState.Code)
     keywords.add(policyPeriod.BaseState.Code)
     valuesToMatch.put(LOB_ATTRIB, policyPeriod.Lines[0].Subtype.Code)
     keywords.add(policyPeriod.Lines[0].Subtype.Code)
     // valuesToMatch.put(PRODUCT_ATTRIB, policyPeriod.Policy.Product.Code)
     keywords.add(policyPeriod.Policy.Product.Code)
     keywords.add(policyPeriod.Policy.ProducerCodeOfService.Code)
     var job = policyPeriod.Job
     if (!job.Complete) {
       keywords.add(job.Subtype.Code)
       var rejRea = policyPeriod.Submission.RejectReason
       if (rejRea != null) {
         keywords.add(rejRea.Code)
       }
     }
     valuesToMatch.put(KEYWORDS_ATTRIB, keywords as String[])
     return getBestMatchPolicyPeriodDocumentTemplate( date, docType, valuesToMatch )
  }
  
  static function getBestMatchPolicyPeriodDocumentTemplate(date : Date, docType : DocumentType, valuesToMatch : Map<String, Object>) : IDocumentTemplateDescriptor {
     var dts = Plugins.get(IDocumentTemplateSource)
     var searchMap : Map<String, Object> = { TYPE_ATTRIB -> docType.Code, "requiredsymbols" -> "PolicyPeriod" }
     var templates = dts.getDocumentTemplates( date, searchMap, 0 )
     if (templates.Count == 0) {
       throw new RuntimeException(displaykey.DocumentProduction.Error.TemplateNotFound(docType))
     }
     return getBestMatchDocumentTemplate(templates, valuesToMatch)
  }

  /** public for testing only
  */
  static function getBestMatchDocumentTemplate(templates : IDocumentTemplateDescriptor[], valuesToMatch : Map<String, Object>) : IDocumentTemplateDescriptor {
     var highScore : int = -1
     var highScoreTemplate : IDocumentTemplateDescriptor = null
     for (template in templates) {
       var score = calcTemplateScore(template, valuesToMatch)
       if (score > highScore) {
         highScore = score
         highScoreTemplate = template
       }
     }
     return highScoreTemplate
  }

  private static function calcTemplateScore(template : IDocumentTemplateDescriptor, valuesToMatch : Map<String, Object>) : int {
    var score : int = 0
    for (propName in valuesToMatch.Keys) {
      var valueToMatch = valuesToMatch.get(propName)
      if (valueToMatch typeis String) {
         var tst = template.getMetadataPropertyValue(propName) as String
         if (tst != null and tst.length() != 0) {
           if (tst.equalsIgnoreCase(valueToMatch)) {
             score = score + 100 // a high constant value
           } else {
             return -1  // doesn't match supplied field so get out
           }
         }
      } else if (valueToMatch typeis String[]) {
        var propValue = template.getMetadataPropertyValue(propName) as String
        if (propValue != null and propValue.length != 0) {
          var tstArray = propValue.split("\\s*,\\s*")// trim leading and trailing spaces
          for (i in 0..|valueToMatch.Count) {
            if (tstArray.firstWhere( \ s -> s.equalsIgnoreCase( valueToMatch[i] )) != null) {
              score = score + valueToMatch.Count - i // the earlier the value in user supplied array the higher the score
            }
          }
        }
      } else {
        throw new IllegalArgumentException(displaykey.DocumentProduction.Error.ValueToMatchType(propName, valueToMatch.getClass().getName()))
      }
    }
    return score
  }

}
