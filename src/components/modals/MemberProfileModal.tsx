import { X, CreditCard, Download, ShieldCheck, Mail, Phone, Calendar, MapPin, Award, UserCheck, Clock, Building2 } from 'lucide-react';
import type { Member } from '../../types';
import Badge, { StatusBadge, DegreeBadge } from '../ui/Badge';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import './MemberProfileModal.css';

interface MemberProfileModalProps {
  member: Member | null;
  onClose: () => void;
  onOpenCarteirinha: (member: Member) => void;
}

export default function MemberProfileModal({ member, onClose, onOpenCarteirinha }: MemberProfileModalProps) {
  if (!member) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '09 de Agosto de 2020';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-drawer" onClick={e => e.stopPropagation()}>
        {/* Hero Header */}
        <div className="profile-drawer-hero">
          <button className="profile-drawer-close" onClick={onClose} title="Fechar perfil">
            <X size={18} />
          </button>
          
          <div className="profile-hero-top">
            <div className="profile-hero-avatar-wrap">
              <Avatar initials={member.avatar} size="xl" gradient />
            </div>
            <div className="profile-hero-meta">
              <div className="profile-hero-cim">CIM: {member.cim}</div>
              <h2 className="profile-hero-name">{member.name}</h2>
              <div className="profile-hero-office">{member.office || member.role} · {member.lodge || 'Loja Luz e Progresso Nº 001'}</div>
              <div className="profile-hero-badges">
                <DegreeBadge degree={member.degree} />
                <StatusBadge status={member.status} />
                <Badge variant="primary" size="sm">Filiado ao G.O.M.B.</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="profile-drawer-actions">
          <Button 
            variant="accent" 
            size="sm" 
            icon={<CreditCard size={15} />} 
            onClick={() => {
              onClose();
              onOpenCarteirinha(member);
            }}
          >
            Emitir Carteirinha
          </Button>
          <Button variant="outline" size="sm" icon={<Download size={15} />}>
            Comprovante de Regularidade
          </Button>
        </div>

        {/* Body Content */}
        <div className="profile-drawer-body">
          {/* Dados Maçônicos */}
          <div className="profile-section-card">
            <div className="profile-section-header">
              <Award size={18} className="profile-section-icon" />
              <span>Dados Maçônicos & Cadastro</span>
            </div>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="profile-info-label">CIM Número</span>
                <span className="profile-info-value">{member.cim}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Grau Atual</span>
                <span className="profile-info-value">
                  {member.degree === 33 ? '33º Mestre do Real Segredo' : member.degree === 3 ? '3º Grau — Mestre Maçom' : member.degree === 2 ? '2º Grau — Companheiro' : '1º Grau — Aprendiz'}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Cargo na Loja</span>
                <span className="profile-info-value">{member.office || member.role}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Loja Simbólica</span>
                <span className="profile-info-value">{member.lodge || 'Loja Luz e Progresso Nº 001'}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Potência Filiada</span>
                <span className="profile-info-value">G.O.M.B. (Grande Oriente)</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Oriente</span>
                <span className="profile-info-value">São Luís — MA</span>
              </div>
            </div>
          </div>

          {/* Histórico Maçônico */}
          <div className="profile-section-card">
            <div className="profile-section-header">
              <Clock size={18} className="profile-section-icon" />
              <span>Histórico de Graus & Datas</span>
            </div>
            <div className="profile-timeline">
              <div className="profile-timeline-node">
                <span className="profile-timeline-title">Iniciação no 1º Grau (Aprendiz)</span>
                <span className="profile-timeline-sub">{formatDate(member.joinedAt)} — Loja Luz e Progresso Nº 001</span>
              </div>
              {member.degree >= 2 && (
                <div className="profile-timeline-node">
                  <span className="profile-timeline-title">Elevação ao 2º Grau (Companheiro)</span>
                  <span className="profile-timeline-sub">14 de Março de 2022 — Loja Luz e Progresso Nº 001</span>
                </div>
              )}
              {member.degree >= 3 && (
                <div className="profile-timeline-node">
                  <span className="profile-timeline-title">Exaltação ao 3º Grau (Mestre Maçom)</span>
                  <span className="profile-timeline-sub">20 de Novembro de 2023 — Loja Luz e Progresso Nº 001</span>
                </div>
              )}
            </div>
          </div>

          {/* Dados Pessoais & Contato */}
          <div className="profile-section-card">
            <div className="profile-section-header">
              <Mail size={18} className="profile-section-icon" />
              <span>Contato & Dados Pessoais</span>
            </div>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="profile-info-label">E-mail Oficial</span>
                <span className="profile-info-value">{member.email}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Telefone / WhatsApp</span>
                <span className="profile-info-value">{member.phone}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Profissão / Especialidade</span>
                <span className="profile-info-value">{member.specialty || 'Engenharia / Administração'}</span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Data de Nascimento</span>
                <span className="profile-info-value">15/06/1984 (42 anos)</span>
              </div>
            </div>
          </div>

          {/* Situação Administrativa */}
          <div className="profile-section-card">
            <div className="profile-section-header">
              <ShieldCheck size={18} className="profile-section-icon" />
              <span>Situação Administrativa & Assiduidade</span>
            </div>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="profile-info-label">Status de Quitação</span>
                <span className="profile-info-value" style={{ color: member.status === 'adimplente' ? '#00C288' : '#EF4444' }}>
                  {member.status === 'adimplente' ? '● Quitado / Adimplente 2026' : '● Pendência Financeira'}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Assiduidade Telhações</span>
                <span className="profile-info-value">92% de presenças (2024-2026)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
