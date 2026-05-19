import type {
  DashboardLayoutNode,
  DashboardTileNode,
} from '@rotorjs/dashboard';

export type JPLDashboardLayoutNode = {
  type: string;
  id?: string;
  src?: string;
  vars?: Record<string, unknown>;
  initial?: DashboardLayoutNode;
};

export type JPLDashboardTileNode = {
  type: string;
  id?: string;
  src?: string;
  vars?: Record<string, unknown>;
  initial?: DashboardTileNode[];
};
