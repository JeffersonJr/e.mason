export type ProfileMode = 'potencia' | 'loja' | 'irmao';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  degree: number;
  avatar: string;
  cim: string; // Cadastro de Identificação Maçônica
  lodge?: string;
  potencia?: string;
  status: 'adimplente' | 'inadimplente' | 'licenciado';
  joinedAt: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  specialty?: string;
}

export interface Lodge {
  id: string;
  name: string;
  number: string;
  city: string;
  state: string;
  venerableId: string;
  venerableName: string;
  totalMembers: number;
  activeMembers: number;
  status: 'regular' | 'irregular' | 'dormant';
  foundedAt: string;
  meetingDay: string;
  meetingTime: string;
  email: string;
  phone: string;
  address: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  degree: number;
  avatar: string;
  cim: string;
  status: 'adimplente' | 'inadimplente' | 'licenciado';
  lodge?: string;
  phone: string;
  email: string;
  joinedAt: string;
  specialty?: string;
  office?: string;
}

export interface Document {
  id: string;
  title: string;
  category: 'regulamento' | 'ritual' | 'comunicado' | 'ata' | 'estatuto';
  minDegree: number;
  degreeName?: string;
  rite?: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  restricted: boolean;
}

export interface FinancialEntry {
  id: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  member?: string;
  category: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  accessLevels: ProfileMode[];
}

export interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: 'primary' | 'accent' | 'warning' | 'danger';
}

export interface Activity {
  id: string;
  type: 'session' | 'payment' | 'new_member' | 'document' | 'communication' | 'degree';
  title: string;
  description: string;
  date: string;
  actor?: string;
  lodge?: string;
}
