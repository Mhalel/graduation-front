import DashBoard from "./pages/dashBoard/DashBoard";
import LandingPage from "./pages/landingPage/LandingPage";
import Layout from "@/components/layOut/LayOut";
import NoPage from "./pages/noFound/NoPage";
import Signin from "./pages/signIn/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signUp/SignUp";
import PageTitleUpdater from "./PageTitleUpdater";
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
import Controls from "./pages/dashBoard/ControlPage/Controls";
import Messanger from "./pages/messenger/App";
import Numbers from "./pages/dashBoard/numbersPage/Numbers";
import { useSocket } from "./hooks/SensorReadings";
import axios from "axios";
import LongTermCharts from "./pages/dashBoard/LongTermCharts/LongTermCharts";
import Sittings from "./pages/dashBoard/Sittings/Sittings";

function App() {
  const { auth } = useAuth();
  const { realTimeReading, readings, socket } = useSocket();
  const randBool = () => Math.random() > 0.5;

  // Random number from 0 to 100
  const randValue = () => Math.floor(Math.random() * 101);

  // Generate random sensor data
  const generateRandomData = () => {
    return {
      autoState: randBool(),
      dhFanState: randBool(),
      ccFanState: randBool(),
      acFanState: randBool(),
      pumpState: randBool(),
      ledState: randBool(),
      lux: randValue(),
      luxGoal: randValue(),
      eTemp: randValue().toString(),
      humidity: randValue().toString(),
      pressure: randValue().toFixed(2),
      cTemp: randValue().toString(),
      s1Temp: randValue().toString(),
      s2Temp: randValue().toString(),
      s1Moisture: randValue().toString(),
      s2Moisture: randValue().toString(),
    };
  };

  // Send randomized data
  const ranmizeData = async () => {
    const data = generateRandomData();
    try {
      const res = await axios.post(
        // "https://grad-back-production.up.railway.app/api/v1/readings/readings",
        "http://localhost:7000/api/v1/readings/readings",
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
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="comp" element={<EComp />} />
          <Route path="Pricing" element={<PricingPage />} />
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
            <Route path="account" element={<Accounts />} />
            <Route path="control" element={<Controls />} />
            <Route path="Support" element={<Messanger />} />
          </Route>
        )}
        <Route path="*" element={<NoPage />} />
      </Routes>
      <SupportPart />
    </div>
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
