import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', department: '', year: '' });
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', description: '' });

  useEffect(() => {
    // Fetch data
    fetchUsers();
    fetchEvents();
    fetchMeetings();
    fetchLogs();
  }, []);

  const fetchUsers = () => {
    // Mock data
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'alumni', department: 'CS', year: '2020' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student', department: 'IT', year: '2024' }
    ]);
  };

  const fetchEvents = () => {
    setEvents([
      { id: 1, title: 'Tech Meetup', date: '2024-02-15', status: 'pending', attendees: 25 },
      { id: 2, title: 'Alumni Reunion', date: '2024-03-20', status: 'approved', attendees: 50 }
    ]);
  };

  const fetchMeetings = () => {
    setMeetings([
      { id: 1, title: 'Career Workshop', date: '2024-02-10', time: '10:00', attendees: 15 },
      { id: 2, title: 'Industry Talk', date: '2024-02-25', time: '14:00', attendees: 30 }
    ]);
  };

  const fetchLogs = () => {
    setLogs([
      { id: 1, action: 'User Login', user: 'john@example.com', timestamp: '2024-01-15 10:30' },
      { id: 2, action: 'Event Created', user: 'admin@example.com', timestamp: '2024-01-15 11:00' }
    ]);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = { ...newUser, id: Date.now() };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'student', department: '', year: '' });
  };

  const handleEventAction = (eventId, action) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: action } : event
    ));
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    const meeting = { ...newMeeting, id: Date.now(), attendees: 0 };
    setMeetings([...meetings, meeting]);
    setNewMeeting({ title: '', date: '', time: '', description: '' });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="dashboard-tabs">
        {['overview', 'users', 'events', 'meetings', 'logs'].map(tab => (
          <button 
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="overview-section">
          <div className="stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active Events</h3>
              <p>{events.length}</p>
            </div>
            <div className="stat-card">
              <h3>Meetings</h3>
              <p>{meetings.length}</p>
            </div>
            <div className="stat-card">
              <h3>System Logs</h3>
              <p>{logs.length}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <h3>Add Student/Alumni</h3>
          <form onSubmit={handleAddUser} className="user-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
            <input
              type="text"
              placeholder="Department"
              value={newUser.department}
              onChange={(e) => setNewUser({...newUser, department: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Year"
              value={newUser.year}
              onChange={(e) => setNewUser({...newUser, year: e.target.value})}
              required
            />
            <button type="submit">Add User</button>
          </form>

          <h3>Registered Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`badge badge-${user.role === 'alumni' ? 'success' : 'info'}`}>{user.role}</span></td>
                  <td>{user.department}</td>
                  <td>{user.year}</td>
                  <td>
                    <button className="btn-secondary">Chat</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="events-section">
          <h3>Event Management</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Attendees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.attendees}</td>
                  <td>
                    <span className={`badge badge-${event.status === 'approved' ? 'success' : event.status === 'pending' ? 'warning' : 'danger'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    {event.status === 'pending' && (
                      <>
                        <button className="btn-success" onClick={() => handleEventAction(event.id, 'approved')}>
                          Accept
                        </button>
                        <button className="btn-danger" onClick={() => handleEventAction(event.id, 'declined')}>
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="meetings-section">
          <h3>Create Meeting/Workshop</h3>
          <form onSubmit={handleAddMeeting} className="meeting-form">
            <input
              type="text"
              placeholder="Meeting Title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              required
            />
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
              required
            />
            <input
              type="time"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newMeeting.description}
              onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
            />
            <button type="submit">Create Meeting</button>
          </form>

          <h3>Scheduled Meetings</h3>
          <div className="meetings-list">
            {meetings.map(meeting => (
              <div key={meeting.id} className="meeting-card">
                <h4>{meeting.title}</h4>
                <p>Date: {meeting.date}</p>
                <p>Time: {meeting.time}</p>
                <p>Attendees: {meeting.attendees}</p>
                {meeting.description && <p>{meeting.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="logs-section">
          <h3>System Logs</h3>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>User</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{log.action}</td>
                  <td>{log.user}</td>
                  <td>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;