"use client";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { Box } from "./Box";
import SidebarItem from "./SidebarItem";
import { UserCommunities } from "./UserCommunities";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateCommunity } from "./CreateCommunity";

interface SidebarProbs {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProbs> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname == "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname == "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem
                key={route.label}
                label={route.label}
                href={route.href}
                icon={route.icon}
                active={route.active}
              />
            ))}
          </div>
        </Box>
        <Box className="h-full">
          <Box className="flex items-center">
            <CreateCommunity />
          </Box>
          <Box className="overflow-y-auto">
            <UserCommunities />
          </Box>
        </Box>
      </div>
      <main className="flex-1 h-full py-2">{children}</main>
    </div>
  );
};
