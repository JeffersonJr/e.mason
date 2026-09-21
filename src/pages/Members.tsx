import { useState } from 'react';
import { Search, Plus, Download, Eye, MoreHorizontal } from 'lucide-react';
import Card from '../components/ui/Card';
import { StatusBadge, DegreeBadge } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { mockMembers } from '../data/mockData';
import type { Member } from '../types';
import './Members.css';

const officeGroups = ['Todos', 'Luzes', 'Cargos Administrativos', 'Irmãos'];

export default function Members() {
  const [search, setSearch] = useState('');
  const [officeGroup, setOfficeGroup] = useState('Todos');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const luzes = ['Venerável Mestre', '1º Vigilante', '2º Vigilante'];
  const cargosAdm = ['Secretário', 'Tesoureiro', 'Orador'];

  const filtered = mockMembers.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.office || '').toLowerCase().includes(search.toLowerCase());
    const matchGroup = officeGroup === 'Todos'
      ? true
      : officeGroup === 'Luzes' ? luzes.includes(m.office || '')
      : officeGroup === 'Cargos Administrativos' ? cargosAdm.includes(m.office || '')
      : !luzes.includes(m.office || '') && !cargosAdm.includes(m.office || '');
    return matchSearch && matchGroup;
  });

  return (
    <div className="members-page page-enter">
      {/* Header actions */}
      <div className="members-toolbar">
        <div className="members-search-wrap">
          <Search size={15} className="members-search-icon" />
          <input
            type="search"
            placeholder="Buscar por nome ou cargo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="members-search"
            id="members-search"
          />
        </div>
        <div className="members-filters">
          {officeGroups.map(g => (
            <button
              key={g}
              className={`members-filter-chip ${officeGroup === g ? 'members-filter-chip--active' : ''}`}
              onClick={() => setOfficeGroup(g)}
              id={`filter-group-${g.replace(/\s/g, '-').toLowerCase()}`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="members-actions">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>Exportar</Button>
          <Button variant="accent" size="sm" icon={<Plus size={14} />} id="add-member-btn">Novo Irmão</Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="members-stats-bar">
        <div className="members-stat">
          <div className="members-stat__num">{mockMembers.length}</div>
          <div className="members-stat__label">Total de Irmãos</div>
        </div>
        <div className="members-stat-divider" />
        <div className="members-stat">
          <div className="members-stat__num" style={{ color: 'var(--color-accent)' }}>{mockMembers.filter(m => m.status === 'adimplente').length}</div>
          <div className="members-stat__label">Adimplentes</div>
        </div>
        <div className="members-stat-divider" />
        <div className="members-stat">
          <div className="members-stat__num" style={{ color: 'var(--color-danger)' }}>{mockMembers.filter(m => m.status === 'inadimplente').length}</div>
          <div className="members-stat__label">Inadimplentes</div>
        </div>
        <div className="members-stat-divider" />
        <div className="members-stat">
          <div className="members-stat__num" style={{ color: 'var(--color-warning)' }}>{mockMembers.filter(m => m.status === 'licenciado').length}</div>
          <div className="members-stat__label">Licenciados</div>
        </div>
        <div className="members-stat-divider" />
        <div className="members-stat">
          <div className="members-stat__num">{filtered.length}</div>
          <div className="members-stat__label">Exibindo</div>
        </div>
      </div>

      <div className={`members-content ${selectedMember ? 'members-content--split' : ''}`}>
        {/* Table */}
        <Card padding="none" className="members-table-card">
          <table className="members-table">
            <thead>
              <tr>
                <th>Irmão</th>
                <th>Cargo / Função</th>
                <th>Grau</th>
                <th>CIM</th>
                <th>Status</th>
                <th>Membro desde</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, idx) => (
                <tr
                  key={m.id}
                  className={`members-row ${selectedMember?.id === m.id ? 'members-row--selected' : ''}`}
                  onClick={() => setSelectedMember(m.id === selectedMember?.id ? null : m)}
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <td>
                    <div className="member-name-cell">
                      <Avatar initials={m.avatar} size="sm" status={m.status} />
                      <div>
                        <div className="member-full-name">{m.name}</div>
                        <div className="member-email">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="member-office">
                      {m.office}
                      {m.specialty && <span className="member-specialty">· {m.specialty}</span>}
                    </div>
                  </td>
                  <td><DegreeBadge degree={m.degree} /></td>
                  <td><code className="member-cim">{m.cim}</code></td>
                  <td><StatusBadge status={m.status} /></td>
                  <td className="member-date">{new Date(m.joinedAt).getFullYear()}</td>
                  <td>
                    <div className="member-actions">
                      <button className="member-action-btn" title="Ver perfil" id={`view-member-${m.id}`}><Eye size={14} /></button>
                      <button className="member-action-btn" title="Mais opções"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="members-empty">
              <div className="members-empty__icon">🔍</div>
              <div>Nenhum irmão encontrado para os filtros selecionados.</div>
            </div>
          )}
        </Card>

        {/* Detail panel */}
        {selectedMember && (
          <div className="member-detail-panel animate-slidein">
            <div className="member-detail-header">
              <Avatar initials={selectedMember.avatar} size="lg" gradient />
              <div>
                <div className="member-detail-name">{selectedMember.name}</div>
                <div className="member-detail-role">{selectedMember.office}</div>
              </div>
              <button className="member-detail-close" onClick={() => setSelectedMember(null)}>×</button>
            </div>

            <div className="member-detail-badges">
              <DegreeBadge degree={selectedMember.degree} />
              <StatusBadge status={selectedMember.status} />
            </div>

            <div className="member-detail-section">
              <div className="member-detail-label">CIM</div>
              <div className="member-detail-value"><code>{selectedMember.cim}</code></div>
            </div>

            <div className="member-detail-section">
              <div className="member-detail-label">Loja</div>
              <div className="member-detail-value">{selectedMember.lodge}</div>
            </div>

            <div className="member-detail-section">
              <div className="member-detail-label">E-mail</div>
              <div className="member-detail-value">{selectedMember.email}</div>
            </div>

            <div className="member-detail-section">
              <div className="member-detail-label">Telefone</div>
              <div className="member-detail-value">{selectedMember.phone}</div>
            </div>

            <div className="member-detail-section">
              <div className="member-detail-label">Membro desde</div>
              <div className="member-detail-value">{new Date(selectedMember.joinedAt).toLocaleDateString('pt-BR')}</div>
            </div>

            {selectedMember.specialty && (
              <div className="member-detail-section">
                <div className="member-detail-label">Especialidade</div>
                <div className="member-detail-value">{selectedMember.specialty}</div>
              </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" fullWidth icon={<Eye size={15} />}>Ver Perfil Completo</Button>
              <Button variant="outline" fullWidth>Emitir Carteirinha</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
