// src/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [readings, setReadings] = useState([]);
  const [worning, setWorning] = useState([]);
  const [realTimeReading, setRealTimeReading] = useState({
    autoState: false,
    dhFanState: false,
    ccFanState: false,
    acFanState: false,
    pumpState: false,
    ledState: false,
    lux: 0,
    luxGoal: 0,
    eTemp: 0,
    humidity: 0,
    pressure: 0,
    cTemp: 0,
    s1Temp: 0,
    s2Temp: 0,
    s1Moisture: 0,
    s2Moisture: 0,
  });
  const MAX_READINGS = 1000;
  const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

  // 🟡 Load readings from localStorage (once at first render)
  useEffect(() => {
    const saved = localStorage.getItem("sensor_readings");
    const wornings = localStorage.getItem("wornings");
    const parsed = JSON.parse(saved);
    const worningsparsed = JSON.parse(wornings);
    if (saved) {
      try {
        if (Array.isArray(parsed)) {
          setReadings(parsed);
        } else {
          console.warn("📛 Saved readings is not an array");
          setReadings([]);
        }
      } catch (err) {
        console.error("❌ Error parsing localStorage readings:", err);
        setReadings([]);
      }
    }
    if (wornings) {
      try {
        if (Array.isArray(worningsparsed)) {
          setWorning(worningsparsed); // ✅ الصح
        } else {
          console.warn("📛 Saved wornings is not an array");
          setWorning([]); // ✅ الصح
        }
      } catch (err) {
        console.error("❌ Error parsing localStorage wornings:", err);
        setWorning([]); // ✅ الصح
      }
    }
  }, []);

  // 🌐 Socket connection and handling new reading events
  useEffect(() => {
    const socketInstance = io(baseURL.replace("/api/v1", ""), {
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on("newReading", (data, alerts, callback) => {
      setRealTimeReading(data);
      setReadings((prev) => {
        const safePrev1 = Array.isArray(prev) ? prev : [];
        const updated1 = [...safePrev1, data];
        if (updated1.length > MAX_READINGS) {
          updated1.shift();
        }
        localStorage.setItem("sensor_readings", JSON.stringify(updated1));
        return updated1;
      });

      setWorning((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const updated = [...safePrev, ...alerts];
        if (updated.length > MAX_READINGS) {
          updated.shift();
        }
        localStorage.setItem("wornings", JSON.stringify(updated));
        return updated;
      });
      if (callback) callback("✅ Received on frontend");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        readings,
        realTimeReading,
        worning,
        setRealTimeReading,
        setReadings,
        setWorning,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
