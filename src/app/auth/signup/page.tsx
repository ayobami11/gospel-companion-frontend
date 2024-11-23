import Link from "next/link";

import SignupForm from "./SignupForm";

const SignupPage = () => {
    return (
        <div className="max-w-[600px] mt-8 mb-16 mx-auto p-4">
            <header className="text-center mb-12">
                <h2 className="font-bold text-[2rem] mb-4 leading-9">Create Your Gospel Companion Account</h2>
                <p className="text-[hsl(0,0%,54%)]">A smart study tool tailored to your courses for academic guidance.</p>
            </header>
            <main className="text-lg">

                <SignupForm />

                <p className="text-center">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="hover:underline"
                    >Sign In</Link>
                </p>
            </main>
        </div>
    )
}

export default SignupPage;