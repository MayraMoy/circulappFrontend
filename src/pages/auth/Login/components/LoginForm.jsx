import LoginFields from "./LoginFields";
import LoginSubmit from "./LoginSubmit";

export default function LoginForm({
    email,
    password,
    rememberMe,
    showPassword,
    isLoading,

    setEmail,
    setPassword,
    setRememberMe,
    setShowPassword,

    handleSubmit,
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <LoginFields
                email={email}
                password={password}
                rememberMe={rememberMe}
                showPassword={showPassword}
                setEmail={setEmail}
                setPassword={setPassword}
                setRememberMe={setRememberMe}
                setShowPassword={setShowPassword}
            />

            <LoginSubmit isLoading={isLoading} />
        </form>
    );
}