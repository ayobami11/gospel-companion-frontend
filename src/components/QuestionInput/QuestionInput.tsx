import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Stack, TextField } from "@fluentui/react";
import { Button, Tooltip, Field, Textarea } from "@fluentui/react-components";
import { Send28Filled } from "@fluentui/react-icons";

import { z } from "zod";

import { toast } from "@/hooks/use-toast";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

import { SendHorizontal } from "lucide-react";

import styles from "./QuestionInput.module.css";

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    initQuestion?: string;
    placeholder?: string;
    clearOnSend?: boolean;
}

const MessageFormSchema = z.object({
    // level: z.enum(["ONE", "TWO", "THREE", "FOUR", "FIVE"], {
    //     message: "Invalid level.",
    //     required_error: "Please select a level."
    // }),
    question: z.string().min(1, {
        message: "Question is required.",
    }).max(1000, {
        message: "Question cannot exceed 1000 characters."
    }).trim()
}).required();

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, initQuestion }: Props) => {
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
        initQuestion && setQuestion(initQuestion);
    }, [initQuestion]);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const { instance } = useMsal();
    const disableRequiredAccessControl = false; //requireAccessControl && !isLoggedIn(instance);
    const sendQuestionDisabled = disabled || !question.trim() || disableRequiredAccessControl;

    if (disableRequiredAccessControl) {
        placeholder = "Please login to continue...";
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {
            const parsedMessageForm = MessageFormSchema.parse({ question });
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
        <form
            id="message-form"
            onSubmit={handleSubmit}
            className="bg-white border border-[hsl(0,0%,92%)] rounded-xl overflow-hidden flex items-center gap-2 p-2 dark:border-[hsl(0,0%,18%)] dark:bg-[hsl(0,0%,23%)]"
        >
            <TextField
                className="w-full bg-red-500"
                disabled={disableRequiredAccessControl}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
                />
            {/* <AutosizeTextarea
                id="question"
                minHeight={35}
                maxHeight={200}
                placeholder={placeholder}
                value={question}
                // onChange={onQuestionChange}
                // onKeyDown={onEnterPress}
                onChange={(event) => setQuestion(event.target.value)}
                // disabled={disableRequiredAccessControl}
                className={`${styles.questionInputTextArea} resize-none`}
            // className="flex-1 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
            /> */}
            {/* <button
                type="submit"
                className="rounded-[0.625rem] p-2 self-end"
            >
                <SendHorizontal className="text-[#7376e1]" />
                <span className="sr-only">Send message</span>
            </button> */}
            <div className={styles.questionInputButtonsContainer}>
                <Tooltip content="Ask question button" relationship="label">
                    <Button size="large" icon={<Send28Filled primaryFill="rgba(115, 118, 225, 1)" />} disabled={sendQuestionDisabled} onClick={sendQuestion} />
                </Tooltip>
            </div>
        </form>
    );
};
