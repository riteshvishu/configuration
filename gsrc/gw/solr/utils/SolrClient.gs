package gw.solr.utils

uses com.guidewire.pl.system.dependency.PLDependencies
uses java.net.URLEncoder
uses gw.plugin.solr.ISolrSearchPlugin
uses gw.plugin.Plugins
uses gw.xml.XmlElement
uses org.apache.solr.common.SolrInputDocument
uses org.apache.solr.client.solrj.SolrQuery
uses org.apache.solr.client.solrj.response.QueryResponse
uses java.lang.Integer
uses java.util.LinkedHashMap
uses java.util.ArrayList
uses org.apache.solr.client.solrj.SolrRequest

/**
 * TODO This is a temporary class for communication directly to the SOLR server and will be
 * replaced once we get all necessary platform support in place
 */
@Export
class SolrClient {

  var _qualifiedDocumentType : String as QualifiedDocumentType
  static final var VERSION : String = "2.2"

  construct() {  
    var plugin = Plugins.get(ISolrSearchPlugin)
    _qualifiedDocumentType = plugin.DocumentType + "_active"
  }
    

  function dismaxQuery(query : String, includeFields : String[], start : int = 0, rows : int = 10) : QueryResponse {
        
    var argMap = new LinkedHashMap<String, String>()
    argMap.put("q", query)
    argMap.put("qf", includeFields.join("+"))
    argMap.put("version", VERSION)
    argMap.put("start", Integer.toString(start))
    argMap.put("rows", Integer.toString(rows))
    argMap.put("indent", "on")
    
    var solrQuery = new SolrQuery()
    for(entry in argMap.entrySet()) {
      solrQuery.setParam(entry.Key, { entry.Value })
    }
    
    var solrServer = PLDependencies.getSolrServerMgr().findServer(QualifiedDocumentType)
    var queryResponse = solrServer.query(solrQuery)
    
    return queryResponse
    
  }
  
  // TODO refactor / combine with dismaxQuery, above
  function standardQuery(query : String, start : int = 0, rows : int = 10) : QueryResponse {
  
    var argMap = new LinkedHashMap<String, String>()
    argMap.put("q", query)
    argMap.put("version", VERSION)
    argMap.put("start", Integer.toString(start))
    argMap.put("rows", Integer.toString(rows))
    argMap.put("indent", "on")
  
    var solrQuery = new SolrQuery()
    for(entry in argMap.entrySet()) {
      solrQuery.setParam(entry.Key, { entry.Value })
    }
    
    var solrServer = PLDependencies.getSolrServerMgr().findServer(QualifiedDocumentType)
    var queryResponse = solrServer.query(solrQuery,SolrRequest.METHOD.POST)
    
    return queryResponse
    
  }
  
  function updateStr(xml : String, commit : boolean = true){
    
    updateDoc(convertXmlToSolrInputDoc( xml ), commit)   
    
  }
    
  function updateDoc(doc : SolrInputDocument, commit : boolean = true){
    
    var solrServer = PLDependencies.getSolrServerMgr().findServer(QualifiedDocumentType)
    solrServer.add(doc)
    
    if(commit) {
      solrServer.commit()
    }
    
  }
  
  function commit(){

    var solrServer = PLDependencies.getSolrServerMgr().findServer(QualifiedDocumentType)
    solrServer.commit()
        
  }

  function dropdb(){

    var solrServer = PLDependencies.getSolrServerMgr().findServer(QualifiedDocumentType)
    solrServer.deleteByQuery("*:*")
    solrServer.commit()
    
  }
  
  // TODO method is untested, may have bugs...
  private function convertXmlToSolrInputDoc( str : String ) : SolrInputDocument {
    
    var solrInputDoc = new SolrInputDocument()
    var node = XmlElement.parse(str)
    
    node.Children.each( \ c -> {
      var fieldValue = convertNode(c)
      if(fieldValue != null) {
        var fieldName = c.getAttributeValue("name")
        solrInputDoc.setField(fieldName, fieldValue)
      }
    })
    
    return solrInputDoc
    
  }
  
  // TODO replicated from MockSolrDB.  Find a clean way to share this (maybe PL candidate?)
  private static function convertNode(node : XmlElement) : Object {
    var result : Object = null
    var qnameStr = node.QName as String
    if("str".equals(qnameStr)) {
      result = node.Text
    } else if("int".equals(qnameStr)) {
      result = java.lang.Integer.valueOf(node.Text)
    } else if("long".equals(qnameStr)) {
      result = java.lang.Long.valueOf(node.Text)
    } else if("float".equals(qnameStr)) {
      result = java.lang.Float.valueOf(node.Text)
    } else if("double".equals(qnameStr)) {
      result = java.lang.Double.valueOf(node.Text)
    } else if("bool".equals(qnameStr)) {
      result = java.lang.Boolean.valueOf(node.Text)
    } else if("short".equals(qnameStr)) {
      result = java.lang.Short.valueOf(node.Text)
    } else if("byte".equals(qnameStr)) {
      result = java.lang.Byte.valueOf(node.Text)
    } else if("date".equals(qnameStr)) {
      print("FIXME convert text `" + node.Text + "` to Date object")
      result = node.Text
    } else if("arr".equals(qnameStr)) {
      var arrayValues = new ArrayList()
      node.Children.each( \ c -> {
        var arrayValue = convertNode(c)
        if(arrayValue != null) {
          arrayValues.add(arrayValue)
        }
      })
      result = arrayValues
    }
    return result
  }
  
  
}
