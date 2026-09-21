import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Plus, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { MetricCard } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockFinancial } from '../data/mockData';
import './Finance.css';

const monthlyBalance = [
  { month: 'Out', receita: 3200, despesa: 1800 },
  { month: 'Nov', receita: 3500, despesa: 2100 },
  { month: 'Dez', receita: 2800, despesa: 2400 },
  { month: 'Jan', receita: 3800, despesa: 1900 },
  { month: 'Fev', receita: 4100, despesa: 2300 },
  { month: 'Mar', receita: 4350, despesa: 2100 },
];

export default function Finance() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const total = mockFinancial.reduce((acc, e) => e.type === 'credit' ? acc + e.amount : acc - e.amount, 0);
  const totalCredit = mockFinancial.filter(e => e.type === 'credit').reduce((acc, e) => acc + e.amount, 0);
  const totalDebit = mockFinancial.filter(e => e.type === 'debit').reduce((acc, e) => acc + e.amount, 0);

  const filtered = mockFinancial.filter(e => typeFilter === 'all' || e.type === typeFilter);

  const formatMoney = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="finance-page page-enter">
      {/* Metrics */}
      <div className="dash-metrics-grid">
        <MetricCard
          label="Saldo em Caixa"
          value={formatMoney(total)}
          change={12.5}
          changeLabel="vs. mês anterior"
          icon={<DollarSign size={20} />}
          accentColor="#00C288"
        />
        <MetricCard
          label="Receitas (Mês)"
          value={formatMoney(totalCredit)}
          change={5.2}
          changeLabel="vs. mês anterior"
          icon={<TrendingUp size={20} />}
          accentColor="#4298B5"
        />
        <MetricCard
          label="Despesas (Mês)"
          value={formatMoney(totalDebit)}
          change={-3.1}
          changeLabel="vs. mês anterior"
          icon={<TrendingDown size={20} />}
          accentColor="#EF4444"
        />
        <MetricCard
          label="Pendências"
          value="R$ 150,00"
          change={-50}
          changeLabel="vs. mês anterior"
          icon={<DollarSign size={20} />}
          accentColor="#F59E0B"
        />
      </div>

      {/* Chart */}
      <Card padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div className="dash-section-title" style={{ marginBottom: 2 }}>Fluxo de Caixa</div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Receitas vs. Despesas — últimos 6 meses</div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-accent)' }} /> Receitas
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-danger)' }} /> Despesas
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyBalance}>
            <defs>
              <linearGradient id="receitaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00C288" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#00C288" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="despesaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false}
              tickFormatter={v => `R$${(v / 1000).toFixed(1)}k`} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: '1px solid var(--color-border)', fontSize: 12, fontFamily: 'var(--font-family)' }}
              formatter={(v) => formatMoney(Number(v || 0))}
            />
            <Area type="monotone" dataKey="receita" name="Receitas" stroke="#00C288" strokeWidth={2} fill="url(#receitaGrad)" />
            <Area type="monotone" dataKey="despesa" name="Despesas" stroke="#EF4444" strokeWidth={2} fill="url(#despesaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Transactions */}
      <Card padding="none">
        <div className="finance-table-header">
          <div className="dash-section-title">Extrato de Lançamentos</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="finance-type-tabs">
              {(['all', 'credit', 'debit'] as const).map(t => (
                <button
                  key={t}
                  className={`finance-type-tab ${typeFilter === t ? 'finance-type-tab--active' : ''}`}
                  onClick={() => setTypeFilter(t)}
                  id={`finance-filter-${t}`}
                >
                  {t === 'all' ? 'Todos' : t === 'credit' ? 'Receitas' : 'Despesas'}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Download size={14} />}>Exportar</Button>
            <Button variant="accent" size="sm" icon={<Plus size={14} />} id="new-entry-btn">Novo Lançamento</Button>
          </div>
        </div>

        <table className="finance-table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Membro</th>
              <th>Data</th>
              <th>Status</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, idx) => (
              <tr key={entry.id} className="finance-row" style={{ animationDelay: `${idx * 0.05}s` }}>
                <td>
                  <div className="finance-entry">
                    <div className={`finance-entry-icon finance-entry-icon--${entry.type}`}>
                      {entry.type === 'credit'
                        ? <ArrowUpRight size={14} />
                        : <ArrowDownRight size={14} />
                      }
                    </div>
                    <div className="finance-entry-desc">{entry.description}</div>
                  </div>
                </td>
                <td>
                  <Badge variant="muted" size="sm">{entry.category}</Badge>
                </td>
                <td className="finance-member">{entry.member || '—'}</td>
                <td className="finance-date">{new Date(entry.date).toLocaleDateString('pt-BR')}</td>
                <td>
                  <Badge
                    size="sm"
                    variant={entry.status === 'paid' ? 'accent' : entry.status === 'pending' ? 'warning' : 'danger'}
                    dot
                  >
                    {entry.status === 'paid' ? 'Pago' : entry.status === 'pending' ? 'Pendente' : 'Atrasado'}
                  </Badge>
                </td>
                <td>
                  <span className={`finance-amount finance-amount--${entry.type}`}>
                    {entry.type === 'credit' ? '+' : '-'}{formatMoney(entry.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
