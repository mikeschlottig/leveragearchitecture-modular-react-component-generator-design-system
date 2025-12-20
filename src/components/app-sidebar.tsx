import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UploadCloud, 
  Library, 
  Palette, 
  Box, 
  Settings, 
  HelpCircle,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/app/dashboard" },
  { title: "Upload Assets", icon: UploadCloud, url: "/app/upload" },
  { title: "Component Library", icon: Library, url: "/app/library" },
  { title: "Palette Studio", icon: Palette, url: "/app/palette" },
  { title: "Architect Corner", icon: Box, url: "/app/architect" },
];
const secondaryNav = [
  { title: "Settings", icon: Settings, url: "#" },
  { title: "Support", icon: HelpCircle, url: "#" },
];
export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex items-center justify-center border-b">
        <Link to="/" className="flex items-center gap-2 px-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-5" />
          </div>
          <span className="truncate font-bold text-lg group-data-[collapsible=icon]:hidden">
            Leverage
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Workflow</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === item.url}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            {secondaryNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground">
            Usage Limit
          </p>
          <div className="mt-2 h-1 w-full rounded-full bg-secondary">
            <div className="h-1 w-3/4 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            Note: Requests are limited across all users during high load.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}