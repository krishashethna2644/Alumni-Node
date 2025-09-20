import { useState, useEffect } from 'react';
import { eventsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '', description: '', date: '', location: '', type: 'networking'
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await eventsAPI.createEvent(newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '', type: 'networking' });
      setShowCreateForm(false);
      fetchEvents();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await eventsAPI.registerForEvent(eventId);
      alert('Registered successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      
      {user?.role === 'admin' && (
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create Event'}
        </button>
      )}

      {showCreateForm && (
        <form onSubmit={handleCreateEvent} className="event-form">
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            required
          />
          <input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            required
          />
          <select
            value={newEvent.type}
            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
          >
            <option value="networking">Networking</option>
            <option value="reunion">Reunion</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
          </select>
          <button type="submit">Create Event</button>
        </form>
      )}

      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Type: {event.type}</p>
            <p>Attendees: {event.attendees.length}</p>
            {user && (
              <button onClick={() => handleRegister(event._id)}>Register</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;