/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import ChatModal from "./ChatModal";
import { useAuth } from "@/hooks/AuthContext";
import { FaWhatsapp } from "react-icons/fa6";
import { useLang } from "@/hooks/LangContext";
// import ScrollToTop from "../globalComponents/scroller";

function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatWith, setChatWith] = useState(null);
  const [showEnterQueue, setShowEnterQueue] = useState([
    {
      mode: "admin",
      show: true,
    },
    {
      mode: "ai",
      show: true,
    },
  ]);

  const { lang } = useLang();
  const { auth, socket } = useAuth();

  const toggleOptions = () => setIsOpen(!isOpen);

  const openChat = (option) => {
    setChatWith(option);
    setIsChatOpen(true);
  };

  const closeAll = () => {
    setIsOpen(false);
    setIsChatOpen(false);
  };
  let message = "Hi! I have a question about your services.";

  return (
    <div>
      {/* Main Floating Button */}
      {/* <button
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-[#7053a1] hover:bg-[#8186c9] text-2xl text-white flex items-center justify-center cursor-pointer z-50 shadow-neon-purple"
        onClick={toggleOptions}
      >
        <IoChatbubbleEllipses />
      </button> */}
      {/* <ScrollToTop /> */}
      <AnimatePresence>
        {/* {isOpen && ( */}
        <div className="fixed bottom-10 right-5 flex flex-col space-y-2 z-50">
          <motion.a
            className="size-14 rounded-full bg-[#25d366] hover:bg-[#075e54] text-white flex items-center justify-center cursor-pointer text-4xl shadow-neon-blue"
            // href={`https://wa.me/+966599371067?text=${encodeURIComponent(message)}`}
            href="https://wa.me/201155523348"
            target="_blank"
            initial={{ rotate: 0, y: 50 }}
            animate={{ rotate: 360, y: 0 }}
            exit={auth ? { rotate: 0, y: 100 } : { rotate: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            title={lang == "ar" ? "" : "whatsapp !"}
          >
            <FaWhatsapp />
          </motion.a>

          <motion.button
            className="size-14 rounded-full bg-[#7053a1] hover:bg-[#8c92e2] text-white flex items-center justify-center cursor-pointer text-2xl shadow-neon-blue"
            onClick={() => openChat("ai")}
            initial={{ rotate: 0, y: 50 }}
            animate={{ rotate: 360, y: 0 }}
            exit={{ rotate: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            title={lang == "ar" ? "" : "Chat with our AI bot !"}
          >
            <RiRobot2Fill />
          </motion.button>
        </div>
        {/* )} */}
      </AnimatePresence>

      {/* Chat Modal */}
      {isChatOpen && (
        <ChatModal
          mode={chatWith}
          toggleOptions={closeAll}
          showEnterQueue={showEnterQueue}
          setShowEnterQueue={setShowEnterQueue}
        />
      )}
    </div>
  );
}

export default ChatSupport;
