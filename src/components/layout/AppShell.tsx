import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CommandMenu } from "@/components/CommandMenu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Search, Database, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useBuilderStore } from "@/store/use-builder-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
export function AppShell() {
  const location = useLocation();
  const userName = useAuth(s => s.user?.name);
  const userEmail = useAuth(s => s.user?.email);
  const userAvatar = useAuth(s => s.user?.avatar);
  const logout = useAuth(s => s.logout);
  const primitiveCount = useBuilderStore(s => s.components.length);
  const pathSegments = location.pathname.split("/").filter(Boolean);
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 z-30 bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/app/dashboard">App</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize font-medium">
                      {pathSegments[pathSegments.length - 1] || "Dashboard"}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hidden md:flex relative h-9 w-64 justify-start text-sm text-muted-foreground bg-secondary/50 border-none px-3"
                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
                <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <div className="flex items-center gap-2">
                <ThemeToggle className="relative top-0 right-0" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border-2 border-primary/10">
                        <AvatarImage src={userAvatar} alt={userName} />
                        <AvatarFallback>{userName?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Database className="size-4" /> <span>{primitiveCount} Primitives</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Settings className="size-4" /> <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive gap-2 font-medium" onClick={logout}>
                      <LogOut className="size-4" /> <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <CommandMenu />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}