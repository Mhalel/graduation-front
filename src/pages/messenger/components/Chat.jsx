import {
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import { useEffect } from "react";

const Chat = ({
  currentChat,
  newMessage,
  messagesEndRef,
  setNewMessage,
  sendMessage,
}) => {

    useEffect(()=>{
        console.log("currentChat",currentChat)
    },[currentChat])
  return (
    <aside
      className="flex-1 flex flex-col transition-colors"
      style={{ backgroundColor: "hsl(var(--background))" }}
    >
      <Header currentChat={currentChat} />

      <section
        className="flex-1 overflow-y-auto p-4 space-y-4 transition-colors"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        {currentChat?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                message.sent ? "order-2" : "order-1"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.sent ? "rounded-br-md" : "rounded-bl-md"
                }`}
                style={{
                  backgroundColor: message.sent
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
                  color: message.sent
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p
                className={`text-xs mt-1 ${
                  message.sent ? "text-right" : "text-left"
                }`}
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>

      <ChatInputSection
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
      />
    </aside>
  );
};

const Header = ({ currentChat }) => {
  return (
    <section
      className="p-4 border-b flex items-center justify-between transition-colors"
      style={{
        borderColor: "hsl(var(--border))",
        backgroundColor: "hsl(var(--card))",
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
            style={{
              backgroundColor: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            {currentChat?.avatar}
          </div>
          {currentChat?.online && (
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2"
              style={{ borderColor: "hsl(var(--card))" }}
            ></div>
          )}
        </div>
        <div>
          <h2
            className="font-semibold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {currentChat?.name}
          </h2>
          <p
            className="text-sm"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {currentChat?.online ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--foreground))",
          }}
        >
          <Phone size={20} />
        </button>
        <button
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--foreground))",
          }}
        >
          <Video size={20} />
        </button>
        <button
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--foreground))",
          }}
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </section>
  );
};

const ChatInputSection = ({ newMessage, setNewMessage, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <section
      className="p-4 border-t transition-colors"
      style={{
        borderColor: "hsl(var(--border))",
        backgroundColor: "hsl(var(--card))",
      }}
    >
      <div className="flex items-end space-x-2">
        <button
          className="p-2 rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: "hsl(var(--accent))",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          <Paperclip size={20} />
        </button>
        <div className="flex-1 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none"
            style={{
              backgroundColor: "hsl(var(--input))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
              minHeight: "40px",
              maxHeight: "120px",
            }}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors hover:opacity-80"
            style={{
              backgroundColor: "hsl(var(--accent))",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            <Smile size={18} />
          </button>
        </div>
        <button
          onClick={sendMessage}
          className="p-2 rounded-lg transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
          disabled={!newMessage.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </section>
  );
};

export default Chat;
