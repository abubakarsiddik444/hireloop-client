import Link from "next/link";
import {
    ShieldExclamation,
    ArrowLeft,
    LayoutColumns,
} from "@gravity-ui/icons";

const ForbiddenPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111111] p-8 text-center shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                    <ShieldExclamation
                        width={42}
                        height={42}
                        className="text-red-500"
                    />
                </div>

                {/* Status */}
                <p className="mt-6 text-sm font-semibold tracking-wider text-red-500">
                    ERROR 403
                </p>

                {/* Title */}
                <h1 className="mt-2 text-3xl font-bold text-white">
                    Access Forbidden
                </h1>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                    You dont have permission to access this page.
                    Please contact an administrator if you believe
                    this is a mistake.
                </p>

                {/* Buttons */}
                <div className="mt-7 flex items-center justify-center gap-3">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
                    >
                        <LayoutColumns width={17} height={17} />
                        Go to Dashboard
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10"
                    >
                        <ArrowLeft width={17} height={17} />
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;