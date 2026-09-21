import { Calendar, DollarSign, CheckCircle, Clock, Star, CreditCard } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge, { StatusBadge, DegreeBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import MasonicHex from '../../components/ui/MasonicHex';
import { currentUser } from '../../data/mockData';
import './DashboardIrmao.css';

const upcomingSessions = [
  { id: 1, date: '24 Set', title: 'Sessão Ordinária', lodge: 'Luz e Progresso', degree: '3º Grau', status: 'confirmed' },
  { id: 2, date: '08 Out', title: 'Sessão Magna', lodge: 'GOMB', degree: 'Todos', status: 'upcoming' },
  { id: 3, date: '29 Out', title: 'Sessão Ordinária', lodge: 'Luz e Progresso', degree: '2º e 3º', status: 'upcoming' },
];

const myDocs = [
  { id: 1, title: 'Carteirinha Digital', icon: <CreditCard size={18} />, action: 'Visualizar', color: '#4298B5' },
  { id: 2, title: 'Comprovante de Regularidade', icon: <CheckCircle size={18} />, action: 'Baixar', color: '#00C288' },
  { id: 3, title: 'Histórico de Presenças', icon: <Clock size={18} />, action: 'Ver detalhes', color: '#F59E0B' },
];

export default function DashboardIrmao() {
  return (
    <div className="dash-irmao">
      {/* Profile hero */}
      <div className="irmao-hero">
        <div className="irmao-hero__bg">
          {/* decorative hex pattern */}
          <div className="irmao-hero__hex-deco">
            {[...Array(5)].map((_, i) => (
              <MasonicHex key={i} size={80 - i * 12} variant="gradient" className="irmao-hero__hex-item" />
            ))}
          </div>
        </div>
        <div className="irmao-hero__content">
          <Avatar initials={currentUser.avatar} size="xl" gradient />
          <div className="irmao-hero__info">
            <div className="irmao-hero__cim">CIM: {currentUser.cim}</div>
            <h2 className="irmao-hero__name">{currentUser.name}</h2>
            <div className="irmao-hero__role">{currentUser.role} · {currentUser.lodge}</div>
            <div className="irmao-hero__badges">
              <DegreeBadge degree={currentUser.degree} />
              <StatusBadge status={currentUser.status} />
              <Badge variant="primary" size="sm">Membro desde 2008</Badge>
            </div>
          </div>
          <div className="irmao-hero__actions">
            <Button variant="accent" icon={<CreditCard size={15} />}>Ver Carteirinha</Button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="dash-metrics-grid dash-metrics-grid--3">
        <div className="irmao-stat-card">
          <div className="irmao-stat-card__icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            <CheckCircle size={20} />
          </div>
          <div className="irmao-stat-card__value">94%</div>
          <div className="irmao-stat-card__label">Assiduidade 2024</div>
          <div className="presence-bar-track" style={{ marginTop: 8 }}>
            <div className="presence-bar-fill" style={{ width: '94%' }} />
          </div>
        </div>
        <div className="irmao-stat-card">
          <div className="irmao-stat-card__icon" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            <DollarSign size={20} />
          </div>
          <div className="irmao-stat-card__value" style={{ color: 'var(--color-accent)' }}>Em dia</div>
          <div className="irmao-stat-card__label">Status Financeiro</div>
          <div className="irmao-stat-card__sub">Última joia: 10 Set 2026</div>
        </div>
        <div className="irmao-stat-card">
          <div className="irmao-stat-card__icon" style={{ background: '#fef9c3', color: '#92400e' }}>
            <Star size={20} />
          </div>
          <div className="irmao-stat-card__value">18 anos</div>
          <div className="irmao-stat-card__label">Tempo de Maçonaria</div>
          <div className="irmao-stat-card__sub">Iniciado em 15/03/2008</div>
        </div>
      </div>

      <div className="dash-content-grid">
        {/* Upcoming sessions */}
        <Card padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="dash-section-title">Próximas Sessões</div>
            <Button variant="ghost" size="sm">Calendário completo</Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {upcomingSessions.map(s => (
              <div key={s.id} className="session-card">
                <div className="session-card__date">
                  <span>{s.date.split(' ')[0]}</span>
                  <span>{s.date.split(' ')[1]}</span>
                </div>
                <div className="session-card__info">
                  <div className="session-card__title">{s.title}</div>
                  <div className="session-card__meta">{s.lodge} · {s.degree}</div>
                </div>
                <Badge variant={s.status === 'confirmed' ? 'accent' : 'muted'} size="sm">
                  {s.status === 'confirmed' ? 'Confirmado' : 'Convocação'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Card padding="md">
            <div className="dash-section-title" style={{ marginBottom: 14 }}>Meus Documentos</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {myDocs.map(d => (
                <div key={d.id} className="irmao-doc-row">
                  <div className="irmao-doc-icon" style={{ background: `${d.color}18`, color: d.color }}>
                    {d.icon}
                  </div>
                  <div className="irmao-doc-label">{d.title}</div>
                  <Button variant="ghost" size="sm">{d.action}</Button>
                </div>
              ))}
            </div>
          </Card>

          <div className="alert-banner alert-banner--info">
            <Calendar size={18} className="alert-banner__icon" />
            <div className="alert-banner__text">
              Sessão Ordinária em <strong>3 dias</strong> — Loja Luz e Progresso, Terça 20h00.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
