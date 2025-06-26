import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/themeprovider";
import { useState } from "react";
import { useLang } from "@/hooks/LangContext";
import { GiGreenhouse } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "@/hooks/AuthContext";

export default function DashBoard() {
  const {logout} = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
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
    <SidebarProvider>
      <AppSidebar
        className={lang === "ar" ? "sidebar-right" : "sidebar-left"}
      />
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center border-y gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="flex w-full items-center space-x-2 justify-between">
              <BreadcrumbList>
                <BreadcrumbItem className="block">
                  <Link to="/" className="flex items-center space-x-2">
                    <GiGreenhouse size={30} color="white" />
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem className=" block">
                  <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-lg  transition-all duration-200 ${
                      isDark ? "   text-yellow-400" : " text-gray-600"
                    }`}
                  >
                    {isDark ? (
                      <Sun className="w-6 h-6" />
                    ) : (
                      <Moon className="w-6 h-6" />
                    )}
                  </button>
                </BreadcrumbItem>
                <BreadcrumbItem>
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
                </BreadcrumbItem>
              </BreadcrumbList>
              <BreadcrumbList>
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
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
