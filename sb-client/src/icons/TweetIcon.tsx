interface TweetProp {
    size: "sm" | "md" | "lg";
  }
  
  const sizeClass = {
    sm: "size-2",
    md: "size-4",
    lg: "size-6",
  };
  
  export function TweetIcon(props: TweetProp) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        fill="currentColor"
        className={sizeClass[props.size]}
      >
        <path d="M0.0608333 0L9.71306 13.7889L0 25H2.18611L10.69 15.1844L17.5608 25H25L14.8047 10.4353L23.8456 0H21.6594L13.8281 9.03978L7.50028 0H0.0608333ZM3.27583 1.72046H6.69333L21.7847 23.2792H18.3672L3.27583 1.72046Z" />
      </svg>
    );
  }
  