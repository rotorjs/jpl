declare module '@jplorg/jpl' {
  type JPLOptions = {
    runtime?: {
      vars?: Record<string, unknown>;
    };
  };

  export class JPLProgram {
    async run(inputs: unknown[], options?: JPLOptions): Promise<unknown[]>;
  }

  export function parse(
    source: string,
    options?: JPLOptions,
  ): Promise<JPLProgram>;
}
