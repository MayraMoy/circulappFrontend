import RegisterFields from "./RegisterFields";
import PasswordFields from "./PasswordFields";
import RegisterSubmit from "./RegisterSubmit";

export default function RegisterForm({
    name,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,

    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    handleSubmit,
}) {
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <RegisterFields
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
            />

            <PasswordFields
                password={password}
                confirmPassword={confirmPassword}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
            />

            <RegisterSubmit
                isLoading={isLoading}
            />
        </form>
    );
}