
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AddCategoryPage from './pages/AddCategoryPage';
import AddTaskPage from './pages/AddTaskPage';
import Loader from './components/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/add-category"
            element={<PrivateRoute><AddCategoryPage /></PrivateRoute>}
          />
          <Route
            path="/add-task"
            element={<PrivateRoute><AddTaskPage /></PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
