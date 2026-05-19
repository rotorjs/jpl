import { createJPLStateReducerConfig } from '@/createJPLStateReducerConfig';
import { DashboardEngine } from '@rotorjs/dashboard';
import './App.css';

const _engine = new DashboardEngine({ script: createJPLStateReducerConfig() });

export default function App() {
  return 'Demo';
}
