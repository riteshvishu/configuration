package gw.lob.wc7

uses java.io.Serializable
uses gw.api.database.Query
uses java.util.Date
uses gw.api.productmodel.Product

@Export
class WC7AffinityGroupSearchCriteria  implements Serializable {

  var _affinityGroupName: String as AffinityGroupName
  var _organization: String as Organization
  var _groupType: WC7AffinityGroupType as AffinityGroupType
  var _producerCode: String as ProducerCode
  var _product: Product as Product
  var _onlyAvailableGroups: boolean as OnlyAvailableGroups

  function performSearch() : WC7AffinityGroupQuery {
    var query = constructBaseQuery()

    return query.select()
  }

  function performExactSearch() : WC7ClassCodeQuery {
    var query = constructBaseQuery()
 
     return query.select()
  }
  
  private function constructBaseQuery() : Query {
    var groupQuery = new Query<WC7AffinityGroup>( WC7AffinityGroup )

    if( this.AffinityGroupName != null ) {
      groupQuery.contains( "Name", this.AffinityGroupName , true )
    }

    if( this.Organization != null ) {
      var orgSubQuery = Query.make(entity.Organization)
      orgSubQuery.compare("Name", Equals, Organization)
      groupQuery.or(\ r1 -> {
        r1.compare("Organization", Equals, null)
        r1.subselect("Organization", CompareIn, orgSubQuery, "Id")
      })
    }

    if( this.AffinityGroupType != null ) {
      groupQuery.compare("AffinityGroupType", Equals , this.AffinityGroupType )
    }

    if (ProducerCode != null) {
      var prodCodeSubQuery = Query.make(WC7AffinityGroupProducerCode)
      prodCodeSubQuery.join("ProducerCode").startsWith("Code", ProducerCode, true)
      groupQuery.and(\ r1 -> { 
        r1.or(\ r2 -> {
          r2.subselect("Id", CompareNotIn, WC7AffinityGroupProducerCode, "AffinityGroup")
          r2.subselect("Id", CompareIn, prodCodeSubQuery, "AffinityGroup")
        })
      })
    }

    if (Product != null) {
      var productSubQuery = Query.make(WC7AffinityGroupProduct)
      productSubQuery.compare("ProductCode", Equals, Product.Code)
      groupQuery.and(\ r1 -> { 
        r1.or(\ r2 -> {
          r2.subselect("Id", CompareNotIn, WC7AffinityGroupProduct, "AffinityGroup")
          r2.subselect("Id", CompareIn, productSubQuery, "AffinityGroup")
        })
      })
    }
            
    if (this.OnlyAvailableGroups != null && this.OnlyAvailableGroups) {
      var today = new Date()
      groupQuery.and(\ r1 -> {
        r1.or(\ r2 -> {
          r2.compare("StartDate", Equals, null)
          r2.compare("StartDate", LessThanOrEquals, today)
        })

        r1.or(\ r2 -> {
          r2.compare("EndDate", Equals, null)
          r2.compare("EndDate", GreaterThanOrEquals, today)
        })
      })
    }

    return groupQuery
  }
}
