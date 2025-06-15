import { Search } from "lucide-react";
import { useEffect, useState } from "react";
const Side = ({ currentChat, setSelectedChat, selectedChat }) => {
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);
  return (
    <aside
      className="w-80 border-r flex flex-col transition-colors"
      style={{
        backgroundColor: "hsl(var(--sidebar-background))",
        borderColor: "hsl(var(--sidebar-border))",
      }}
    >
      <section>
        <h1
          className="text-xl font-bold p-4 border-b flex items-center justify-between"
          style={{ color: "hsl(var(--sidebar-foreground))" }}
        >
          Messages
        </h1>
        <div
          className="p-4 border-b"
          style={{ borderColor: "hsl(var(--sidebar-border))" }}
        >
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-transparent rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "hsl(var(--sidebar-accent))",
                color: "hsl(var(--sidebar-foreground))",
                borderColor: "hsl(var(--sidebar-border))",
              }}
            />
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-y-auto">
        {filteredChats.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(index)}
            className={`p-4 border-b cursor-pointer transition-colors hover:opacity-90 ${
              selectedChat === index ? "opacity-100" : ""
            }`}
            style={{
              borderColor: "hsl(var(--sidebar-border))",
              backgroundColor:
                selectedChat === index
                  ? "hsl(var(--sidebar-accent))"
                  : "transparent",
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                  style={{
                    backgroundColor: "hsl(var(--sidebar-primary))",
                    color: "hsl(var(--sidebar-primary-foreground))",
                  }}
                >
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2"
                    style={{ borderColor: "hsl(var(--sidebar-background))" }}
                  ></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-semibold truncate"
                    style={{ color: "hsl(var(--sidebar-foreground))" }}
                  >
                    {chat.name}
                  </h3>
                  <span
                    className="text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm truncate"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span
                      className="ml-2 text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
                      style={{
                        backgroundColor: "hsl(var(--sidebar-primary))",
                        color: "hsl(var(--sidebar-primary-foreground))",
                      }}
                    >
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
};

export default Side;
