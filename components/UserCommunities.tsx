"use client";
import React from "react";
import { AiOutlinePlus, AiOutlinePushpin } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoSettingsSharp } from "react-icons/io5";
import { TbPlaylist } from "react-icons/tb";

export const UserCommunities = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-y-2 px-3 text-xs uppercase">
        Your Communities
        {/*<IoSettingsSharp
          size={20}
          className="text-neutral-400 cursor-pointer"
        />*/}
      </div>
    </div>
  );
};
