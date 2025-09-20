# Alumni Management System

A comprehensive MERN stack application for managing alumni data, events, and communications.

## Features Implemented (First Half)

### 1. Alumni Profile Module
- User registration and authentication
- Profile creation and editing
- Personal information management
- Career details tracking

### 2. Admin Dashboard
- Admin authentication and authorization
- Alumni statistics overview
- Alumni management (view, delete)
- Dashboard analytics

### 3. Events Module
- Event creation (admin only)
- Event listing and viewing
- Event registration for alumni
- Event management

## Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Styling**: Custom CSS

## Setup Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with:
   ```
   PORT=7082
   MONGODB_URI=mongodb://localhost:27017/alumni_management
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Start MongoDB service
5. Run backend: `npm run dev`

### Frontend Setup
1. Navigate to root directory
2. Install dependencies: `npm install`
3. Update `.env` file with: `VITE_API_URL=http://localhost:7082`
4. Run frontend: `npm run dev`

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Alumni
- GET `/api/alumni/profile` - Get user profile
- PUT `/api/alumni/profile` - Update profile
- GET `/api/alumni/all` - Get all alumni

### Events
- GET `/api/events` - Get all events
- POST `/api/events` - Create event (admin)
- POST `/api/events/:id/register` - Register for event

### Admin
- GET `/api/admin/dashboard` - Dashboard data
- GET `/api/admin/alumni` - All alumni (admin)
- DELETE `/api/admin/alumni/:id` - Delete alumni

## User Roles

- **Alumni**: Can view/edit profile, view events, register for events
- **Admin**: Full access including user management and event creation

## Completed Features (Second Half)

### 4. Internship/Mentorship Module
- Internship posting and application system
- Mentor discovery and matching
- Mentorship request management
- Status tracking for mentorship relationships

### 5. Communication Module
- Direct messaging between alumni
- Inbox and sent message management
- Message composition and delivery
- Read/unread status tracking

### 6. Search Filter Module
- Advanced alumni search functionality
- Multiple filter criteria (name, department, year, company, location)
- Real-time filtering and results display
- Alumni profile viewing

### 7. Enhanced Authentication/Role Module
- JWT-based authentication system
- Role-based access control (alumni/admin)
- Protected routes and middleware
- Session management

## Complete Feature Set

✅ **Alumni Profile Management**
✅ **Admin Dashboard & Analytics**
✅ **Event Management System**
✅ **Internship Opportunities**
✅ **Mentorship Program**
✅ **Direct Messaging**
✅ **Advanced Search & Filtering**
✅ **Role-based Authentication**

## Additional API Endpoints

### Internships
- GET `/api/internships` - Get all internships
- POST `/api/internships` - Create internship
- POST `/api/internships/:id/apply` - Apply for internship

### Mentorship
- GET `/api/mentorship/mentors` - Get available mentors
- POST `/api/mentorship/request` - Request mentorship
- GET `/api/mentorship/my-requests` - Get user's requests
- PUT `/api/mentorship/:id/status` - Update request status

### Messages
- POST `/api/messages` - Send message
- GET `/api/messages/inbox` - Get inbox messages
- GET `/api/messages/sent` - Get sent messages
- PUT `/api/messages/:id/read` - Mark as read