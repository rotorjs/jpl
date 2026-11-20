import type { Vars } from '@/presets';
import jplFormatNumber from '@/vars/jplFormatNumber';
import jplSchedule from '@/vars/jplSchedule';
import jplVar from '@/vars/jplVar';

const vars = {
  formatNumber: jplFormatNumber,
  schedule: jplSchedule,
  var: jplVar,
} satisfies Vars;
export default vars;
