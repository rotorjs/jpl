import { assertType } from '@/utils';
import {
  JPLRuntimeError,
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
      ...args: unknown[]
    ): Promise<unknown[]> | unknown[] => {
      if (args.length > 0) throw new JPLRuntimeError('too many arguments');

      const varName = assertType<string>(
        runtime,
        input,
        ['string'],
        'invalid input (%s %*<100v): expected string',
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
