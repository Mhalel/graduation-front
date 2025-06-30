import React, { useState, useEffect } from "react";
import {
  Wheat,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useLang, useT } from "@/hooks/LangContext";
import AiRequsts from "@/Apis/AiModels";
import SmartSiloSkeleton from "./AiPredictionSkelaton";
import { useSocket } from "@/hooks/SensorReadings";

const AiPrediction = () => {
  const { lang } = useLang();
  const { aiReq,setAiReq } = useSocket();
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  useEffect(() => {
    localStorage.removeItem("aiReq");
    setAiReq([])
  }, []);
  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true);
      AiRequsts.GetAiScima({ lang })
        .then((res) => {
          setData(res?.data?.data);
          console.log("res", res?.data?.data);
        })
        .catch((err) => console.error("err", err))
        .finally(() => setLoading(false));
    };
    handleGetData();
  }, []);
  const T = useT();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const stats = {
    total: Data.length,
    fresh: Data.filter((p) => p.prediction === "fresh").length,
    spoiled: Data.filter((p) => p.prediction === "spoiled").length,
    avgConfidence:
      Math.round(
        Data.reduce((acc, p) => acc + p.confidence, 0) / Data.length
      ) || 0,
  };

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        {/* Header */}
        <header
          dir={T("rtl", "ltr")}
          className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <Wheat className="w-5 h-5 text-white dark:text-black" />
                </div>
                <h1 className="text-xl font-bold text-black dark:text-white">
                  {T("نظام الصومعة الذكية", "Smart silo system")}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        {loading ? (
          <SmartSiloSkeleton />
        ) : (
          <div className="max-w-7xl w-fit mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {T("إجمالي العينات", "Total samples")}
                    </p>
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {stats.total}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {T("طازج", "Fresh")}
                    </p>
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {stats.fresh}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {T("فاسد", "Spoiled")}
                    </p>
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {stats.spoiled}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {T("متوسط الثقة", "Average confidence")}
                    </p>
                    <p className="text-2xl font-bold text-black dark:text-white">
                      {stats.avgConfidence}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-black dark:text-white" />
                  </div>
                </div>
              </div>
            </div> */}

            {/* Data Grid */}
            <div
              dir={T("rtl", "ltr")}
              className="bg-white  dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {T("نتائج تحليل المحاصيل", "Crops analysis results")}
                </h2>
              </div>

              <div className="grid justify-end items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {[...Data, ...aiReq].map((prediction, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg transition-shadow"
                  >
                    {/* الصورة */}
                    <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                      <img
                        src={prediction.photoLink}
                        alt="Plant sample"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjlGQUZCIi8+CjxwYXRoIGQ9Ik0xMjAgMTIwSDE4MFYxODBIMTIwVjEyMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTEwNSAxMzVIMTk1VjE0NUgxMDVWMTM1WiIgZmlsbD0iIzlDQTRBRiIvPgo8dGV4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+SW1hZ2U8L3RleHQ+Cjwvc3ZnPg==";
                        }}
                      />
                    </div>

                    {/* التنبؤ */}
                    {/* <div className="text-center mb-3">
                      <span className="text-lg font-bold text-black dark:text-white">
                        {prediction.prediction === "fresh"
                          ? T("طازج", "Fresh")
                          : T("فاسد", "Spoiled")}
                      </span>
                    </div> */}

                    {/* معدل الثقة */}
                    {/* <div className="text-center mb-3">
                      <span className="text-2xl font-bold text-black dark:text-white">
                        {prediction.confidence}%
                      </span>
                    </div> */}

                    {/* التاريخ */}
                    {/* <div className="text-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(prediction.createdAt)}
                      </span>
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiPrediction;
