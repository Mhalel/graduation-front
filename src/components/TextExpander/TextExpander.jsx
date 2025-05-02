/* eslint-disable prettier/prettier */
import { useLang } from "@/hooks/LangContext";
import { cropText, cropTextBySentences, t } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TextExpander({
  text,
  limit,
  className,
  readMoreClassName = "text-main-blue hover:text-main-purple",
  dottWrapper = false,
}) {
  const { lang } = useLang();
  const [newLimit, setNewLimit] = useState(limit);

  const getTotalUnits = () => {
    if (!text) return 0;
    return dottWrapper
      ? text.match(/[^.!؟!]+[.!؟!]?/g)?.length || 0 // total sentences
      : text.length; // total characters
  };

  const expand = () => {
    const total = getTotalUnits();
    if (newLimit >= total) {
      setNewLimit(limit); // Reset
    } else {
      const next = newLimit * 2 >= total ? total : newLimit * 2;
      setNewLimit(next);
    }
  };

  useEffect(() => {
    setNewLimit(limit);
  }, [limit]);

  const visibleText = dottWrapper
    ? cropTextBySentences(text, newLimit)
    : cropText(text, newLimit);

  return (
    <div dir={t("rtl", "ltr", lang)} className={`flex h-fit flex-col justify-center gap-2 p-2`}>
      <span className={`${className} whitespace-pre-line`}>{visibleText}</span>
      {getTotalUnits() > limit && (
        <button
          className={`text-[14px] ${readMoreClassName} flex duration-200`}
          onClick={expand}
        >
          {newLimit >= getTotalUnits()
            ? t("اقرأ أقل", "Read less", lang)
            : t("اقرأ المزيد", "Read more", lang)}
        </button>
      )}
    </div>
  );
}
