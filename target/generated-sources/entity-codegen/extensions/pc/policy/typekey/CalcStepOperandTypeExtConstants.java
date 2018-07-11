
package extensions.pc.policy.typekey;

import gw.pc.policy.typekey.CalcStepOperandType;
import gw.pc.policy.typekey.CalcStepOperandType.CalcStepOperandTypeCache;

public final class CalcStepOperandTypeExtConstants {

    public final static CalcStepOperandTypeCache TC_COMPARISON = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "comparison");
    public final static CalcStepOperandTypeCache TC_CONDITIONAL = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "conditional");
    public final static CalcStepOperandTypeCache TC_CONSTANT = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "constant");
    public final static CalcStepOperandTypeCache TC_INSCOPE = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "inscope");
    public final static CalcStepOperandTypeCache TC_LOCALVAR = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "localvar");
    public final static CalcStepOperandTypeCache TC_RATEFUNC = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "ratefunc");
    public final static CalcStepOperandTypeCache TC_RATETABLE = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "ratetable");
    public final static CalcStepOperandTypeCache TC_ROUNDING = new CalcStepOperandTypeCache(CalcStepOperandType.TYPE, "rounding");

}
