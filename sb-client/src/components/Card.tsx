import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-8 max-w-96 border-2 rounded-md border-green-400 text-white min-h-48 min-w-72">
      <div className="flex justify-between">
        <div className="flex items-center min-w-40 ">
          <ShareIcon size="md" />
          <div className="px-4">{title}</div>
        </div>
        <div className="flex items-center justify-between min-w-10">
          <ShareIcon size="md" />
          <a href={link} target="_blank">
            <DeleteIcon size="md" />
          </a>
        </div>
      </div>
      <div className="font-bold text-xl">Future Project</div>
      <div className="font-bold text-xl">
        {type === "twitter" && <blockquote className = "twitter-tweet">
          
          <a href={link.replace("x.com", "twitter.com")}>
          </a>
        </blockquote>}

        {type == "youtube" && <iframe  src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/641_goNZGog?si=4eFFcVppaC9I3Bua" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      </div>
      <div className="">Added on 10/03/25</div>
    </div>
  );
}
