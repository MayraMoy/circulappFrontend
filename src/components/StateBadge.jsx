const StateBadge = ({ state }) => {
    const isValid = state === "validado";
    return (
        <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, flexShrink: 0,
            background: isValid ? "rgba(39,174,96,0.1)" : "rgba(241,196,15,0.15)",
            color: isValid ? "#1A7A3A" : "#9A7D0A",
            letterSpacing: "0.02em",
        }}>
            {isValid ? "✓ Validado" : "⏳ En revisión"}
        </span>
    );
};

export default StateBadge;
