import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin': return '/admin';
      case 'alumni': return '/alumni';
      case 'student': return '/student';
      default: return '/';
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2>Alumni Connect</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.name} ({user.role})</span>
            <Link to={getDashboardLink()}>Dashboard</Link>
            <Link to="/events">Events</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;