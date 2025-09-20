import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Search = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    graduationYear: '',
    company: '',
    location: ''
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, alumni]);

  const fetchAlumni = async () => {
    try {
      const response = await api.get('/api/alumni/all');
      setAlumni(response.data);
      setFilteredAlumni(response.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const applyFilters = () => {
    let filtered = alumni.filter(alumnus => {
      return (
        (!filters.name || alumnus.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.department || alumnus.department?.toLowerCase().includes(filters.department.toLowerCase())) &&
        (!filters.graduationYear || alumnus.graduationYear?.toString().includes(filters.graduationYear)) &&
        (!filters.company || alumnus.company?.toLowerCase().includes(filters.company.toLowerCase())) &&
        (!filters.location || alumnus.location?.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });
    setFilteredAlumni(filtered);
  };

  const clearFilters = () => {
    setFilters({ name: '', department: '', graduationYear: '', company: '', location: '' });
  };

  return (
    <div className="search-container">
      <h2>Search Alumni</h2>
      
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => setFilters({...filters, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Department"
          value={filters.department}
          onChange={(e) => setFilters({...filters, department: e.target.value})}
        />
        <input
          type="text"
          placeholder="Graduation Year"
          value={filters.graduationYear}
          onChange={(e) => setFilters({...filters, graduationYear: e.target.value})}
        />
        <input
          type="text"
          placeholder="Company"
          value={filters.company}
          onChange={(e) => setFilters({...filters, company: e.target.value})}
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
        />
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="search-results">
        <p>{filteredAlumni.length} alumni found</p>
        <div className="alumni-grid">
          {filteredAlumni.map(alumnus => (
            <div key={alumnus._id} className="alumni-card">
              <h3>{alumnus.name}</h3>
              <p><strong>Email:</strong> {alumnus.email}</p>
              <p><strong>Department:</strong> {alumnus.department || 'Not specified'}</p>
              <p><strong>Graduation Year:</strong> {alumnus.graduationYear || 'Not specified'}</p>
              <p><strong>Current Job:</strong> {alumnus.currentJob || 'Not specified'}</p>
              <p><strong>Company:</strong> {alumnus.company || 'Not specified'}</p>
              <p><strong>Location:</strong> {alumnus.location || 'Not specified'}</p>
              {alumnus.skills && alumnus.skills.length > 0 && (
                <p><strong>Skills:</strong> {alumnus.skills.join(', ')}</p>
              )}
              {alumnus.linkedIn && (
                <p><strong>LinkedIn:</strong> <a href={alumnus.linkedIn} target="_blank" rel="noopener noreferrer">Profile</a></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;