package gw.lob.wc7.systables.verifier

uses gw.xml.parser2.PLXMLNode
uses java.util.Map
uses gw.systables.verifier.EffDateCheckVerifierBase

@ReadOnly
class WC7RatingStepExtVerifier extends EffDateCheckVerifierBase {
  
  override function verify(importNode : PLXMLNode) : Map<PLXMLNode,List<String>> {
    return super.verify(importNode)
  }
}
