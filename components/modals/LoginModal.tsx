"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/store/useModalStore";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect } from "react";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

export const LoginModal = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const { isOpen, type, onClose, onOpen } = useModalStore();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Dialog open={isOpen && type == "login"} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle className="font-normal text-white">
            Welcome back!
          </DialogTitle>
        </DialogHeader>
        <Auth
          theme="dark"
          providers={[]}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
