import { Calendar, ChartPie, Home, Inbox, Search, Settings } from "lucide-react";
import { BsFillCalculatorFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaChartArea } from "react-icons/fa6";
import { MdNumbers, MdSupportAgent } from "react-icons/md";
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
import { useT } from "@/hooks/LangContext";
import { useAuth } from "@/hooks/AuthContext";
import { IoGameController } from "react-icons/io5";

// Menu items.
const items = [
  {
    title: { ar: "قراءات في نفس الوقت ", en: "Real-time readings" },
    url: "numbers",
    icon: MdNumbers,
  },
  {
    title: { ar: "الرسمات البيانيه في الوقت الفعلي ", en: "Real-time Charts" },
    url: "charts",
    icon: ChartPie ,
  },
  {
    title: { ar: "الرسمات البيانيه التراكميه ", en: "Long-term Charts" },
    url: "long-term-charts",
    icon: FaChartArea,
  },
  // {
  //   title: { ar: "الحسابات", en: "Accounts" },
  //   url: "account",
  //   icon: BsFillCalculatorFill,
  // },
  // {
  //   title: { ar: "الدعم", en: "Support" },
  //   url: "Support",
  //   icon: MdSupportAgent,
  // },
  // {
  //   title: { ar: "التحكم", en: "Control" },
  //   url: "control",
  //   icon: IoGameController,
  // },
  {
    title:  { ar: "الاعدادات", en: "sittings" },
    url: "sittings",
    icon: Settings,
  },
];
const gender = "male";
const photo = "/Ahmed.jpg";
export function AppSidebar() {
  const T = useT();
  const { account } = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-5">
            <Link
              to={`/Profile/${account?._id}`}
              className="flex items-center gap-5"
            >
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
                <AvatarFallback className={"text-black"}>
                  {account?.userName?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{account?.userName}</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={"flex flex-col gap-3"}
                  key={item.url}
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
