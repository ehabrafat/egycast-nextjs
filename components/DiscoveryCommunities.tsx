"use client";
import { CommunityType } from "@/database.types";
import React, { useEffect, useState } from "react";
import { CommunityCard } from "./CommunityCard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

const DiscoveryCommunities: React.FC = () => {
  const supabase = useSupabaseClient();
  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const { data } = await supabase.from("communities").select("*");
      return data as CommunityType[];
    },
    enabled: !!supabase,
  });

  if (!communities) return null;
  return (
    <div className=" flex items-center justify-center w-full">
      <div className="w-full flex flex-col gap-y-4 justify-end items-center">
        <h2 className="text-4xl font-semibold py-2">Discover Communities</h2>
        <div className="w-full flex justify-center items-center px-4">
          <div className="container grid grid-cols-3 gap-x-4 gap-y-4">
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCommunities;
