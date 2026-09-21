import { useState } from 'react';
import { Search, Plus, MapPin, Users, Calendar, Phone, Mail, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockLodges } from '../data/mockData';
import type { Lodge } from '../types';
import './Lodges.css';

export default function Lodges() {
  const [search, setSearch] = useState('');
  const [selectedLodge, setSelectedLodge] = useState<Lodge | null>(null);

  const filtered = mockLodges.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="lodges-page page-enter">
      <div className="lodges-toolbar">
        <div className="lodges-search-wrap">
          <Search size={15} className="lodges-search-icon" />
          <input
            type="search"
            placeholder="Buscar por nome, cidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="lodges-search"
            id="lodges-search"
          />
        </div>
        <Button variant="accent" size="sm" icon={<Plus size={14} />} id="add-lodge-btn">
          Registrar Nova Loja
        </Button>
      </div>

      {/* Stats */}
      <div className="lodges-stats">
        <div className="lodge-stat-pill">
          <CheckCircle size={14} style={{ color: 'var(--color-accent)' }} />
          <span>{mockLodges.filter(l => l.status === 'regular').length} Regulares</span>
        </div>
        <div className="lodge-stat-pill">
          <AlertTriangle size={14} style={{ color: 'var(--color-danger)' }} />
          <span>{mockLodges.filter(l => l.status === 'irregular').length} Irregulares</span>
        </div>
        <div className="lodge-stat-pill">
          <Users size={14} style={{ color: 'var(--color-primary)' }} />
          <span>{mockLodges.reduce((a, l) => a + l.totalMembers, 0)} Irmãos</span>
        </div>
      </div>

      <div className={`lodges-content ${selectedLodge ? 'lodges-content--split' : ''}`}>
        <div className="lodges-grid-full">
          {filtered.map((lodge, idx) => (
            <div
              key={lodge.id}
              className={`lodge-card-full ${selectedLodge?.id === lodge.id ? 'lodge-card-full--selected' : ''}`}
              onClick={() => setSelectedLodge(lodge.id === selectedLodge?.id ? null : lodge)}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="lodge-card-full__top">
                <div className="lodge-card-full__header">
                  <div>
                    <div className="lodge-card-full__num">Loja #{lodge.number}</div>
                    <div className="lodge-card-full__name">{lodge.name}</div>
                  </div>
                  <Badge
                    variant={lodge.status === 'regular' ? 'accent' : lodge.status === 'irregular' ? 'danger' : 'warning'}
                  >
                    {lodge.status === 'regular' ? 'Regular' : lodge.status === 'irregular' ? 'Irregular' : 'Dormente'}
                  </Badge>
                </div>

                <div className="lodge-card-full__location">
                  <MapPin size={12} />
                  {lodge.city}, {lodge.state}
                </div>
              </div>

              <div className="lodge-card-full__stats">
                <div className="lodge-stat">
                  <div className="lodge-stat__value">{lodge.totalMembers}</div>
                  <div className="lodge-stat__label">Total</div>
                </div>
                <div className="lodge-stat">
                  <div className="lodge-stat__value" style={{ color: 'var(--color-accent)' }}>{lodge.activeMembers}</div>
                  <div className="lodge-stat__label">Ativos</div>
                </div>
                <div className="lodge-stat">
                  <div className="lodge-stat__value" style={{ color: lodge.totalMembers - lodge.activeMembers > 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
                    {lodge.totalMembers - lodge.activeMembers}
                  </div>
                  <div className="lodge-stat__label">Inativ.</div>
                </div>
              </div>

              <div className="lodge-card-full__footer">
                <div className="lodge-card-full__venerable">
                  <Users size={11} />
                  <span>Ven.: {lodge.venerableName}</span>
                </div>
                <div className="lodge-card-full__meeting">
                  <Calendar size={11} />
                  <span>{lodge.meetingDay}, {lodge.meetingTime}</span>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--color-text-muted)', marginLeft: 'auto' }} />
              </div>
            </div>
          ))}
        </div>

        {selectedLodge && (
          <Card padding="md" className="lodge-detail animate-slidein">
            <div className="lodge-detail__header">
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Loja #{selectedLodge.number}</div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                  {selectedLodge.name}
                </div>
              </div>
              <button onClick={() => setSelectedLodge(null)} className="lodge-detail__close">×</button>
            </div>

            <Badge variant={selectedLodge.status === 'regular' ? 'accent' : 'danger'} dot>
              {selectedLodge.status === 'regular' ? 'Regular' : 'Irregular'}
            </Badge>

            <div className="lodge-detail__info">
              {[
                { icon: <MapPin size={14} />, label: 'Localização', value: `${selectedLodge.city}, ${selectedLodge.state}` },
                { icon: <Users size={14} />, label: 'Venerável', value: selectedLodge.venerableName },
                { icon: <Calendar size={14} />, label: 'Telhação', value: `${selectedLodge.meetingDay}, ${selectedLodge.meetingTime}` },
                { icon: <Mail size={14} />, label: 'E-mail', value: selectedLodge.email },
                { icon: <Phone size={14} />, label: 'Telefone', value: selectedLodge.phone },
              ].map((item, i) => (
                <div key={i} className="lodge-detail__info-item">
                  <div className="lodge-detail__info-icon">{item.icon}</div>
                  <div>
                    <div className="lodge-detail__info-label">{item.label}</div>
                    <div className="lodge-detail__info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button variant="primary" fullWidth>Ver Painel da Loja</Button>
              <Button variant="outline" fullWidth>Enviar Comunicado</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
