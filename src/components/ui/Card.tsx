import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, padding = 'md', onClick }: CardProps) {
  return (
    <div
      className={`card card--pad-${padding} ${hover ? 'card--hover' : ''} ${onClick ? 'card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  accentColor?: string;
  gradient?: boolean;
}

export function MetricCard({ label, value, change, changeLabel, icon, accentColor, gradient }: MetricCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card className={`metric-card ${gradient ? 'metric-card--gradient' : ''}`}>
      <div className="metric-card__header">
        <div
          className="metric-card__icon-wrap"
          style={accentColor ? { background: `${accentColor}18`, color: accentColor } : undefined}
        >
          {icon}
        </div>
        {change !== undefined && (
          <span className={`metric-card__change ${isPositive ? 'metric-card__change--up' : 'metric-card__change--down'}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="metric-card__value">{value}</div>
      <div className="metric-card__label">{label}</div>
      {changeLabel && <div className="metric-card__change-label">{changeLabel}</div>}
    </Card>
  );
}
