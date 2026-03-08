"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ClockCounterClockwise,
  Folders,
  ChartBar,
  GearIcon,
  LifebuoyIcon,
  PaperPlaneTiltIcon,
  CropIcon,
  Briefcase,
  Code,
  ListDashes,
  GithubLogoIcon,
} from "@phosphor-icons/react";

const data = {
  /*user: {
    name: "Username",
    email: "username@projetime",
    avatar: "",
  },*/
  navMain: [
    {
      title: "Timer",
      url: "/timer",
      icon: <ClockCounterClockwise />,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "GitHub",
      url: "https://github.com/MartinGamesCZ/Projetime",
      icon: <GithubLogoIcon />,
    },
  ],
  projects: [
    {
      name: "Projetime App",
      url: "/projects/projetime",
      icon: <Code />,
    },
    {
      name: "Client Work",
      url: "/projects/client",
      icon: <Briefcase />,
    },
    {
      name: "Internal Tools",
      url: "/projects/internal",
      icon: <CropIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ListDashes className="size-5" weight="bold" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-base">
                  Projetime
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Time Tracking
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>*/}
    </Sidebar>
  );
}
