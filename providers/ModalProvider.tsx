"use client";

import { CreateCommunityModal } from "@/components/modals/CreateCommunityModal";
import { LoginModal } from "@/components/modals/LoginModal";
import { useEffect, useState } from "react";

const ModalProvider: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <CreateCommunityModal />
      <LoginModal />
    </>
  );
};

export default ModalProvider;
