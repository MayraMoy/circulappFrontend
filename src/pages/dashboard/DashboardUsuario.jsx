import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import Layout from "../../components/Layout/Layout";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import ErrorToast from "../../components/feedback/ErrorToast";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";

import {
    IconBox,
    IconCheck,
    IconClock,
    IconPackage,
    IconPin,
    IconPlus,
    IconSearch,
    IconChevron,
    IconImagePlaceholder,
    IconLeaf
} from "../../components/Icons";
import StateBadge from "../../components/badges/StateBadge";
import "./Dashboard.css"; 

/* ── categoryNames ─────────────────────────────────────────── */
const categoryNames = {
    plastico: "Plástico", papel: "Papel y Cartón", vidrio: "Vidrio",
    metal: "Metal", textil: "Textil", electronico: "Electrónico", otro: "Otro",
};

const DashboardUsuario = () => {
    const { user }   = useContext(AuthContext);
    const navigate   = useNavigate();
    const { error, isLoading, handleAsync, clearError } = useErrorHandler();

    const [myItems, setMyItems]         = useState([]);
    const [nearbyItems, setNearbyItems] = useState([]);
    const [stats, setStats]             = useState({ totalPublished: 0, totalValidated: 0, impactScore: 0 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            await handleAsync(async () => {
                const myRes = await API.get(`/items?ownerId=${user.id}`);
                setMyItems(myRes.data);

                const nearbyRes = await API.get("/items?limit=6");
                setNearbyItems(nearbyRes.data.filter((item) => item.ownerId?._id !== user.id));

                setStats({
                    totalPublished: myRes.data.length,
                    totalValidated: myRes.data.filter((i) => i.processingState === "validado").length,
                    impactScore: myRes.data.length * 10,
                });
            });
        };
        if (user) fetchDashboardData();
    }, [user, handleAsync]);

    if (!user) return null;

    const statCards = [
        {
            label: "Publicados",
            value: stats.totalPublished,
            sub: "materiales totales",
            accent: "var(--secondary)",
            iconBg: "rgba(243,156,18,0.12)",
            iconColor: "var(--secondary-dark)",
            icon: <IconBox />,
        },
        {
            label: "Validados",
            value: stats.totalValidated,
            sub: "aprobados",
            accent: "var(--success)",
            iconBg: "rgba(39,174,96,0.12)",
            iconColor: "var(--success)",
            icon: <IconCheck />,
        },
        {
            label: "En proceso",
            value: stats.totalPublished - stats.totalValidated,
            sub: "pendientes",
            accent: "var(--accent)",
            iconBg: "rgba(142,68,173,0.12)",
            iconColor: "var(--accent)",
            icon: <IconClock />,
        },
    ];

    return (
        <Layout>
            <ErrorToast error={error} onClose={clearError} />

            <div className="dashboard-wrapper">
                <div className="dashboard-inner">

                    {/* ── Hero banner ─────────────────────────────────── */}
                    <div className="hero-banner">
                        {/* Círculos decorativos */}
                        <div className="hero-banner-deco" />
                        <div className="hero-banner-deco-2" />

                        <div style={{ position: "relative" }}>
                            <h1 className="hero-title">¡Hola, {user.name}!</h1>
                            <p className="hero-sub">Bienvenido de vuelta a Circulapp</p>
                        </div>

                        <div className="impact-pill" style={{ position: "relative" }}>
                            <div style={{ color: "#A8F0C6" }}>
                                <IconLeaf />
                            </div>
                            <div>
                                <p className="impact-label">Impacto ambiental</p>
                                <p className="impact-score">{stats.impactScore} pts</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Stat cards ──────────────────────────────────── */}
                    <div className="stat-grid">
                        {statCards.map(({ label, value, sub, accent, iconBg, iconColor, icon }) => (
                            <div
                                key={label}
                                className="stat-card"
                                style={{ borderTop: `3px solid ${accent}` }}
                            >
                                <div className="stat-icon-wrap" style={{ background: iconBg, color: iconColor }}>
                                    {icon}
                                </div>
                                <p className="stat-value">{value}</p>
                                <p className="stat-label">{label}</p>
                                <p className="stat-sub">{sub}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Main grid ───────────────────────────────────── */}
                    <div className="main-grid">

                        {/* Mis productos recientes */}
                        <div className="section-card">
                            <div className="section-header">
                                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                    <div className="section-icon-wrap"><IconPackage /></div>
                                    <h2 className="section-title">Mis productos recientes</h2>
                                </div>
                                <button className="link-btn" onClick={() => navigate("/profile?tab=products")}>
                                    Ver todos <IconChevron />
                                </button>
                            </div>

                            {myItems.length === 0 ? (
                                <div className="empty-box">
                                    <div className="empty-icon"><IconImagePlaceholder /></div>
                                    <p className="empty-text">No publicaste ningún material aún.</p>
                                    <button className="publish-cta" onClick={() => navigate("/publish")}>
                                        Publicar tu primer material
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {myItems.slice(0, 3).map((item) => (
                                        <div
                                            key={item._id}
                                            className="item-row"
                                            onClick={() => navigate(`/items/${item._id}`)}
                                        >
                                            {item.images?.[0] ? (
                                                <img src={item.images[0]} alt={item.title}
                                                    style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                                            ) : (
                                                <div className="img-thumb"><IconImagePlaceholder /></div>
                                            )}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p className="item-title">{item.title}</p>
                                                <p className="item-subtitle">
                                                    {categoryNames[item.category] || item.category}
                                                </p>
                                            </div>
                                            <StateBadge state={item.processingState} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="section-divider">
                                <button className="footer-btn primary" onClick={() => navigate("/publish")}>
                                    <IconPlus /> Publicar nuevo material
                                </button>
                            </div>
                        </div>

                        {/* Cerca de ti */}
                        <div className="section-card">
                            <div className="section-header">
                                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                    <div className="section-icon-wrap"><IconPin /></div>
                                    <h2 className="section-title">Cerca de ti</h2>
                                </div>
                                <button className="link-btn" onClick={() => navigate("/search")}>
                                    Ver más <IconChevron />
                                </button>
                            </div>

                            {isLoading ? (
                                <LoadingSpinner message="Buscando materiales cercanos..." />
                            ) : nearbyItems.length === 0 ? (
                                <div className="empty-box">
                                    <div className="empty-icon"><IconSearch /></div>
                                    <p className="empty-text">No hay materiales disponibles cerca.</p>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    {nearbyItems.slice(0, 3).map((item) => (
                                        <div
                                            key={item._id}
                                            className="item-row"
                                            onClick={() => navigate(`/items/${item._id}`)}
                                        >
                                            {item.images?.[0] ? (
                                                <img src={item.images[0]} alt={item.title}
                                                    style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                                            ) : (
                                                <div className="img-thumb"><IconImagePlaceholder /></div>
                                            )}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p className="item-title">{item.title}</p>
                                                <p className="item-subtitle">
                                                    {categoryNames[item.category] || item.category}
                                                </p>
                                                <p className="item-subtitle" style={{ margin: 0 }}>
                                                    Por: {item.ownerId?.name || "Usuario"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="section-divider">
                                <button className="footer-btn secondary" onClick={() => navigate("/search")}>
                                    <IconSearch /> Explorar materiales
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default DashboardUsuario;