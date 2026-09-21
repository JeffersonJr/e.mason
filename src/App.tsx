import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import IdCards from './pages/IdCards';
import Documents from './pages/Documents';
import Finance from './pages/Finance';
import SiteBuilder from './pages/SiteBuilder';
import Lodges from './pages/Lodges';
import './App.css';

function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/obreiros" element={<Members />} />
            <Route path="/lojas" element={<Lodges />} />
            <Route path="/carteirinhas" element={<IdCards />} />
            <Route path="/documentos" element={<Documents />} />
            <Route path="/tesouraria" element={<Finance />} />
            <Route path="/site-builder" element={<SiteBuilder />} />
            <Route path="/configuracoes" element={<SettingsPlaceholder />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__icon">⚙️</div>
      <h2>Configurações</h2>
      <p>Módulo em desenvolvimento. Em breve disponível.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppLayout />
      </ProfileProvider>
    </BrowserRouter>
  );
}
