/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import {
  CircleCheckBig,
  Dot,
  Plus,
  Send,
  FileText,
  FilePlus,
  CheckCircle,
  XCircle,
  Eye,
  Zap,
  CircleUser,
  MapPin,
  Droplet,
  Sun,
  AlertCircle,
  Leaf,
} from "lucide-react";
import { useLang } from "../hooks/LangContext";
import { useSocket } from "@/hooks/SensorReadings";

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="flex w-full flex-col items-center justify-start gap-y-3 px-1 py-2">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex w-full animate-pulse flex-col gap-2 rounded-md bg-slate-100 p-2"
      >
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-gray-300"></div>
          <div className="h-4 w-2/3 rounded bg-gray-300"></div>
        </div>
        <div className="h-3 w-full rounded bg-gray-200"></div>
        <div className="h-3 w-3/4 rounded bg-gray-200"></div>
      </div>
    ))}
  </div>
);

// Determine icon name based on alert type
const getWarningIconName = (type) => {
  if (type.includes("حرارة المعالج") || type.includes("Processor temperature"))
    return "zap";
  if (
    type.includes("رطوبة") &&
    (type.includes("منخفضة") || type.includes("مرتفعة"))
  )
    return "droplet";
  if (type.includes("الإضاءة") || type.includes("light")) return "sun";
  if (
    type.includes("حرارة التربة 1") ||
    type.includes("حرارة التربة 2") ||
    type.includes("Soil 1 temperature") ||
    type.includes("Soil 2 temperature")
  )
    return "leaf";
  return "alert-circle";
};

// Determine icon color based on icon name
const getIconColor = (iconName) => {
  switch (iconName) {
    case "zap":
      return "#ef4444"; // أحمر - حرارة
    case "droplet":
      return "#3b82f6"; // أزرق - رطوبة
    case "sun":
      return "#f59e0b"; // برتقالي - إضاءة
    case "leaf":
      return "#10b981"; // أخضر - تربة
    case "alert-circle":
    default:
      return "#6b7280"; // رمادي - تحذير عام
  }
};

// Icon component
const DynamicIcon = ({ iconName, size, color }) => {
  switch (iconName) {
    case "plus":
      return <Plus size={size || 16} color={color} />;
    case "dot":
      return <Dot size={size || 16} color={color} />;
    case "circle-check-big":
      return <CircleCheckBig size={size || 16} color={color} />;
    case "send":
      return <Send size={size || 16} color={color} />;
    case "file-plus":
      return <FilePlus size={size || 16} color={color} />;
    case "file-text":
      return <FileText size={size || 16} color={color} />;
    case "circle-check":
      return <CheckCircle size={size || 16} color={color} />;
    case "x-circle":
      return <XCircle size={size || 16} color={color} />;
    case "eye":
      return <Eye size={size || 16} color={color} />;
    case "zap":
      return <Zap size={size || 16} color={color} />;
    case "circle-user":
      return <CircleUser size={size || 16} color={color} />;
    case "developer-land":
      return <MapPin size={size || 16} color={color} />;
    case "droplet":
      return <Droplet size={size || 16} color={color} />;
    case "sun":
      return <Sun size={size || 16} color={color} />;
    case "alert-circle":
      return <AlertCircle size={size || 16} color={color} />;
    case "leaf":
      return <Leaf size={size || 16} color={color} />;
    default:
      return <Dot size={size || 16} color={color} />;
  }
};

// Format date nicely
const formatDate = (dateString, lang) => {
  const date = parseISO(dateString);
  const now = new Date();
  const diffHours = (now - date) / (1000 * 60 * 60);
  const locale = lang === "ar" ? ar : enUS;
  return diffHours < 48
    ? formatDistanceToNow(date, { addSuffix: true, locale })
    : format(date, "yyyy-MM-dd HH:mm", { locale });
};

export default function WarningsList() {
  const { lang } = useLang();
  const { worning } = useSocket();
  const containerRef = useRef(null);
  const [visibleWarnings, setVisibleWarnings] = useState([]);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const PAGE_SIZE = 50;

  // أول تحميل
  useEffect(() => {
    if (worning.length > 0) {
      setVisibleWarnings(worning.slice(-PAGE_SIZE));
      setIndex(1);
      setIsInitialLoad(true);
    }
  }, [worning]);

  // scroll لأسفل فقط أول مرة
  useEffect(() => {
    if (containerRef.current && isInitialLoad) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      setIsInitialLoad(false);
    }
  }, [visibleWarnings, isInitialLoad]);

  // تحميل تحذيرات أقدم عند السحب لأعلى
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop } = containerRef.current;
    if (scrollTop < 100 && worning.length > PAGE_SIZE * index && !isLoading) {
      setIsLoading(true);
      const nextIndex = index + 1;
      setTimeout(() => {
        const newItems = worning.slice(-(PAGE_SIZE * nextIndex));
        setVisibleWarnings(newItems);
        setIndex(nextIndex);
        setIsLoading(false);
      }, 600); // تأخير بسيط لمحاكاة التحميل
    }
  }, [index, worning, isLoading]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="flex h-[60vh] w-[500px] flex-col gap-2 overflow-y-auto rounded-xl bg-white p-3 shadow-2xl"
    >
      <h2 className="text-xl font-bold text-[#9a9dfe]">
        {lang === "ar" ? "التحذيرات" : "Warnings"}
      </h2>

      {isLoading && <SkeletonLoader />}

      {visibleWarnings.length === 0 && !isLoading ? (
        <p className="mt-4 text-gray-500">
          {lang === "ar" ? "لا يوجد تحذيرات حالياً" : "No warnings currently"}
        </p>
      ) : (
        visibleWarnings.map((alert, i) => {
          const iconName = getWarningIconName(alert.type);
          const iconColor = getIconColor(iconName);
          return (
            <div
              dir={lang === "ar" ? "rtl" : "ltr"}
              key={i}
              className="flex bg-gray-100 p-2 flex-col gap-1"
            >
              <section className="flex w-full items-center  gap-2">
                <p className="font-semibold text-gray-800">{alert.type}</p>
                <DynamicIcon iconName={iconName} size={20} color={iconColor} />
              </section>
              <p
                dir={lang === "ar" ? "ltr" : "rtl"}
                className="text-sm text-gray-600"
              >
                {alert.message}
              </p>
              <p
                dir={lang === "ar" ? "ltr" : "rtl"}
                className="text-sm text-gray-500"
              >
                {alert.suggestion}
              </p>
              {alert.createdAt && (
                <p className="text-xs text-gray-400">
                  {formatDate(alert.createdAt, lang)}
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
