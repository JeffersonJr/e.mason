import React from 'react';
import './Badge.css';

type BadgeVariant = 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export default function Badge({
  variant = 'primary',
  size = 'md',
  children,
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant} badge--${size} ${className}`}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}

// Status badge helper
export function StatusBadge({ status }: { status: 'adimplente' | 'inadimplente' | 'licenciado' }) {
  const map = {
    adimplente: { variant: 'success' as BadgeVariant, label: 'Adimplente' },
    inadimplente: { variant: 'danger' as BadgeVariant, label: 'Inadimplente' },
    licenciado: { variant: 'warning' as BadgeVariant, label: 'Licenciado' },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}

// Degree badge helper
export function DegreeBadge({ degree }: { degree: number }) {
  const labels: Record<number, string> = {
    1: '1º Aprendiz',
    2: '2º Comp.',
    3: '3º Mestre',
    33: '33° REAA',
  };
  return (
    <Badge variant="outline" size="sm">
      {labels[degree] || `${degree}º Grau`}
    </Badge>
  );
}
