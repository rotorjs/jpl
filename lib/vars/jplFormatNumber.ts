import { assertJSON, assertType } from '@/utils';
import {
  type JPLFunc,
  type JPLRuntime,
  type JPLRuntimeSignal,
} from '@jplorg/jpl';
import {
  dashboardFactInterest,
  dashboardLocaleFact,
  type DashboardStateReducer,
  type NumberFormat,
  NumberFormatter,
} from '@rotorjs/dashboard';

export default function jplFormatNumber(reducer: DashboardStateReducer) {
  const formatter = new NumberFormatter({ reducer });

  return (): JPLFunc => {
    reducer.removeInterest(dashboardFactInterest(dashboardLocaleFact));

    return (
      runtime: JPLRuntime,
      _signal: JPLRuntimeSignal,
      next: (output: unknown) => Promise<unknown[]> | unknown[],
      input: unknown,
      arg0: unknown,
    ): Promise<unknown[]> | unknown[] => {
      const value = assertType<number>(
        runtime,
        input,
        ['number'],
        'cannot format %s (%*<100v) as number',
      );
      const format = assertJSON<NumberFormat>(
        runtime,
        arg0,
        ['null', 'object'],
        'expected an object as number format but got %s (%s<100v)',
      );

      return next(runtime.normalizeValue(formatter.format(value, format)));
    };
  };
}
