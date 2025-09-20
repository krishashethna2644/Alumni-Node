import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Meetup', date: '2024-02-15', type: 'networking', joined: false },
    { id: 2, title: 'Career Workshop', date: '2024-02-20', type: 'workshop', joined: true },
    { id: 3, title: 'Alumni Reunion', date: '2024-03-10', type: 'reunion', joined: false }
  ]);
  const [alumni, setAlumni] = useState([
    { id: 1, name: 'John Doe', department: 'CS', year: '2020', company: 'Tech Corp' },
    { id: 2, name: 'Alice Johnson', department: 'CS', year: '2019', company: 'Google' }
  ]);
  const [chatRequests, setChatRequests] = useState([]);

  const handleJoinEvent = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, joined: !event.joined } : event
    ));
  };

  const handleChatRequest = (alumniId) => {
    const alumni = alumni.find(a => a.id === alumniId);
    const request = {
      id: Date.now(),
      to: alumni.name,
      status: 'pending',
      timestamp: new Date().toLocaleString()
    };
    setChatRequests([...chatRequests, request]);
    alert(`Chat request sent to ${alumni.name}`);
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      
      <div className="dashboard-tabs">
        {['dashboard', 'events', 'alumni', 'chat'].map(tab => (
          <button 
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="overview-section">
          <div className="welcome-card">
            <h3>Welcome, {user?.name || 'Student'}!</h3>
            <p>Explore events, connect with alumni, and build your network.</p>
          </div>
          
          <div className="stats">
            <div className="stat-card">
              <h3>Available Events</h3>
              <p>{events.length}</p>
            </div>
            <div className="stat-card">
              <h3>Joined Events</h3>
              <p>{events.filter(e => e.joined).length}</p>
            </div>
            <div className="stat-card">
              <h3>Alumni Network</h3>
              <p>{alumni.length}</p>
            </div>
            <div className="stat-card">
              <h3>Chat Requests</h3>
              <p>{chatRequests.length}</p>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Events</h3>
            <div className="events-preview">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="event-preview-card">
                  <h4>{event.title}</h4>
                  <p>Date: {event.date}</p>
                  <p>Type: {event.type}</p>
                  <span className={`badge ${event.joined ? 'badge-success' : 'badge-info'}`}>
                    {event.joined ? 'Joined' : 'Available'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="events-section">
          <h3>Available Events</h3>
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <h4>{event.title}</h4>
                <p>Date: {event.date}</p>
                <p>Type: {event.type}</p>
                <div className="event-actions">
                  <button 
                    className={event.joined ? 'btn-danger' : 'btn-primary'}
                    onClick={() => handleJoinEvent(event.id)}
                  >
                    {event.joined ? 'Leave Event' : 'Join Event'}
                  </button>
                </div>
                <span className={`badge ${event.joined ? 'badge-success' : 'badge-info'}`}>
                  {event.joined ? 'Joined' : 'Available'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alumni' && (
        <div className="alumni-section">
          <h3>Alumni Network</h3>
          <div className="alumni-grid">
            {alumni.map(alum => (
              <div key={alum.id} className="alumni-card">
                <h4>{alum.name}</h4>
                <p>Department: {alum.department}</p>
                <p>Graduation Year: {alum.year}</p>
                <p>Company: {alum.company}</p>
                <button 
                  className="btn-primary"
                  onClick={() => handleChatRequest(alum.id)}
                >
                  Send Chat Request
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="chat-section">
          <h3>Chat Requests</h3>
          {chatRequests.length === 0 ? (
            <p>No chat requests sent yet.</p>
          ) : (
            <div className="chat-requests">
              {chatRequests.map(request => (
                <div key={request.id} className="request-card">
                  <h4>Request to {request.to}</h4>
                  <p>Status: <span className={`badge badge-${request.status === 'accepted' ? 'success' : request.status === 'declined' ? 'danger' : 'warning'}`}>{request.status}</span></p>
                  <p>Sent: {request.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;