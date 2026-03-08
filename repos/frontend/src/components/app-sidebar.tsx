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
  NotebookIcon,
  CodeIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { TProject } from "@/types/entities";
import { API } from "@/api/api";
import { toast } from "react-toastify";
import { fullscreenLoader } from "./fullscreen-loader";

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
      title: "Swagger",
      url: process.env.NEXT_PUBLIC_BACKEND_ADDRESS + "/api/swagger",
      icon: <CodeIcon />,
    },
    {
      title: "GitHub",
      url: "https://github.com/MartinGamesCZ/Projetime",
      icon: <GithubLogoIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [projects, setProjects] = useState<Omit<TProject, "client">[] | null>(
    null,
  );

  const fetchProjects = React.useCallback(async () => {
    fullscreenLoader.push("sidebar-project-list");

    const projects = await API.projects.list();

    fullscreenLoader.remove("sidebar-project-list");

    if (!projects.isOk) return toast.error(projects.message);
    setProjects(projects.data);
  }, []);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
        {projects && (
          <NavProjects
            projects={projects.map((p) => ({
              name: p.name,
              url: `/projects/${p.id}`,
              icon: <NotebookIcon />,
            }))}
          />
        )}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/*<SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>*/}
    </Sidebar>
  );
}
