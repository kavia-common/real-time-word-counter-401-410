import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

/**
 * PUBLIC_INTERFACE
 * Responsive, accessible Navbar for Real-Time Word Counter.
 * - App title (left), right-aligned actions (theme placeholder, info link).
 * - Collapsible menu on mobile.
 * - Uses Button component for actions.
 * - Light-theme, modern accent styling.
 */
function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleDocumentClick(e) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Keyboard focus on menu items
  useEffect(() => {
    if (open && menuRef.current) {
      // Focus first focusable child
      const firstBtn = menuRef.current.querySelector("button, a, [tabindex='0']");
      if (firstBtn) firstBtn.focus();
    }
  }, [open]);

  // Placeholder theme toggle handler
  function handleThemeClick() {
    // Could emit event or use context/hook in a real app
    alert("Theme switcher not implemented in navbar (see header button).");
  }

  // Navbar colors (matching style guide)
  const navbarStyles = {
    wrapper: {
      width: "100%",
      background: "#fff",
      borderBottom: "1.5px solid #e5e7eb",
      boxShadow: "0 2px 8px rgba(59,130,246,0.04)",
      position: "sticky",
      top: 0,
      zIndex: 20,
      minHeight: "60px",
      paddingLeft: 0,
      paddingRight: 0,
      transition: "background 0.23s, box-shadow 0.17s",
    },
    nav: {
      maxWidth: 980,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: "60px",
      padding: "0 1rem"
    },
    title: {
      color: "#3b82f6",
      fontWeight: 800,
      fontSize: "1.45rem",
      letterSpacing: ".01em",
      margin: 0
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    mobileMenuButton: {
      background: "none",
      border: "none",
      color: "#3b82f6",
      fontSize: "2rem",
      padding: "0.28em 0.38em",
      display: "flex",
      alignItems: "center",
      borderRadius: "7px",
      transition: "background 0.16s",
      cursor: "pointer",
      outline: "none",
    },
    // Expanded menu panel for mobile
    mobileMenuPanel: {
      position: "absolute",
      top: "100%",
      right: 12,
      minWidth: 180,
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      marginTop: 8,
      boxShadow: "0 8px 32px rgba(59,130,246,0.10)",
      zIndex: 1001,
      padding: "0.7rem 0.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      animation: "navbarSlideDown 0.18s ease",
    }
  };

  // Media query to hide/show actions for mobile
  // Using window.matchMedia isn't reliable in SSR; use CSS below.

  return (
    <nav
      aria-label="Main navigation"
      style={navbarStyles.wrapper}
      className="kavia-navbar"
      data-testid="navbar"
    >
      <style>{`
        .kavia-navbar {
          font-family: inherit;
          box-sizing: border-box;
        }
        @media (max-width: 660px) {
          .kavia-navbar-actions {
            display: none !important;
          }
          .kavia-navbar-mobile-btn {
            display: flex !important;
          }
        }
        @media (min-width: 661px) {
          .kavia-navbar-mobile-btn {
            display: none !important;
          }
        }
        @media (max-width: 459px) {
          .kavia-navbar-title {
            font-size: 1.1rem !important;
          }
        }
        .kavia-navbar-menu-panel:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 4px;
        }
        @keyframes navbarSlideDown {
          from { opacity: 0; transform: translateY(-6px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      <div style={navbarStyles.nav}>
        <a
          href="/"
          style={navbarStyles.title}
          className="kavia-navbar-title"
          tabIndex={0}
        >
          Real-Time Word Counter
        </a>
        {/* Desktop actions */}
        <div
          style={navbarStyles.actions}
          className="kavia-navbar-actions"
        >
          <Button
            variant="ghost"
            size="sm"
            aria-label="Switch theme"
            onClick={handleThemeClick}
          >
            <span aria-hidden="true" style={{ fontSize: "1.2em" }}>🌗</span>
            <span style={{ marginLeft: 6, fontWeight: 600, color: "#64748b" }}>Theme</span>
          </Button>
          <Button
            as="a"
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
            style={{ minWidth: 44 }}
            aria-label="Info or source"
          >
            <span aria-hidden="true" style={{ fontSize: "1.23em", marginRight: 5 }}>ℹ️</span>
            Info
          </Button>
        </div>
        {/* Mobile: menu button */}
        <button
          type="button"
          ref={menuButtonRef}
          aria-label={open ? "Close menu" : "Open menu"}
          className="kavia-navbar-mobile-btn"
          style={navbarStyles.mobileMenuButton}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="navbar-menu-panel"
          tabIndex={0}
          onClick={() => setOpen(o => !o)}
          data-testid="navbar-menu-btn"
        >
          {/* Hamburger (closed) or X (open) icon */}
          {open ? (
            <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>✕</span>
          ) : (
            <span aria-hidden="true" style={{ fontSize: "2.1rem" }}>☰</span>
          )}
        </button>
        {/* Mobile: menu panel */}
        {open && (
          <div
            id="navbar-menu-panel"
            className="kavia-navbar-menu-panel"
            ref={menuRef}
            style={navbarStyles.mobileMenuPanel}
            role="menu"
            aria-label="Mobile navigation"
            tabIndex={-1}
            data-testid="navbar-mobile-menu"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setOpen(false); handleThemeClick(); }}
              style={{ width: "100%", textAlign: "left" }}
              tabIndex={0}
            >
              <span aria-hidden="true" style={{ fontSize: "1.2em" }}>🌗</span>
              <span style={{ marginLeft: 7, color: "#64748b" }}>Theme</span>
            </Button>
            <Button
              as="a"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              tabIndex={0}
              style={{ width: "100%", textAlign: "left", marginTop: 3 }}
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true" style={{ fontSize: "1.17em", marginRight: 7 }}>ℹ️</span>
              Info
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
