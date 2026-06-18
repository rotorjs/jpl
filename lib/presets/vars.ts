import type { Vars } from '@/presets';
import jplFormatNumber from '@/vars/jplFormatNumber';
import jplVar from '@/vars/jplVar';

const vars = {
  var: jplVar,
  formatNumber: jplFormatNumber,
} satisfies Vars;
export default vars;
