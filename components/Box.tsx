"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface BoxProbs {
  children: React.ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProbs> = ({ children, className }) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rouned-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};
