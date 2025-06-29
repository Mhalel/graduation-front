import DashBoard from "./pages/dashBoard/DashBoard";
import LandingPage from "./pages/landingPage/LandingPage";
import Layout from "@/components/layOut/LayOut";
import NoPage from "./pages/noFound/NoPage";
import Signin from "./pages/signIn/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signUp/SignUp";
// import PageTitleUpdater from "./PageTitleUpdater";
import Accounts from "./pages/dashBoard/accounts/Accounts";
import ChartPage from "./pages/dashBoard/ChartsPage/ChartPage";
import ProfilePage from "./pages/ProfilePage/Profile";
import { useAuth } from "./hooks/AuthContext";
import PricingPage from "./pages/PricingPage/PricingPage";
import ChatSupport from "./components/chatSupport/ChatSupport";
import { useEffect, useState } from "react";
import { MdSupportAgent } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import EComp from "./pages/EComponentsinfo/EComp";
import Controls from "./pages/dashBoard/ControlPage/Viewer3D";
import Messanger from "./pages/messenger/App";
import Numbers from "./pages/dashBoard/numbersPage/Numbers";
import { useSocket } from "./hooks/SensorReadings";
import axios from "axios";
import LongTermCharts from "./pages/dashBoard/LongTermCharts/LongTermCharts";
import Sittings from "./pages/dashBoard/Sittings/Sittings";
import ClickSpark from "./reactBits/ClickSpark";
import { useTheme } from "./hooks/themeprovider";
import Viewer3D from "./pages/dashBoard/ControlPage/Viewer3D";
import AiPrediction from "./pages/dashBoard/aiPrediction/AiPrediction";

function App() {
  const { auth } = useAuth();
  const { realTimeReading, readings, socket } = useSocket();
  const { isDark } = useTheme();
  const randBool = () => Math.random() > 0.5;

  // Random number in a specific range
  const randRange = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate random sensor data with your conditions
  const generateRandomData = () => {
    return {
      autoState: randBool(),
      dhFanState: randBool(),
      ccFanState: randBool(),
      acFanState: randBool(),
      pumpState: randBool(),
      ledState: randBool(),
      lux: randRange(101, 150), // greater than 100 but not increasing (fixed at 101)
      luxGoal: randRange(60, 100), // you didn't specify a range for this, so left as 0-100
      eTemp: randRange(10, 20).toString(), // no condition provided
      humidity: randRange(30, 60).toString(), // between 30 and 80
      pressure: randRange(1000, 1020).toFixed(2), // no condition provided
      cTemp: randRange(25, 35).toString(), // between 20 and 45
      s1Temp: randRange(10, 20).toString(), // less than 30
      s2Temp: randRange(10, 20).toString(), // less than 30
      s1Moisture: randRange(30, 40).toString(), // between 30 a40 80
      s2Moisture: randRange(30, 40).toString(), // between 30 a40 80
    };
  };

  // Send randomized data
  const ranmizeData = async () => {
    const data = generateRandomData();
    try {
      const res = await axios.post(
        "https://grad-back-production.up.railway.app/api/v1/readings/readings",
        // "http://localhost:7000/api/v1/readings/readings",
        data
      );
      console.log("✅ Sent at", new Date().toLocaleTimeString(), data);
    } catch (err) {
      console.error("❌ Failed to send data:", err.message);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     ranmizeData();
  //   }, 60 * 10); // كل دقيقة

  //   return () => clearInterval(interval); // تنظيف عند إزالة المكون
  // }, []);
  // useEffect(() => {
  //   console.log("realTimeReading", realTimeReading);
  // }, [realTimeReading]);
  return (
    <ClickSpark sparkColor={isDark ? "#ffff" : "#000000"}>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="comp" element={<EComp />} />
            {/* <Route path="Pricing" element={<PricingPage />} /> */}
            {!auth && (
              <>
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
              </>
            )}
            {/* {auth && <Route path="Profile/:id" element={<ProfilePage />} />} */}
            
          </Route>
          {auth && (
            <Route path="/dashboard" element={<DashBoard />}>
              <Route index element={<Navigate to="numbers" />} />
              <Route path="numbers" element={<Numbers />} />
              <Route path="charts" element={<ChartPage />} />
              <Route path="long-term-charts" element={<LongTermCharts />} />
              <Route path="sittings" element={<Sittings />} />
              {/* <Route path="account" element={<Accounts />} /> */}
              <Route path="Viewer3D" element={<Viewer3D />} />
              <Route path="Support" element={<Messanger />} />
              <Route path="Ai" element={<AiPrediction />} />
            </Route>
          )}
          <Route path="*" element={<NoPage />} />
        </Routes>
        <SupportPart />
      </div>
    </ClickSpark>
  );
}

const SupportPart = () => {
  const { auth } = useAuth();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  return (
    <>
      {auth && (
        <>
          {!isSupportOpen && (
            <button
              className="fixed bottom-10 bg-foreground text-background rounded-full right-5  flex-col space-y-2 z-50 
        size-14 flex items-center justify-center cursor-pointer text-4xl shadow-neon-blue"
              onClick={() => setIsSupportOpen(true)}
            >
              <MdSupportAgent />
            </button>
          )}
          {isSupportOpen && (
            <>
              <ChatSupport />
              <button
                onClick={() => setIsSupportOpen(false)}
                className="fixed bottom-0 text-foreground rounded-full right-7 flex-col z-20 
            flex items-center justify-center cursor-pointer text-4xl shadow-neon-blue"
              >
                <IoIosArrowDown />
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
