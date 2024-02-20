import { createContext, useContext, useEffect, useState } from "react";

// Creating a context
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      if (!currentUser) {
        const requestOption = {
          method: "GET",
          credentials: "include",
        }
  
        fetch('/refresh', requestOption)
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              setCurrentUser(data.user);
            }
          })
          .catch(error => {
            console.log("user not logged in. Could not refresh token", error);
          })
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <SetCurrentUserContext.Provider value={{ setCurrentUser }}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// Custom hook for accessing the current User from the context
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

// Custom hook for updating the current User in the context
export const useSetCurrentUser = () => {
  return useContext(SetCurrentUserContext);
};