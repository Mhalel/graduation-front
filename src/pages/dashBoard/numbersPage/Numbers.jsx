import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, Gauge, Lightbulb, Fan } from "lucide-react";
import { useTheme } from "@/hooks/themeprovider";
import { useSocket } from "@/hooks/SensorReadings";
import { Card } from "./Cards";
import { useT } from "@/hooks/LangContext";
// import MqttSender from "@/pages/mqttTest/mqtt";

const defaultReading = {
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
};

const isDefaultReading = (reading) => {
  return Object.entries(defaultReading).every(
    ([key, val]) => reading[key] === val
  );
};

const Numbers = () => {
  const { isDark } = useTheme();
  const { realTimeReading } = useSocket();
  const T = useT();
  const [lastReading, setLastReading] = useState(defaultReading);

  useEffect(() => {
    const localData = JSON.parse(
      localStorage.getItem("sensor_readings") || "[]"
    );
    const lastLocal = localData.length ? localData[localData.length - 1] : null;

    if (!isDefaultReading(realTimeReading)) {
      setLastReading(realTimeReading);
    } else if (lastLocal) {
      setLastReading(lastLocal);
    } else {
      setLastReading(defaultReading);
    }
  }, [realTimeReading]);
  // console.log("lastReading", lastReading);
  const {
    autoState,
    dhFanState,
    ccFanState,
    acFanState,
    pumpState,
    ledState,
    lux,
    luxGoal,
    eTemp,
    humidity,
    pressure,
    cTemp,
    s1Temp,
    s2Temp,
    s1Moisture,
    s2Moisture,
  } = lastReading;

  const statsData = [
    { icon: Thermometer, label: "Temperature", value: eTemp, unit: "°C" },
    { icon: Droplets, label: "Humidity", value: humidity, unit: "%" },
    { icon: Gauge, label: "Pressure", value: pressure, unit: "hPa" },
    { icon: Thermometer, label: "MCU Temp", value: cTemp, unit: "°C" },
  ];

  const monitorData = [
    {
      title: "Plant 1",
      metrics: [
        { label: "Temp", value: s1Temp, unit: "°C" },
        { label: "Moisture", value: s1Moisture, unit: "%" },
      ],
    },
    {
      title: "Illuminance",
      metrics: [
        { label: "Lux", value: lux, unit: "lx" },
        { label: "Daily Goal", value: luxGoal, unit: "%" },
      ],
    },
    {
      title: "Plant 2",
      metrics: [
        { label: "Temp", value: s2Temp, unit: "°C" },
        { label: "Moisture", value: s2Moisture, unit: "%" },
      ],
    },
  ];

  const controlData = [
    { isActive: dhFanState, icon: Fan, label: "Dehumidifying Fan" },
    { isActive: acFanState, icon: Fan, label: "Air Conditioning Fan" },
    { isActive: ccFanState, icon: Fan, label: "Controller Cooling Fan" },
    { isActive: pumpState, icon: Droplets, label: "Water Pump" },
    { isActive: ledState, icon: Lightbulb, label: "LED Lights" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? " text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-center flex-1">
            {T("لوحة معلومات الدفيئة الذكية", "Smart Greenhouse Dashboard")}
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} type="stat" data={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {monitorData.map((monitor, index) => (
            <Card isDark={isDark} key={index} type="monitor" data={monitor} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {controlData.slice(0, 3).map((control, index) => (
            <Card
              isDark={isDark}
              key={index}
              type="control"
              data={control}
              isActive={control.isActive}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {controlData.slice(3, 5).map((control, index) => (
            <Card
              isDark={isDark}
              key={index + 3}
              type="control"
              data={control}
              isActive={control.isActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
