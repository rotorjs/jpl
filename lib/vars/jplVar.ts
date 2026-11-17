import { assertType } from '@/utils';
import {
  type JPLFunc,
  type JPLRuntime,
  type JPLRuntimeSignal,
} from '@jplorg/jpl';
import {
  dashboardVarInterest,
  type DashboardStateReducer,
} from '@rotorjs/dashboard';

export default function jplVar(reducer: DashboardStateReducer) {
  const requestedInterests = new Set<string>();

  return (): JPLFunc => {
    requestedInterests.forEach((interest) => {
      reducer.removeInterest(interest);
    });
    requestedInterests.clear();

    return (
      runtime: JPLRuntime,
      _signal: JPLRuntimeSignal,
      next: (output: unknown) => Promise<unknown[]> | unknown[],
      input: unknown,
    ): Promise<unknown[]> | unknown[] => {
      const varName = assertType<string>(
        runtime,
        input,
        ['string'],
        '%s (%*<100v) cannot be used as a variable name',
      );

      const varInterest = dashboardVarInterest(varName);
      requestedInterests.add(varInterest);
      reducer.addInterest(varInterest);

      return next(
        runtime.normalizeValue(reducer.engine.getVar(varName)?.value),
      );
    };
  };
}
