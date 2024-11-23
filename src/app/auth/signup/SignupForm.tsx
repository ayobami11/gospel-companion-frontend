"use client"

import * as Realm from "realm-web";

import { login } from "@/app/auth/login/LoginForm";

const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID as string });
const redirectUrl = "http://localhost:5173";

import { useRouter } from "next/navigation";
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


const signupSchema = z.object({
    username: z.string().trim().min(1, {
        message: "Username must start with an alphabet."
    }).max(30, {
        message: "Username cannot exceed 30 characters."
    }).regex(/^[A-Za-z]/, {
        message: "Username must start with a letter."
    }).regex(/[A-Za-z0-9_]+$/, {
        message: "Username can only contain letters, digits and underscores."
    }).toLowerCase(),
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

const signup = async (email: string, password: string) => {
    try {
        await app.emailPasswordAuth.registerUser({ email, password });
        // log in automatically
        return login(email, password);
    } catch (error) {
        throw error;
    }
};

const signupGoogle = async () => {
    const user: Realm.User = await app.logIn(
        Realm.Credentials.google({ redirectUrl })
    );
    return user;
};

export const handleSignUpWithGoogle = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await signupGoogle();
};


const SignupForm = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    }

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof signupSchema>) {

        console.log(values);

        const { email, password } = values;
        let user = {};
        user = await signup(email, password);

        if (user && Object.keys(user)) {
            console.log("user: ", user);
            router.push("/");
        }
    }

    return (
        <Form {...form}>
            <form
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
                className="mb-10"
            >
                <div className="space-y-4 mb-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    htmlFor="username"
                                    className="font-medium"
                                >Username</FormLabel>
                                <FormControl>
                                    <Input
                                        id="username"
                                        placeholder="john.doe"
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
                                    htmlFor="new-password"
                                    className="font-medium"
                                >Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            aria-describedby="password-constraints"
                                            autoComplete="new-password"
                                            id="new-password"
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
                                    Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button type="submit" className="">
                        Sign Up
                    </Button>
                    <Button variant="outline" onClick={handleSignUpWithGoogle}>
                        Sign Up With Google
                    </Button>
                </div>
            </form >
        </Form >
    )
}

export default SignupForm;