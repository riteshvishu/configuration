package gw.api.web.producer

uses gw.api.database.IQueryBeanResult
uses gw.api.system.PLDependenciesGateway
uses gw.api.database.ISelectQueryBuilder

enhancement ProducerUtilEnhancement : gw.api.web.producer.ProducerUtil {

  /**
   * Gets the list of available ProducerCodes based on the agency selection
   */
  public static function getProducerCodeRange(agency : Organization, use : ProducerStatusUse) : IQueryBeanResult<ProducerCode> {
    var user = PLDependenciesGateway.getCommonDependencies().getCurrentUser()

    var producerCodeQueryBuilder =  new gw.product.ProducerCodeQueryBuilder()
      .withSecure(user.UseProducerCodeSecurity)
      .withStatusUse(use)
      .withProducer(agency)
    var producerCodesQuery = producerCodeQueryBuilder.build() as ISelectQueryBuilder<ProducerCode>
    var producerCodes = producerCodesQuery.select()
    return producerCodes.orderBy(\ producerCode -> producerCode.Code) as IQueryBeanResult<ProducerCode>
  }
}
