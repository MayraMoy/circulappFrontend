import UserIcon from "../../icons/UserIcon";
import MailIcon from "../../icons/MailIcon";

const fieldClasses = `
    flex items-center gap-2.5
    rounded-xl
    border border-gray-300
    bg-background
    px-3.5 py-2.5
    transition-all duration-200
    focus-within:border-primary
    focus-within:bg-background-paper
    focus-within:ring-4
    focus-within:ring-primary/10
`;

const inputClasses = `
    min-w-0 flex-1
    border-none
    bg-transparent
    text-sm
    text-text-primary
    outline-none
    placeholder:text-gray-400
`;

const labelClasses = `
    mb-1.5 block
    text-[11px]
    font-medium
    uppercase
    tracking-[0.06em]
    text-text-secondary
`;

export default function RegisterFields({
    name,
    email,
    setName,
    setEmail,
}) {
    return (
        <>
            {/* Nombre */}
            <div>
                <label
                    htmlFor="name"
                    className={labelClasses}
                >
                    Nombre completo
                </label>

                <div className={fieldClasses}>
                    <span className="flex shrink-0 text-text-secondary">
                        <UserIcon />
                    </span>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Tu nombre"
                        autoComplete="name"
                        required
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className={labelClasses}
                >
                    Correo electrónico
                </label>

                <div className={fieldClasses}>
                    <span className="flex shrink-0 text-text-secondary">
                        <MailIcon />
                    </span>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="nombre@correo.com"
                        autoComplete="email"
                        required
                        className={inputClasses}
                    />
                </div>
            </div>
        </>
    );
}