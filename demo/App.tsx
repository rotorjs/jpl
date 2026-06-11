import { createJPLStateReducerConfig } from '@/createJPLStateReducerConfig';
import { DashboardEngine, DashboardEventTarget } from '@rotorjs/dashboard';
import './App.css';

const target = new DashboardEventTarget();
const _engine = new DashboardEngine(target, {
  script: createJPLStateReducerConfig(),
});

export default function App() {
  return 'Demo';
}
