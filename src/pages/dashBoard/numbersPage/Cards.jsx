export const Card = ({ isDark = "dark", type, data, isActive, onClick }) => {
  const baseClasses = `rounded-lg border  transition-all duration-200 ${
    isDark ? "  " : " border-gray-300 bg-white"
  }`;

  if (type === "stat") {
    const { icon: Icon, label, value, unit } = data;
    return (
      <div className={`${baseClasses} p-4`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-blue-500" />
          <span
            className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {label}
          </span>
        </div>
        <div className="text-2xl font-bold">
          {value ?? 0} <span className="text-lg font-normal">{unit}</span>
        </div>
      </div>
    );
  }

  if (type === "monitor") {
    const { title, metrics } = data;
    return (
      <div className={`${baseClasses} p-6`}>
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {metric.label}:
              </span>
              <span className="font-medium">
                {metric.value} {metric.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Control Card
  if (type === "control") {
    const { icon: Icon, label } = data;
    return (
      <button
        onClick={onClick}
        className={`w-full p-4 ${baseClasses} flex flex-col items-center gap-2 ${
          isActive
            ? ` border-blue-500  ${
                isDark ? "text-white bg-blue-950" : "text-gray-700"
              } shadow-lg`
            : isDark
            ? "hover:bg-gray-700 text-gray-300"
            : "hover:bg-gray-50 text-gray-700"
        }`}
      >
        <Icon className="w-6 h-6" />
        <span className="text-sm font-medium">{label}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isActive ? "ON" : "OFF"}
        </span>
      </button>
    );
  }

  // Action Card
  if (type === "action") {
    const { icon: Icon, label } = data;
    return (
      <button
        onClick={onClick}
        className={`w-full p-4 ${baseClasses} flex items-center justify-center gap-2 ${
          isDark
            ? "hover:bg-gray-700 text-gray-300"
            : "hover:bg-gray-50 text-gray-700"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  // Theme Card
  if (type === "theme") {
    return (
      <div
        className={`${baseClasses} p-4 flex flex-col items-center justify-center`}
      >
        <span className="text-lg font-semibold mb-2">Theme</span>
        <span
          className={`text-sm px-3 py-1 rounded ${
            isDark ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"
          }`}
        >
          {isDark ? "DARK" : "LIGHT"}
        </span>
      </div>
    );
  }

  return null;
};
