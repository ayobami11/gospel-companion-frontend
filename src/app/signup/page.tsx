import Link from "next/link";

import SignupForm from "./SignupForm";

const SignupPage = () => {
    return (
        <div className="max-w-[600px] mt-8 mb-16 mx-[5%]">
            <header className="text-center">
                <h2 className="font-bold text-[2rem] mb-4 leading-9">Create Your SEES-GPT Account</h2>
                <p className="text-[hsl(0,0%,54%)]">A smart study tool tailored to your courses for academic guidance.</p>
            </header>
            <main className="text-lg mt-20">

                <SignupForm />

                <p className="text-center">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-green"
                    >Sign In</Link>
                </p>
            </main>
        </div>
    )
}

export default SignupPage;