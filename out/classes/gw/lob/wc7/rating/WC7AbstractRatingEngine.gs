package gw.lob.wc7.rating
uses gw.rating.AbstractRatingEngine


abstract class WC7AbstractRatingEngine<T extends productmodel.WC7Line> extends AbstractRatingEngine<productmodel.WC7Line> {
  var _minimumRatingLevel : RateBookStatus as readonly MinimumRatingLevel
  
  construct(line : T, minRatingLevel : RateBookStatus) {
    super(line)
    _minimumRatingLevel = minRatingLevel
  }

}
