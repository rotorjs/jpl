import type {
  DashboardEngine,
  DashboardReducerInit,
  DashboardState,
} from '@rotorjs/dashboards';
import {
  JPLDashboardReducer,
  type JPLDashboardReducerOptions,
} from './JPLDashboardReducer';

export type JPLDashboardReducerInit = {
  src: string;
  initialState?: DashboardState;
};

export function createJPLDashboardReducer(
  options?: JPLDashboardReducerOptions,
) {
  return (
    engine: DashboardEngine,
    init: DashboardReducerInit,
    callback: (state: DashboardState) => void,
  ) => {
    const { src, initialState } = init as JPLDashboardReducerInit;

    return new JPLDashboardReducer(engine, src ?? '', callback, {
      ...options,
      initialState: initialState ?? options?.initialState,
    });
  };
}
