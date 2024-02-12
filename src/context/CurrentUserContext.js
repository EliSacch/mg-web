import React, { createContext, useContext, useState } from "react";

// Creating a context for managing the current User
const CurrentUserContext = createContext();

// Provider component for managing the current User 
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

// Custom hook for accessing the current User from the context
export const useCurrentUser = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return currentUser;
};

// Custom hook for updating the current User in the context
export const useSetCurrentUser = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  return setCurrentUser;
};