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
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const lux = payload.find((p) => p.dataKey === "lux")?.value;
    const luxGoal = payload.find((p) => p.dataKey === "luxGoal")?.value;
    const time = payload[0]?.payload?.time;

    return (
      <div className="p-2 rounded shadow bg-white border border-gray-300">
        <p className="text-sm font-bold text-blue-600">Lux: {lux} lux</p>
        <p className="text-sm font-bold text-purple-600">Goal: {luxGoal}%</p>
        <p className="text-xs text-gray-500 mb-1">{time}</p>
      </div>
    );
  }
  return null;
};

const LightChart = ({ chartDetails, data = [] }) => {
  const { isDark } = useTheme();
  const { lang } = useLang();
  const [swiper, setSwiper] = useState(data.length - 1);
  const [dayofParChart, setDayofParChart] = useState([]);
  const keyName1 = "lux";
  const keyName2 = "luxGoal";

  useEffect(() => {
    if (data.length > 0) {
      const currentDay = data[swiper] || [];

      const filtered = currentDay
        .filter((e) => e[keyName1])
        .map((e) => ({
          [keyName1]: e[keyName1],
          [keyName2]: e[keyName2],
          time: e["time"],
        }));

      setDayofParChart(filtered);
    }
  }, [data, swiper]);

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
        Light Intensity vs Goal
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dayofParChart} margin={20} barSize={10}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 14,
              dy: 10,
              fill: "#3B3F5C",
            }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#535862",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) =>
              value === "lux" ? "Lux (lux)" : "Lux Goal (%)"
            }
          />
          <CartesianGrid stroke="#e0e0e062" vertical={false} />
          <Bar
            dataKey={keyName1}
            name="lux"
            fill="#3B82F6"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey={keyName2}
            name="luxGoal"
            fill="#A78BFA"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LightChart;
