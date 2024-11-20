"use client";

import { CommunityType } from "@/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (community: CommunityType) => {
  const supabaseClient = useSupabaseClient();
  if (!community) return null;
  const { data: imageData } = supabaseClient.storage
    .from("communities")
    .getPublicUrl(community.cover_img);
  return imageData.publicUrl;
};

export default useLoadImage;
