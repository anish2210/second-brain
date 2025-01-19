import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-green-100 text text-green-600 hover:scale-105 transition-transform duration-200",
  secondary:
    "bg-green-400 text text-white border-2 border-green-100 hover:scale-105 transition-transform duration-200",
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center";

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`${variantClasses[props.variant]} ${defaultStyles} ${props.loading ? "opacity-45" : ""}`}  disabled={props.loading}
    >
      <div className="pr-2">{props.startIcon}</div>
      {props.text}
    </button>
  );
}
