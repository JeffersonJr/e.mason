import type { ReactNode } from 'react';
import './DashboardLoja.css';
import {
  Users, DollarSign, Calendar, CheckCircle,
  AlertTriangle, TrendingUp, Send, MapPin, Plus, FileText, CreditCard,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MetricCard } from '../../components/ui/Card';
import Card from '../../components/ui/Card';
import { StatusBadge, DegreeBadge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { mockMembers, mockActivities, monthlyActivityData } from '../../data/mockData';

const activityIcons: Record<string, ReactNode> = {
  session: <Calendar size={16} />,
  payment: <AlertTriangle size={16} />,
  new_member: <Users size={16} />,
  document: <CheckCircle size={16} />,
  communication: <Send size={16} />,
  degree: <TrendingUp size={16} />,
};



export default function DashboardLoja() {
  const presenceData = [
    { label: 'Última Telhação (Mar/24)', pct: 81, value: '38/47' },
    { label: 'Fevereiro 2024', pct: 74, value: '35/47' },
    { label: 'Janeiro 2024', pct: 87, value: '41/47' },
  ];

  return (
    <div className="dash-loja">
      {/* Welcome */}
      <div className="loja-welcome">
        <div className="loja-welcome__left">
          <div className="loja-welcome__tag">
            <MapPin size={11} />
            São Luís, MA — Loja #001
          </div>
          <h2 className="loja-welcome__title">Loja Luz e Progresso</h2>
          <p className="loja-welcome__sub">Telhação: <strong>Terças-feiras, 20h00</strong> · Próxima sessão em <strong>3 dias</strong></p>
        </div>
        <div className="loja-welcome__actions">
          <Button variant="accent" icon={<Plus size={15} />}>Registrar Presença</Button>
          <Button variant="outline" icon={<FileText size={15} />}>Abrir Ata</Button>
        </div>
      </div>

      {/* Metrics */}
      <div>
        <div className="dash-section-title">Painel da Loja</div>
        <div className="dash-metrics-grid">
          <MetricCard
            label="Irmãos Ativos"
            value="42"
            change={4.8}
            changeLabel="vs. mês anterior"
            icon={<Users size={20} />}
            accentColor="#4298B5"
          />
          <MetricCard
            label="Presença Última Sessão"
            value="81%"
            change={7.2}
            changeLabel="vs. sessão anterior"
            icon={<CheckCircle size={20} />}
            accentColor="#00C288"
          />
          <MetricCard
            label="Caixa Local"
            value="R$ 4.820"
            change={12.5}
            changeLabel="vs. mês anterior"
            icon={<DollarSign size={20} />}
            accentColor="#00C288"
          />
          <MetricCard
            label="Inadimplentes"
            value="5"
            change={-20}
            changeLabel="vs. mês anterior"
            icon={<AlertTriangle size={20} />}
            accentColor="#EF4444"
          />
        </div>
      </div>

      <div className="dash-charts-grid">
        {/* Atividade + Presença */}
        <Card padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div className="dash-section-title" style={{ marginBottom: 2 }}>Presença por Sessão</div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Últimos 6 meses</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthlyActivityData}>
              <defs>
                <linearGradient id="presencaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C288" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#00C288" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--color-border)', fontSize: 12, fontFamily: 'var(--font-family)' }} />
              <Area type="monotone" dataKey="sessoes" name="Sessões" stroke="#00C288" strokeWidth={2} fill="url(#presencaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Next session + Presence rates */}
        <Card padding="md">
          <div className="dash-section-title" style={{ marginBottom: 16 }}>Próxima Telhação</div>
          <div className="next-session">
            <div className="next-session__date">
              <div className="next-session__date-box">
                <div className="next-session__day">24</div>
                <div className="next-session__month">Set</div>
              </div>
              <div>
                <div className="next-session__info-title">Sessão Ordinária</div>
                <div className="next-session__info-sub">Terça-feira, 20h00 — Grau Mestre</div>
              </div>
            </div>
            <div className="presence-bars">
              {presenceData.map((p, i) => (
                <div key={i} className="presence-bar-row">
                  <div className="presence-bar-header">
                    <span className="presence-bar-label">{p.label}</span>
                    <span className="presence-bar-pct">{p.pct}% <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({p.value})</span></span>
                  </div>
                  <div className="presence-bar-track">
                    <div className="presence-bar-fill" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Members table + Quick actions */}
      <div className="dash-content-grid">
        <Card padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="dash-section-title">Obreiros & Cargos</div>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </div>
          <div className="loja-members-table">
            {mockMembers.slice(0, 7).map(m => (
              <div key={m.id} className="loja-member-row">
                <Avatar initials={m.avatar} size="sm" status={m.status} />
                <div className="loja-member-info">
                  <div className="loja-member-name">{m.name.replace('Ir. ', '')}</div>
                  <div className="loja-member-role">{m.office}</div>
                </div>
                <DegreeBadge degree={m.degree} />
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Card padding="md">
            <div className="dash-section-title" style={{ marginBottom: 14 }}>Ações Rápidas</div>
            <div className="quick-actions">
              <button className="quick-action-btn" id="qa-presenca">
                <div className="quick-action-icon"><CheckCircle size={16} /></div>
                <div className="quick-action-label">Presença</div>
                <div className="quick-action-sub">Registrar sessão</div>
              </button>
              <button className="quick-action-btn" id="qa-boleto">
                <div className="quick-action-icon"><DollarSign size={16} /></div>
                <div className="quick-action-label">Boleto</div>
                <div className="quick-action-sub">Emitir cobrança</div>
              </button>
              <button className="quick-action-btn" id="qa-ata">
                <div className="quick-action-icon"><FileText size={16} /></div>
                <div className="quick-action-label">Nova Ata</div>
                <div className="quick-action-sub">Registrar sessão</div>
              </button>
              <button className="quick-action-btn" id="qa-carteirinha-loja">
                <div className="quick-action-icon"><CreditCard size={16} /></div>
                <div className="quick-action-label">Carteirinha</div>
                <div className="quick-action-sub">Emitir para irmão</div>
              </button>
            </div>
          </Card>

          <Card padding="md">
            <div className="dash-section-title" style={{ marginBottom: 14 }}>Atividade Recente</div>
            <div className="activity-list">
              {mockActivities.slice(0, 3).map(act => (
                <div key={act.id} className="activity-item">
                  <div className={`activity-icon activity-icon--${act.type}`}>
                    {activityIcons[act.type]}
                  </div>
                  <div className="activity-body">
                    <div className="activity-title">{act.title}</div>
                    <div className="activity-desc">{act.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
