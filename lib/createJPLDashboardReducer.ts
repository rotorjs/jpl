import type {
  DashboardEngine,
  DashboardReducerInit,
  DashboardState,
} from '@rotorjs/dashboards';
import {
  JPLDashboardReducer,
  type JPLDashboardReducerOptions,
} from './JPLDashboardReducer';

export type JPLDashboardReducerInit = { src: string };

export function createJPLDashboardReducer(
  options?: JPLDashboardReducerOptions,
) {
  return (
    engine: DashboardEngine,
    init: DashboardReducerInit,
    callback: (state: DashboardState) => void,
  ) => {
    return new JPLDashboardReducer(
      engine,
      (init as JPLDashboardReducerInit).src ?? '',
      callback,
      options,
    );
  };
}
