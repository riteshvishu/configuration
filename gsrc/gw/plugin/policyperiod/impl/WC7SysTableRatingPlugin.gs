package gw.plugin.policyperiod.impl

uses gw.rating.AbstractRatingEngine
uses gw.lob.wc7.rating.WC7SysTableRatingEngine

@Export
class WC7SysTableRatingPlugin extends SysTableRatingPlugin {

  override protected function createRatingEngine(line : PolicyLine) : AbstractRatingEngine {
    switch(typeof line) {
      case productmodel.WC7Line: {
        return new WC7SysTableRatingEngine(line)
      }
      default: {
        return super.createRatingEngine(line)
      }
    }
  }
}