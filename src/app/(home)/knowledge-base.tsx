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

import { FormType } from "@/app/(home)/message-form";

export const KnowledgeBase = ({ form }: FormType) => {

    // const form = useForm<z.infer<typeof messageFormSchema>>({
    //     resolver: zodResolver(messageFormSchema),
    //     defaultValues: {
    //         message: ""
    //     },
    // });

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="knowledgeBase"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Knowledge base" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="elementary">Elementary</SelectItem>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    );
}