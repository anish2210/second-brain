interface TickMarkProps {
    size: "sm" | "md" | "lg";
  }
  
  const sizeClass = {
    sm: "size-2",
    md: "size-4",
    lg: "size-6",
  };
  
  export function TickMarkIcon(props: TickMarkProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={sizeClass[props.size]}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      
    );
  }
  