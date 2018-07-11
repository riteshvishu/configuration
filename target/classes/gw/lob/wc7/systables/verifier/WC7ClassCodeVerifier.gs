package gw.lob.wc7.systables.verifier

uses gw.xml.parser2.PLXMLNode
uses java.util.Map
uses gw.systables.verifier.EffectiveDateAndCodeVerifierBase

class WC7ClassCodeVerifier extends EffectiveDateAndCodeVerifierBase
{
   override function verify(importNode : PLXMLNode) : Map<PLXMLNode,List<String>> {
    return super.verify(importNode)
  } 

  // comment this out for performance reason
  /*
  protected override function getMatchingFieldsForEffectiveDateOverlapChecking() : String[] {
    return MATCHING_FIELDS_FOR_DATE_CHECKING
  }
  */
  
}
