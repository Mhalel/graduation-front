/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { AiOutlineSend } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useMessages } from "@/hooks/UseChatWithAdmin";
import { v4 as uuidv4 } from "uuid";

const ChatModal = ({
  mode,
  toggleOptions,
  showEnterQueue,
  setShowEnterQueue,
}) => {
  const [text, setText] = useState("");
  const { socket, account, auth } = useAuth();
  const id = uuidv4();
  if (!auth) {
    console.log(id);
  }
  const [showEmoji, setShowEmoji] = useState(false);

  const closeQueueQuestion = (mode) => {
    setShowEnterQueue((prevQueue) =>
      prevQueue.map((item) =>
        item.mode === mode ? { ...item, show: false } : item
      )
    );
  };

  const { messages, addMessage, adminId, setAdminId } = useMessages();
  const sessionStart = new Date().getTime();
  const [expirationTime, setExpirationTime] = useState(
    new Date().getTime() + 5 * 60 * 1000
  );

  const handleSendMessage = () => {
    if (text.trim() === "") return;

    addMessage({ text, from: "user" });
    if (adminId) {
      socket.emit("sendMessageSupport", {
        sender: auth ? account._id : id,
        recipient: adminId,
        text: text,
      });
    }
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setShowEmoji(false);
      handleSendMessage();
    }
  };

  const sendToServerSupport = () => {
    if (!socket) return;
    if (showEnterQueue.find((item) => item.mode === "admin")?.show === true)
      return;
    const messageToServer = {
      message: `user with ID ${auth ? account._id : id} wants support`,
      userId: auth ? account._id : id,
      sessionStart: sessionStart,
      sessionEnd: expirationTime,
    };

    socket.emit("supportRequest", messageToServer);

    setExpirationTime(new Date().getTime() + 5 * 60 * 1000);
  };

  useEffect(() => {
    sendToServerSupport();
  }, [showEnterQueue]);

//   useEffect(() => {
//     socket.on("newSupportRequestNotify", (data) => {
//       console.log(data);
//       setAdminId(data.messageData.admin._id);
//       addMessage({ text: data.message, from: "admin" });
//     });

//     return () => {
//       if (socket) {
//         socket.off("newSupportRequestNotify");
//       }
//     };
//   }, [socket]);

//   useEffect(() => {
//     const handleSupportMessages = (data) => {
//       addMessage({ text: data.text, from: "admin" });
//     };
//     socket.on("supportMessages", handleSupportMessages);

//     return () => {
//       socket.off("supportMessages", handleSupportMessages);
//     };
//   }, []);

  return (
    <div className="fixed bottom-3 right-3 w-96 h-[27rem] bg-white rounded-lg shadow-lg p-4 z-50">
      <div className="w-full flex flex-row-reverse justify-between items-center">
        <h2 className="text-lg font-semibold">
          {mode === "admin" ? "مسؤول الدعم الفني" : "كمول الذكاء الاصطناعي"}
        </h2>
        <button className="text-lg text-[#9da3f3]" onClick={toggleOptions}>
          <IoMdClose />
        </button>
      </div>
      {showEnterQueue.find((item) => item.mode === mode)?.show ? (
        <EnterQueue
          toggleOptions={toggleOptions}
          mode={mode}
          closeQueueQuestion={closeQueueQuestion}
        />
      ) : (
        <>
          <MessageList />
          <div className="w-full flex items-center h-10">
            <div className="flex-grow h-full">
              <div className="relative w-full h-full">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text"
                  placeholder="Type your message..."
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-full"
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
                <span>Send</span>
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MessageList = () => {
  const { messages } = useMessages();

  return (
    <div className="chat-window h-3/4 overflow-y-auto mt-4 mb-4 pr-2">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex items-center ${
            msg.from === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-2 rounded-lg my-2 ${
              msg.from === "user"
                ? "bg-[#9da3f3] text-white"
                : "bg-[#f0f0f0] text-black"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const EnterQueue = ({ toggleOptions, mode, closeQueueQuestion }) => {
  return (
    <div className="w-full h-5/6 flex justify-center items-center flex-col gap-10">
      <div className="w-full text-center text-xl font-medium text-slate-800">
        <span>
          {mode === "admin"
            ? "هل تريد التحدث مع مسؤول الدعم الفني؟"
            : "هل تريد التحدث مع كمول الذكاء الاصطناعي؟"}
        </span>
      </div>
      <div className="flex flex-row justify-center items-center gap-4 text-base">
        <button
          onClick={toggleOptions}
          className="bg-red-500 px-10 py-2 rounded-lg text-white"
        >
          إلغاء
        </button>
        <button
          onClick={() => closeQueueQuestion(mode)}
          className="bg-[#8c92e2] px-10 py-2 rounded-lg text-white"
        >
          تحدث
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
