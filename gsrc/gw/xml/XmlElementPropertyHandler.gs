package gw.xml

uses org.apache.commons.jxpath.DynamicPropertyHandler

class XmlElementPropertyHandler implements DynamicPropertyHandler {

  override function getProperty(currentElement : Object, propertyName : String) : Object {
    var element = currentElement as XmlElement

    var candidate = attributeMatch(element, propertyName) as Object

    if (candidate == null) {
      var children = element.getChildren(propertyName)

      candidate = leafMatch(children, propertyName)
      if (candidate == null) {
        candidate = children
      }
    }

    return candidate
  }

  private function attributeMatch(element : XmlElement, propertyName : String) : String {
    return element.getAttributeValue(propertyName)
  }

  private function leafMatch(children : List<XmlElement>, propertyName : String) : String {
    return children.firstWhere(\ child -> child.Text != "" and child.QName == propertyName).Text
  }

  override function getPropertyNames(currentElement : Object) : String[] {
    var element = currentElement as XmlElement
    // get all the attribute names
    var attributeNames = element.AttributeNames.map(\ q -> q.toString())
    // add all the sub-element names
    var childNames = element.Children.map(\ e -> e.QName.toString())
    var names = attributeNames.union(childNames).toTypedArray()
    return names
  }

  override function setProperty(p0 : Object, p1 : String, p2 : Object) {
    // for now we use JXPath readonly
  }

}
