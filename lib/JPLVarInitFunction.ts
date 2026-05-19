import type { JPLStateReducer } from './JPLStateReducer';

export type JPLVarInitFunction<
  Reducer extends JPLStateReducer = JPLStateReducer,
> = {
  bivarianceHack(reducer: Reducer): () => Promise<unknown> | unknown;
}['bivarianceHack'];
