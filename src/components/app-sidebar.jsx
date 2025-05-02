import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { BsFillCalculatorFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaChartArea } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { T } from "@/hooks/LangContext";

// Menu items.
const items = [
  {
    title: { ar: "الرسمات البيانيه", en: "Charts" },
    url: "charts",
    icon: FaChartArea,
  },
  {
    title: { ar: "الحسابات", en: "Accounts" },
    url: "account",
    icon: BsFillCalculatorFill,
  },
  {
    title: { ar: "الدعم", en: "Support" },
    url: "Support",
    icon: MdSupportAgent,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
const gender = "male";
const photo = "/Ahmed.jpg";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-5">
            <Link to="/Profile" className="flex items-center gap-5">
              <Avatar>
                <AvatarImage
                  src={
                    photo
                      ? photo
                      : gender === "male"
                      ? "/manAvatar.jpg"
                      : gender === "female"
                      ? "/womanAvatar.jpg"
                      : "/avatar.png"
                  }
                />
                <AvatarFallback className={"text-black"}>Ah</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Ahmed</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={"flex flex-col gap-3"}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{T(item.title.ar, item.title.en)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
