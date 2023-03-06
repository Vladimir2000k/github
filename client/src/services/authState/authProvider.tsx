import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {getUserData} from '../backend/queries/user';

import {UserData} from './types';

export interface IAuthContext {
  currentUserData: UserData | null;
}

export const AuthContext = createContext<IAuthContext>({
  currentUserData: null,
});

export function AuthProvider({children}: {children: ReactNode}): JSX.Element {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserData() {
      const token = localStorage.getItem('authToken');
      if (token) {
        setLoading(true);
        try {
          const data = await getUserData();
          setCurrentUserData(data);
        } catch (err) {
          console.error(err);
          setCurrentUserData(null);
        }
        setLoading(false);
      } else {
        setCurrentUserData(null);
        setLoading(false);
      }
    }
    checkUserData();
    window.addEventListener('customTokenChangedEvent', checkUserData);
    window.addEventListener('manualUserDataUpdateEvent', checkUserData);
    return () => {
      window.removeEventListener('customTokenChangedEvent', checkUserData);
      window.removeEventListener('manualUserDataUpdateEvent', checkUserData);
    };
  }, []);

  const value = {
    currentUserData,
  };

  const providerContent = loading ? null : children;
  return <AuthContext.Provider value={value}>{providerContent}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
