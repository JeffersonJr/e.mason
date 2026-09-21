import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProfileMode, UserProfile } from '../types';
import { currentUser } from '../data/mockData';

interface ProfileContextType {
  mode: ProfileMode;
  setMode: (mode: ProfileMode) => void;
  user: UserProfile;
  activeLodgeId: string;
  setActiveLodgeId: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ProfileMode>('potencia');
  const [activeLodgeId, setActiveLodgeId] = useState('loj-001');

  return (
    <ProfileContext.Provider value={{ mode, setMode, user: currentUser, activeLodgeId, setActiveLodgeId }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
