import { Typewriter } from "react-simple-typewriter";
import { BrainIcon } from "../icons/BrainIcon";
import { Button } from "./Button";

export function Headline() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="px-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray md:text-5xl lg:text-6xl dark:text-white">
        <Typewriter words={["Store In", "Revisit", "Learn From"]}
        loop={100}
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000} /> 
        {' '} Your Digital Memory.
      </h1>
      <p className="p-4 mb-6 mx-auto text-lg font-normal text-gray-300 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Second Brain helps you save and organize links from YouTube, X
        (Twitter), and beyond. Revisit them anytime and uncover new insights
        effortlessly.
      </p>
      <div className="z-10">
        <Button
          variant="secondary"
          text="Get Started"
          startIcon={<BrainIcon />}
        />
      </div>
    </div>
  );
}
