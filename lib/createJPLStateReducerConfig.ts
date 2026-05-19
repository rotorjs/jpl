import type {
  DashboardEngine,
  DashboardStateDescriptor,
  DashboardStateReducerConfig,
} from '@rotorjs/dashboard';
import objectHash from 'object-hash';
import {
  JPLStateReducer,
  type JPLStateReducerOptions,
} from './JPLStateReducer';

export function createJPLStateReducerConfig(
  options?: JPLStateReducerOptions,
): DashboardStateReducerConfig {
  return {
    getReducerID: (params) => objectHash({ params }),
    createReducer: (
      engine: DashboardEngine,
      descriptor: DashboardStateDescriptor,
    ) => new JPLStateReducer(engine, descriptor, options),
  };
}
