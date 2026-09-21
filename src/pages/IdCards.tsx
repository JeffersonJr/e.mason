import React, { useState } from 'react';
import { Download, Printer, Share2, QrCode, ChevronLeft, ChevronRight, CreditCard, Smartphone } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge, { StatusBadge, DegreeBadge } from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import MasonicHex from '../components/ui/MasonicHex';
import { mockMembers, currentUser } from '../data/mockData';
import './IdCards.css';

type CardMode = 'vertical' | 'horizontal';

export default function IdCards() {
  const [cardMode, setCardMode] = useState<CardMode>('vertical');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const member = mockMembers[selectedIdx] || {
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
    1: 'Aprendiz', 2: 'Companheiro', 3: 'Mestre', 33: 'REAA – 33°',
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
            Impressão (Horizontal)
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <Button variant="outline" size="sm" icon={<Share2 size={14} />}>Compartilhar</Button>
          <Button variant="outline" size="sm" icon={<Printer size={14} />}>Imprimir</Button>
          <Button variant="accent" size="sm" icon={<Download size={14} />}>Baixar PDF</Button>
        </div>
      </div>

      <div className="idcards-content">
        {/* Member selector */}
        <Card padding="none" className="idcards-selector">
          <div className="idcards-selector-header">
            <div className="idcards-selector-title">Selecionar Irmão</div>
            <div className="idcards-selector-count">{mockMembers.length} membros</div>
          </div>
          <div className="idcards-selector-list">
            {mockMembers.map((m, idx) => (
              <button
                key={m.id}
                className={`idcards-selector-item ${idx === selectedIdx ? 'idcards-selector-item--active' : ''}`}
                onClick={() => setSelectedIdx(idx)}
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
          </div>
        </Card>

        {/* Card preview */}
        <div className="idcards-preview-area">
          {cardMode === 'vertical' ? (
            <VerticalCard member={member} degreeLabels={degreeLabels} />
          ) : (
            <HorizontalCard member={member} degreeLabels={degreeLabels} />
          )}

          {/* Navigation */}
          <div className="idcards-nav">
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronLeft size={14} />}
              onClick={() => setSelectedIdx(Math.max(0, selectedIdx - 1))}
              disabled={selectedIdx === 0}
            >
              Anterior
            </Button>
            <span className="idcards-nav-count">{selectedIdx + 1} / {mockMembers.length}</span>
            <Button
              variant="outline"
              size="sm"
              iconRight={<ChevronRight size={14} />}
              onClick={() => setSelectedIdx(Math.min(mockMembers.length - 1, selectedIdx + 1))}
              disabled={selectedIdx === mockMembers.length - 1}
            >
              Próximo
            </Button>
          </div>
        </div>

        {/* Info panel */}
        <Card padding="md" className="idcards-info-panel">
          <div className="idcards-info-title">Informações da Carteirinha</div>
          <div className="idcards-info-grid">
            <div className="idcards-info-item">
              <div className="idcards-info-label">Portador</div>
              <div className="idcards-info-value">{member.name}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">CIM</div>
              <div className="idcards-info-value"><code>{member.cim}</code></div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Cargo</div>
              <div className="idcards-info-value">{member.office}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Grau</div>
              <div className="idcards-info-value">{degreeLabels[member.degree] || `${member.degree}º Grau`}</div>
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Status</div>
              <StatusBadge status={member.status} />
            </div>
            <div className="idcards-info-item">
              <div className="idcards-info-label">Validade</div>
              <div className="idcards-info-value">31/12/2026</div>
            </div>
          </div>

          <div className="idcards-qr-info">
            <div className="idcards-qr-title">QR Code de Validação</div>
            <div className="idcards-qr-sub">O QR Code dinâmico permite verificação instantânea da regularidade maçônica do portador. Válido por 24h após cada geração.</div>
          </div>

          <Button variant="primary" fullWidth icon={<QrCode size={15} />}>Gerar Novo QR Code</Button>
        </Card>
      </div>
    </div>
  );
}

// === VERTICAL CARD ===
function VerticalCard({ member, degreeLabels }: { member: any; degreeLabels: Record<number, string> }) {
  return (
    <div className="id-card-vertical animate-fadein">
      {/* Header gradient */}
      <div className="id-card-v__header">
        <div className="id-card-v__header-content">
          <MasonicHex size={36} variant="gradient">
            <svg viewBox="0 0 24 24" fill="white" width="55%" height="55%">
              <path d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2ZM12 4.311L4 8.5V15.5L12 19.689L20 15.5V8.5L12 4.311Z" />
            </svg>
          </MasonicHex>
          <div>
            <div className="id-card-v__org">e.mason</div>
            <div className="id-card-v__potencia">Grande Oriente do MA e Balsas</div>
          </div>
        </div>
        <div className="id-card-v__watermark">GOMB</div>
      </div>

      {/* Photo area */}
      <div className="id-card-v__photo-area">
        <div className="id-card-v__avatar">
          <Avatar initials={member.avatar} size="xl" gradient />
          <div className="id-card-v__status-ring" style={{ borderColor: member.status === 'adimplente' ? 'var(--color-accent)' : member.status === 'inadimplente' ? 'var(--color-danger)' : 'var(--color-warning)' }} />
        </div>
      </div>

      {/* Info */}
      <div className="id-card-v__info">
        <div className="id-card-v__name">{member.name}</div>
        <div className="id-card-v__cim">{member.cim}</div>

        <div className="id-card-v__tags">
          <div className="id-card-v__tag id-card-v__tag--primary">
            {member.office}
          </div>
          <div className="id-card-v__tag id-card-v__tag--degree">
            {degreeLabels[member.degree] || `${member.degree}º Grau`}
          </div>
        </div>

        <div className="id-card-v__lodge">{member.lodge || 'Loja Luz e Progresso'}</div>
      </div>

      {/* QR Code area */}
      <div className="id-card-v__qr-section">
        <div className="id-card-v__qr-code">
          <QRCodeSVG />
        </div>
        <div className="id-card-v__qr-text">
          <div className="id-card-v__qr-label">Validação Digital</div>
          <div className="id-card-v__qr-sub">Escaneie para verificar regularidade</div>
          <Badge variant={member.status === 'adimplente' ? 'accent' : 'danger'} dot>
            {member.status === 'adimplente' ? 'Regular e Adimplente' : member.status === 'inadimplente' ? 'Inadimplente' : 'Licenciado'}
          </Badge>
        </div>
      </div>

      {/* Footer */}
      <div className="id-card-v__footer">
        <span>Válido até 31/12/2026</span>
        <span>powered by e.mason</span>
      </div>
    </div>
  );
}

// === HORIZONTAL CARD ===
function HorizontalCard({ member, degreeLabels }: { member: any; degreeLabels: Record<number, string> }) {
  return (
    <div className="id-card-horizontal animate-fadein">
      {/* Front side */}
      <div className="id-card-h">
        <div className="id-card-h__left">
          <div className="id-card-h__header">
            <MasonicHex size={28} variant="gradient" />
            <div>
              <div className="id-card-h__org">e.mason</div>
              <div className="id-card-h__sub">GOMB</div>
            </div>
          </div>
          <div className="id-card-h__avatar">
            <Avatar initials={member.avatar} size="lg" gradient />
          </div>
          <div className="id-card-h__degree-badge">
            {degreeLabels[member.degree] || `${member.degree}º Grau`}
          </div>
        </div>

        <div className="id-card-h__main">
          <div className="id-card-h__name">{member.name}</div>
          <div className="id-card-h__role">{member.office}</div>
          <div className="id-card-h__lodge">{member.lodge || 'Loja Luz e Progresso'}</div>
          <div className="id-card-h__cim-row">
            <span className="id-card-h__cim-label">CIM:</span>
            <span className="id-card-h__cim">{member.cim}</span>
          </div>
          <div className="id-card-h__validity">Válido até: 31/12/2026</div>
          <div className={`id-card-h__status id-card-h__status--${member.status}`}>
            {member.status === 'adimplente' ? '● Regular' : member.status === 'inadimplente' ? '● Inadimplente' : '● Licenciado'}
          </div>
        </div>

        <div className="id-card-h__right">
          <QRCodeSVG size={80} />
          <div className="id-card-h__qr-label">Verificar</div>
          <div className="id-card-h__watermark-hex">
            <MasonicHex size={120} variant="outline" />
          </div>
        </div>
      </div>

      <div className="id-card-h id-card-h--back">
        <div className="id-card-h__back-pattern" />
        <div className="id-card-h__back-content">
          <div className="id-card-h__back-org">
            <MasonicHex size={24} variant="gradient" />
            <span>Grande Oriente do Maranhão e Balsas</span>
          </div>
          <div className="id-card-h__back-text">
            Esta carteirinha é de uso pessoal e intransferível. Em caso de perda ou roubo, comunique imediatamente à Secretaria da Potência.
          </div>
          <div className="id-card-h__back-contact">
            secretaria@gomb.org.br · (98) 3232-0000
          </div>
          <div className="id-card-h__magnetic-stripe" />
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
    // Corner squares
    const isCorner = (row < 3 && col < 3) || (row < 3 && col >= cells - 3) || (row >= cells - 3 && col < 3);
    return isCorner || Math.random() > 0.5;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((filled, i) => {
        const row = Math.floor(i / cells);
        const col = i % cells;
        return filled ? (
          <rect
            key={i}
            x={col * cellSize + 1}
            y={row * cellSize + 1}
            width={cellSize - 2}
            height={cellSize - 2}
            fill="#0F172A"
            rx={1}
          />
        ) : null;
      })}
    </svg>
  );
}
