//  ./frontend/hooks/useLogin.js

/* import React, { useContext } from 'react';
import {LoginProvider.LoginContext} from '../App';

export function useLogin() {
    const context = useContext(LoginContext);
    if (!context) {
      throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
  } */


/* 
import { useContext } from 'react'; // removed unused import 'React'
import { LoginContext } from '../App'; // assumed that there's a contexts folder where all context providers are

/**
 * Custom React hook to use Login context
 * @returns {object} Login context with isLoggedIn and setIsLoggedIn properties
 * @throws {Error} If context is not available
 
export function useLogin() {
  const context = useContext(LoginContext);

  // Throw an error if the hook is used outside of LoginProvider
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }

  return context;
} */