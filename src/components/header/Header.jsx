import React, { useState, useEffect } from "react";
import { Bell, Menu, X, User, LogOut, Globe, Moon, Sun } from "lucide-react";
import { T, useLang } from "@/hooks/LangContext";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/themeprovider";

const Header = () => {
  const { lang, setLang } = useLang();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

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
            <div className="flex-shrink-0 flex items-center mr-4">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2 text-primary font-bold text-xl">Nexus</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1">
                <li>
                  <a
                    href="#"
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    {T("", "Dashboard")}
                  </a>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    {T("","")}
                    Products
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Pricing
                  </a>
                </li>
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

            <button className="p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              <span className="text-xs font-medium text-primary-foreground">
                JD
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              John Doe
            </span>

            <Link
              to={"/signIn"}
              className="text-foreground hover:bg-accent/30 px-4 py-1.5 rounded-md font-medium text-sm transition-colors"
            >
              Sign in
            </Link>

            <Link
              to={"/Signup"}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 rounded-md font-medium text-sm transition-colors"
            >
              Sign up
            </Link>
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
        <div className="md:hidden bg-background border-t border-border shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <a
              href="#"
              className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
            >
              Products
            </a>
            <a
              href="#"
              className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </a>
            <a
              href="#"
              className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
            >
              Pricing
            </a>
          </div>

          {/* Language selector in mobile menu */}
          <div className="px-4 py-2 border-t border-border">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Language
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-2 rounded-md text-sm ${
                  lang === "en"
                    ? "bg-accent text-foreground font-medium"
                    : "text-foreground hover:bg-accent/30"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  JD
                </span>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-foreground">
                  John Doe
                </div>
                <div className="text-sm text-muted-foreground">
                  john@nexus.com
                </div>
              </div>
              <button className="ml-auto p-2 rounded-full text-foreground hover:bg-accent/30 focus:outline-none focus:ring-2 focus:ring-ring">
                <Bell className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 px-4 space-y-1">
              <a
                href="#"
                className="flex items-center text-foreground hover:bg-accent/30 px-3 py-2 rounded-md text-base font-medium"
              >
                <User className="mr-3 h-5 w-5" />
                Your Profile
              </a>
              <a
                href="#"
                className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
              >
                Account
              </a>
              <a
                href="#"
                className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-foreground hover:bg-accent/30 block px-3 py-2 rounded-md text-base font-medium"
              >
                Billing
              </a>

              <div className="pt-2 space-y-2">
                <button className="w-full text-foreground bg-accent/30 hover:bg-accent/50 px-3 py-2 rounded-md font-medium text-base transition-colors">
                  Sign in
                </button>
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md font-medium text-base transition-colors">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
