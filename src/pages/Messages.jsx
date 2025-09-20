import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [messages, setMessages] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [messageData, setMessageData] = useState({ recipient: '', subject: '', content: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    fetchAlumni();
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      const endpoint = activeTab === 'inbox' ? '/api/messages/inbox' : '/api/messages/sent';
      const response = await api.get(endpoint);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchAlumni = async () => {
    try {
      const response = await api.get('/api/alumni/all');
      setAlumni(response.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/messages', messageData);
      setMessageData({ recipient: '', subject: '', content: '' });
      setShowCompose(false);
      if (activeTab === 'sent') fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/api/messages/${id}/read`);
      fetchMessages();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      
      <div className="message-header">
        <div className="message-tabs">
          <button 
            className={activeTab === 'inbox' ? 'active' : ''}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
          </button>
          <button 
            className={activeTab === 'sent' ? 'active' : ''}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>
        <button onClick={() => setShowCompose(true)}>Compose</button>
      </div>

      {showCompose && (
        <div className="compose-overlay">
          <form onSubmit={handleSendMessage} className="compose-form">
            <h3>Compose Message</h3>
            <select
              value={messageData.recipient}
              onChange={(e) => setMessageData({...messageData, recipient: e.target.value})}
              required
            >
              <option value="">Select Recipient</option>
              {alumni.filter(a => a._id !== user.id).map(alumnus => (
                <option key={alumnus._id} value={alumnus._id}>
                  {alumnus.name} ({alumnus.email})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Subject"
              value={messageData.subject}
              onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
              required
            />
            <textarea
              placeholder="Message content"
              value={messageData.content}
              onChange={(e) => setMessageData({...messageData, content: e.target.value})}
              required
            />
            <div className="form-buttons">
              <button type="submit">Send</button>
              <button type="button" onClick={() => setShowCompose(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message._id} 
            className={`message-item ${!message.isRead && activeTab === 'inbox' ? 'unread' : ''}`}
            onClick={() => activeTab === 'inbox' && !message.isRead && markAsRead(message._id)}
          >
            <div className="message-header">
              <strong>
                {activeTab === 'inbox' ? message.sender?.name : message.recipient?.name}
              </strong>
              <span className="message-date">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-preview">{message.content.substring(0, 100)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;