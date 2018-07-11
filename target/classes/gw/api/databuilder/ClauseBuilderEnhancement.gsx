package gw.api.databuilder

uses gw.api.databuilder.populator.BeanPopulator
uses gw.api.productmodel.CovTermPatternLookup

uses java.math.BigDecimal
uses java.util.Date

enhancement ClauseBuilderEnhancement<T extends gw.pl.persistence.core.Bean,
    B extends gw.api.builder.ClauseBuilder, 
    P extends gw.api.productmodel.ClausePattern> : 
  gw.api.builder.ClauseBuilder<T, B, P> {

  function withGenericTermValue(termCode : String, value : String) : B {
    var covTermPattern = CovTermPatternLookup.getByCode(termCode)
    this.set(covTermPattern.CoverageColumnProperty, value)
    return this as B
  }
  
  function withGenericTermValue(termCode : String, dateValue : Date) : B {
    var covTermPattern = CovTermPatternLookup.getByCode(termCode)
    this.set(covTermPattern.CoverageColumnProperty, dateValue)
    return this as B
  }

  function withGenericTermValue(termCode : String, value : Boolean) : B {
    var covTermPattern = CovTermPatternLookup.getByCode(termCode)
    this.set(covTermPattern.CoverageColumnProperty, value)
    return this as B
  }

  function withDirectTermValue(termCode : String, value : BigDecimal) : B {
    var covTermPattern = CovTermPatternLookup.getByCode(termCode)
    this.set(covTermPattern.CoverageColumnProperty, value)
    return this as B
  }

  function addBeanPopulator(populator : BeanPopulator<? super T>) : B {
    this.addPopulator(populator)
    return this as B
  }
}
