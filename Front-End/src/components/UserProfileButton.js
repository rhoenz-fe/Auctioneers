import React from 'react';
import { Link } from 'react-router-dom';

function UserProfileButton() {
  return (
    <Link to="/user-profile">
      <button>Go to User Profile</button>
    </Link>
  );
}

export default UserProfileButton;