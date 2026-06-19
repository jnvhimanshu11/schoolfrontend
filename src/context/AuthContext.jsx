import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,            setUser]            = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,         setLoading]         = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('atlas_token');
    const email = localStorage.getItem('atlas_email');
    if (token && email) {
      setUser({ email });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Step 1: request an OTP to be emailed to this address
  const requestOtp = async (email) => {
    const res = await api.post('/auth/request-otp', { email });
    return res.data;
  };

  // Step 2: verify the OTP and complete login
  const verifyOtp = async (email, otp) => {
    const res = await api.post('/auth/verify-otp', { email, otp });
    const { token } = res.data.data;
    localStorage.setItem('atlas_token', token);
    localStorage.setItem('atlas_email', email);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser({ email });
    setIsAuthenticated(true);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('atlas_token');
    localStorage.removeItem('atlas_email');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, requestOtp, verifyOtp, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
