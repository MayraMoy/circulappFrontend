import LoginFields from "./LoginFields";
import LoginSubmit from "./LoginSubmit";

export default function LoginForm({
    email,
    password,
    showPassword,
    isLoading,

    setEmail,
    setPassword,
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
                showPassword={showPassword}
                setEmail={setEmail}
                setPassword={setPassword}
                setShowPassword={setShowPassword}
            />

            <LoginSubmit isLoading={isLoading} />
        </form>
    );
}