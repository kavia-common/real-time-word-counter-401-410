import React from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * Reusable accessible Button component supporting
 * variants, sizes, loading, icons, fullWidth, and improved accessibility.
 *
 * @typedef {Object} ButtonProps
 * @property {'primary'|'secondary'|'success'|'ghost'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {boolean} [disabled]
 * @property {boolean} [loading] - When true, disables and shows spinner.
 * @property {boolean} [fullWidth] - Stretch button to container's width.
 * @property {React.ReactNode} [leftIcon] - Icon rendered left of children.
 * @property {React.ReactNode} [rightIcon] - Icon rendered right of children.
 * @property {function} [onClick]
 * @property {'button'|'submit'|'reset'} [type]
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {...any} rest
 */

/**
 * PUBLIC_INTERFACE
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  // Theme colors (hardcoded for direct style application)
  const VAR_COLORS = {
    "--btn-primary-bg": "#3b82f6",
    "--btn-success-bg": "#06b6d4",
    "--btn-secondary": "#64748b",
    "--btn-txt": "#fff",
    "--btn-focus": "#2563eb",
  };

  // Variant styles
  const getVariantStyles = (v) => {
    switch (v) {
      case "primary":
        return {
          background: "var(--btn-primary-bg, #3b82f6)",
          color: VAR_COLORS["--btn-txt"],
          border: "none",
        };
      case "success":
        return {
          background: "var(--btn-success-bg, #06b6d4)",
          color: VAR_COLORS["--btn-txt"],
          border: "none",
        };
      case "secondary":
        return {
          background: "transparent",
          color: "var(--btn-secondary, #64748b)",
          border: "1.5px solid var(--btn-secondary, #64748b)",
        };
      case "ghost":
        return {
          background: "transparent",
          color: "var(--btn-primary-bg, #3b82f6)",
          border: "1.5px solid transparent",
        };
      default:
        return {};
    }
  };

  // Size styles
  const getSizeStyles = (s) => {
    switch (s) {
      case "sm":
        return {
          fontSize: "0.96rem",
          padding: "0.38rem 0.95rem",
          borderRadius: "6px",
        };
      case "lg":
        return {
          fontSize: "1.18rem",
          padding: "0.7rem 1.8rem",
          borderRadius: "10px",
        };
      case "md":
      default:
        return {
          fontSize: "1.05rem",
          padding: "0.57rem 1.3rem",
          borderRadius: "8px",
        };
    }
  };

  // Inline spinner component (indeterminate, accessible)
  const Spinner = () => (
    <span
      className="btn-spinner"
      role="status"
      aria-live="off"
      aria-label="Loading"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        width: size === "sm" ? "1.1em" : size === "lg" ? "1.4em" : "1.2em",
        height: size === "sm" ? "1.1em" : size === "lg" ? "1.4em" : "1.2em",
        marginRight: children ? "0.6em" : 0,
        marginLeft: !children ? "0.15em" : 0,
        color: "currentColor",
      }}
      data-testid="btn-spinner"
    >
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        style={{ display: "block" }}
      >
        <circle
          cx="16"
          cy="16"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="4"
        />
        <path
          d="M28 16a12 12 0 00-12-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="50"
          strokeDashoffset="30"
          style={{ opacity: 0.9 }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
  );

  // Accessibility: manage focus ring for keyboard navigation
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const buttonRef = React.useRef();

  // Handler for focus ring
  React.useEffect(() => {
    const node = buttonRef.current;
    if (!node) return;
    function handleKeyDown(e) {
      if (e.key === "Tab" || e.key === "Shift") setIsFocusVisible(true);
    }
    function handleMouseDown() {
      setIsFocusVisible(false);
    }
    node.addEventListener("keydown", handleKeyDown);
    node.addEventListener("mousedown", handleMouseDown);
    return () => {
      node.removeEventListener("keydown", handleKeyDown);
      node.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Full width styles
  const fullWidthStyle = fullWidth ? { width: "100%", display: "block" } : {};

  // Compose className for focus-visible
  const composedClassName = [
    "kavia-btn",
    className || "",
    isFocusVisible ? "focus-visible" : "",
    loading ? "loading" : "",
    fullWidth ? "btn-full-width" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Compose icon wrappers for spacing/accessibility
  const renderIcon = (icon, side) => {
    if (!icon) return null;
    return (
      <span
        className={`btn-icon btn-icon-${side}`}
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          marginRight: side === "left" && children ? "0.55em" : 0,
          marginLeft: side === "right" && children ? "0.55em" : 0,
          fontSize: "1.1em",
          minWidth: "1em",
        }}
        tabIndex={-1}
      >
        {icon}
      </span>
    );
  };

  return (
    <button
      type={type}
      ref={buttonRef}
      style={{
        ...VAR_COLORS,
        ...{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontFamily: "inherit",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          outline: "none",
          boxShadow:
            !disabled && !loading
              ? "0 2px 8px rgba(59,130,246,0.09)"
              : "none",
          opacity: disabled || loading ? 0.6 : 1,
          transition: "box-shadow 0.16s, background 0.16s, border-color 0.14s, color 0.14s",
          position: "relative",
          ...getVariantStyles(variant),
          ...getSizeStyles(size),
          ...(isFocusVisible
            ? {
                boxShadow:
                  "0 0 0 3px rgba(59,130,246,0.32),0 2px 8px rgba(59,130,246,0.09)",
                borderColor: VAR_COLORS["--btn-focus"],
              }
            : {}),
          ...fullWidthStyle,
        },
      }}
      className={composedClassName}
      onClick={!disabled && !loading ? onClick : undefined}
      aria-disabled={disabled || loading}
      disabled={disabled || loading}
      tabIndex={disabled || loading ? -1 : 0}
      aria-busy={!!loading}
      aria-live="polite"
      {...rest}
    >
      {loading && <Spinner />}
      {renderIcon(leftIcon, "left")}
      {/* Children has aria-label priority over icon for accessibility */}
      <span className="btn-children">
        {children}
      </span>
      {renderIcon(rightIcon, "right")}
    </button>
  );
}

// JSDoc type for IntelliSense manually exported
/**
 * @type {React.FC<ButtonProps>}
 */
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "success", "secondary", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
