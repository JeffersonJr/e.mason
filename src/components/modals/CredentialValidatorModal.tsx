import { X, Shield, CheckCircle, Calendar, Hash, Award } from 'lucide-react';
import type { Member } from '../../types';
import Avatar from '../ui/Avatar';
import './CredentialValidatorModal.css';

interface CredentialValidatorModalProps {
  member: Member | null;
  onClose: () => void;
}

export default function CredentialValidatorModal({ member, onClose }: CredentialValidatorModalProps) {
  if (!member) return null;

  const now = new Date();
  const timestampStr = `${now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} às ${now.toLocaleTimeString('pt-BR')}`;

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
    <div className="validator-overlay" onClick={onClose}>
      <div className="validator-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="validator-header">
          <button className="validator-close" onClick={onClose} title="Fechar validador">
            <X size={18} />
          </button>
          <div className="validator-shield-icon">
            <Shield size={24} />
          </div>
          <div className="validator-sub-tag">SEGURANÇA E AUTENTICAÇÃO</div>
          <h2 className="validator-title">Validador de Credenciais</h2>
        </div>

        {/* Body */}
        <div className="validator-body">
          <div className="validator-card-box">
            <div className="validator-check-badge">
              <CheckCircle size={28} />
            </div>

            <div className="validator-cred-status">CREDENCIAL VÁLIDA</div>
            <h3 className="validator-auth-title">Identidade Autenticada</h3>
            <p className="validator-auth-desc">
              Confirmamos que o irmão abaixo é regular e está devidamente registrado nos arquivos da 
              <strong> {member.lodge || 'A.R.L.S. Loja Luz e Progresso Nº 001'}</strong>.
            </p>

            {/* Member Card Summary */}
            <div className="validator-member-inner">
              <Avatar initials={member.avatar} size="lg" gradient />
              <div className="validator-member-info">
                <div className="validator-member-name">{member.name}</div>
                <div className="validator-member-degree">
                  {member.degree === 33 ? 'MESTRE DO REAL SEGREDO (33º)' : member.degree === 3 ? 'MESTRE MAÇOM' : member.degree === 2 ? 'COMPANHEIRO MAÇOM' : 'APRENDIZ MAÇOM'}
                </div>
                <div className="validator-member-meta-row">
                  <span>📄 CIM: <strong>{member.cim}</strong></span>
                  <span>📅 Início: <strong>{formatDate(member.joinedAt)}</strong></span>
                </div>
              </div>
            </div>

            {/* Official Stamp */}
            <div className="validator-stamp-box">
              Consultado em: <strong>{timestampStr}</strong><br />
              <span className="validator-stamp-gold">A.R.L.S. LOJA LUZ E PROGRESSO Nº 001</span><br />
              Oriente de São Luís · MA · Brasil<br />
              Filiada ao Grande Oriente Maçônico do Brasil (GOMB)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
