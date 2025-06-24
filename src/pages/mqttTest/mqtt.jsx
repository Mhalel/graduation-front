// src/components/MqttSender.jsx
import React from "react";
import mqtt from "mqtt";

const MqttSender = () => {
  const sendReading = () => {
    // إعداد الاتصال
    const options = {
      username: "ahmed", 
      password: "Ahmed@0972422052",
      connectTimeout: 4000,
      clientId: "frontend-" + Math.random().toString(16).substring(2, 8),
    };

    
    const broker =
      "wss://763f438f67a34a28a4be4a7a97ee7167.s1.eu.hivemq.cloud:8884/mqtt";

    const client = mqtt.connect(broker, options);

    client.on("connect", () => {
      console.log("✅ Connected to HiveMQ");

      const topic = "greenhouse/readings"; // نفس التوبك في .env

      const payload = JSON.stringify({
        autoState: true,
        dhFanState: true,
        ccFanState: true,
        acFanState: true,
        pumpState: true,
        ledState: true,
        lux: 100000000000,
        luxGoal: 100000000000,
        eTemp: 100000000000,
        humidity: 100000000000,
        pressure: 100000000000,
        cTemp: 100000000000,
        s1Temp: 100000000000,
        s2Temp: 100000000000,
        s1Moisture: 100000000000,
        s2Moisture: 100000000000,
      });

      client.publish(topic, payload, (err) => {
        if (err) {
          console.error("❌ Error publishing:", err.message);
        } else {
          console.log("📤 Sent:", payload);
        }
        client.end();
      });
    });

    client.on("error", (err) => {
      console.error("❌ MQTT Connection Error:", err.message);
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={sendReading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow"
      >
        Send MQTT Reading
      </button>
    </div>
  );
};

export default MqttSender;
