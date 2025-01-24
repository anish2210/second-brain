interface CrossProps {
  size: "sm" | "md" | "lg";
}

const sizeClass = {
  sm: "size-2",
  md: "size-4",
  lg: "size-6",
};

export function CrossIcon(props: CrossProps) {
  return <div className="rotate-45">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="white"
      className={sizeClass[props.size]}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </div>
}
