/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { AiOutlineSend } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/hooks/LangContext";
import { useAuth } from "@/hooks/AuthContext";
import AiRequsts from "@/Apis/AiModels";

const ChatModal = ({ toggleOptions }) => {
  const [text, setText] = useState("");

  const { auth } = useAuth();
  const [Chat, setChat] = useState(
    JSON.parse(localStorage.getItem("GPTHestory")) || []
  );
  const [chatLoading, setChatLoading] = useState(false);
  const T = useT();

  const [showEmoji, setShowEmoji] = useState(false);

  const handleSendMessage = () => {
    if (text.trim() === "") return;

    // أضف رسالة المستخدم
    const newUserMsg = { role: "user", content: text };
    const updatedChatAfterUser = [...Chat, newUserMsg];
    setChat(updatedChatAfterUser);
    localStorage.setItem("GPTHestory", JSON.stringify(updatedChatAfterUser));

    setChatLoading(true);

    AiRequsts.GptChat({ auth, data: text })
      .then((res) => {
        const { assistantReply } = res.data;
        const newAssistantMsg = {
          role: assistantReply.role,
          content: assistantReply.content,
        };

        const updatedChat = [...updatedChatAfterUser, newAssistantMsg];
        setChat(updatedChat);
        localStorage.setItem("GPTHestory", JSON.stringify(updatedChat));

        setChatLoading(false);
      })
      .catch((err) => {
        const errorMsg = {
          role: "assistant",
          content: err?.response?.data?.error || "حدث خطأ",
        };

        const updatedChat = [...updatedChatAfterUser, errorMsg];
        setChat(updatedChat);
        localStorage.setItem("GPTHestory", JSON.stringify(updatedChat));

        setChatLoading(false);
      });

    setText("");
  };

  useEffect(() => {
    console.log("Chat", Chat);
  }, [Chat]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setShowEmoji(false);
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-3 right-3 w-96 h-[27rem] bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="w-full flex flex-row-reverse justify-between items-center">
        <h2 className="text-lg font-semibold text-black">{T("الذكاء الاصطناعي","AI")}</h2>
        <button className="text-lg text-[#9da3f3]" onClick={toggleOptions}>
          <IoMdClose />
        </button>
      </div>
      <MessageList Chat={Chat} chatLoading={chatLoading} />
      <div className="w-full flex items-center h-10">
        <div className="flex-grow h-full">
          <div className="relative w-full h-full">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              type="text"
              placeholder={T("اكتب رسالتك", "Type your message...")}
              className="flex w-full border text-black rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-full"
            />
            {showEmoji && (
              <div className="absolute right-0 bottom-10 z-10">
                <EmojiPicker
                  onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                />
              </div>
            )}
            <button
              style={{ color: showEmoji ? "black" : "" }}
              onClick={() => setShowEmoji(!showEmoji)}
              className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 z-10"
            >
              <GrEmoji size={24} />
            </button>
          </div>
        </div>
        <div className="ml-2 h-full">
          <button
            onClick={handleSendMessage}
            className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-2 py-1 flex-shrink-0 h-full"
          >
            <span>{T("أرسل", "Send")}</span>
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
};

const MessageList = ({ Chat, chatLoading }) => {
  const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [Chat, chatLoading]);
  return (
    <div
      ref={chatRef}
      className="chat-window h-3/4 overflow-y-auto mt-4 mb-4 pr-2"
    >
      {Chat.map((msg, i) => (
        <div
          key={i}
          className={`flex items-center ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 rounded-lg my-2 ${
              msg.role === "user"
                ? "bg-[#9da3f3] text-white"
                : "bg-[#f0f0f0] text-black"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {chatLoading && (
        <div className="flex items-center justify-start">
          <div className="p-2 rounded-lg my-2 text-[20px] bg-[#f0f0f0] text-black flex gap-1">
            {"....".split("").map((e, i) => (
              <span
                key={i}
                className={`inline-block animate-bounce`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1s",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatModal;
