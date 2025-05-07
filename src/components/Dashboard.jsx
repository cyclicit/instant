import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="user-info">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User profile" className="user-avatar" />
        ) : (
          <div className="avatar-placeholder">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        )}
        <p>Logged in as: {user?.email}</p>
      </div>
      <button onClick={handleLogout} className="btn logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;