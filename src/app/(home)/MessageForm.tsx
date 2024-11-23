"use client"

import { useAppContext } from "@/contexts";

import { type ChangeEvent, useRef } from "react";

// import { useForm } from "react-hook-form"
import { z } from "zod"

// import {
//     Form,
// FormControl,
// FormField,
// FormItem,
// FormMessage,
// } from "@/components/ui/form";


import { Input } from "@/components/ui/input";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import { toast } from "@/hooks/use-toast";

import { ActionTypes } from "@/actions";
import {Send} from "lucide-react";


const MessageFormSchema = z.object({
    knowledgeBase: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"], {
        message: "Please select a valid knowledge base.",
    }),
    message: z.string().min(1, {
        message: "Message is required.",
    }).max(1000, {
        message: "Message cannot exceed 1000 characters."
    }).trim()
}).required();

const MessageForm = () => {

    const { state, dispatch } = useAppContext();

    const handleMessageChange = (message: string) => {
        dispatch({
            type: ActionTypes.UPDATE_MESSAGE_FORM,
            payload: {
                name: "message",
                value: message
            }
        });
    }

    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const handleFileInputClick = () => {
        hiddenFileInput.current?.click();
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files?.[0];

        if (file) {
            console.log(file);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {
            const parsedMessageForm = MessageFormSchema.parse(state.messageForm);
            console.log("Validation passed: ", parsedMessageForm);

        } catch (error) {

            if (error instanceof z.ZodError) {
                console.error("Validation: failed: ", error.issues);
                toast({
                    title: error.issues[0].message,
                });
            } else {
                console.error("Unexpected error: ", error);
            }
        }
    };

    return (
        <div className="sticky bottom-0 max-w-[902px] w-full bg-[hsl(0,0%,97%)] md:left-[calc(50%+310px)]">
            <form
                id="message-form"
                onSubmit={handleSubmit}
                className="p-2 m-5 mt-0 bg-white rounded-2xl border border-[hsl(0,0%,92%)]"
            >
                <div className="flex items-end">
                    <div>
                        <button
                            type="button"
                            className="bg-gray-700 rounded-full w-fit p-2"
                            onClick={handleFileInputClick}
                        >
                            <Send />
                            <span className="sr-only">Choose file</span>
                        </button>
                        <Input
                            type="file"
                            id="file"
                            accept="image/png"
                            className="hidden"
                            ref={hiddenFileInput}
                            onChange={handleFileChange}
                        />
                    </div>
                    <AutosizeTextarea
                        id="message"
                        placeholder="Write a message here..."
                        minHeight={35}
                        maxHeight={200}
                        onChange={(event) => handleMessageChange(event.target.value)}
                        className="flex-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                    />
                    <button
                        type="submit"
                        className="bg-green rounded-[0.625rem] p-2"
                    >
                        <Send />
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form >
        </div>
    )
}

export default MessageForm;