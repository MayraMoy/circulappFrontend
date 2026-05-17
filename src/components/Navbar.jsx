import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

// ── SVG Icons ──────────────────────────────────────────────────────────────────

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="4.75" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconPublish = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconBook = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3.5C2 2.67 2.67 2 3.5 2H8v12H3.5C2.67 14 2 13.33 2 12.5V3.5Z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 2h4.5C13.33 2 14 2.67 14 3.5v9c0 .83-.67 1.5-1.5 1.5H8V2Z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4.5 5.5h2M4.5 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M9.5 5.5h2M9.5 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconValidate = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.5L2 4v4c0 3.31 2.67 5.73 6 6.5 3.33-.77 6-3.19 6-6.5V4L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M5.5 8l1.75 1.75L10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconRecycle = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2L6.5 6H11.5L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M6.5 6L3 12H7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.5 6L15 12H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 12H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 14.5l1.5-2.5L10 14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 13c0-2.76 2.46-5 5.5-5s5.5 2.24 5.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 2H3a1 1 0 00-1 1v9a1 1 0 001 1h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M10 10.5L13 7.5L10 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 7.5H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Navbar ─────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard",  path: "/dashboard",   icon: <IconDashboard /> },
    { name: "Explorar",   path: "/search",       icon: <IconSearch />    },
    { name: "Publicar",   path: "/publish",      icon: <IconPublish />   },
    { name: "Educativo",  path: "/educational",  icon: <IconBook />      },
  ];

  if (user?.role === "gestor") {
    navItems.push({ name: "Validar", path: "/validate", icon: <IconValidate /> });
  }

  if (!user) return null;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--background-paper)",
        borderBottom: "0.5px solid color-mix(in srgb, var(--primary) 18%, transparent)",
        boxShadow: "0 1px 0 0 color-mix(in srgb, var(--primary) 6%, transparent)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <span
              className="text-[17px] font-medium tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              CirculApp
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-1.5 px-3 py-[7px] rounded-lg text-sm transition-all duration-150"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "color-mix(in srgb, var(--primary-light) 22%, transparent)"
                      : "transparent",
                    fontWeight: isActive ? 500 : 400,
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        "color-mix(in srgb, var(--primary-light) 12%, transparent)";
                      e.currentTarget.style.color = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "var(--primary)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 rounded-[10px] transition-all duration-150"
              style={{
                padding: "5px 10px 5px 5px",
                backgroundColor: showProfileMenu
                  ? "color-mix(in srgb, var(--primary-light) 15%, transparent)"
                  : "transparent",
                border: `0.5px solid ${
                  showProfileMenu
                    ? "color-mix(in srgb, var(--primary) 30%, transparent)"
                    : "transparent"
                }`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (!showProfileMenu) {
                  e.currentTarget.style.backgroundColor =
                    "color-mix(in srgb, var(--primary-light) 12%, transparent)";
                  e.currentTarget.style.border =
                    "0.5px solid color-mix(in srgb, var(--primary) 20%, transparent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!showProfileMenu) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.border = "0.5px solid transparent";
                }
              }}
            >
              {/* Avatar */}
              <div
                className="rounded-full flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0"
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: "var(--primary)",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="hidden md:block text-left">
                <div
                  className="text-[13px] font-medium leading-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user.name}
                </div>
                <div
                  className="text-[11px] capitalize"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {user.role}
                </div>
              </div>

              <span
                className="transition-transform duration-200"
                style={{
                  color: "var(--text-secondary)",
                  transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)",
                  display: "flex",
                }}
              >
                <IconChevron />
              </span>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div
                className="absolute right-0 mt-1.5 w-56 rounded-xl py-0 z-50 overflow-hidden"
                style={{
                  backgroundColor: "var(--background-paper)",
                  border: "0.5px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                  boxShadow:
                    "0 4px 16px color-mix(in srgb, var(--primary) 10%, transparent), 0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                {/* User info header */}
                <div
                  className="px-4 py-3"
                  style={{
                    borderBottom:
                      "0.5px solid color-mix(in srgb, var(--primary) 12%, transparent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--primary-light) 8%, var(--background-paper))",
                  }}
                >
                  <div
                    className="text-[14px] font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {user.name}
                  </div>
                  <div
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {user.email}
                  </div>
                </div>

                <button
                  onClick={() => { navigate("/profile"); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-2.5 transition-colors"
                  style={{ color: "var(--text-primary)", border: "none", background: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--primary-light) 12%, transparent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <span style={{ color: "var(--text-secondary)" }}><IconUser /></span>
                  Mi Perfil
                </button>

                <button
                  onClick={() => { navigate("/educational"); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-2.5 transition-colors"
                  style={{ color: "var(--text-primary)", border: "none", background: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--primary-light) 12%, transparent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <span style={{ color: "var(--text-secondary)" }}><IconBook /></span>
                  Material Educativo
                </button>

                <div
                  style={{
                    height: "0.5px",
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 12%, transparent)",
                  }}
                />

                <button
                  onClick={() => { handleLogout(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-2.5 transition-colors"
                  style={{ color: "var(--error)", border: "none", background: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "color-mix(in srgb, var(--error) 8%, transparent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <IconLogout />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className="md:hidden px-2 pb-2 flex justify-around"
          style={{
            borderTop:
              "0.5px solid color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center py-2 px-3 text-[10px] rounded-lg transition-all"
                style={{
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  backgroundColor: isActive
                    ? "color-mix(in srgb, var(--primary-light) 18%, transparent)"
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                  gap: 4,
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                <span style={{ display: "flex" }}>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;