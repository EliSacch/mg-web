import React, { createContext, useContext, useState } from "react";

// Creating a context for managing the current Message
const CurrentMessageContext = createContext();

// Provider component for managing the current Message state
export const CurrentMessageProvider = ({ children }) => {
  const [currentMessage, setCurrentMessage] = useState();
  const [currentMessageType, setCurrentMessageType] = useState("alert");

  return (
    <CurrentMessageContext.Provider
      value={{ currentMessage, setCurrentMessage, currentMessageType, setCurrentMessageType }}
    >
      {children}
    </CurrentMessageContext.Provider>
  );
};

// Custom hook for accessing the current Message from the context
export const useCurrentMessage = () => {
  const { currentMessage } = useContext(CurrentMessageContext);
  return currentMessage;
};

// Custom hook for updating the current Message in the context
export const useSetCurrentMessage = () => {
  const { setCurrentMessage } = useContext(CurrentMessageContext);
  return setCurrentMessage;
};

// Custom hook for accessing the current Message Type from the context
export const useCurrentMessageType = () => {
    const { currentMessageType } = useContext(CurrentMessageContext);
    return currentMessageType;
  };
  
  // Custom hook for updating the current Message Type in the context
  export const useSetCurrentMessageType = () => {
    const { setCurrentMessageType } = useContext(CurrentMessageContext);
    return setCurrentMessageType;
  };