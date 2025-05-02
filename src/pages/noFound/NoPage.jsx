// /* eslint-disable prettier/prettier */

import { T,
  //  useLang
   } from "@/hooks/LangContext";
// import { useTheme } from "@/hooks/themeprovider";
import { useNavigate } from "react-router-dom";
function NoPage() {
  // const { lang } = useLang();
  // const { isDark } = useTheme();
  const nav = useNavigate();
  return (
    <section className="bg-transparent h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-black">
            {T("الصفحة غير موجودة", "Page not found")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {T(
              "عذرًا، لا يمكننا العثور على هذه الصفحة. ستجد الكثير لاستكشافه على الصفحة الرئيسية.",
              "Sorry, we can't find that page. You'll find lots to explore on the home page."
            )}{" "}
          </p>
          <div
            onClick={() => nav(-1)}
            className="inline-flex cursor-pointer text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            {T("العودة للخلف", "Go Back")}
          </div>
          <div
            onClick={() => nav("/login")}
            className="inline-flex cursor-pointer text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            {T("تسجيل الدخول", "Login")}
          </div>
        </div>
      </div>
    </section>
  );
}
export default NoPage;
