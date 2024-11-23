import Link from "next/link";

import LoginForm from "./LoginForm";


const LoginPage = () => {
    return (
        <div className="max-w-[600px] mt-8 mb-16 mx-auto px-4">
            <header className="text-center mb-12">
                <h2 className="font-bold text-[2rem] mb-4 leading-9">Welcome Back!</h2>
                <p className="text-[hsl(0,0%,54%)]">Enter your details to sign in.</p>
            </header>
            <main className="text-lg">

                <LoginForm />

                <p className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="hover:underline"
                    >Create Account</Link>
                </p>
            </main>
        </div>
    )
}

export default LoginPage;