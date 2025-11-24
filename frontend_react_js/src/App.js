import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./components/Button";
import Navbar from "./components/Navbar";

/**
 * PUBLIC_INTERFACE
 * Real-Time Word Counter App
 * A modern, centered layout with accessible textarea,
 * live word/character stats, copy-to-clipboard functionality,
 * and a light theme with #3b82f6 and #06b6d4 accents.
 */
function App() {
  // Theme state for supporting dark toggle in template, default to light
  const [theme, setTheme] = useState("light");
  const [text, setText] = useState("");
  const [copyStatus, setCopyStatus] = useState(""); // Success indicator for Copy
  const copyTimeout = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Clean up copy status timeout if component unmounts
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, [theme]);

  // PUBLIC_INTERFACE
  // Toggles between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Utility function to accurately count words, trimming multiple spaces/newlines
  // PUBLIC_INTERFACE
  function countWords(txt) {
    return txt
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .length;
  }

  // PUBLIC_INTERFACE
  function countChars(txt) {
    return txt.length;
  }

  // PUBLIC_INTERFACE
  function countCharsNoSpaces(txt) {
    return txt.replace(/\s/g, "").length;
  }

  // PUBLIC_INTERFACE
  // Handles changes in textarea and updates text state
  function handleChange(e) {
    setText(e.target.value);
  }

  // PUBLIC_INTERFACE
  // Copies textarea content to clipboard with visual feedback
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied!");
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopyStatus(""), 1500);
    } catch {
      setCopyStatus("Copy failed");
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopyStatus(""), 1500);
    }
  }

  // Theme color override for accents and primary
  const primary = "#3b82f6";
  const success = "#06b6d4";

  // Styles for the accent colors are now in Button component.

  return (
    <div className="App" style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Navbar at very top */}
      <Navbar />
      <header
        className="App-header"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f9fafb 60%, #e0ecfb 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1rem"
        }}
      >
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <h1
          style={{
            color: primary,
            fontWeight: 800,
            fontSize: "2.25rem",
            margin: "0 0 0.5rem 0",
            letterSpacing: "0.01em",
            textAlign: "center"
          }}
        >
          Real-Time Word Counter
        </h1>
        <p
          id="how"
          style={{
            fontSize: "1.05rem",
            color: "#64748b",
            margin: "0 0 2rem 0",
            maxWidth: "480px",
            textAlign: "center"
          }}
        >
          Type or paste text below. See live counts for <b>words</b>, <b>characters</b>, and more. Copy your text with one click.
        </p>
        <form
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: "1.5rem"
          }}
          autoComplete="off"
          onSubmit={e => e.preventDefault()} // prevents page reload on submit
        >
          <label htmlFor="main-textarea" style={{
            width: "100%",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "#111827",
            letterSpacing: "0.02em",
            fontSize: "1.15rem"
          }}>
            Enter your text:
          </label>
          <textarea
            id="main-textarea"
            aria-label="Text input for word count"
            name="textarea"
            value={text}
            onChange={handleChange}
            rows={8}
            style={{
              resize: "vertical",
              minHeight: "200px",
              fontSize: "1.17rem",
              padding: "1rem",
              border: `1.5px solid ${primary}`,
              borderRadius: "12px",
              outline: "none",
              fontFamily:
                "inherit, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'",
              boxShadow:
                "0 2px 8px rgba(59,130,246,0.09)",
              background: "#fff",
              color: "#111827",
              marginBottom: "0.5rem"
            }}
            required
            spellCheck="true"
            autoFocus
          />

          <div
            role="region"
            aria-live="polite"
            style={{
              background: "#f8fafc",
              border: "1px solid #e3e8f0",
              borderRadius: "10px",
              padding: "1rem",
              margin: "0 0 0.25rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
              fontSize: "1.08rem",
              boxShadow: "0 0.5px 2.5px 0.3px #e4f0fe"
            }}
          >
            <div>
              <span>
                <strong style={{ color: primary }}>{countWords(text)}</strong>
              </span>{" "}
              word{text && countWords(text) !== 1 ? "s" : ""}
              &nbsp;&middot;&nbsp;
              <span>
                <strong style={{ color: primary }}>{countChars(text)}</strong>
              </span>{" "}
              characters (with spaces)
              &nbsp;&middot;&nbsp;
              <span>
                <strong style={{ color: success }}>{countCharsNoSpaces(text)}</strong>
              </span>{" "}
              characters (without spaces)
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="button"
              variant={copyStatus ? "success" : "primary"}
              size="md"
              aria-label="Copy all text to clipboard"
              onClick={handleCopy}
            >
              {copyStatus ? copyStatus : "Copy"}
            </Button>
          </div>
        </form>
        <div
          style={{
            marginTop: "3rem",
            fontSize: "0.97rem",
            color: "#afb7c4",
            textAlign: "center"
          }}
        >
          <span>
            Real-Time Word Counter &bull; Built with React &mdash;{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: primary,
                textDecoration: "underline",
                fontWeight: 500
              }}
              tabIndex={0}
            >
              Source
            </a>
          </span>
        </div>
      </header>
    </div>
  );
}

export default App;
