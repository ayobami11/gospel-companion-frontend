"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import * as Realm from "realm-web";

const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID as string });

const Header = () => {

    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        if (app.currentUser) {
            await app.currentUser.logOut();
            router.push("/auth/login");
        } else {
            // alert "No logged-in user"
        }
    };

    return (
        <header className="bg-white text-[hsl(0,0%,8%)] dark:text-white dark:bg-[hsl(0,0%,9%)] p-4 sticky top-0" role="banner">
            <div className="flex items-center justify-between">
                <Link href="/" className="font-bold">
                    Gospel Companion
                </Link>
                {/* no need to show "Sign Up" on the header when on the auth path or a user is available */}
                {pathname !== "/auth" && !app?.currentUser && (
                    <Link
                        href="/auth/signup"
                        className="cursor-pointer hover:text-blue-500"
                    >
                        Sign Up
                    </Link>
                )}
                {app.currentUser && <span>Welcome, {app.currentUser?.profile?.email}</span>}
                {app.currentUser && (
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-red-500"
                    >
                        Log Out
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header