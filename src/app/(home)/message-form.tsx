"use client"

import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";

import { Send } from "lucide-react";

import { instance as axios } from "@/lib/axios";

import { useAppContext } from "@/contexts";
import { ActionTypes, RagResponse } from "@/actions";

import { useFormContext } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const MessageForm = () => {

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const methods = useFormContext();

    const { state, dispatch } = useAppContext();

    const question = methods.getValues("message");
    const knowledgeBase = methods.getValues("knowledgeBase");


    async function onSubmit() {


        dispatch({
            type: ActionTypes.SET_PENDING_PROMPT,
            payload: {
                pendingPrompt: question
            }
        });
        
        setIsLoading(true);

        try {
            const { data, status } = await axios.post<RagResponse>(
                `/rag-response/${state.userId}?query=${question}&knowledge_base=${knowledgeBase}`
            );
            if (status === 200) {

                dispatch({
                    type: ActionTypes.UPDATE_CHAT,
                    payload: {
                        question,
                        answer: data
                    }

                })

                methods.resetField("message");
                // let referencesString: string = "";
                // references?.map(
                //     ({ topic, link }) => (referencesString += "\n" + topic + "\n" + link)
                //     // (referencesString += [link])
                // );
                //response += "\n" + referencesString;
                //const parsedResponse = { message: response };
                // setAnswers([...answers, [question, parsedResponse]]);
            } else {
                // throw error;
            }
        } catch (error) {
            console.error(`Chat Error: ${error}`);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction 
                altText="Try again"
                onClick={onSubmit}
                >Try again</ToastAction>
            })
            // setError(error);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="sticky bottom-0 max-w-[920px] w-full md:left-[calc(50%+310px)] bg-white dark:bg-[hsl(0,2%,6.5%)]">
            <Form {...methods}>
                <form
                    id="message-form"
                    method="POST"
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="p-2 m-5 mt-0 flex rounded-2xl"
                >
                    <FormField
                        control={methods.control}
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
                                        className="flex-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-end ml-3">
                        <Button
                            type="submit"
                            className="rounded-[0.625rem] p-2"
                            disabled={isLoading}
                        >
                            <Send />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form >
            </Form>
        </div>
    )
}