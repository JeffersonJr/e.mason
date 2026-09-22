import { useState } from 'react';
import { Download, Printer, QrCode, ChevronLeft, ChevronRight, CreditCard, Smartphone, RotateCw, ShieldCheck, Search } from 'lucide-react';
import Card from '../components/ui/Card';
import { StatusBadge, DegreeBadge } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

import CredentialValidatorModal from '../components/modals/CredentialValidatorModal';
import { mockMembers, currentUser } from '../data/mockData';
import type { Member } from '../types';
import './IdCards.css';

type CardMode = 'vertical' | 'horizontal';

interface IdCardsProps {
  initialMember?: Member | null;
}

export default function IdCards({ initialMember }: IdCardsProps) {
  const [cardMode, setCardMode] = useState<CardMode>('vertical');
  const [selectedIdx, setSelectedIdx] = useState<number>(() => {
    if (initialMember) {
      const idx = mockMembers.findIndex(m => m.id === initialMember.id);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [showValidator, setShowValidator] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = mockMembers.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.cim.includes(searchTerm) ||
    (m.office || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentMember = filteredMembers[selectedIdx] || mockMembers[0] || {
    ...currentUser,
    avatar: currentUser.avatar,
    office: currentUser.role,
    cim: currentUser.cim,
    phone: currentUser.phone,
    email: currentUser.email,
    joinedAt: currentUser.joinedAt,
    lodge: currentUser.lodge || '',
    specialty: currentUser.specialty,
  };

  const degreeLabels: Record<number, string> = {
    1: 'Aprendiz Maçom',
    2: 'Companheiro Maçom',
    3: 'Mestre Maçom',
    33: 'REAA – 33° Grau',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="idcards-page page-enter">
      {/* Toolbar */}
      <div className="idcards-toolbar">
        <div className="idcards-mode-tabs">
          <button
            className={`idcards-mode-tab ${cardMode === 'vertical' ? 'idcards-mode-tab--active' : ''}`}
            onClick={() => setCardMode('vertical')}
            id="card-mode-vertical"
          >
            <Smartphone size={16} />
            Digital (Vertical)
          </button>
          <button
            className={`idcards-mode-tab ${cardMode === 'horizontal' ? 'idcards-mode-tab--active' : ''}`}
            onClick={() => setCardMode('horizontal')}
            id="card-mode-horizontal"
          >
            <CreditCard size={16} />
            Impressão PVC (Horizontal)
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <Button variant="outline" size="sm" icon={<ShieldCheck size={14} />} onClick={() => setShowValidator(true)}>
            Validar Autenticidade
          </Button>
          <Button variant="outline" size="sm" icon={<Printer size={14} />} onClick={handlePrint}>
            Imprimir
          </Button>
          <Button variant="accent" size="sm" icon={<Download size={14} />} onClick={handlePrint}>
            Baixar PDF
          </Button>
        </div>
      </div>

      <div className="idcards-content">
        {/* Member selector */}
        <Card padding="none" className="idcards-selector">
          <div className="idcards-selector-header">
            <div className="idcards-selector-title">Selecionar Irmão</div>
            <div className="idcards-selector-count">{filteredMembers.length} membros</div>
          </div>
          
          <div className="idcards-search-box">
            <Search size={14} style={{ color: 'var(--color-text-secondary)', marginRight: 6 }} />
            <input
              type="text"
              placeholder="Buscar por nome, CIM ou cargo..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setSelectedIdx(0);
              }}
              className="idcards-search-input"
            />
          </div>

          <div className="idcards-selector-list">
            {filteredMembers.map((m, idx) => (
              <button
                key={m.id}
                className={`idcards-selector-item ${idx === selectedIdx ? 'idcards-selector-item--active' : ''}`}
                onClick={() => {
                  setSelectedIdx(idx);
                  setIsFlipped(false);
                }}
                id={`select-member-${m.id}`}
              >
                <Avatar initials={m.avatar} size="sm" status={m.status} />
                <div className="idcards-selector-info">
                  <div className="idcards-selector-name">{m.name.replace('Ir. ', '')}</div>
                  <div className="idcards-selector-role">{m.office}</div>
                </div>
                <DegreeBadge degree={m.degree} />
              </button>
            ))}
            {filteredMembers.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                Nenhum membro encontrado.
              </div>
            )}
          </div>
        </Card>

        {/* Card preview */}
        <div className="idcards-preview-area">
          {cardMode === 'vertical' ? (
            <VerticalCard
              member={currentMember}
              degreeLabels={degreeLabels}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              onValidate={() => setShowValidator(true)}
            />
          ) : (
            <HorizontalCard
              member={currentMember}
              degreeLabels={degreeLabels}
              onValidate={() => setShowValidator(true)}
            />
          )}

          {/* Navigation */}
          <div className="idcards-nav">
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronLeft size={14} />}
              onClick={() => {
                setSelectedIdx(Math.max(0, selectedIdx - 1));
                setIsFlipped(false);
              }}
              disabled={selectedIdx === 0}
            >
              Anterior
            </Button>
            <span className="idcards-nav-count">{selectedIdx + 1} / {filteredMembers.length}</span>
            <Button
              variant="outline"
              size="sm"
              iconRight={<ChevronRight size={14} />}
              onClick={() => {
                setSelectedIdx(Math.min(filteredMembers.length - 1, selectedIdx + 1));
                setIsFlipped(false);
              }}
              disabled={selectedIdx === filteredMembers.length - 1}
            >
              Próximo
            </Button>
          </div>
        </div>

        {/* Info panel */}
        <Card padding="md" className="idcards-info-panel">
          <div className="idcards-info-title">Dados da Carteirinha Maçônica</div>
          <div className="idcards-info-grid">
            <div className="idcards-info-item">
              <div className="idcards-info-label">Portador</div>
              <div className="idcards-info-value">{currentMember.name}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">CIM</div>
              <div className="idcards-info-value"><code>{currentMember.cim}</code></div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Cargo</div>
              <div className="idcards-info-value">{currentMember.office}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Grau</div>
              <div className="idcards-info-value">{degreeLabels[currentMember.degree] || `${currentMember.degree}º Grau`}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Status Quitação</div>
              <StatusBadge status={currentMember.status} />
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Validade</div>
              <div className="idcards-info-value">31/12/2026</div>
            </div>
          </div>

          <div className="idcards-qr-info">
            <div className="idcards-qr-title">Verificação de Autenticidade</div>
            <div className="idcards-qr-sub">
              A carteirinha digital possui validação via QR Code dinâmico conectado diretamente aos servidores do Grande Oriente.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {cardMode === 'vertical' && (
              <Button variant="outline" fullWidth icon={<RotateCw size={15} />} onClick={() => setIsFlipped(!isFlipped)}>
                {isFlipped ? 'Ver Frente da Carteirinha' : 'Girar Carteirinha (Ver Verso)'}
              </Button>
            )}
            <Button variant="primary" fullWidth icon={<QrCode size={15} />} onClick={() => setShowValidator(true)}>
              Simular Leitura do QR Code
            </Button>
          </div>
        </Card>
      </div>

      {/* Credential Validator Modal */}
      {showValidator && (
        <CredentialValidatorModal
          member={currentMember}
          onClose={() => setShowValidator(false)}
        />
      )}
    </div>
  );
}

function VerticalCard({
  member,
  degreeLabels,
  isFlipped,
  onFlip,
  onValidate,
}: {
  member: Member;
  degreeLabels: Record<number, string>;
  isFlipped: boolean;
  onFlip: () => void;
  onValidate: () => void;
}) {
  return (
    <div className={`card-flip-container ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="card-flip-inner">
        
        {/* FRONT SIDE */}
        <div className="card-flip-front">
          <svg className="card-watermark-seal" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
            <polygon points="50,15 80,75 20,75" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <polygon points="50,85 20,25 80,25" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          
          <div className="card-ref-header">
            <div className="card-ref-header-left">
              <div className="card-ref-logo">
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FAF7F2' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#B45309" strokeWidth="4" />
                  <polygon points="50,20 75,70 25,70" fill="none" stroke="#B45309" strokeWidth="3" />
                </svg>
              </div>
              <div>
                <div className="card-ref-title">GOMB</div>
                <div className="card-ref-subtitle">MARANHÃO E BALSAS</div>
              </div>
            </div>
            <div className="card-ref-badge">REGULAR</div>
          </div>

          <div className="card-ref-photo-box">
            <div style={{ width: 105, height: 125, margin: '0 auto' }}>
              <Avatar initials={member.avatar} size="xl" gradient />
            </div>
          </div>

          <div className="card-ref-name">{member.name}</div>
          <div className="card-ref-degree">{degreeLabels[member.degree] || `${member.degree}º Grau`} - {member.office}</div>

          <div className="card-ref-grid">
            <div className="card-ref-field">
              <span className="card-ref-label">CIM</span>
              <span className="card-ref-val">{member.cim}</span>
            </div>
            <div className="card-ref-field">
              <span className="card-ref-label">Iniciação</span>
              <span className="card-ref-val">{new Date(member.joinedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="card-ref-field card-ref-full-col">
              <span className="card-ref-label">Loja</span>
              <span className="card-ref-val">{member.lodge || 'A.R.L.S. União Fraternal Nº 001'}</span>
            </div>
          </div>

          <div className="card-ref-footer">
            <span className="card-ref-motto">LIBERTAS QUAE SERA TAMEN</span>
            <span className="card-ref-affil">COMAB</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="card-flip-back">
          <div className="card-back-header">
            CERTIFICADO DE REGULARIDADE MAÇÔNICA
          </div>

          <div style={{ fontSize: '0.62rem', color: '#1E293B', marginTop: 12, lineHeight: 1.4 }}>
            Certificamos que o Irmão <strong>{member.name}</strong> é membro ativo e regular do quadro de obreiros desta augusta oficina, no gozo pleno de seus direitos maçônicos.
          </div>

          <div className="card-back-qr-box" onClick={(e) => { e.stopPropagation(); onValidate(); }}>
            <QRCodeSVG size={90} />
          </div>
          <div className="card-back-qr-sub">Escaneie o código acima para validar a autenticidade desta credencial digital.</div>

          <div className="card-back-signatures">
            <div>
              <div className="card-back-sig-line" />
              <div className="card-back-sig-title">Ir. Venerável Mestre</div>
              <div className="card-back-sig-sub">Venerável Mestre</div>
            </div>
            <div>
              <div className="card-back-sig-line" />
              <div className="card-back-sig-title">Ir. Secretário</div>
              <div className="card-back-sig-sub">Guardador dos Selos</div>
            </div>
          </div>
          
          <div className="card-ref-footer" style={{ marginTop: 12 }}>
            <span className="card-ref-affil">Validade: 31/12/2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function HorizontalCard({
  member,
  degreeLabels,
  onValidate,
}: {
  member: Member;
  degreeLabels: Record<number, string>;
  onValidate: () => void;
}) {
  return (
    <div className="horizontal-cards-pair">
      {/* Front PVC */}
      <div className="h-card-frame">
        <svg className="card-watermark-seal" viewBox="0 0 100 100" style={{ left: '70%', top: '50%' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
          <polygon points="50,15 80,75 20,75" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <polygon points="50,85 20,25 80,25" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>

        <div className="h-card-left-col">
          <Avatar initials={member.avatar} size="xl" gradient />
          <div className="card-ref-badge" style={{ marginTop: 12 }}>REGULAR</div>
        </div>
        
        <div className="h-card-right-col">
          <div className="card-ref-header" style={{ paddingBottom: 6, marginBottom: 8 }}>
            <div className="card-ref-header-left">
              <div className="card-ref-logo">
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FAF7F2' }}>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#B45309" strokeWidth="4" />
                </svg>
              </div>
              <div>
                <div className="card-ref-title">GOMB</div>
                <div className="card-ref-subtitle">GRANDE ORIENTE DO MARANHÃO E BALSAS</div>
              </div>
            </div>
          </div>

          <div className="card-ref-name" style={{ fontSize: '1.25rem' }}>{member.name}</div>
          <div className="card-ref-degree">{degreeLabels[member.degree] || `${member.degree}º Grau`} - {member.office}</div>

          <div className="card-ref-grid" style={{ marginTop: 'auto', padding: '8px 12px' }}>
            <div className="card-ref-field">
              <span className="card-ref-label">CIM</span>
              <span className="card-ref-val">{member.cim}</span>
            </div>
            <div className="card-ref-field">
              <span className="card-ref-label">Iniciação</span>
              <span className="card-ref-val">{new Date(member.joinedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="card-ref-field card-ref-full-col">
              <span className="card-ref-label">Loja</span>
              <span className="card-ref-val">{member.lodge || 'A.R.L.S. União Fraternal Nº 001'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back PVC */}
      <div className="h-card-frame" style={{ flexDirection: 'row-reverse' }}>
        <div className="h-card-left-col" onClick={onValidate} style={{ cursor: 'pointer', background: 'white', padding: 8, borderRadius: 12, height: 'fit-content', border: '1px solid #E2D9C8', alignSelf: 'center' }}>
          <QRCodeSVG size={90} />
          <div style={{ fontSize: '0.45rem', textAlign: 'center', marginTop: 4, color: '#64748B' }}>SCAN PARA VALIDAR</div>
        </div>
        
        <div className="h-card-right-col">
          <div className="card-back-header">CERTIFICADO DE IDENTIDADE MAÇÔNICA</div>
          <div style={{ fontSize: '0.62rem', color: '#1E293B', marginTop: 12, lineHeight: 1.4 }}>
            O titular desta credencial está em pleno gozo de seus direitos maçônicos perante o Grande Oriente e a {member.lodge || 'sua Loja'}.
          </div>
          
          <div className="card-back-signatures" style={{ marginTop: 'auto' }}>
            <div>
              <div className="card-back-sig-line" />
              <div className="card-back-sig-title">Ir. Venerável Mestre</div>
            </div>
            <div>
              <div className="card-back-sig-line" />
              <div className="card-back-sig-title">Ir. Secretário</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple SVG QR code simulation
function QRCodeSVG({ size = 100 }: { size?: number }) {
  const cells = 10;
  const cellSize = size / cells;
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells);
    const col = i % cells;
    const isCorner = (row < 3 && col < 3) || (row < 3 && col >= cells - 3) || (row >= cells - 3 && col < 3);
    return isCorner || Math.random() > 0.45;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', borderRadius: 6, background: '#fff', padding: 4 }}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((filled, i) => {
        const row = Math.floor(i / cells);
        const col = i % cells;
        return filled ? (
          <rect
            key={i}
            x={col * cellSize + 0.5}
            y={row * cellSize + 0.5}
            width={cellSize - 1}
            height={cellSize - 1}
            fill="#0F172A"
            rx={1}
          />
        ) : null;
      })}
    </svg>
  );
}

