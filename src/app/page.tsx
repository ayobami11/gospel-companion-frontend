"use client"

import { MessageForm } from "@/app/(home)/message-form";
import { ChatWindow } from "@/app/(home)/chat-window";
import { Header } from "@/app/(home)/header";

import { NewChat } from "@/app/(home)/new-chat";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { messageFormSchema } from "@/app/(home)/message-form";



export default function Home() {

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
            {true ? <ChatWindow /> : <NewChat />}
          </div>

          <MessageForm form={form} />
        </div>
      </main>
    </div>
  );
}
