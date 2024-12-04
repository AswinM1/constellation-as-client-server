import React, { createContext, useState, useEffect } from 'react';

export const SigninContext = createContext();

export const SigninProvider = ({ children }) => {
  const [signIn, setSignin] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve the login state and username from sessionStorage if they exist
    const storedSignIn = sessionStorage.getItem('signIn') === 'true'; // "true" is stored as a string
    const storedUserName = sessionStorage.getItem('userName');

    if (storedSignIn) {
      setSignin(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleSignIn = (userName) => {
    // Save the sign-in state and username to sessionStorage
    setSignin(true);
    setUserName(userName);
    sessionStorage.setItem('signIn', 'true'); // Store as a string
    sessionStorage.setItem('userName', userName); // Store user name
  };

  const handleSignOut = () => {
    // Clear the sign-in state and remove the data from sessionStorage
    setSignin(false);
    setUserName('');
    sessionStorage.removeItem('signIn');
    sessionStorage.removeItem('userName');
  };

  return (
    <SigninContext.Provider value={{ signIn, userName, setSignin, setUserName, handleSignIn, handleSignOut }}>
      {children}
    </SigninContext.Provider>
  );
};
