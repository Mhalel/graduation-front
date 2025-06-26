import React, { useState, useEffect } from "react";
import { Bell, Menu, X, User, LogOut, Globe, Moon, Sun } from "lucide-react";
import { useLang, useT } from "@/hooks/LangContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/themeprovider";
import { useAuth } from "@/hooks/AuthContext";
import { LuLogOut } from "react-icons/lu";
import Notifications from "../Notifications";
import MobilePopUp from "./components/mobilePopUp";
import { GiGreenhouse } from "react-icons/gi";
const Header = () => {
  const { account, auth, logout } = useAuth();
  const nav = useNavigate();
  const T = useT();
  const [isNotificationOpend, setIsNotificationOpend] = useState(false);
  const { lang, setLang } = useLang();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const toggleNotifications = () => {
    setIsNotificationOpend(!isNotificationOpend);
    // setUnseenCount(0);
    // setUnseenNotifications([]);
  };
  useEffect(() => {
    setIsNotificationOpend(false);
  }, [window.location.pathname]);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const changeLanguage = (lang) => {
    setLang(lang);
    setIsLanguageMenuOpen(false);
    // In a real implementation, this would update your app's language
  };
  const langsType = [
    { nameAr: "عربي", nameEn: "Arabic", val: "ar" },
    { nameAr: "إنجليزي", nameEn: "English", val: "en" },
  ];
  const userImage = "/Ahmed.jpg";
  return (
    <header
      dir={lang === "en" ? "ltr" : "rtl"}
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background border-b border-border shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={"/"} className="flex-shrink-0 flex items-center mr-4">
              <GiGreenhouse size={30} />
              <span className="ml-2 text-primary font-bold text-xl">GreenHouse</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1">
                {auth && (
                  <li>
                    <Link
                      to={"/dashboard"}
                      className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      {T("لوحة التحكم", "Dashboard")}
                    </Link>
                  </li>
                )}

                {/* <li>
                  <Link
                    to={"/Pricing"}
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {T("الاسعار", "Pricing")}
                  </Link>
                </li> */}
              </ul>
            </nav>
          </div>

          {/* Right-side actions for desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 text-foreground hover:bg-accent/30 px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{lang}</span>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-1 w-24 bg-card rounded-md shadow-lg py-1 border border-border z-10">
                  {langsType.map(({ nameAr, nameEn, val }, i) => (
                    <button
                      key={nameEn + i}
                      onClick={() => changeLanguage(val)}
                      className={`w-full  px-3 text-center py-1.5 text-sm ${
                        lang === "en"
                          ? "text-primary font-medium"
                          : "text-card-foreground"
                      } hover:bg-accent`}
                    >
                      {lang === "en" ? nameEn : nameAr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {auth && (
              <>
                <button
                  onClick={() => {
                    if (!auth) {
                      nav("/login");
                    } else {
                      toggleNotifications();
                    }
                  }}
                  className="relative p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
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

                <div
                  // to={"Profile/" + account?._id}
                  className="h-7 w-7 rounded-full bg-primary flex items-center justify-center overflow-hidden"
                >
                  <span className="text-xs font-medium text-primary-foreground">
                    {userImage ? (
                      <img src={userImage} alt="" />
                    ) : (
                      account?.userName?.slice(0, 2)
                    )}
                  </span>
                </div>
                <div
                  // to={"Profile/" + account?._id}
                  className="text-sm font-medium text-foreground"
                >
                  {account?.userName}
                </div>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className={`text-foreground ${
                    lang === "ar" ? "rotate-180" : ""
                  }`}
                >
                  <LuLogOut />
                </button>
              </>
            )}
            {!auth && (
              <>
                <Link
                  to={"/signIn"}
                  className="text-foreground hover:bg-accent/30 px-4 py-1.5 rounded-md font-medium text-sm transition-colors"
                >
                  {T("تسجيل الدخول", "Sign in")}
                </Link>

                <Link
                  to={"/Signup"}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 rounded-md font-medium text-sm transition-colors"
                >
                  {T("انشاء حساب", "Sign up")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button - only visible on mobile */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - only appears on mobile */}
      {isMenuOpen && (
        <MobilePopUp />
      )}
    </header>
  );
};




export default Header;
