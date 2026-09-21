import Link from "next/link";
import {
    Lock,
    ArrowLeft,
    Person,
} from "@gravity-ui/icons";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#171719] px-5 text-white">
            <div className="w-full max-w-md text-center">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Lock className="h-10 w-10 text-[#a78bfa]" />
                </div>

                {/* Error Code */}
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#a78bfa]">
                    403 Error
                </p>

                {/* Heading */}
                <h1 className="text-4xl font-bold tracking-tight">
                    Access Denied
                </h1>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-gray-400">
                    You don&apos;t have permission to access this page.
                    Please sign in with an authorized account and try again.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                    {/* Home */}
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/10 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Home
                    </Link>

                    {/* Sign In */}
                    <Link
                        href="/auth/signin"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7956f5] to-[#6854ee] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.02] hover:from-[#8868ff] hover:to-[#7564fa]"
                    >
                        <Person className="h-4 w-4" />
                        Sign In
                    </Link>

                </div>
            </div>
        </main>
    );
}