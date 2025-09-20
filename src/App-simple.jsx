import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Alumni Connect</h1>
      <p>System is working! Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Test Button
      </button>
      <div className="features">
        <h2>Features Available:</h2>
        <ul>
          <li>Alumni Profile Management</li>
          <li>Admin Dashboard</li>
          <li>Events Management</li>
          <li>Internship/Mentorship</li>
          <li>Communication System</li>
          <li>Search & Filtering</li>
          <li>Authentication & Roles</li>
        </ul>
      </div>
    </div>
  );
}

export default App;