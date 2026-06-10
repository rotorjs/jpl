import type { JPLStateReducer } from './JPLStateReducer';
import type { JPLVarHandler } from './JPLVarHandler';
import jplFormatNumber from './vars/jplFormatNumber';
import jplVar from './vars/jplVar';

type Vars = Record<string, JPLVarHandler<JPLStateReducer>>;

export const vars = {
  var: jplVar,
  formatNumber: jplFormatNumber,
} satisfies Vars;
