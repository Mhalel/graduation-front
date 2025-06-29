import Notifications from "@/components/Notifications";
import { useAuth } from "@/hooks/AuthContext";
import { useLang, useT } from "@/hooks/LangContext";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
const MobilePopUp = () => {
  const { lang, setLang } = useLang();
  const [isNotificationOpend, setIsNotificationOpend] = useState(false);
  const toggleNotifications = () => {
    setIsNotificationOpend(!isNotificationOpend);
    // setUnseenCount(0);
    // setUnseenNotifications([]);
  };
  useEffect(() => {
    setIsNotificationOpend(false);
  }, [window.location.pathname]);
  const { auth, account, logout } = useAuth();
  const T = useT();
  const nav = useNavigate();
  return (
    <div className="md:hidden bg-background border-t border-border shadow-lg">
      <div className="pt-2 pb-3 space-y-1 px-4">
        {auth && (
          <Link
            to="/dashboard"
            className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
          >
            {T("لوحة التحكم", "Dashboard")}
          </Link>
        )}
        {/* 
        <Link
          to={"/Pricing"}
          className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
        >
          {T("التسعير", "Pricing")}
        </Link> */}
      </div>

      {/* Language selector in mobile menu */}
      <div className="px-4 py-2 border-t border-border">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {T("اللغة", "Language")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-2 rounded-md text-sm ${
              lang === "en"
                ? "bg-accent text-foreground font-medium"
                : "text-foreground hover:bg-accent/30"
            }`}
          >
            {T("الإنجليزية", "English")}
          </button>
          <button
            onClick={() => setLang("ar")}
            className={`px-3 py-2 rounded-md text-sm ${
              lang === "ar"
                ? "bg-accent text-foreground font-medium"
                : "text-foreground hover:bg-accent/30"
            }`}
          >
            {T("العربية", "Arabic")}
          </button>
        </div>
      </div>

      <div className="pt-4 pb-3 border-t border-border">
        {auth && (
          <div className="flex items-center px-4 justify-between">
            <div className="flex items-center  gap-2">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                {account?.photoLink ? (
                  <img src={account?.photoLink} alt="" />
                ) : (
                  <span className="text-sm font-medium text-primary-foreground">
                    {account?.userName?.slice(0, 2)}
                  </span>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-foreground">
                  {account?.fullName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {account?.email}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (!auth) {
                  nav("/login");
                } else {
                  toggleNotifications();
                }
              }}
              className="relative p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Bell className="h-5 w-5" />
              {auth && isNotificationOpend && (
                <div className="absolute right-0 top-[4.7rem]">
                  <Notifications
                    isNotificationOpend={isNotificationOpend}
                    setIsNotificationOpend={setIsNotificationOpend}
                  />
                </div>
              )}
            </button>
          </div>
        )}

        <div className="mt-3 px-4 space-y-1">
          {!auth && (
            <div className="pt-2 flex flex-col text-center space-y-2">
              <Link
                to={`/signIn`}
                className="w-full text-foreground bg-accent/30 hover:bg-accent/50 px-3 py-2 rounded-md font-medium text-base transition-colors"
              >
                {T("تسجيل الدخول", "Sign in")}
              </Link>
              <Link
                to={"/Signup"}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md font-medium text-base transition-colors"
              >
                {T("التسجيل", "Sign up")}
              </Link>
            </div>
          )}
          {auth && (
            <button
              onClick={() => {
                logout();
              }}
              className="w-full flex  items-center gap-5 justify-center text-white bg-red-600 hover:bg-red-600/90 px-3 py-2 rounded-md font-medium text-base transition-colors"
            >
              <span>{T("تسجيل الخروج", "LogOut")}</span>
              <span className={` ${lang === "ar" ? "rotate-180" : ""}`}>
                <LuLogOut />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePopUp;
