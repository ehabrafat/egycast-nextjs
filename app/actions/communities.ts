import { CommunityType } from "@/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const getCommunities = async ()=>{
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    const {data} = await supabase.from("communities").select("*");
    return data as CommunityType[];
}

