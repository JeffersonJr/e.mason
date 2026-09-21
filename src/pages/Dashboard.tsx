import { useProfile } from '../context/ProfileContext';
import DashboardPotencia from './dashboard/DashboardPotencia';
import DashboardLoja from './dashboard/DashboardLoja';
import DashboardIrmao from './dashboard/DashboardIrmao';
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

