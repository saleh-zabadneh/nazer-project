import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  MessageSquare,
  PieChart,
  Users,
  Vote,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Kamel Yousef",
      logo: GalleryVerticalEnd,
      plan: "Owner",
    },
    {
      name: "Kamel Yousef.",
      logo: AudioWaveform,
      plan: "Owner",
    },
    {
      name: "Kamel Yousef.",
      logo: Command,
      plan: "Owner",
    },
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Asfar",
          url: "/users/asfar",
        },
        {
          title: "B2B",
          url: "/users/b2b",
        },
        {
          title: "B2C",
          url: "/users/b2c",
        },
        {
          title: "Individual",
          url: "/users/individual",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/login",
      icon: LayoutDashboard,
    },
    {
      name: "Elections",
      url: "/elections",
      icon: Vote,
    },
    {
      name: "Employee",
      url: "/employees",
      icon: Users,
    },
    {
      name: "Complains",
      url: "#",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
