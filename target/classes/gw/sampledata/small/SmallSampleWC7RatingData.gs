package gw.sampledata.small
uses java.lang.String
uses entity.RateBook
uses gw.sampledata.AbstractSampleDataCollection
uses gw.api.databuilder.wc7.scenarios.sample.WC7RatingSampleDataScenario

class SmallSampleWC7RatingData extends AbstractSampleDataCollection {

  override property get CollectionName() : String {
    return "Small WC7 Rate Tables"
  }

  override property get AlreadyLoaded() : boolean {
    var books = find (book in RateBook where book.BookCode == WC7RatingSampleDataScenario.WC7_DEMO_RATE_BOOK_CODE)
    return books.Count > 0
  }

  override function load() {
    WC7RatingSampleDataScenario.aRatingSampleDataScenario().createAndCommitBooks()   
  }
}
