import type { JPLStateReducer } from './JPLStateReducer';

export type JPLVarHandler<Reducer extends JPLStateReducer = JPLStateReducer> = {
  bivarianceHack(reducer: Reducer): () => Promise<unknown> | unknown;
}['bivarianceHack'];
