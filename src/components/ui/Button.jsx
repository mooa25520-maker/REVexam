/* ============================================================
   Button — Reusable button / link component
   Variants: primary (magenta), outline (bordered), ghost (text)
   Can render as <button> or <a> depending on `href` prop.
   ============================================================ */
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* Render as anchor if href is provided */
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
