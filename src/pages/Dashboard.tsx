import { useProfile } from '../context/ProfileContext';
import DashboardPotencia from './dashboards/DashboardPotencia';
import DashboardLoja from './dashboards/DashboardLoja';
import DashboardIrmao from './dashboards/DashboardIrmao';
import './Dashboard.css';

export default function Dashboard() {
  const { mode } = useProfile();

  return (
    <div className="dashboard page-enter">
      {mode === 'potencia' && <DashboardPotencia />}
      {mode === 'loja' && <DashboardLoja />}
      {mode === 'irmao' && <DashboardIrmao />}
    </div>
  );
}

