"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React from "react";

export const UserDrobdownMenu: React.FC = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    router.refresh();
  };
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="mr-6">
        <h2>{user.email?.split("@")[0]}</h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"start"}
        side={"bottom"}
        className="mr-6 mt-2"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" line-through">Profile</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="w-full h-full cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
