import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, FolderOpen,
  Globe, DollarSign, Settings, ChevronRight,
  Building2, Shield, LogOut, Zap,
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import type { ProfileMode } from '../../types';
import MasonicHex from '../ui/MasonicHex';
import Avatar from '../ui/Avatar';
import './Sidebar.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  accessLevels: ProfileMode[];
  section?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'members', label: 'Obreiros & Cargos', icon: <Users size={18} />, path: '/obreiros', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'lodges', label: 'Lojas Subordinadas', icon: <Building2 size={18} />, path: '/lojas', accessLevels: ['potencia'], section: 'principal' },
  { id: 'idcards', label: 'Carteirinhas', icon: <CreditCard size={18} />, path: '/carteirinhas', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'documents', label: 'Documentos & Rituais', icon: <FolderOpen size={18} />, path: '/documentos', accessLevels: ['potencia', 'loja', 'irmao'], section: 'principal' },
  { id: 'finance', label: 'Tesouraria', icon: <DollarSign size={18} />, path: '/tesouraria', accessLevels: ['potencia', 'loja'], section: 'principal' },
  { id: 'sitebuilder', label: 'Site Builder', icon: <Globe size={18} />, path: '/site-builder', accessLevels: ['potencia', 'loja'], section: 'cms' },
  { id: 'settings', label: 'Configurações', icon: <Settings size={18} />, path: '/configuracoes', accessLevels: ['potencia', 'loja'], section: 'sistema' },
];

const modeLabels: Record<ProfileMode, { label: string; sublabel: string }> = {
  potencia: { label: 'GOMB', sublabel: 'Grande Oriente' },
  loja: { label: 'Loja Luz e Progresso', sublabel: 'Venerável: Ir. Carlos E.' },
  irmao: { label: 'Ir. Jefferson Amorim', sublabel: 'CIM: GOMB-2024-001337' },
};

export default function Sidebar() {
  const { mode, user } = useProfile();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = navItems.filter(item => item.accessLevels.includes(mode));

  const sections = {
    principal: visibleItems.filter(i => i.section === 'principal'),
    cms: visibleItems.filter(i => i.section === 'cms'),
    sistema: visibleItems.filter(i => i.section === 'sistema'),
  };

  const currentModeInfo = modeLabels[mode];

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <MasonicHex size={collapsed ? 34 : 38} variant="gradient" animated>
          <svg viewBox="0 0 24 24" fill="white" width="55%" height="55%">
            <path d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2ZM12 4.311L4 8.5V15.5L12 19.689L20 15.5V8.5L12 4.311Z" />
          </svg>
        </MasonicHex>
        {!collapsed && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-name">e.mason</span>
            <span className="sidebar__logo-powered">powered by Evolves</span>
          </div>
        )}
        <button className="sidebar__toggle" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expandir' : 'Recolher'}>
          <ChevronRight size={14} style={{ transform: collapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.25s' }} />
        </button>
      </div>

      {/* Context info */}
      {!collapsed && (
        <div className="sidebar__context">
          <div className="sidebar__context-badge">
            <Shield size={12} />
            <span>{mode === 'potencia' ? 'Potência' : mode === 'loja' ? 'Loja' : 'Irmão'}</span>
          </div>
          <div className="sidebar__context-name">{currentModeInfo.label}</div>
          <div className="sidebar__context-sub">{currentModeInfo.sublabel}</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar__nav">
        {/* Main section */}
        {sections.principal.length > 0 && (
          <div className="sidebar__section">
            {!collapsed && <span className="sidebar__section-label">Principal</span>}
            {sections.principal.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <span className="sidebar__item-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar__item-label">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="sidebar__item-badge">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        )}

        {/* CMS section */}
        {sections.cms.length > 0 && (
          <div className="sidebar__section">
            {!collapsed && <span className="sidebar__section-label">CMS & Publicação</span>}
            {sections.cms.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <span className="sidebar__item-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar__item-label">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        )}

        {/* Sistema section */}
        {sections.sistema.length > 0 && (
          <div className="sidebar__section">
            {!collapsed && <span className="sidebar__section-label">Sistema</span>}
            {sections.sistema.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <span className="sidebar__item-icon">{item.icon}</span>
                {!collapsed && <span className="sidebar__item-label">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Upgrade Banner */}
      {!collapsed && mode === 'loja' && (
        <div className="sidebar__promo">
          <div className="sidebar__promo-icon"><Zap size={14} /></div>
          <div>
            <div className="sidebar__promo-title">Plano Loja Pro</div>
            <div className="sidebar__promo-sub">Recursos avançados disponíveis</div>
          </div>
        </div>
      )}

      {/* User Footer */}
      <div className="sidebar__footer">
        <Avatar initials={user.avatar} size="sm" gradient />
        {!collapsed && (
          <div className="sidebar__footer-info">
            <div className="sidebar__footer-name">{user.name.replace('Ir. ', '')}</div>
            <div className="sidebar__footer-role">{user.role}</div>
          </div>
        )}
        {!collapsed && (
          <button className="sidebar__footer-logout" title="Sair">
            <LogOut size={15} />
          </button>
        )}
      </div>
    </aside>
  );
}
