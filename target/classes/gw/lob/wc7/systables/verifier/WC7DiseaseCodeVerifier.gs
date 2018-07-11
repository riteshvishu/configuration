package gw.lob.wc7.systables.verifier

uses gw.xml.parser2.PLXMLNode
uses java.util.Map
uses gw.systables.verifier.EffectiveDateAndCodeVerifierBase

class WC7DiseaseCodeVerifier extends EffectiveDateAndCodeVerifierBase
{
   override function verify(importNode : PLXMLNode) : Map<PLXMLNode,List<String>> {
    return super.verify(importNode)
  }
}
