"use client";

import { useModalStore } from "@/store/useModalStore";
import { useSession } from "@supabase/auth-helpers-react";
import { AiOutlinePlus } from "react-icons/ai";

export const CreateCommunity = () => {
  const { onOpen } = useModalStore();
  const session = useSession();
  return (
    <div className="flex items-center justify-between w-full p-5">
      <div className="inline-flex items-center gap-x-2">
        <p className="text-neutral-400 font-medium text-md">
          Create a Community
        </p>
      </div>
      <button onClick={() => session ? onOpen("createCommunity") : onOpen("login")}>
        <AiOutlinePlus
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </button>
    </div>
  );
};
