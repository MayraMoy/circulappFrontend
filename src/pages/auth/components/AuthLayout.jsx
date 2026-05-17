import "./AuthLayout.css";

export default function AuthLayout({ children, title, subtitle, error }) {
    return (
        <div className="auth-wrapper">
            {/* Blobs decorativos */}
            <div className="auth-blob-1" />
            <div className="auth-blob-2" />

            {/* Card */}
            <div className="auth-card">

                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-inner">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Header */}
                <div className="auth-header">
                    <h1 className="auth-title">
                        {title}
                    </h1>
                    <p className="auth-subtitle">
                        {subtitle}
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="auth-error">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}
