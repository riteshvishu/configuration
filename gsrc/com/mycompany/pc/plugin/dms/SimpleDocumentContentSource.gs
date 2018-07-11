package com.mycompany.pc.plugin.dms
uses gw.plugin.document.IDocumentContentSource
uses com.dms.embedded.service.DMSEmbedded
uses java.io.ByteArrayInputStream
uses	java.io.InputStream
uses	java.lang.Integer
uses 	gw.document.DocumentContentsInfo

/**
 * Created with IntelliJ IDEA.
 * User: rigupta
 * Date: 10/3/16
 * Time: 4:06 PM
 * To change this template use File | Settings | File Templates.
 */
class SimpleDocumentContentSource implements  IDocumentContentSource
{
  override property get InboundAvailable(): boolean {
    return false
  }

  override property get OutboundAvailable(): boolean {
    return false
  }

  override function addDocument(p0: InputStream, p1: gw.pl.document.entity.Document): boolean {
    return false
  }

  override function isDocument(p0: gw.pl.document.entity.Document): boolean {
    return true
  }

  override function getDocumentContentsInfo(p0: gw.pl.document.entity.Document, p1: boolean): DocumentContentsInfo {
    var embeddedDoc= new DMSEmbedded()

      var byte= embeddedDoc.read( p0.DocUID.toInt())
    if(byte!=null && byte.length>0)
    {
       var ee= new ByteArrayInputStream(byte);


    }



    return null //DocumentContentsInfo.getDocumentContents("","","","","","")
  }

  override function getDocumentContentsInfoForExternalUse(p0: gw.pl.document.entity.Document): DocumentContentsInfo {
    return null
  }

  override function updateDocument(p0: gw.pl.document.entity.Document, p1: InputStream): boolean {
    return false
  }

  override function removeDocument(p0: gw.pl.document.entity.Document): boolean {
    return false
  }
}