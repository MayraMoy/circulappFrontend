const styles = {
    field: (focused, name) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        border: `1px solid ${focused === name ? "var(--primary)" : "#DEE2E6"}`,
        borderRadius: "12px",
        background: focused === name
            ? "var(--background-paper)"
            : "var(--background)",
        boxShadow: focused === name
            ? "0 0 0 3px rgba(22,160,133,0.12)"
            : "none",
        transition: "all 0.2s",
    }),

    input: {
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: "14px",
        color: "var(--text-primary)",
    },

    label: {
        fontSize: "11px",
        fontWeight: 500,
        color: "var(--text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
    }
};

export default styles;