/* eslint-disable prettier/prettier */
import { createContext, useState, useContext } from 'react';

const MessagesContext = createContext();

export const useMessages = () => useContext(MessagesContext);

export const MessagesSupportProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [adminId, setAdminId] = useState(null);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, adminId, setAdminId }}>
      {children}
    </MessagesContext.Provider>
  );
};