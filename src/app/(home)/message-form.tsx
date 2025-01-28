"use client"

import { z } from "zod";
import { type UseFormReturn } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import { Send } from "lucide-react";

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


export const MessageForm = ({ form }: FormType) => {


    async function onSubmit(values: z.infer<typeof messageFormSchema>) {
        console.log(values);

    }

    return (
        <div className="sticky bottom-0 max-w-[902px] w-full bg-[hsl(0,0%,97%)] md:left-[calc(50%+310px)]">
            <Form {...form}>
                <form
                    id="message-form"
                    method="POST"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-2 m-5 mt-0 flex bg-white rounded-2xl"
                >
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <AutosizeTextarea
                                        id="message"
                                        placeholder="Write a message here..."
                                        minHeight={35}
                                        maxHeight={200}
                                        // onChange={(event) => handleMessageChange(event.target.value)}
                                        className="flex-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="bg-green rounded-[0.625rem] p-2"
                            onClick={() => console.log(form.formState.errors)}
                        >
                            <Send />
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form >
            </Form>
        </div>
    )
}