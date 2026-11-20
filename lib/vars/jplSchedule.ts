import { assertType } from '@/utils';
import {
  JPLRuntimeError,
  type JPLFunc,
  type JPLRuntime,
  type JPLRuntimeSignal,
} from '@jplorg/jpl';
import { type DashboardStateReducer } from '@rotorjs/dashboard';

export default function jplSchedule(reducer: DashboardStateReducer) {
  return (): JPLFunc => {
    return (
      runtime: JPLRuntime,
      _signal: JPLRuntimeSignal,
      next: (output: unknown) => Promise<unknown[]> | unknown[],
      input: unknown,
      ...args: unknown[]
    ): Promise<unknown[]> | unknown[] => {
      if (args.length > 0) throw new JPLRuntimeError('too many arguments');

      const duration = assertType<number>(
        runtime,
        input,
        ['null', 'number'],
        'invalid input (%s %*<100v): expected number',
      );

      setTimeout(() => {
        reducer.update();
      }, duration);

      return next(input);
    };
  };
}
