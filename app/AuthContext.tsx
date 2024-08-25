// context/AuthContext.tsx
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import  auth from './utils/firebase'; // Import your Firebase auth setup
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie'
interface AuthContextType {
  user: any; // Adjust the type according to your user object
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set user data in cookie when authenticated
        Cookies.set('authUser', JSON.stringify(user), { expires: 7 }); // Set cookie for 7 days
      } else {
        // Remove user data from cookie when logged out
        Cookies.remove('authUser');
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};