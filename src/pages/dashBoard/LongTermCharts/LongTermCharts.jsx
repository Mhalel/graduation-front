import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/hooks/SensorReadings";
import { useLang, useT } from "@/hooks/LangContext";
import { useTheme } from "@/hooks/themeprovider";
import LineChartWithTemperatureAndHumidity from "./Charts/LineChart";
import CustomBarChart from "./Charts/CustomBarChart";
import LightChart from "./Charts/LightChart";

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
export default function LongTermCharts() {
  const { lang } = useLang();
  const T = useT();
  const { readings } = useSocket();
  // console.log("readings", readings);

  const sortedReadings = [...readings].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="p-5">
      <section>
        <div className="p-5 gap-20 justify-center items-center flex flex-wrap flex-row">
          <span className="w-fit h-fit">
            <LineChartWithTemperatureAndHumidity
              title={lang === "ar" ? "النبته الاولي " : "the first planet"}
              planit1Data={Formatter(["s1Temp", "s1Moisture"], sortedReadings)}
            />
          </span>
          <span className="w-fit h-fit">
            <LineChartWithTemperatureAndHumidity
              title={lang === "ar" ? "النبته الثانيه " : "the second planet"}
              planit1Data={Formatter(["s2Temp", "s2Moisture"], sortedReadings)}
            />
          </span>
          <span className="w-fit h-fit">
            <LineChartWithTemperatureAndHumidity
              title={lang === "ar" ? "قرائات التقس" : "wether readings"}
              planit1Data={Formatter(["eTemp", "humidity"], sortedReadings)}
            />
          </span>
          <span className="w-fit h-fit">
            <CustomBarChart
              title={lang === "ar" ? "النبته الثانيه " : "the second planet"}
              data={Formatter(["cTemp"], sortedReadings)}
            />
          </span>
          <span className="w-fit h-fit">
            <LightChart
              title={lang === "ar" ? "النبته الثانيه " : "the second planet"}
              data={Formatter(["lux","luxGoal"], sortedReadings)}
            />
          </span>
        </div>
      </section>
    </div>
  );
}

const Formatter = (values = [], sortedReadings) => {
  const chunkSize = 12;
  const result = [];

  sortedReadings.forEach((reading) => {
    const dataPoint = {
      [values[0]]: reading[values[0]],
      [values[1]]: reading[values[1]],
      time: new Date(reading.createdAt).toLocaleTimeString(),
    };
    if (result.length === 0 || result[result.length - 1].length === chunkSize) {
      result.push([dataPoint]);
    } else {
      result[result.length - 1].push(dataPoint);
    }
  });

  return result;
};

// ✅ Tooltip مخصص
