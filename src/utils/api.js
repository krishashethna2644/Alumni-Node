import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const alumniAPI = {
  getProfile: () => api.get('/api/alumni/profile'),
  updateProfile: (data) => api.put('/api/alumni/profile', data),
  getAllAlumni: () => api.get('/api/alumni/all'),
};

export const eventsAPI = {
  getEvents: () => api.get('/api/events'),
  createEvent: (data) => api.post('/api/events', data),
  registerForEvent: (id) => api.post(`/api/events/${id}/register`),
};

export const adminAPI = {
  getDashboard: () => api.get('/api/admin/dashboard'),
  getAllAlumni: () => api.get('/api/admin/alumni'),
  deleteAlumni: (id) => api.delete(`/api/admin/alumni/${id}`),
};

export const internshipAPI = {
  getInternships: () => api.get('/api/internships'),
  createInternship: (data) => api.post('/api/internships', data),
  applyForInternship: (id) => api.post(`/api/internships/${id}/apply`),
};

export const mentorshipAPI = {
  getMentors: () => api.get('/api/mentorship/mentors'),
  requestMentorship: (data) => api.post('/api/mentorship/request', data),
  getMyRequests: () => api.get('/api/mentorship/my-requests'),
  updateStatus: (id, status) => api.put(`/api/mentorship/${id}/status`, { status }),
};

export const messageAPI = {
  sendMessage: (data) => api.post('/api/messages', data),
  getInbox: () => api.get('/api/messages/inbox'),
  getSent: () => api.get('/api/messages/sent'),
  markAsRead: (id) => api.put(`/api/messages/${id}/read`),
};