package gw.api.databuilder.wc7
uses typekey.Jurisdiction
uses entity.ClassCodeBasis
uses gw.lang.Export
uses entity.WC7ClassCode
uses java.lang.String

uses gw.api.databuilder.DataBuilder
uses java.util.Date

/**
 * Builder for {@link WC7ClassCode} beans.  
 * 
 * Note, normally WC7 class codes are loaded via system tables.  
 * {@link WC7ClassCode} is a read-only entity, so this builder 
 * must be used with a bundle that allows the creation of read-only beans.  e.g.
 * 
 * <pre>
 * TestOnlyUtil.runWithBundleThatAllowsReadOnlyBean( \ b ->  {
      classCode = new WC7ClassCodeBuilder()
        .withEffectiveDate( Date.createDateInstance( 1, 1, 2000 ) )
        .withExpirationDate( Date.createDateInstance( 1, 1, 2001 ) )
        .withJurisdiction(Jurisdiction.TC_CA)
        .withCode( "99999" )
        .withBasis(find(ccb in ClassCodeBasis).FirstResult)
        .create(b)
    })
 * </pre>
 */
@Export
class WC7ClassCodeBuilder extends DataBuilder<WC7ClassCode, WC7ClassCodeBuilder> {
  
  construct() {
    super( WC7ClassCode )   
    withCode( org.apache.commons.lang.RandomStringUtils.randomAlphanumeric(5) )
    withEffectiveDate( Date.createDateInstance( 1, 1, 2000 ) )
  }

  final function withCode( code : String ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "Code" ), code )
    return this
  }

  final function withEffectiveDate( effDate : Date) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "EffectiveDate" ), effDate )
    return this
  }

  function withExpirationDate( expDate : Date ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "ExpirationDate" ), expDate )
    return this
  }

  function withClassification( classification : String ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "Classification" ), classification )
    return this
  }

  function withShortDesc(shortDesc : String ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "ShortDesc" ), shortDesc )
    return this
  }
  
  function withJurisdiction( jurisdiction : Jurisdiction ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "Jurisdiction" ), jurisdiction )
    return this
  }
  
  function withClassIndicator( indicator : String ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "ClassIndicator" ), indicator )
    return this
  }

  function withBasis( basis : ClassCodeBasis ) : WC7ClassCodeBuilder {
    set( WC7ClassCode.Type.TypeInfo.getProperty( "Basis" ), basis )
    return this
  }
}