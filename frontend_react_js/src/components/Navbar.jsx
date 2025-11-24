import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

/**
 * PUBLIC_INTERFACE
 * Minimal, responsive Navbar for Word Counter.
 * - Left: App title ("Word Counter").
 * - Right: 3 short links (Home, How it works, GitHub).
 * - Collapses to a compact menu on mobile.
 * - Consistent with #3b82f6/#06b6d4 light theme.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Closes menu when clicking outside or Escape is pressed
  useEffect(() => {
    function onDocClick(e) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    function onEscape(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  // Styling
  const styles = {
    navWrap: {
      width: "100%",
      background: "#fff",
      borderBottom: "1.5px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(59,130,246,0.045)",
      position: "sticky",
      top: 0,
      zIndex: 30,
      minHeight: 54,
    },
    nav: {
      maxWidth: 940,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: 52,
      padding: "0 1.25em",
    },
    title: {
      color: "#3b82f6",
      fontWeight: 800,
      fontSize: "1.29rem",
      letterSpacing: ".01em",
      margin: 0,
      textDecoration: "none",
      userSelect: "none"
    },
    navList: {
      display: "flex",
      alignItems: "center",
      gap: "0.30rem"
    },
    navLink: {
      color: "#3b82f6",
      background: "none",
      border: "none",
      padding: "5px 14px",
      margin: 0,
      fontWeight: 600,
      fontSize: "1.002em",
      borderRadius: "6px",
      transition: "background 0.16s, color 0.16s",
      textDecoration: "none",
      cursor: "pointer",
      outline: "none"
    },
    githubBtn: {
      color: "#fff",
      background: "#06b6d4",
      border: "none",
      padding: "5px 15px",
      marginLeft: "0.22em",
      fontWeight: 600,
      fontSize: "1em",
      borderRadius: "6px",
      textDecoration: "none",
      transition: "background 0.16s, color 0.16s",
      boxShadow: "0 1px 6px rgba(6,182,212,0.09)",
      outline: "none"
    },
    mobileBtn: {
      background: "none",
      border: "none",
      color: "#3b82f6",
      fontSize: "2rem",
      padding: "0.28em 0.38em",
      display: "flex",
      alignItems: "center",
      borderRadius: "6px",
      transition: "background 0.16s",
      cursor: "pointer",
      outline: "none",
    },
    mobileMenu: {
      position: "absolute",
      top: "100%",
      right: 14,
      minWidth: 150,
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 9,
      marginTop: 7,
      boxShadow: "0 8px 28px rgba(59,130,246,0.09)",
      zIndex: 1001,
      padding: "0.7rem 0.2rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.2rem",
      animation: "navbarSlideDown 0.17s cubic-bezier(.53,.01,.4,1)"
    }
  };

  // For client-side routing fallback if react-router added in future, currently we use simple anchor.
  // If more complex routing comes, replace <a> with <Link>.
  return (
    <nav
      aria-label="Main navigation"
      style={styles.navWrap}
      className="kavia-navbar"
      data-testid="navbar"
    >
      <style>{`
        .kavia-navbar {
          font-family: inherit;
          box-sizing: border-box;
        }
        @media (max-width: 680px) {
          .nav-list-desktop {
            display: none !important;
          }
          .navbar-mobile-btn {
            display: flex !important;
          }
        }
        @media (min-width: 681px) {
          .navbar-mobile-btn {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .kavia-navbar-title {
            font-size: 1.03rem !important;
          }
        }
        .kavia-navbar-menu-panel:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 3px;
        }
        @keyframes navbarSlideDown {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      <div style={styles.nav}>
        <a
          href="/"
          style={styles.title}
          className="kavia-navbar-title"
          tabIndex={0}
          aria-label="Go to home"
        >
          Word Counter
        </a>
        {/* Desktop nav */}
        <ul style={styles.navList} className="nav-list-desktop">
          <li>
            <a
              href="/"
              style={styles.navLink}
              aria-label="Home"
              tabIndex={0}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#how"
              style={styles.navLink}
              aria-label="How it works"
              tabIndex={0}
            >
              How it works
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.githubBtn}
              aria-label="GitHub repo"
              tabIndex={0}
            >
              GitHub
            </a>
          </li>
        </ul>
        {/* Mobile hamburger button */}
        <button
          type="button"
          ref={menuBtnRef}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="navbar-mobile-btn"
          style={styles.mobileBtn}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu-panel"
          tabIndex={0}
          onClick={() => setMenuOpen(x => !x)}
          data-testid="navbar-menu-btn"
        >
          {menuOpen ? (
            <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>✕</span>
          ) : (
            <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>☰</span>
          )}
        </button>
        {/* Mobile menu panel */}
        {menuOpen && (
          <div
            id="navbar-menu-panel"
            className="kavia-navbar-menu-panel"
            ref={menuRef}
            style={styles.mobileMenu}
            role="menu"
            aria-label="Mobile navigation"
            tabIndex={-1}
            data-testid="navbar-mobile-menu"
          >
            <a
              href="/"
              aria-label="Home"
              style={{ ...styles.navLink, marginBottom: 2, width: "100%" }}
              tabIndex={0}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#how"
              aria-label="How it works"
              style={{ ...styles.navLink, marginBottom: 2, width: "100%" }}
              tabIndex={0}
              onClick={() => setMenuOpen(false)}
            >
              How it works
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repo"
              style={{ ...styles.githubBtn, marginBottom: 0, width: "100%" }}
              tabIndex={0}
              onClick={() => setMenuOpen(false)}
            >
              GitHub
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
