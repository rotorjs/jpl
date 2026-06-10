import { parse as parseJPLProgram, type JPLProgram } from '@jplorg/jpl';
import {
  DashboardStateReducer,
  type DashboardEngine,
  type DashboardNode,
  type DashboardState,
  type DashboardStateDescriptor,
} from '@rotorjs/dashboard';
import type { JPLVarHandler } from './JPLVarHandler';

export type JPLStateReducerParams = {
  src?: string;
  vars?: Record<string, unknown>;
};

export type JPLStateReducerOptions<
  Reducer extends JPLStateReducer = JPLStateReducer,
> = {
  program?: JPLProgram | string;
  vars?: Record<string, JPLVarHandler<Reducer>>;
};

export class JPLStateReducer<
  Engine extends DashboardEngine = DashboardEngine,
> extends DashboardStateReducer<Engine> {
  #options;
  #varGetters: [string, () => Promise<unknown> | unknown][];
  #program?: JPLProgram;
  #parseError?: unknown;

  constructor(
    engine: Engine,
    descriptor: DashboardStateDescriptor,
    options?: JPLStateReducerOptions,
  ) {
    super(engine, descriptor);

    this.#options = options ?? {};
    this.#varGetters = Object.entries(this.#options.vars ?? {}).map(
      ([name, init]) => [name, init(this)],
    );

    this.update();
  }

  protected get params(): JPLStateReducerParams | undefined {
    return this.descriptor.params as JPLStateReducerParams | undefined;
  }

  async getProgram(): Promise<JPLProgram> {
    if (this.#parseError) throw this.#parseError;
    if (!this.#program) {
      try {
        const src = this.#options.program ?? this.params?.src ?? '';
        this.#program =
          typeof src === 'string' ? await parseJPLProgram(src) : src;
      } catch (error) {
        this.#parseError = error;
        throw error;
      }
    }
    return this.#program;
  }

  async getVars(): Promise<Record<string, unknown>> {
    return {
      ...Object.fromEntries(
        await Promise.all(
          this.#varGetters.map(async ([name, getter]) => [
            name,
            await getter(),
          ]),
        ),
      ),
      ...(this.params?.vars ?? {}),
    };
  }

  async reduce(): Promise<DashboardState> {
    const program = await this.getProgram();
    const vars = await this.getVars();
    const results = await program.run([null], { runtime: { vars } });

    const nextState: DashboardState = results as DashboardNode[];
    return nextState;
  }
}
