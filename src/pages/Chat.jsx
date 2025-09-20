import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../chat-styles.css';

const Chat = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      name: 'John Doe (Alumni)', 
      lastMessage: 'Thanks for connecting!', 
      timestamp: '10:30 AM',
      unread: 2,
      role: 'alumni'
    },
    { 
      id: 2, 
      name: 'Admin', 
      lastMessage: 'Welcome to Alumni Connect', 
      timestamp: '9:15 AM',
      unread: 0,
      role: 'admin'
    },
    { 
      id: 3, 
      name: 'Jane Student', 
      lastMessage: 'Can you help with career advice?', 
      timestamp: 'Yesterday',
      unread: 1,
      role: 'student'
    }
  ]);
  
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'John Doe', message: 'Hi! Thanks for connecting.', timestamp: '10:25 AM', isOwn: false },
      { id: 2, sender: 'You', message: 'Hello! Great to connect with you.', timestamp: '10:28 AM', isOwn: true },
      { id: 3, sender: 'John Doe', message: 'Thanks for connecting!', timestamp: '10:30 AM', isOwn: false }
    ],
    2: [
      { id: 1, sender: 'Admin', message: 'Welcome to Alumni Connect', timestamp: '9:15 AM', isOwn: false }
    ],
    3: [
      { id: 1, sender: 'Jane Student', message: 'Can you help with career advice?', timestamp: 'Yesterday', isOwn: false }
    ]
  });
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), message]
    }));

    // Update last message in conversations
    setConversations(prev => prev.map(conv => 
      conv.id === activeChat 
        ? { ...conv, lastMessage: newMessage, timestamp: message.timestamp }
        : conv
    ));

    setNewMessage('');
  };

  const selectChat = (chatId) => {
    setActiveChat(chatId);
    // Mark as read
    setConversations(prev => prev.map(conv => 
      conv.id === chatId ? { ...conv, unread: 0 } : conv
    ));
  };

  const getFilteredConversations = () => {
    if (!user) return conversations;
    
    // Filter based on user role
    switch (user.role) {
      case 'admin':
        return conversations; // Admin can chat with everyone
      case 'alumni':
        return conversations.filter(conv => conv.role === 'admin' || conv.role === 'student');
      case 'student':
        return conversations.filter(conv => conv.role === 'admin' || conv.role === 'alumni');
      default:
        return [];
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-layout">
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <h3>Messages</h3>
            <div className="online-status">
              <span className="status-dot"></span>
              Online
            </div>
          </div>
          <div className="conversations-list">
            {getFilteredConversations().map(conversation => (
              <div 
                key={conversation.id}
                className={`conversation-card ${activeChat === conversation.id ? 'active' : ''}`}
                onClick={() => selectChat(conversation.id)}
              >
                <div className="avatar-container">
                  <div className={`avatar ${conversation.role}`}>
                    {conversation.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="status-indicator"></div>
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h4 className="contact-name">{conversation.name}</h4>
                    <span className="message-time">{conversation.timestamp}</span>
                  </div>
                  <div className="message-preview">
                    <p className="last-message">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="unread-count">{conversation.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-main">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="chat-contact-info">
                  <div className={`chat-avatar ${conversations.find(c => c.id === activeChat)?.role}`}>
                    {conversations.find(c => c.id === activeChat)?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="contact-details">
                    <h3>{conversations.find(c => c.id === activeChat)?.name}</h3>
                    <span className="contact-status">Active now</span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">📞</button>
                  <button className="action-btn">📹</button>
                  <button className="action-btn">ℹ️</button>
                </div>
              </div>
              
              <div className="messages-container">
                {(messages[activeChat] || []).map(message => (
                  <div 
                    key={message.id}
                    className={`message-wrapper ${message.isOwn ? 'own-message' : 'other-message'}`}
                  >
                    {!message.isOwn && (
                      <div className={`message-avatar ${conversations.find(c => c.id === activeChat)?.role}`}>
                        {conversations.find(c => c.id === activeChat)?.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="message-bubble">
                      <p className="message-text">{message.message}</p>
                      <span className="message-timestamp">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-input-form">
                <div className="input-container">
                  <button type="button" className="attachment-btn">📎</button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                  />
                  <button type="button" className="emoji-btn">😊</button>
                  <button type="submit" className="send-button">➤</button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h3>Select a conversation to start chatting</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;