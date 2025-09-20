import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [requestData, setRequestData] = useState({ field: '', message: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchMentors();
    fetchRequests();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await api.get('/api/mentorship/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await api.get('/api/mentorship/my-requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/mentorship/request', {
        mentor: selectedMentor,
        ...requestData
      });
      setShowRequestForm(false);
      setRequestData({ field: '', message: '' });
      setSelectedMentor('');
      fetchRequests();
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/api/mentorship/${id}/status`, { status });
      fetchRequests();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="mentorship-container">
      <h2>Mentorship</h2>

      <div className="mentorship-sections">
        <div className="mentors-section">
          <h3>Available Mentors</h3>
          <div className="mentors-grid">
            {mentors.map(mentor => (
              <div key={mentor._id} className="mentor-card">
                <h4>{mentor.name}</h4>
                <p><strong>Position:</strong> {mentor.currentJob}</p>
                <p><strong>Company:</strong> {mentor.company}</p>
                {mentor.skills && (
                  <p><strong>Skills:</strong> {mentor.skills.join(', ')}</p>
                )}
                <button onClick={() => {
                  setSelectedMentor(mentor._id);
                  setShowRequestForm(true);
                }}>
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>

        {showRequestForm && (
          <div className="request-form-overlay">
            <form onSubmit={handleRequestSubmit} className="request-form">
              <h3>Request Mentorship</h3>
              <input
                type="text"
                placeholder="Field of Interest"
                value={requestData.field}
                onChange={(e) => setRequestData({...requestData, field: e.target.value})}
                required
              />
              <textarea
                placeholder="Message to mentor"
                value={requestData.message}
                onChange={(e) => setRequestData({...requestData, message: e.target.value})}
                required
              />
              <div className="form-buttons">
                <button type="submit">Send Request</button>
                <button type="button" onClick={() => setShowRequestForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="requests-section">
          <h3>My Mentorship Requests</h3>
          {requests.map(request => (
            <div key={request._id} className="request-card">
              <p><strong>Mentor:</strong> {request.mentor.name}</p>
              <p><strong>Mentee:</strong> {request.mentee.name}</p>
              <p><strong>Field:</strong> {request.field}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Message:</strong> {request.message}</p>
              
              {user._id === request.mentor._id && request.status === 'pending' && (
                <div className="request-actions">
                  <button onClick={() => handleStatusUpdate(request._id, 'active')}>Accept</button>
                  <button onClick={() => handleStatusUpdate(request._id, 'completed')}>Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;