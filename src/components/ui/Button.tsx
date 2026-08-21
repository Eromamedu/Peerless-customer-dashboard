import type {
  ButtonHTMLAttributes,
} from "react";

import { LoaderCircle } from "lucide-react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost";

  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <LoaderCircle
          className="spin"
          size={17}
          aria-hidden="true"
        />
      )}

      {loading ? "Saving…" : children}
    </button>
  );
}