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
            console.log("user not logged in. Could not refresh token", error)
          })
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /*useMemo(() => {
    // Intercept requests and attempt to refresh the authentication token
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin/");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin/");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);*/

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
  const { currentUser } = useContext(CurrentUserContext);
  return currentUser;
};

// Custom hook for updating the current User in the context
export const useSetCurrentUser = () => {
  const { setCurrentUser } = useContext(SetCurrentUserContext);
  return setCurrentUser;
};