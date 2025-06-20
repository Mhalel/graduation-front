import { useLang } from "@/hooks/LangContext";
import { useTheme } from "@/hooks/themeprovider";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const time = payload[0]?.payload?.time;

    let status = "🟢 Safe";
    let color = "text-green-600";

    if (value >= 60) {
      status = "🔴 Danger";
      color = "text-red-600";
    } else if (value >= 40) {
      status = "🟠 High";
      color = "text-orange-500";
    }

    return (
      <div className={`p-2 rounded shadow bg-white border ${color}`}>
        <p className="text-sm font-bold">Temp: {value}°C</p>
        <p className={`text-xs ${color}`}>{status}</p>
        <p className="text-xs text-gray-500 mb-1">{time}</p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ chartDetails, data = [] }) => {
  const { isDark } = useTheme();
  const { lang } = useLang();
  const [swiper, setSwiper] = useState(data.length - 1);
  const [day, setDay] = useState(data[data.length - 1] || []);
  const [dayofParChart, setDayofParChart] = useState([]);
  const [hasDangerTemp, setHasDangerTemp] = useState(false);
  const keyName = "cTemp";

  useEffect(() => {
    if (data.length > 0) {
      const currentDay = data[swiper] || [];

      const filtered = currentDay
        .filter((e) => e[keyName])
        .map((e) => ({ [keyName]: e[keyName], time: e["time"] }));

      setDay(currentDay);
      setDayofParChart(filtered);
      setHasDangerTemp(filtered.some((e) => e[keyName] >= 60));
    }
  }, [data, swiper]); // 👈 مهم جدًا مراقبة data نفسها

  // useEffect(() => {
  //   console.log("dayofParChart", dayofParChart);
  // }, [dayofParChart]);
  return (
    <div className="flex flex-col gap-[6px] rounded-[8px] px-[24px] py-[12px] shadow-md">
      <div className="flex gap-20 mb-2 justify-center text-white">
        <button
          className="px-2 py-1 bg-gray-700 rounded"
          onClick={() => setSwiper((prev) => Math.max(prev - 1, 0))}
        >
          ⬅ {lang === "ar" ? "السابق" : "Prev"}
        </button>
        <span className="text-sm font-medium">
          {lang === "ar"
            ? `اليوم ${swiper + 1} من ${data.length}`
            : `Day ${swiper + 1} of ${data.length}`}
        </span>
        <button
          className="px-2 py-1 bg-gray-700 rounded"
          onClick={() =>
            setSwiper((prev) => Math.min(prev + 1, data.length - 1))
          }
        >
          {lang === "ar" ? "التالي" : "Next"} ➡
        </button>
      </div>

      <p className="text-center text-[20px] font-bold text-[#0E1726]">
        MCU Temperature (ESP)
      </p>

      {hasDangerTemp && (
        <div className="text-red-600 text-sm text-center font-semibold">
          {lang === "ar"
            ? "⚠ درجة الحرارة تعدت الحد الآمن!"
            : "⚠ Temperature exceeds safe limit!"}
        </div>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dayofParChart} margin={20} barSize={10}>
          <XAxis
            dataKey={"time"}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 16,
              dy: 15,
              fill: "#3B3F5C",
            }}
          />
          <YAxis
            domain={[20, 100]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#535862",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#e0e0e062" vertical={false} />
          <Bar dataKey={keyName} radius={[10, 10, 0, 0]}>
            {dayofParChart.map((entry, index) => {
              const value = entry[keyName];
              let fill = "#00FF00"; // Green
              if (value >= 60) fill = "#FF4C4C"; // Red
              else if (value >= 40) fill = "#FFA500"; // Orange
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
