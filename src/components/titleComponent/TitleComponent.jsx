/* eslint-disable prettier/prettier */
import { useLang } from "@/hooks/LangContext";
import { t } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TitleComponent({
  text,
  title,
  className,
  textClassName = "text-gray-800",
  titleClassName = "text-gray-900",
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => setDelay(true), 800);
    } else {
      timer = setTimeout(() => setDelay(false), 200);
    }

    return () => clearTimeout(timer);
  }, [isHovered]);
  const containerRef = useRef(null);
  const { lang } = useLang();

  return (
    <div
      className={`${className} relative ${children ? "" : "w-fit"}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children ? (
        <>{children}</>
      ) : (
        <h2
          dir={t("rtl", "ltr", lang)}
          className={`cursor-pointer font-semibold ${textClassName} `}
        >
          {text}
        </h2>
      )}
      {delay && (
        <div
          className={`absolute left-1/2 ${children ? "-top-14" : "top-8"} z-[30] mb-2 ${title.length > 68 ? "w-[250px]" : "max-w-[310px]"} min-w-fit -translate-x-1/2 transform`}
          dir={t("rtl", "ltr", lang)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            className={`relative`}
          >
            <div
              className={`${titleClassName} animate-fade-in max-h-[300px] max-w-xs overflow-auto rounded-lg border border-gray-200 bg-white text-gray-700 shadow-lg`}
            >
              <p
                className={`mb-[2px] w-full min-w-56 max-w-96 break-words px-[10px] py-[7px] text-[14px] font-semibold`}
              >
                {title}
              </p>
            </div>
            <div
              className={`absolute ${children ? "top-[30px]" : "-top-2"} left-1/2 -ml-2 h-4 w-4 rotate-[225deg] transform ${children ? "" : "border-b border-r"} border-gray-200 bg-white`}
            ></div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
