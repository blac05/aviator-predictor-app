import React from 'react';
import './UserProfile.css';

function UserProfile({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <div className="user-profile">
      {user ? (
        <>
          <span className="username">👤 {user.username}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;