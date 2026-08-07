export default function AuthLayout({
    children,
    title,
    subtitle,
    error,
}) {
    return (
        <div
            className="
                relative
                flex min-h-screen
                items-center justify-center
                overflow-hidden
                bg-gradient-hero
                px-4 py-10

                sm:px-6
                sm:py-8
            "
        >
            {/* Blob decorativo superior izquierdo */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-20
                    -top-20
                    h-80
                    w-80
                    rounded-full
                    bg-white
                    opacity-[0.04]

                    max-[480px]:hidden
                "
            />

            {/* Blob decorativo inferior derecho */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-16
                    -right-16
                    h-96
                    w-96
                    rounded-full
                    bg-primary-light
                    opacity-[0.08]

                    max-[480px]:hidden
                "
            />

            {/* Card */}
            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-[440px]
                    rounded-3xl
                    bg-background-paper
                    px-6
                    py-8
                    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                    animate-slide-up

                    sm:px-8
                    sm:py-10

                    max-[480px]:rounded-2xl
                "
            >
                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div
                        className="
                            flex
                            h-[52px]
                            w-[52px]
                            items-center
                            justify-center
                            rounded-[14px]
                            bg-gradient-to-br
                            from-text-primary
                            to-primary
                            shadow-[0_8px_20px_rgba(22,160,133,0.3)]
                        "
                    >
                        <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Header */}
                <div className="mb-7 text-center">
                    <h1
                        className="
                            mb-1.5
                            text-[22px]
                            font-medium
                            leading-tight
                            text-text-primary
                        "
                    >
                        {title}
                    </h1>

                    <p className="text-sm text-text-secondary">
                        {subtitle}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div
                        role="alert"
                        className="
                            mb-5
                            flex
                            items-center
                            gap-2
                            rounded-[10px]
                            border
                            border-error/20
                            bg-error/[0.08]
                            px-3.5
                            py-2.5
                            text-[13px]
                            text-error
                        "
                    >
                        <svg
                            width="15"
                            height="15"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="shrink-0"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>{error}</span>
                    </div>
                )}

                {/* Content */}
                {children}
            </div>
        </div>
    );
}