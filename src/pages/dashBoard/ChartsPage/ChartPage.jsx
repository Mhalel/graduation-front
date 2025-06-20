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
import { Fragment } from "react";
// import { createRoot } from "react-dom/client";
import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";
import React, { useEffect, useState } from "react";
// import * as echarts from "echarts";
import { useSocket } from "@/hooks/SensorReadings";
import GaugeComponent from "react-gauge-component";
// import axios from "axios";
import { useLang, useT } from "@/hooks/LangContext";

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

  // Random boolean
  // Send every 10 seconds

  // Send every 10 seconds

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
      <section>
        <h1>{T("مخططات الطقس", "weather Charts")}</h1>
        <div className=""></div>
        <div className="grid md:grid-cols-2 grid-cols-1 p-5 gap-20  lg:grid-cols-3   ">
          <aside className="">
            <TempratureChart value={eTemp} title={T("الطقس", "Temprature")} />
          </aside>
          <aside className="">
            <HumidityChart value={humidity} title={T("الرطوبه", "humedity")} />
          </aside>
          <aside className="">
            <PresureChart
              value={pressure}
              title={T("الضغط الجوي", "pressure")}
            />
          </aside>
        </div>
      </section>
      <section>
        <h1>{T("النباتات", "plants1")}</h1>
        <div className=""></div>
        <div className="grid md:grid-cols-2 grid-cols-1 p-5 gap-20  lg:grid-cols-3   ">
          <aside className="">
            <TempratureChart
              value={s1Temp}
              title={T("درجه الحراره", "Temprature")}
              unit={"ºC"}
            />
          </aside>
          <aside className="">
            <TempratureChart
              value={s1Moisture}
              title={T("رطوبه التربه", "Moisture")}
              unit={"%"}
            />
          </aside>
        </div>
      </section>
      <section>
        <h1>{T("النباتات", "plants2")}</h1>
        <div className=""></div>
        <div className="grid md:grid-cols-2 grid-cols-1 p-5 gap-20  lg:grid-cols-3   ">
          <aside className="">
            <TempratureChart
              value={s2Temp}
              title={T("درجه الحراره", "Temprature")}
              unit={"ºC"}
            />
          </aside>
          <aside className="">
            <TempratureChart
              value={s2Moisture}
              title={T("رطوبه التربه", "Moisture")}
              unit={"%"}
            />
          </aside>
        </div>
      </section>
      <section>
        <MCUtemp
          cTemp={cTemp}
          text={lang === "ar" ? "درجه حراره المعالج" : "MCU temprature"}
        />
      </section>
    </div>
  );
}

const TempratureChart = ({ title = "", value = 0, unit = "ºC" }) => {
  return (
    <div className="">
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 0.1,
          // gradient: true,
          subArcs: [
            {
              limit: 15,
              color: "#EA4228",
              showTick: true,
              tooltip: {
                text: "Too low temperature!",
              },
              onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              onMouseMove: () =>
                console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              onMouseLeave: () =>
                console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
            },
            {
              limit: 17,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
              },
            },
            {
              limit: 28,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 30,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "High temperature!",
              },
            },
            {
              color: "#EA4228",
              tooltip: {
                text: "Too high temperature!",
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
            ticks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
          },
        }}
        value={value}
        minValue={10}
        maxValue={35}
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
              limit: 20,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 40,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
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

// import  {AgChartsReact}  from "ag-charts-react";
// import "ag-charts-enterprise";

// const Ctemp = ({ cTemp }) => {
//   const [options, setOptions] = useState({
//     data: [{ value: cTemp }],
//     series: [
//       {
//         type: "radial-gauge",
//         angleExtent: 270,
//         valueKey: "value",
//         cornerRadius: 99,
//         cornerMode: "container",
//       },
//     ],
//     axes: [
//       {
//         type: "radial-number",
//         position: "bottom",
//         min: 0,
//         max: 100,
//       },
//     ],
//     background: {
//       fill: "transparent",
//     },
//   });

//   useEffect(() => {
//     setOptions((prev) => ({
//       ...prev,
//       data: [{ value: cTemp }],
//     }));
//   }, [cTemp]);

//   return (
//     <Fragment>
//       <div className="w-fit h-fit">
//         <AgChartsReact options={options} />
//       </div>
//     </Fragment>
//   );
// };

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
            limit: 30,
            color: "#5BE12C", // أخضر: آمن
            showTick: true,
          },
          {
            limit: 50,
            color: "#F5CD19", // أصفر: تحذير
            showTick: true,
          },
          {
            limit: 75,
            color: "#EA4228", // أحمر: خطر
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
