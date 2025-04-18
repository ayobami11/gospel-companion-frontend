"use client"

import { useRouter } from "next/navigation";

import { useFormContext } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

export const KnowledgeBase = () => {

    const router = useRouter();

    const methods = useFormContext();

    return (
        <Form {...methods}>
            <FormField
                control={methods.control}
                name="knowledgeBase"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-[180px] dark:border-[hsl(0,0%,23%)]">
                                    <SelectValue placeholder="Knowledge base" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem
                                    value="e"
                                    onClick={() => router.push("?knowledge_base=e")}
                                >Elementary</SelectItem>
                                <SelectItem
                                    value="j"
                                    onClick={() => router.push("?knowledge_base=j")}
                                >Junior</SelectItem>
                                <SelectItem
                                    value="s"
                                    onClick={() => router.push("?knowledge_base=s")}
                                >Senior</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    );
}