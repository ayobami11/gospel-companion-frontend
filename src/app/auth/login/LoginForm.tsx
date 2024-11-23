"use client"

import { useRouter } from "next/navigation";

import * as Realm from "realm-web";

const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID as string });

import Link from "next/link";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

const loginSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email address."
    }).max(30, {
        message: "Email cannot exceed 30 characters."
    }).toLowerCase(),
    password: z.string().min(8, {
        message: "Password must contain at least 8 characters."
    }).max(64, {
        message: "Password cannot exceed 64 characters."
    }).regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter."
    }).regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter."
    }).regex(/\d/, {
        message: "Password must contain at least one digit."
    }).regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character."
    })
}).required();

export const login = async (email: string, password: string) => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const authedUser = await app.logIn(credentials);
    console.assert(authedUser.id === app.currentUser?.id);
    return authedUser;
};

const LoginForm = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);

        const { email, password } = values;
        const user = await login(email, password);

        if (user && Object.keys(user)) {
            router.push("/");
        }
    }


    return (
        <Form {...form}>
            <form
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mb-10"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                htmlFor="email"
                                className="font-medium"
                            >Email</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="example@email.com"
                                    className="py-5 rounded-xl"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel
                                htmlFor="current-password"
                                className="font-medium"
                            >Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        aria-describedby="password-constraints"
                                        autoComplete="current-password"
                                        id="current-password"
                                        placeholder="Enter password"
                                        className="py-5 pr-12 rounded-xl"
                                        {...field}
                                    />
                                    <Button
                                        type="button"
                                        id="toggle-password"
                                        aria-label="Show password as plain text. Warning: this will display your password on the screen."
                                        variant="ghost"
                                        size="icon"
                                        onClick={togglePasswordVisibility}
                                        disabled={form.getValues("password").length === 0}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full disabled:cursor-not-allowed"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                            />
                                        ) : (
                                            <EyeIcon
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                            />
                                        )}
                                        <span className="sr-only">{showPassword ? "Hide" : "Show"} password</span>
                                    </Button>
                                </div>
                            </FormControl>
                            <FormDescription id="password-constraints">
                                Password should contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character.
                            </FormDescription>
                            <FormMessage />
                            <p className="mb-8 text-right">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm hover:underline"
                                >Forgot password?</Link>
                            </p>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="font-semibold w-full p-4 rounded-xl"
                >Sign In</Button>
            </form>
        </Form>
    )
}

export default LoginForm;