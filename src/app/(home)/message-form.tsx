"use client"

import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import { messageFormSchema, type FormType } from "@/app/page";

import { Send } from "lucide-react";


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