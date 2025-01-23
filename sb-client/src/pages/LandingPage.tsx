import { AuroraBackground } from "../components/aurora-background";
import { Headline } from "../components/Headline";

export function LandingPage() {
  return (
    <div>
      <div>
        <AuroraBackground children={<Headline />} />
      </div>
    </div>
  );
}
