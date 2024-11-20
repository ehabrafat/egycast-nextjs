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
      <CardHeader className="flex w-full items-center">
        {imgUrl ? (
          <Image src={imgUrl} height={50} width={200} alt={community.title} />
        ) : (
          <Skeleton className="h-[125px] w-full rounded-xl" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          <h2 className="font-bold">{community.title}</h2>
          <p>{community.description}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto"></CardFooter>
    </Card>
  );
};
