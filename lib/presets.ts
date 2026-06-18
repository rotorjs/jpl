import type { JPLStateReducer } from '@/JPLStateReducer';
import type { JPLVarHandler } from '@/JPLVarHandler';

export type Vars = Record<string, JPLVarHandler<JPLStateReducer>>;
