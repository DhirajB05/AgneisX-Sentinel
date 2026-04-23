import React, { useState } from "react";

export default function AnimatedButton({
  children,
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  const [ripple, setRipple] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    setRipple(true);
    window.setTimeout(() => setRipple(false), 500);
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`anim-btn ${variant} ${className}`}
      {...props}
    >
      <span className="anim-btn-glow" />
      {ripple && <span className="anim-btn-ripple" />}
      <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </button>
  );
}
