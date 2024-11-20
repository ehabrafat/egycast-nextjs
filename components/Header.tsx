"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { useModalStore } from "@/store/useModalStore";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { UserDrobdownMenu } from "./UserDrobdownMenu";
interface HeaderProbs {
  className?: string;
}

export const Header: React.FC<HeaderProbs> = ({ className }) => {
  const router = useRouter();
  const { onOpen } = useModalStore();
  const { user, isLoading } = useUser();

  return (
    <div className={twMerge(`h-fit p-6`, className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="flex md:hidden gpa-x-2 items-center">
          <button className="rounded-full p-2 flex bg-white items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
        </div>
        <div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-semibold">Egycast Academy</h2>
            <p className="text-sm">Money - Status - Power - Freedom</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            {user ? <UserDrobdownMenu  /> : null}
            {!isLoading && !user ? (
              <div>
                <Button
                  variant={"secondary"}
                  className="rounded-lg"
                  onClick={() => {
                    onOpen("login");
                  }}
                >
                  Login
                </Button>
              </div>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};
