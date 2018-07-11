package gw.command

uses com.guidewire.pl.quickjump.DefaultMethod
uses com.guidewire.pl.quickjump.BaseCommand
uses gw.rating.flow.BigRateRoutine

@Export
@DefaultMethod("createRoutine")
class BigRateRoutineCreate extends BaseCommand {

  function createRoutine() {
    BigRateRoutine.getOrCreateBigRateRoutine()
  }
}