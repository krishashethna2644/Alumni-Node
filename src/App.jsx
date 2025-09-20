import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Chat from './pages/Chat';
import Events from './pages/Events';
import './App.css';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (roles.length > 0 && !roles.includes(user.role)) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Alumni Routes */}
              <Route path="/alumni" element={
                <ProtectedRoute roles={['alumni']}>
                  <AlumniDashboard />
                </ProtectedRoute>
              } />
              
              {/* Student Routes */}
              <Route path="/student" element={
                <ProtectedRoute roles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              
              {/* Shared Routes - All require login */}
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/events" element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;