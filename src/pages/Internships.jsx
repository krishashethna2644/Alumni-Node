import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', company: '', description: '', requirements: '', location: '', duration: '', stipend: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await api.get('/api/internships');
      setInternships(response.data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, requirements: formData.requirements.split(',').map(r => r.trim()) };
      await api.post('/api/internships', data);
      setFormData({ title: '', company: '', description: '', requirements: '', location: '', duration: '', stipend: '' });
      setShowForm(false);
      fetchInternships();
    } catch (error) {
      console.error('Error creating internship:', error);
    }
  };

  const handleApply = async (id) => {
    try {
      await api.post(`/api/internships/${id}/apply`);
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying:', error);
    }
  };

  return (
    <div className="internships-container">
      <h2>Internships</h2>
      
      {user && (
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Post Internship'}
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="internship-form">
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Requirements (comma separated)"
            value={formData.requirements}
            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={(e) => setFormData({...formData, stipend: e.target.value})}
          />
          <button type="submit">Post Internship</button>
        </form>
      )}

      <div className="internships-list">
        {internships.map(internship => (
          <div key={internship._id} className="internship-card">
            <h3>{internship.title}</h3>
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Location:</strong> {internship.location}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Stipend:</strong> {internship.stipend || 'Not specified'}</p>
            <p>{internship.description}</p>
            {internship.requirements.length > 0 && (
              <div>
                <strong>Requirements:</strong>
                <ul>
                  {internship.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            <p><strong>Posted by:</strong> {internship.postedBy?.name}</p>
            <p><strong>Applicants:</strong> {internship.applicants.length}</p>
            {user && (
              <button onClick={() => handleApply(internship._id)}>Apply</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;