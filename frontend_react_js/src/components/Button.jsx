import React from "react";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * Reusable accessible Button component supporting variants and sizes.
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'success' | 'ghost'
 * - size: 'sm' | 'md' | 'lg'
 * - disabled: boolean
 * - onClick: function
 * - type: 'button' | 'submit' | 'reset'
 * - children: node
 * - className: string
 * - ...rest: any
 */
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  children,
  className = "",
  ...rest
}) {
  // Colors from light theme
  const getVariantStyles = (v) => {
    switch (v) {
      case "primary":
        return {
          background: "var(--button-bg, #3b82f6)",
          color: "#fff",
          border: "none"
        };
      case "success":
        return {
          background: "var(--button-success-bg, #06b6d4)",
          color: "#fff",
          border: "none"
        };
      case "secondary":
        return {
          background: "transparent",
          color: "#64748b",
          border: "1.5px solid #64748b"
        };
      case "ghost":
        return {
          background: "transparent",
          color: "#3b82f6",
          border: "1.5px solid transparent"
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (s) => {
    switch (s) {
      case "sm":
        return {
          fontSize: "0.96rem",
          padding: "0.38rem 0.95rem",
          borderRadius: "6px"
        };
      case "lg":
        return {
          fontSize: "1.18rem",
          padding: "0.7rem 1.8rem",
          borderRadius: "10px"
        };
      case "md":
      default:
        return {
          fontSize: "1.05rem",
          padding: "0.57rem 1.3rem",
          borderRadius: "8px"
        };
    }
  };

  // Compose styles
  const baseStyle = {
    display: "inline-block",
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    boxShadow: disabled ? "none" : "0 2px 8px rgba(59,130,246,0.09)",
    opacity: disabled ? 0.6 : 1,
    transition: "box-shadow 0.16s, background 0.16s, border-color 0.14s, color 0.14s"
  };

  // Focus ring for accessibility
  const focusRing = {
    boxShadow: "0 0 0 3px rgba(59,130,246,0.32)",
    borderColor: "#3b82f6"
  };

  const [isFocusVisible, setFocusVisible] = React.useState(false);

  // Keyboard accessibility focus outline
  const handleFocus = (e) => {
    if (e.nativeEvent instanceof KeyboardEvent || e.type === "keydown" || e.type === "keyup") {
      setFocusVisible(true);
    }
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e) => {
    setFocusVisible(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  return (
    <button
      type={type}
      style={{
        ...baseStyle,
        ...getVariantStyles(variant),
        ...getSizeStyles(size),
        ...(isFocusVisible ? focusRing : {})
      }}
      className={className}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleFocus}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "success", "secondary", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  children: PropTypes.node,
  className: PropTypes.string
};

export default Button;
