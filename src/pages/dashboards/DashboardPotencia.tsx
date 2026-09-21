import './DashboardPotencia.css';
import {
  Building2, Users, TrendingUp, AlertTriangle,
  CheckCircle, Calendar, MapPin, Send, ArrowRight, User, BarChart3,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { MetricCard } from '../../components/ui/Card';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockLodges, mockActivities, monthlyActivityData, adimplenciaData, lodgeActivityData } from '../../data/mockData';

const formatDate = (str: string) => {
  const d = new Date(str);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

const activityIcons: Record<string, React.ReactNode> = {
  session: <Calendar size={16} />,
  payment: <AlertTriangle size={16} />,
  new_member: <Users size={16} />,
  document: <CheckCircle size={16} />,
  communication: <Send size={16} />,
  degree: <TrendingUp size={16} />,
};

export default function DashboardPotencia() {
  return (
    <div className="dash-potencia">
      {/* Welcome banner */}
      <div className="potencia-welcome">
        <div className="potencia-welcome__text">
          <div className="potencia-welcome__greeting">Bom dia, Grão-Mestre 👋</div>
          <h2 className="potencia-welcome__title">Grande Oriente do Maranhão e Balsas</h2>
          <p className="potencia-welcome__sub">Visão consolidada — 5 Lojas · 149 Irmãos · Setembro 2026</p>
        </div>
        <div className="potencia-welcome__actions">
          <Button variant="primary" icon={<Send size={15} />}>Enviar Comunicado</Button>
          <Button variant="outline" icon={<Building2 size={15} />}>Nova Loja</Button>
        </div>
      </div>

      {/* Alert */}
      <div className="alert-banner alert-banner--warning">
        <AlertTriangle size={18} className="alert-banner__icon" />
        <div className="alert-banner__text">
          <strong>Atenção:</strong> Loja Maçonaria e Virtude (#004 — Timon) está com status <strong>Irregular</strong>. Pendências administrativas desde Jan/2024.
        </div>
        <button className="alert-banner__action">Ver detalhes →</button>
      </div>

      {/* Metrics */}
      <div>
        <div className="dash-section-title">Visão Global</div>
        <div className="dash-metrics-grid">
          <MetricCard
            label="Total de Lojas"
            value="5"
            change={0}
            changeLabel="Nenhuma mudança"
            icon={<Building2 size={20} />}
            accentColor="#4298B5"
          />
          <MetricCard
            label="Irmãos Cadastrados"
            value="149"
            change={2.1}
            changeLabel="vs. mês anterior"
            icon={<Users size={20} />}
            accentColor="#00C288"
          />
          <MetricCard
            label="Taxa de Adimplência"
            value="88,6%"
            change={1.4}
            changeLabel="vs. trimestre"
            icon={<TrendingUp size={20} />}
            accentColor="#00C288"
          />
          <MetricCard
            label="Lojas Irregulares"
            value="1"
            change={-100}
            changeLabel="Requer ação"
            icon={<AlertTriangle size={20} />}
            accentColor="#EF4444"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="dash-charts-grid">
        <Card padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div className="dash-section-title" style={{ marginBottom: 2 }}>Atividade das Lojas</div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Sessões realizadas por mês</div>
            </div>
            <Badge variant="accent">Últimos 6 meses</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyActivityData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4298B5" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#4298B5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C288" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#00C288" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: '1px solid var(--color-border)', fontSize: 12, fontFamily: 'var(--font-family)' }}
                cursor={{ stroke: 'var(--color-border)' }}
              />
              <Area type="monotone" dataKey="sessoes" name="Sessões" stroke="#4298B5" strokeWidth={2} fill="url(#areaGrad)" />
              <Area type="monotone" dataKey="novos" name="Novos Irmãos" stroke="#00C288" strokeWidth={2} fill="url(#areaGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="md">
          <div className="dash-section-title" style={{ marginBottom: 16 }}>Adimplência Global</div>
          <div className="adimplencia-ring">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={adimplenciaData} cx="50%" cy="50%" innerRadius={44} outerRadius={62} dataKey="value" startAngle={90} endAngle={-270}>
                  {adimplenciaData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="adimplencia-legend">
              {adimplenciaData.map((item, i) => (
                <div key={i} className="adimplencia-item">
                  <div className="adimplencia-dot" style={{ background: item.color }} />
                  <div className="adimplencia-item-label">{item.name}</div>
                  <div className="adimplencia-item-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Lodges Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="dash-section-title">Lojas Subordinadas</div>
          <Button variant="ghost" size="sm" iconRight={<ArrowRight size={14} />}>Ver todas</Button>
        </div>
        <div className="lodges-grid">
          {mockLodges.map(lodge => (
            <div key={lodge.id} className="lodge-card">
              <div className="lodge-card__header">
                <div>
                  <div className="lodge-card__num">Loja #{lodge.number}</div>
                  <div className="lodge-card__name">{lodge.name}</div>
                  <div className="lodge-card__location">
                    <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />
                    {lodge.city}, {lodge.state}
                  </div>
                </div>
                <Badge
                  variant={lodge.status === 'regular' ? 'accent' : lodge.status === 'irregular' ? 'danger' : 'warning'}
                  size="sm"
                >
                  {lodge.status === 'regular' ? 'Regular' : lodge.status === 'irregular' ? 'Irregular' : 'Dormente'}
                </Badge>
              </div>
              <div className="lodge-card__stats">
                <div className="lodge-stat">
                  <div className="lodge-stat__value">{lodge.totalMembers}</div>
                  <div className="lodge-stat__label">Total</div>
                </div>
                <div className="lodge-stat">
                  <div className="lodge-stat__value" style={{ color: 'var(--color-accent)' }}>{lodge.activeMembers}</div>
                  <div className="lodge-stat__label">Ativos</div>
                </div>
                <div className="lodge-stat">
                  <div className="lodge-stat__value" style={{ color: 'var(--color-text-muted)' }}>{lodge.meetingDay.substring(0, 3)}.</div>
                  <div className="lodge-stat__label">Telhação</div>
                </div>
              </div>
              <div className="lodge-card__venerable">
                <User size={11} />
                Ven.: {lodge.venerableName.replace('Ir. ', '')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="dash-content-grid">
        {/* Activity Feed */}
        <Card padding="md">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="dash-section-title">Atividade Recente</div>
            <Button variant="ghost" size="sm">Ver tudo</Button>
          </div>
          <div className="activity-list">
            {mockActivities.map(act => (
              <div key={act.id} className="activity-item">
                <div className={`activity-icon activity-icon--${act.type}`}>
                  {activityIcons[act.type]}
                </div>
                <div className="activity-body">
                  <div className="activity-title">{act.title}</div>
                  <div className="activity-desc">{act.description}</div>
                </div>
                <div className="activity-meta">
                  <div className="activity-time">{formatDate(act.date)}</div>
                  {act.lodge && <Badge variant="muted" size="sm">{act.lodge.replace('Loja ', '')}</Badge>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <Card padding="md">
            <div className="dash-section-title" style={{ marginBottom: 16 }}>Ações Rápidas</div>
            <div className="quick-actions">
              <button className="quick-action-btn" id="qa-comunicado">
                <div className="quick-action-icon"><Send size={16} /></div>
                <div className="quick-action-label">Comunicado</div>
                <div className="quick-action-sub">Enviar para lojas</div>
              </button>
              <button className="quick-action-btn" id="qa-nova-loja">
                <div className="quick-action-icon"><Building2 size={16} /></div>
                <div className="quick-action-label">Nova Loja</div>
                <div className="quick-action-sub">Registrar oficina</div>
              </button>
              <button className="quick-action-btn" id="qa-relatorio">
                <div className="quick-action-icon"><BarChart3 size={16} /></div>
                <div className="quick-action-label">Relatório</div>
                <div className="quick-action-sub">Exportar dados</div>
              </button>
              <button className="quick-action-btn" id="qa-carteirinha">
                <div className="quick-action-icon"><Users size={16} /></div>
                <div className="quick-action-label">Carteirinhas</div>
                <div className="quick-action-sub">Emitir em lote</div>
              </button>
            </div>
          </Card>

          <Card padding="md">
            <div className="dash-section-title" style={{ marginBottom: 16 }}>Membros por Loja</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={lodgeActivityData} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--color-border)', fontSize: 12, fontFamily: 'var(--font-family)' }} />
                <Bar dataKey="membros" name="Total" fill="#4298B5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ativos" name="Ativos" fill="#00C288" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}
