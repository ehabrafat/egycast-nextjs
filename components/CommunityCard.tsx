"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CommunityType } from "@/database.types";
import { Link } from "lucide-react";
import { Button } from "./ui/button";
import useLoadImage from "@/hooks/useLoadImage";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface CommunityCardProbs {
  community: CommunityType;
}

export const CommunityCard: React.FC<CommunityCardProbs> = ({ community }) => {
  const imgUrl = useLoadImage(community);
  return (
    <Card key={community.id} className="flex flex-col dark border-none">
      {imgUrl ? (
        <div className="w-full relative h-40">
          <Image src={imgUrl} fill alt={community.title} />
        </div>
      ) : (
        <Skeleton className="h-[125px] w-full rounded-xl" />
      )}
      <CardContent className="p-4">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold">{community.title}</h2>
          <p>{community.description.substring(0, Math.min(community.description.length, 100))} {community.description.length > 100 ? "..." : ""}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="w-full flex items-center justify-between">
          <p>Paid</p>
          <Button className="w-[100px]">Join</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
