const strengthLevels = [
    { label: "Muy débil",   color: "var(--error)"     },
    { label: "Débil",       color: "var(--warning)"   },
    { label: "Regular",     color: "var(--secondary)" },
    { label: "Fuerte",      color: "var(--success)"   },
    { label: "Muy fuerte",  color: "var(--success)"   },
];

const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8)          score++;
    if (/[A-Z]/.test(pwd))        score++;
    if (/[0-9]/.test(pwd))        score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return { score, ...strengthLevels[score] };
};

const PasswordStrength = ({ password }) => {
    const { score, label, color } = getStrength(password);
    if (!password) return null;

    return (
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        style={{
                            height: "4px",
                            flex: 1,
                            borderRadius: "99px",
                            background: i <= score ? color : "#E9ECEF",
                            transition: "background 0.3s",
                        }}
                    />
                ))}
            </div>
            <p style={{ fontSize: "12px", fontWeight: 500, color, margin: 0 }}>{label}</p>
        </div>
    );
};

export default PasswordStrength;
