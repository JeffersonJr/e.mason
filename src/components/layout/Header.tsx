import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ChevronDown, Building2, Shield, User } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import type { ProfileMode } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import './Header.css';

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/obreiros': 'Obreiros & Cargos',
  '/lojas': 'Lojas Subordinadas',
  '/carteirinhas': 'Carteirinhas Digitais',
  '/documentos': 'Documentos & Rituais',
  '/tesouraria': 'Tesouraria',
  '/site-builder': 'Site Builder',
  '/configuracoes': 'Configurações',
};

const modeOptions: { value: ProfileMode; label: string; sublabel: string; icon: React.ReactNode }[] = [
  { value: 'potencia', label: 'Potência (GOMB)', sublabel: 'Grão-Mestre · Visão Global', icon: <Shield size={15} /> },
  { value: 'loja', label: 'Loja Luz e Progresso', sublabel: 'Venerável Mestre · Visão Local', icon: <Building2 size={15} /> },
  { value: 'irmao', label: 'Ir. Jefferson Amorim', sublabel: '33° REAA · Membro', icon: <User size={15} /> },
];

const notifications = [
  { id: 1, title: 'Inadimplência detectada', desc: 'Ir. Lucas Ferreira — 2 meses', time: '2h', read: false },
  { id: 2, title: 'Nova Loja solicitou vínculo', desc: 'Loja Oriente de Codó #012', time: '5h', read: false },
  { id: 3, title: 'Sessão Magna confirmada', desc: 'Abril 15, 2024 — 20h00', time: '1d', read: true },
];

export default function Header() {
  const { mode, setMode, user } = useProfile();
  const location = useLocation();
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const pageName = pageNames[location.pathname] || 'e.mason';
  const currentMode = modeOptions.find(m => m.value === mode)!;
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="header">
      {/* Left: Page title */}
      <div className="header__left">
        <div className="header__page-title">
          <h1>{pageName}</h1>
          <div className="header__breadcrumb">
            <span>{currentMode.label}</span>
            <span className="header__breadcrumb-sep">/</span>
            <span>{pageName}</span>
          </div>
        </div>
      </div>

      {/* Center: Search */}
      <div className="header__search-wrap">
        <div className="header__search">
          <Search size={15} className="header__search-icon" />
          <input
            type="search"
            placeholder="Buscar irmão, loja, documento..."
            className="header__search-input"
            id="global-search"
          />
          <kbd className="header__search-kbd">⌘K</kbd>
        </div>
      </div>

      {/* Right: Profile switcher + notifications + user */}
      <div className="header__right">
        {/* Profile Mode Switcher */}
        <div className="header__mode-switcher" id="profile-mode-switcher">
          <button
            className="header__mode-btn"
            onClick={() => { setShowModeMenu(!showModeMenu); setShowNotifs(false); }}
          >
            <div className={`header__mode-indicator header__mode-indicator--${mode}`}>
              {currentMode.icon}
            </div>
            <div className="header__mode-text">
              <span className="header__mode-label">{currentMode.label}</span>
              <span className="header__mode-sub">{currentMode.sublabel}</span>
            </div>
            <ChevronDown size={14} className={`header__chevron ${showModeMenu ? 'header__chevron--open' : ''}`} />
          </button>

          {showModeMenu && (
            <div className="header__mode-dropdown" id="mode-dropdown">
              <div className="header__mode-dropdown-title">Alternar Perfil de Acesso</div>
              {modeOptions.map(opt => (
                <button
                  key={opt.value}
                  className={`header__mode-option ${opt.value === mode ? 'header__mode-option--active' : ''}`}
                  onClick={() => { setMode(opt.value); setShowModeMenu(false); }}
                  id={`mode-option-${opt.value}`}
                >
                  <div className={`header__mode-indicator header__mode-indicator--${opt.value}`} style={{ width: 32, height: 32 }}>
                    {opt.icon}
                  </div>
                  <div>
                    <div className="header__mode-option-label">{opt.label}</div>
                    <div className="header__mode-option-sub">{opt.sublabel}</div>
                  </div>
                  {opt.value === mode && (
                    <Badge variant="accent" size="sm">Ativo</Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="header__notif-wrap" id="notifications-btn">
          <button
            className="header__notif-btn"
            onClick={() => { setShowNotifs(!showNotifs); setShowModeMenu(false); }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="header__notif-count">{unreadCount}</span>
            )}
          </button>

          {showNotifs && (
            <div className="header__notif-dropdown" id="notifications-dropdown">
              <div className="header__notif-header">
                <span>Notificações</span>
                <Badge variant="accent" size="sm">{unreadCount} novas</Badge>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`header__notif-item ${!n.read ? 'header__notif-item--unread' : ''}`}>
                  <div className="header__notif-dot" style={{ background: n.read ? 'var(--color-border)' : 'var(--color-accent)' }} />
                  <div className="header__notif-body">
                    <div className="header__notif-title">{n.title}</div>
                    <div className="header__notif-desc">{n.desc}</div>
                  </div>
                  <div className="header__notif-time">{n.time}</div>
                </div>
              ))}
              <button className="header__notif-all">Ver todas as notificações</button>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="header__user" id="user-menu">
          <Avatar initials={user.avatar} size="sm" gradient status={user.status} />
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(showModeMenu || showNotifs) && (
        <div
          className="header__overlay"
          onClick={() => { setShowModeMenu(false); setShowNotifs(false); }}
        />
      )}
    </header>
  );
}
