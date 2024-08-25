import React from 'react';
import { logout } from '../utils/firebase';
import Cookies from 'js-cookie';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login or home page after logout
      Cookies.remove('authUser');
      window.location.href = '/signin';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;