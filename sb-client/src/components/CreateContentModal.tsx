import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { TickMarkIcon } from "../icons/TickMarkIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TweetIcon } from "../icons/TweetIcon";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateComponentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();

  const [type, setType] = useState(ContentType.Youtube);
  const [linkError, setLinkError] = useState(false);

  async function addContent() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`;
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!isValidLink(link)) {
      setLinkError(true);
      return;
    }

    setLinkError(false);
    await axios.post(
      url,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  function isValidLink(link: string | undefined): boolean {
    if (!link) return false;
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|x\.com)\/.+$/;
    return regex.test(link);
  }

  return (
    <div>
      {open && (
        <div
          className="w-screen h-screen fixed top-0 left-0 flex justify-center z-20"
          style={{ backgroundColor: "rgba(108, 117, 125, 0.7)" }}
        >
          <div className="flex flex-col justify-center">
            <span className="bg-green-600 gap-4 py-4 px-8 rounded-md flex flex-col">
              <div className="flex justify-end">
                <div className="cursor-pointer hover:scale-125 transition-transform duration-300">
                  <div onClick={onClose}>
                    <CrossIcon size="lg" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Input reference={titleRef} placeholder={"Title"} />
                <Input
                  reference={linkRef}
                  placeholder={
                    linkError
                      ? "Invalid link. Please provide a valid YouTube or Twitter link."
                      : "Link"
                  }
                  // className={linkError ? "placeholder-red-500" : ""}
                />
              </div>
              <div className="pb-4">
                <div className="text-white py-2">
                  <h1>Content Type</h1>
                </div>
                <div className="flex justify-between gap-4">
                  <Button
                    text="Youtube"
                    startIcon={<YoutubeIcon size="md" />}
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    startIcon={<TweetIcon size="md" />}
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  text="Add Content"
                  startIcon={<TickMarkIcon size="md" />}
                  onClick={addContent}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
