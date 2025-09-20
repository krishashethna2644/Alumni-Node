import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student', 
    graduationYear: '', department: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData);
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'alumni':
          navigate('/alumni');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="number"
          placeholder={formData.role === 'student' ? 'Expected Graduation Year' : 'Graduation Year'}
          value={formData.graduationYear}
          onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({...formData, department: e.target.value})}
        />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;