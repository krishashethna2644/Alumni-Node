import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  // Public dashboard view for non-logged users
  const PublicDashboard = () => (
    <div className="public-dashboard">
      <div className="stats">
        <div className="stat-card">
          <h3>Total Alumni</h3>
          <p>1,250</p>
        </div>
        <div className="stat-card">
          <h3>Active Students</h3>
          <p>3,400</p>
        </div>
        <div className="stat-card">
          <h3>Events This Month</h3>
          <p>15</p>
        </div>
        <div className="stat-card">
          <h3>Success Stories</h3>
          <p>89</p>
        </div>
      </div>
      
      <div className="recent-events">
        <h3>Upcoming Events</h3>
        <div className="events-preview">
          <div className="event-preview-card">
            <h4>Tech Career Fair</h4>
            <p>Date: February 20, 2024</p>
            <p>Join leading tech companies for networking</p>
          </div>
          <div className="event-preview-card">
            <h4>Alumni Reunion 2024</h4>
            <p>Date: March 15, 2024</p>
            <p>Annual gathering of all alumni</p>
          </div>
          <div className="event-preview-card">
            <h4>Industry Workshop</h4>
            <p>Date: February 25, 2024</p>
            <p>Learn latest industry trends</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (user) {
    const getDashboardLink = () => {
      switch (user.role) {
        case 'admin': return '/admin';
        case 'alumni': return '/alumni';
        case 'student': return '/student';
        default: return '/';
      }
    };

    return (
      <div className="home-container">
        <div className="welcome-section">
          <h2>Welcome back, {user.name}!</h2>
          <p>Ready to continue your journey?</p>
          <Link to={getDashboardLink()} className="btn-primary">Go to Dashboard</Link>
        </div>
        <PublicDashboard />
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Alumni Connect</h1>
        <p>Connecting Alumni, Building Futures</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>
      </div>
      
      <PublicDashboard />
      
      <div className="features-section">
        <h2>Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>For Alumni</h3>
            <p>Manage profiles, share achievements, mentor students, create internship opportunities</p>
            <div className="feature-login-prompt">
              <Link to="/login" className="btn-primary">Login to Access</Link>
            </div>
          </div>
          <div className="feature-card">
            <h3>For Students</h3>
            <p>Connect with alumni, join events, request mentorship, explore career opportunities</p>
            <div className="feature-login-prompt">
              <Link to="/login" className="btn-primary">Login to Access</Link>
            </div>
          </div>
          <div className="feature-card">
            <h3>For Admins</h3>
            <p>Manage users, organize events, facilitate connections, track platform analytics</p>
            <div className="feature-login-prompt">
              <Link to="/login" className="btn-primary">Login to Access</Link>
            </div>
          </div>
          <div className="feature-card">
            <h3>Events & Networking</h3>
            <p>Join workshops, reunions, career fairs, and networking sessions</p>
            <div className="feature-login-prompt">
              <Link to="/register" className="btn-secondary">Register to Join</Link>
            </div>
          </div>
          <div className="feature-card">
            <h3>Real-time Chat</h3>
            <p>Direct messaging between alumni, students, and administrators</p>
            <div className="feature-login-prompt">
              <Link to="/register" className="btn-secondary">Register to Chat</Link>
            </div>
          </div>
          <div className="feature-card">
            <h3>Career Growth</h3>
            <p>Internship postings, mentorship programs, and professional development</p>
            <div className="feature-login-prompt">
              <Link to="/register" className="btn-secondary">Register to Explore</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;