"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { useModalStore } from "@/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is missing"),
  description: z.string().min(1, "Content is missing"),
  files: z
    .array(z.instanceof(File))
    .length(1, "Cover image is missing")
    .refine(
      (files) =>
        files.every((file) => {
          return file.size < 2 * 1024 * 1024;
        }),
      "File size cannot exceed 2MB"
    )
    .refine(
      (files) =>
        files.every((file) => {
          return file.type.split("/")[0] == "image";
        }),
      "Only images are allowed"
    ),
});

export const CreateCommunityModal = () => {
  const { isOpen, type, onClose } = useModalStore();
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      files: [],
    },
  });
  const supabaseClient = useSupabaseClient();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    const title = values.title,
      description = values.description;
    const image = values.files[0],
      imageName = `${image.name}-${Date.now()}`;
    const { data: imageData, error: imageError } = await supabaseClient.storage
      .from("communities")
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
    const { error: communityError } = await supabaseClient
      .from("communities")
      .insert({
        title,
        description,
        cover_img: imageData?.path,
        user_id: user.id,
      });
    if (imageError || communityError) {
      console.error("something went wrong");
      return;
    }
    form.reset();
    onClose();
    router.refresh();
  };

  if (!user) return null;
  return (
    <Dialog open={isOpen && type == "createCommunity"} onOpenChange={onClose}>
      <DialogContent className="dark sm:max-w-[425px] overflow-y-auto max-h-full min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create a New Community</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Write your title here." />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your cotent here."
                      className="resize-none overflow-y-auto max-h-80"
                      {...field}
                      onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set it to the scroll height
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const arr = Array.from(e.target.files || []);
                        field.onChange(arr);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="block ml-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
