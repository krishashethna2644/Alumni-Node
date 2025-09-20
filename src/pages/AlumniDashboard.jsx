import { useState, useEffect } from 'react';

const AlumniDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    department: 'Computer Science',
    year: '2020',
    company: 'Tech Corp',
    position: 'Software Engineer'
  });
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Best Employee Award', year: '2023', description: 'Outstanding performance' }
  ]);
  const [chatRequests, setChatRequests] = useState([
    { id: 1, from: 'Jane Student', type: 'student', status: 'pending' },
    { id: 2, from: 'Admin', type: 'admin', status: 'pending' }
  ]);
  const [internships, setInternships] = useState([]);
  const [alumni, setAlumni] = useState([
    { id: 1, name: 'Alice Johnson', department: 'CS', year: '2019', company: 'Google' },
    { id: 2, name: 'Bob Wilson', department: 'IT', year: '2021', company: 'Microsoft' }
  ]);
  const [newAchievement, setNewAchievement] = useState({ title: '', year: '', description: '' });
  const [newInternship, setNewInternship] = useState({ title: '', company: '', description: '', requirements: '' });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    const achievement = { ...newAchievement, id: Date.now() };
    setAchievements([...achievements, achievement]);
    setNewAchievement({ title: '', year: '', description: '' });
  };

  const handleChatRequest = (requestId, action) => {
    setChatRequests(chatRequests.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
  };

  const handleCreateInternship = (e) => {
    e.preventDefault();
    const internship = { ...newInternship, id: Date.now(), postedBy: profile.name };
    setInternships([...internships, internship]);
    setNewInternship({ title: '', company: '', description: '', requirements: '' });
  };

  return (
    <div className="alumni-dashboard">
      <h2>Alumni Dashboard</h2>
      
      <div className="dashboard-tabs">
        {['profile', 'achievements', 'chat', 'internships', 'alumni'].map(tab => (
          <button 
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="profile-section">
          <h3>Profile Management</h3>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <input
              type="text"
              placeholder="Name"
              value={profile.name}
              onChange={(e) => setProfile({...profile, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              value={profile.email}
              onChange={(e) => setProfile({...profile, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="Department"
              value={profile.department}
              onChange={(e) => setProfile({...profile, department: e.target.value})}
            />
            <input
              type="text"
              placeholder="Graduation Year"
              value={profile.year}
              onChange={(e) => setProfile({...profile, year: e.target.value})}
            />
            <input
              type="text"
              placeholder="Current Company"
              value={profile.company}
              onChange={(e) => setProfile({...profile, company: e.target.value})}
            />
            <input
              type="text"
              placeholder="Position"
              value={profile.position}
              onChange={(e) => setProfile({...profile, position: e.target.value})}
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="achievements-section">
          <h3>Achievement Management</h3>
          <form onSubmit={handleAddAchievement} className="achievement-form">
            <input
              type="text"
              placeholder="Achievement Title"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Year"
              value={newAchievement.year}
              onChange={(e) => setNewAchievement({...newAchievement, year: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
            />
            <button type="submit">Add Achievement</button>
          </form>

          <div className="achievements-list">
            {achievements.map(achievement => (
              <div key={achievement.id} className="achievement-card">
                <h4>{achievement.title}</h4>
                <p>Year: {achievement.year}</p>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="chat-section">
          <h3>Chat Requests</h3>
          <div className="chat-requests">
            {chatRequests.map(request => (
              <div key={request.id} className="request-card">
                <h4>Chat Request from {request.from}</h4>
                <p>Type: {request.type}</p>
                <p>Status: <span className={`badge badge-${request.status === 'accepted' ? 'success' : request.status === 'declined' ? 'danger' : 'warning'}`}>{request.status}</span></p>
                {request.status === 'pending' && (
                  <div className="request-actions">
                    <button className="btn-success" onClick={() => handleChatRequest(request.id, 'accepted')}>
                      Accept
                    </button>
                    <button className="btn-danger" onClick={() => handleChatRequest(request.id, 'declined')}>
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'internships' && (
        <div className="internships-section">
          <h3>Create Internship Event</h3>
          <form onSubmit={handleCreateInternship} className="internship-form">
            <input
              type="text"
              placeholder="Internship Title"
              value={newInternship.title}
              onChange={(e) => setNewInternship({...newInternship, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Company"
              value={newInternship.company}
              onChange={(e) => setNewInternship({...newInternship, company: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              value={newInternship.description}
              onChange={(e) => setNewInternship({...newInternship, description: e.target.value})}
            />
            <textarea
              placeholder="Requirements"
              value={newInternship.requirements}
              onChange={(e) => setNewInternship({...newInternship, requirements: e.target.value})}
            />
            <button type="submit">Create Internship</button>
          </form>

          <h3>Posted Internships</h3>
          <div className="internships-list">
            {internships.map(internship => (
              <div key={internship.id} className="internship-card">
                <h4>{internship.title}</h4>
                <p>Company: {internship.company}</p>
                <p>Posted by: {internship.postedBy}</p>
                <p>{internship.description}</p>
                {internship.requirements && <p>Requirements: {internship.requirements}</p>}
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
                <p>Year: {alum.year}</p>
                <p>Company: {alum.company}</p>
                <button className="btn-primary">Connect</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniDashboard;