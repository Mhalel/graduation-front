import { useLang } from "@/hooks/LangContext";
import { useTheme } from "@/hooks/themeprovider";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Custom Tooltip with dynamic keys
const CustomTooltip = ({ active, payload, label, tempKey, moistureKey }) => {
  if (active && payload && payload.length) {
    const temp = payload.find((p) => p.dataKey === tempKey)?.value;
    const moisture = payload.find((p) => p.dataKey === moistureKey)?.value;
    return (
      <div className="rounded-lg bg-gray-900 p-3 text-white">
        <div className="text-base font-semibold">
          🌡️ Temp: {temp}°C
          <br />
          💧 Moisture: {moisture}%
        </div>
        <div className="text-xs mt-1">🕓 {label}</div>
      </div>
    );
  }
  return null;
};

// ✅ Dot for temperature
const TemperatureDot = ({ cx, cy, value }) => {
  if (cx == null || cy == null) return null;
  let fillColor = "#00FF00";
  if (value < 10) fillColor = "#00BFFF";
  else if (value < 25) fillColor = "#00FF00";
  else if (value < 35) fillColor = "#FFA500";
  else fillColor = "#FF0000";
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={fillColor}
      stroke="#fff"
      strokeWidth={1}
    />
  );
};

// ✅ Dot for moisture
const HumidityDot = ({ cx, cy, value }) => {
  if (cx == null || cy == null) return null;
  let fillColor = "#FF0000";
  if (value >= 30 && value < 40) fillColor = "#FFA500";
  else if (value >= 40 && value <= 70) fillColor = "#00FF00";
  else if (value > 70 && value <= 80) fillColor = "#FFA500";
  else if (value > 80) fillColor = "#FF0000";
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={fillColor}
      stroke="#000"
      strokeWidth={1}
    />
  );
};

// ✅ Main Chart Component
const LineChartWithTemperatureAndHumidity = ({ title, planit1Data }) => {
  const { isDark } = useTheme();
  const { lang } = useLang();
  const [swiper, setSwiper] = useState(planit1Data.length - 1);
  const [day, setDay] = useState(planit1Data[planit1Data.length - 1] || []);
  const [activeIndex, setActiveIndex] = useState(null);

  // 🧠 Dynamically detect keys
  const temp = Object.keys(day[0] || {}).find((k) => k !== "time") || "temp";
  const moisture =
    Object.keys(day[0] || {}).find((k) => k !== "time" && k !== temp) ||
    "moisture";

  useEffect(() => {
    setDay(planit1Data[swiper] || []);
  }, [swiper, planit1Data]);

  return (
    <div
      style={{ width: "100%", height: "300px" }}
      className={`relative ${
        isDark ? "bg-gray-900" : "bg-[rgba(229,229,229,0.23)]"
      } rounded-lg p-4`}
    >
      <div className="flex gap-20 mb-2 justify-center text-white">
        <button
          className="px-2 py-1 bg-gray-700 rounded"
          onClick={() => setSwiper((prev) => Math.max(prev - 1, 0))}
        >
          ⬅ {lang === "ar" ? "السابق" : "Prev"}
        </button>
        <span className="text-sm font-medium">
          {lang === "ar"
            ? `اليوم ${swiper + 1} من ${planit1Data.length}`
            : `Day ${swiper + 1} of ${planit1Data.length}`}
        </span>
        <button
          className="px-2 py-1 bg-gray-700 rounded"
          onClick={() =>
            setSwiper((prev) => Math.min(prev + 1, planit1Data.length - 1))
          }
        >
          {lang === "ar" ? "التالي" : "Next"} ➡
        </button>
      </div>

      <ResponsiveContainer>
        <LineChart
          data={day}
          margin={{ top: 20, right: 10, left: -15, bottom: 20 }}
          onMouseMove={(e) => setActiveIndex(e?.activeTooltipIndex ?? null)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="tempLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B68EE" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#7B68EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="moistureLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid horizontal vertical={false} strokeOpacity={0.1} />
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#ccc" }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#ccc" }}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} tempKey={temp} moistureKey={moisture} />
            )}
            cursor={false}
          />

          <Line
            type="monotone"
            dataKey={temp}
            name="Temperature (°C)"
            stroke="#7B68EE"
            strokeWidth={2}
            dot={<TemperatureDot />}
            activeDot={{
              r: 6,
              stroke: "#fff",
              fill: "#7B68EE",
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey={moisture}
            name="Humidity (%)"
            stroke="#FF6B6B"
            strokeWidth={2}
            dot={<HumidityDot />}
            activeDot={{
              r: 6,
              stroke: "#fff",
              fill: "#FF6B6B",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex flex-col items-center gap-2 mt-4 text-sm text-white">
        <h4 className="font-semibold">{title}</h4>
      </div>
    </div>
  );
};

export default LineChartWithTemperatureAndHumidity;
