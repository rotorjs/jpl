import { parse as parseJPLProgram, type JPLProgram } from '@jplorg/jpl';
import {
  DashboardReducer,
  type DashboardEngine,
  type DashboardNode,
  type DashboardState,
} from '@rotorjs/dashboards';
import deepEquals from 'fast-deep-equal';

export type JPLVarInitFunction<
  Reducer extends JPLDashboardReducer = JPLDashboardReducer,
> = {
  bivarianceHack(reducer: Reducer): unknown;
}['bivarianceHack'];

export type JPLDashboardReducerOptions<
  Reducer extends JPLDashboardReducer = JPLDashboardReducer,
> = {
  vars?: Record<string, JPLVarInitFunction<Reducer> | unknown>;
  initialState?: DashboardState;
  compare?: (a: DashboardState, b: DashboardState) => boolean;
};

export class JPLDashboardReducer<
  Engine extends DashboardEngine = DashboardEngine,
> extends DashboardReducer<Engine> {
  #program;
  #parseError?: unknown;
  #vars;
  #compare;

  constructor(
    engine: Engine,
    program: JPLProgram | string,
    callback: (state: DashboardState) => void,
    options?: JPLDashboardReducerOptions,
  ) {
    super(engine, options?.initialState ?? [], callback);

    this.#program = program;
    this.#vars = options?.vars ?? {};
    this.#compare = options?.compare ?? deepEquals;

    this.update();
  }

  async getProgram(): Promise<JPLProgram> {
    if (this.#parseError) throw this.#parseError;
    if (typeof this.#program === 'string') {
      try {
        this.#program = await parseJPLProgram(this.#program);
      } catch (error) {
        this.#parseError = error;
        throw error;
      }
    }
    return this.#program;
  }

  async reduce(prevState: DashboardState): Promise<DashboardState> {
    const program = await this.getProgram();

    const vars = Object.fromEntries(
      Object.entries(this.#vars).map(([name, initOrVar]) => [
        name,
        typeof initOrVar === 'function' ? initOrVar(this) : initOrVar,
      ]),
    );

    const results = await program.run([null], { runtime: { vars } });

    const nextState: DashboardState = results as DashboardNode[];

    return this.#compare(prevState, nextState) ? prevState : nextState;
  }
}
