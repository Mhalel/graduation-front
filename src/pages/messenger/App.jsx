import React, { useState, useRef } from "react";
import Side from "./components/Side";
import Chat from "./components/Chat";

const Messanger = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(0);
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "SW",
      lastMessage: "Hey! How are you doing?",
      time: "2m ago",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          text: "Hey there! How was your day?",
          sent: false,
          time: "10:30 AM",
        },
        {
          id: 2,
          text: "It was great! Just finished work. How about you?",
          sent: true,
          time: "10:32 AM",
        },
        {
          id: 3,
          text: "Pretty good! Want to grab coffee later?",
          sent: false,
          time: "10:35 AM",
        },
        { id: 4, text: "Hey! How are you doing?", sent: false, time: "2m ago" },
      ],
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "MJ",
      lastMessage: "See you tomorrow!",
      time: "1h ago",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          text: "Don't forget about the meeting tomorrow",
          sent: false,
          time: "9:15 AM",
        },
        {
          id: 2,
          text: "Thanks for the reminder! What time again?",
          sent: true,
          time: "9:20 AM",
        },
        {
          id: 3,
          text: "10 AM sharp. Conference room B",
          sent: false,
          time: "9:22 AM",
        },
        {
          id: 4,
          text: "Perfect! See you tomorrow!",
          sent: false,
          time: "1h ago",
        },
      ],
    },
    {
      id: 3,
      name: "Emily Chen",
      avatar: "EC",
      lastMessage: "Thanks for your help!",
      time: "3h ago",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          text: "Can you help me with the project?",
          sent: false,
          time: "2:00 PM",
        },
        {
          id: 2,
          text: "Of course! What do you need?",
          sent: true,
          time: "2:05 PM",
        },
        {
          id: 3,
          text: "Just some feedback on the design",
          sent: false,
          time: "2:10 PM",
        },
        { id: 4, text: "Thanks for your help!", sent: false, time: "3h ago" },
      ],
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      avatar: "AR",
      lastMessage: "Let's catch up soon",
      time: "1d ago",
      unread: 1,
      online: false,
      messages: [
        {
          id: 1,
          text: "Hey! Long time no see",
          sent: false,
          time: "Yesterday",
        },
        {
          id: 2,
          text: "I know! How have you been?",
          sent: true,
          time: "Yesterday",
        },
        {
          id: 3,
          text: "Great! We should meet up sometime",
          sent: false,
          time: "Yesterday",
        },
        { id: 4, text: "Let's catch up soon", sent: false, time: "1d ago" },
      ],
    },
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedChats = [...chats];
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        sent: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      updatedChats[selectedChat].messages.push(newMsg);
      updatedChats[selectedChat].lastMessage = newMessage;
      updatedChats[selectedChat].time = "now";

      setChats(updatedChats);
      setNewMessage("");
    }
  };

 

  const currentChat = chats[selectedChat];
  return (
    <div
      className={`h-screen flex transition-colors `}
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <Side
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
        currentChat={currentChat}
      />
      <Chat
        currentChat={currentChat}
        newMessage={newMessage}
        messagesEndRef={messagesEndRef}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Messanger;
