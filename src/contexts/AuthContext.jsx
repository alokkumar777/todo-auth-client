
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you would typically verify the token with the backend and get user info
      // For simplicity, we'll just assume the token is valid and decode it
      // In a real app, you'd have a /me endpoint or similar
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decodedToken.id, email: decodedToken.email });
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    const decodedToken = JSON.parse(atob(res.data.token.split('.')[1]));
    setUser({ id: decodedToken.id, email: decodedToken.email });
  };

  const register = async (username, email, password) => {
    const res = await api.post('/auth/register', { username, email, password });
    localStorage.setItem('token', res.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    const decodedToken = JSON.parse(atob(res.data.token.split('.')[1]));
    setUser({ id: decodedToken.id, email: decodedToken.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
