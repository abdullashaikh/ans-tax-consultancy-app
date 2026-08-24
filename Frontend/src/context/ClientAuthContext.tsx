import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { authApi } from '../api/auth.api';
import { ClientUser, ClientProfile } from '../types';

interface ClientAuthContextType {
  user: ClientUser | null;
  profile: ClientProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const ClientAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('ans_client_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await authApi.getProfile();
      if (res.success && res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.warn('Could not fetch client profile:', err);
    }
  }, []);

  const loadUser = useCallback(async () => {
    const savedToken = localStorage.getItem('ans_client_token');
    if (!savedToken) {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await authApi.getMe();
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('ans_client_user', JSON.stringify(res.data));
        await refreshProfile();
      } else {
        localStorage.removeItem('ans_client_token');
        localStorage.removeItem('ans_client_user');
        setUser(null);
        setProfile(null);
      }
    } catch (err) {
      localStorage.removeItem('ans_client_token');
      localStorage.removeItem('ans_client_user');
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [refreshProfile]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await authApi.login(credentials);
      if (res.success && res.data) {
        const { user: userData, accessToken } = res.data;
        localStorage.setItem('ans_client_token', accessToken);
        localStorage.setItem('ans_client_user', JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);
        await refreshProfile();
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await authApi.register(data);
      if (res.success && res.data) {
        const { user: userData, accessToken } = res.data;
        localStorage.setItem('ans_client_token', accessToken);
        localStorage.setItem('ans_client_user', JSON.stringify(userData));
        setToken(accessToken);
        setUser(userData);
        await refreshProfile();
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn('Logout error ignored:', err);
    } finally {
      localStorage.removeItem('ans_client_token');
      localStorage.removeItem('ans_client_user');
      setToken(null);
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <ClientAuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = (): ClientAuthContextType => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
};
