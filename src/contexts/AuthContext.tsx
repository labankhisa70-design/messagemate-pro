import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api, { authApi, settingsApi } from "@/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  sms_balance: number;
  email_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await settingsApi.getProfile();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch {
      api.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    if (response.success && response.data?.token) {
      api.setToken(response.data.token);
      setUser(response.data.user);
    }
    return response;
  };

  const register = async (data: { name: string; email: string; phone: string; password: string }) => {
    const response = await authApi.register(data);
    return response;
  };

  const logout = () => {
    api.setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
