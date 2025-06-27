import * as echarts from "echarts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";
import { Fragment, useRef } from "react";
// import { createRoot } from "react-dom/client";
import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";
import React, { useEffect, useState } from "react";
// import * as echarts from "echarts";
import { useSocket } from "@/hooks/SensorReadings";
import GaugeComponent from "react-gauge-component";
// import axios from "axios";
import { useLang, useT } from "@/hooks/LangContext";
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

export default function ChartPage() {
  const { lang } = useLang();
  const T = useT();
  const { realTimeReading } = useSocket();

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

  const {
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

  // const statsData = [
  //   { icon: Thermometer, label: "Temperature", value: eTemp, unit: "°C" },
  //   { icon: Droplets, label: "Humidity", value: humidity, unit: "%" },
  //   { icon: Gauge, label: "Pressure", value: pressure, unit: "hPa" },
  //   { icon: Thermometer, label: "MCU Temp", value: cTemp, unit: "°C" },
  // ];

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

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="p-5">
      {/* <MqttSender /> */}
      <div className="flex flex-wrap justify-center items-center  p-5 gap-20 ">
        <aside className="">
          <TempratureChart range = {[0, 10, 20, 25, 30, 40]} value={eTemp} title={T("الطقس", "Temprature ")} />
        </aside>
        <aside className="">
          <HumidityChart value={humidity} title={T("الرطوبه", "humedity")} />
        </aside>
        <aside className="">
          <PresureChart value={pressure} title={T("الضغط الجوي", "pressure")} />
        </aside>
        <aside className="">
          <TempratureChart
            value={cTemp}
            range={[0, 10, 30.5, 45, 65]}
            title={lang === "ar" ? "درجه حراره المعالج" : "MCU temprature"}
          />
        </aside>
        <aside className="">
          <TempratureChart
            value={s1Temp}
            range={[0, 10, 18, 24, 30]}
            title={T(" درجه الحراره التربه الاولي", "Temprature in planet1")}
            unit={"ºC"}
          />
        </aside>
        <aside className="">
          <TempratureChart
            value={s1Moisture}
            range={[0, 20, 35, 60, 80]}
            title={T("رطوبه التربه الاولي", "Moisture in planet1")}
            unit={"%"}
          />
        </aside>

        <aside className="">
          <TempratureChart
            range={[0, 10, 18, 24, 30]}
            value={s2Temp}
            title={T("ال درجه الحراره التربه الاولي", "Temprature in planet2")}
            unit={"ºC"}
          />
        </aside>
        <aside className="">
          <TempratureChart
            range={[0, 20, 35, 60, 80]}
            value={s2Moisture}
            title={T("رطوبه التربه التربه الاولي", "Moisture in planet2")}
            unit={"%"}
          />
        </aside>
      </div>
    </div>
  );
}

const TempratureChart = ({
  range = [0, 10, 30.5, 45, 65], // [min, startOptimal, endOptimal, startHigh, startCritical]
  title = "",
  value = 0,
  unit = "ºC",
}) => {
  return (
    <div className="">
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 0.1,
          gradient: true,
          subArcs: [
            {
              limit: range[1],
              color: "#5BE12C", // أزرق فاتح: بارد جدًا
              showTick: true,
              tooltip: {
                text: "Too cold!",
              },
            },
            {
              limit: range[2],
              color: "#5BE12C", // أخضر: معتدل
              showTick: true,
              tooltip: {
                text: "Optimal temperature",
              },
            },
            {
              limit: range[3],
              color: "#F5CD19", // أصفر: حرارة مرتفعة
              showTick: true,
              tooltip: {
                text: "High temperature!",
              },
            },
            {
              limit: range[4],
              color: "#FF4C4C", // أحمر فاتح: خطر شديد
              showTick: true,
              tooltip: {
                text: "Critical temperature!",
              },
            },
          ],
        }}
        pointer={{
          color: "#345243",
          length: 0.8,
          width: 15,
          elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: (value) => value + unit },
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value) => value + unit,
              style: { fontSize: 10 },
            },
            ticks: [
              { value: range[1] },
              { value: range[2] },
              { value: range[3] },
              { value: range[4] },
            ],
          },
        }}
        value={value}
        minValue={range[0]}
        maxValue={range[4]}
      />
      <div className="text-center">{title}</div>
    </div>
  );
};

const HumidityChart = ({ title = "", value = 0 }) => {
  return (
    <div className="">
      <GaugeComponent
        arc={{
          subArcs: [
            {
              limit: 30,
              color: "#66CCFF", // أزرق: ممتاز جدًا (0-30%)
              showTick: true,
            },
            {
              limit: 55,
              color: "#5BE12C", // أخضر: آمن (30-45%)
              showTick: true,
            },
            {
              limit: 70,
              color: "#F5CD19", // أصفر: بداية الخطر (45-60%)
              showTick: true,
            },
            {
              limit: 80,
              color: "#FF8C00", // برتقالي: خطر مرتفع (60-70%)
              showTick: true,
            },
            {
              limit: 90,
              color: "#FF4C4C", // أحمر: خطر شديد جدًا (70-80%)
              showTick: true,
            },
          ],
        }}
        value={value}
      />
      <div className="text-center">{title}</div>
    </div>
  );
};
const PresureChart = ({ title = "الضغط الجوي", value = 0 }) => {
  const formatPressure = (val) => `${val.toFixed(0)} hPa`;

  return (
    <div className="">
      <GaugeComponent
        minValue={0} // نسيبها 0 علشان المكتبة ما تكسرش
        maxValue={1200} // نرفع الماكس شوية علشان ما يبقاش الرسم مضغوط
        value={value}
        arc={{
          nbSubArcs: 3,
          colorArray: ["#EA4228", "#F5CD19", "#5BE12C"],
          width: 0.3,
          padding: 0.003,
        }}
        labels={{
          valueLabel: {
            style: { fontSize: 40 },
            formatTextValue: formatPressure,
          },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 900 },
              { value: 950 },
              { value: 1000 },
              { value: 1050 },
              { value: 1100 },
            ],
            defaultTickValueConfig: {
              formatTextValue: formatPressure,
            },
          },
        }}
      />
      <div className="text-center text-lg mt-2 font-medium">{title}</div>
    </div>
  );
};

const MCUtemp = ({ cTemp = 100, text }) => (
  <div>
    <GaugeComponent
      id="gauge-component4"
      value={cTemp} // يمكن تغييره حسب القيمة الحية
      arc={{
        gradient: true,
        width: 0.25, // ← زودنا عرض الـ outer arc
        padding: 0,
        subArcs: [
          {
            limit: 20,
            color: "#5BE12C", // أخضر: آمن
            showTick: true,
          },
          {
            limit: 35,
            color: "#F5CD19", // أصفر: تحذير
            showTick: true,
          },
          {
            limit: 45,
            color: "#FF8C00", // أحمر: خطر
            showTick: true,
          },
          {
            limit: 55,
            color: "#990000", // أحمر: خطر
            showTick: true,
          },
        ],
      }}
      pointer={{
        type: "arrow", // ← المؤشر بشكل سهم
        elastic: true,
      }}
      valueText={({ value }) => `${value}°C`}
    />

    <p>{text}</p>
  </div>
);
