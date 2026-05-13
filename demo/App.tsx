import { createJPLDashboardReducer } from '@/createJPLDashboardReducer';
import { DashboardEngine } from '@rotorjs/dashboards';
import './App.css';

const _engine = new DashboardEngine(createJPLDashboardReducer());

export default function App() {
  return 'Demo';
}
