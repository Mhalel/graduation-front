import { useSocket } from "@/hooks/SensorReadings";
import { useLang, useT } from "@/hooks/LangContext";
import LineChartWithTemperatureAndHumidity from "./Charts/LineChart";
import CustomBarChart from "./Charts/CustomBarChart";
import LightChart from "./Charts/LightChart";
import { useEffect } from "react";

export default function LongTermCharts() {
  const { lang } = useLang();
  // const T = useT();
  const { readings } = useSocket();
  const sortedReadings = [...readings].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  useEffect(()=>{
    console.log("readings",readings)
  },[readings])
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
              data={Formatter(["lux", "luxGoal"], sortedReadings)}
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

  const filteredReadings = [];
  let lastAcceptedTime = null;

  sortedReadings.forEach((reading) => {
    const currentTime = new Date(reading.createdAt);

    if (
      !lastAcceptedTime ||
      currentTime - lastAcceptedTime >= 2 * 60 * 60 * 1000 // 30 دقيقة بالميلي ثانية
    ) {
      filteredReadings.push(reading);
      lastAcceptedTime = currentTime;
    }
  });

  filteredReadings.forEach((reading) => {
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
