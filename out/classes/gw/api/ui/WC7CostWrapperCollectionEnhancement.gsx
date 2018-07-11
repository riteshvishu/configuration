package gw.api.ui
uses java.util.Collection

enhancement WC7CostWrapperCollectionEnhancement : Collection<WC7CostWrapper> {
  function addWC7Costs(costs : Collection<WC7Cost>){
    this.addAll( costs.map( \ c -> new WC7CostWrapper(c)).toCollection() )
  }  
}
