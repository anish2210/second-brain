import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import axios from "axios";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete: () => void; // Callback to trigger UI update in parent
}

export function Card({ title, link, type, onDelete }: CardProps) {
  const url = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      // Fetch the content ID using the title and link
      const response = await axios.get(`${url}/api/v1/content`, {
        params: { title, link },
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      });

      if (response.data.content && response.data.content.length > 0) {
        const contentId = response.data.content[0]._id;

        // Send a DELETE request to remove the content
        await axios.delete(`${url}/api/v1/content`, {
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
          data: { contentId }, // Send contentId in the body
        });

        // Call the onDelete callback to update the UI
        onDelete();
      } else {
        alert("Content not found");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content");
    }
  };

  return (
    <div className="p-8 max-w-96 border-2 rounded-md border-green-400 text-white min-h-48 min-w-72 bg-black-50 transition-transform duration-700">
      <div className="flex justify-between">
        <div className="flex items-center min-w-40 ">
          <ShareIcon size="md" />
          <div className="px-4">{title}</div>
        </div>
        <div className="flex items-center justify-between min-w-10">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ShareIcon size="md" />
          </a>
          <button onClick={handleDelete}>
            <DeleteIcon size="md" />
          </button>
        </div>
      </div>

      <div className="font-bold text-xl py-2">
        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "youtube" && (
          <iframe
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="">Added on 10/03/25</div>
    </div>
  );
}
