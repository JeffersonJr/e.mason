import React from 'react';
import './Avatar.css';

interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'adimplente' | 'inadimplente' | 'licenciado';
  gradient?: boolean;
}

export default function Avatar({ initials, size = 'md', status, gradient = false }: AvatarProps) {
  return (
    <div className={`avatar avatar--${size} ${gradient ? 'avatar--gradient' : ''}`} title={initials}>
      <span className="avatar__initials">{initials}</span>
      {status && (
        <span className={`avatar__status avatar__status--${status}`} />
      )}
    </div>
  );
}
