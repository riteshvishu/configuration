package gw.lob.wc7.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.api.xml.XMLNode
uses gw.forms.generic.AbstractMultipleCopiesForm

@Export
class WC7Form_WC_04_03_06_CA extends AbstractMultipleCopiesForm<WC7WaiverOfSubro> {

  override function getEntities(context : FormInferenceContext, availableStates : Set<Jurisdiction>) : List<WC7WaiverOfSubro> {
    return context.Period.WC7Line.WC7WaiverOfSubros.toList()  
  }
  
  override property get FormAssociationPropertyName() : String {
    return "WC7WaiverOfSubro"  
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) {
    contentNode.addChild(createTextNode("BasisAmount", _entity.BasisAmount as String))
    contentNode.addChild(createTextNode("Classification", _entity.ClassCode.Classification))
    contentNode.addChild(createTextNode("Description", _entity.Description))
  }
  
  override protected function createFormAssociation(form : Form) : FormAssociation {
    return new WC7FormAssociation(form.Branch)  
  }
}
