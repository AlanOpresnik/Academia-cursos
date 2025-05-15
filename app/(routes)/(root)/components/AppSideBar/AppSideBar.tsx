"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { routes, routesTeacher } from "./appSIdeBar.data";
import Image from "next/image";

export function AppSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href={"/"} className="flex gap-1 items-center flex-row">
            <Image
              src={"/icon.png"}
              alt="logo academia"
              width={35}
              height={35}
            />
            {state === "expanded" && (
              <span className="text-xl font-semibold text-gray-800 tracking-wide">
                CodeClub
              </span>
            )}
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu className="space-y-2">
            {routes.map((r) => (
              <SidebarMenuItem key={r.title}>
                <SidebarMenuButton asChild>
                  <a href={r.url}>
                    <div className="p-1 rounded-lg text-white bg-violet-400">
                      <r.icon className="w-4 h-4" />
                    </div>
                    {state === "expanded" && <span>{r.title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenu className="mt-4">
            <SidebarGroupLabel>Profesor</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuSub>
                {routesTeacher.map((r) => (
                  <SidebarMenuSubItem key={r.title}>
                    <SidebarMenuSubButton
                      href={r.url}
                      className="hover:bg-muted transition"
                    >
                      <div className="p-1 rounded-lg text-white bg-slate-400">
                        <r.icon className="h-4 w-4" />
                      </div>
                      <span>{r.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
