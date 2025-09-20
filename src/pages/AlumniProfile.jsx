import { useState, useEffect } from 'react';
import { alumniAPI } from '../utils/api';

const AlumniProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await alumniAPI.getProfile();
      setProfile(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await alumniAPI.updateProfile(formData);
      setProfile(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Alumni Profile</h2>
      {editing ? (
        <form onSubmit={handleUpdate} className="profile-form">
          <input
            type="text"
            placeholder="Current Job"
            value={formData.currentJob || ''}
            onChange={(e) => setFormData({...formData, currentJob: e.target.value})}
          />
          <input
            type="text"
            placeholder="Company"
            value={formData.company || ''}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location || ''}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone || ''}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <textarea
            placeholder="Bio"
            value={formData.bio || ''}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={formData.linkedIn || ''}
            onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className="profile-display">
          <h3>{profile.name}</h3>
          <p>Email: {profile.email}</p>
          <p>Department: {profile.department}</p>
          <p>Graduation Year: {profile.graduationYear}</p>
          <p>Current Job: {profile.currentJob || 'Not specified'}</p>
          <p>Company: {profile.company || 'Not specified'}</p>
          <p>Location: {profile.location || 'Not specified'}</p>
          <p>Phone: {profile.phone || 'Not specified'}</p>
          <p>Bio: {profile.bio || 'No bio available'}</p>
          <p>LinkedIn: {profile.linkedIn || 'Not provided'}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default AlumniProfile;