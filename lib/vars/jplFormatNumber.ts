import { assertJSON, assertType } from '@/utils';
import {
  JPLRuntimeError,
  type JPLFunc,
  type JPLRuntime,
  type JPLRuntimeSignal,
} from '@jplorg/jpl';
import {
  NumberFormatter,
  type DashboardStateReducer,
  type NumberFormat,
} from '@rotorjs/dashboard';

export default function jplFormatNumber(reducer: DashboardStateReducer) {
  const formatter = new NumberFormatter({ reducer });

  return (): JPLFunc => {
    formatter.removeInterests();

    return (
      runtime: JPLRuntime,
      _signal: JPLRuntimeSignal,
      next: (output: unknown) => Promise<unknown[]> | unknown[],
      input: unknown,
      ...args: unknown[]
    ): Promise<unknown[]> | unknown[] => {
      if (args.length > 1) throw new JPLRuntimeError('too many arguments');

      const value = assertType<number>(
        runtime,
        input,
        ['number'],
        'invalid input (%s %*<100v): expected number',
      );

      const format = assertJSON<NumberFormat>(
        runtime,
        args[0],
        ['null', 'object'],
        'invalid argument 0 (%s %*<100v): expected object',
      );

      return next(runtime.normalizeValue(formatter.format(value, format)));
    };
  };
}
