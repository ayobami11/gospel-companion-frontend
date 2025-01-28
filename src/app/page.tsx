"use client"

import { MessageForm } from "@/app/(home)/message-form";
import { ChatWindow } from "@/app/(home)/chat-window";
import { Header } from "@/app/(home)/header";

import { NewChat } from "@/app/(home)/new-chat";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";



export const messageFormSchema = z.object({
  knowledgeBase: z.enum(["elementary", "junior", "senior"], {
    message: "Please select a valid knowledge base.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }).max(1000, {
    message: "Message cannot exceed 1000 characters."
  }).trim()
}).required();

export type FormType = {
  form: UseFormReturn<{
    knowledgeBase: "elementary" | "junior" | "senior",
    message: string
  }, unknown, undefined>
}


export default function Home() {

  const history = false;

  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });



  return (
    <div className="text-black flex flex-col min-h-screen">

      <Header form={form} />

      <main className="flex-1 bg-off-white">
        <div className="max-w-[930px] mx-auto flex flex-col min-h-[calc(100vh-68px)]">
          <div className="flex-1">
            {history ? <ChatWindow /> : <NewChat />}
          </div>

          <MessageForm form={form} />
        </div>
      </main>
    </div>
  );
}
