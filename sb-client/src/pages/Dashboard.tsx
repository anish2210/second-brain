import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CreateComponentModal } from "../components/CreateContentModal";
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/ShareIcon";
import axios from "axios";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";

interface Content {
  type: any;
  link: string;
  title: string;
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'; // Fallback URL

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]); // Added refresh to dependency array

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const shareUrl = `${url}/api/v1${response.data.msg}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share URL copied to clipboard.");
    } catch (error) {
      console.error('Error sharing brain:', error);
      alert("Failed to generate share URL. Please try again.");
    }
  };

  return (
    <div className="bg-green-600 min-h-screen">
      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      <div className="ml-64 min-h-screen p-4">
        <CreateComponentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">All Notes</div>
          <div className="flex gap-4 justify-end">
            <Button
              onClick={handleShare}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon size="md" />}
            />
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
            />
          </div>
        </div>
        <div className="flex flex-wrap pt-4 gap-6 items-start">
          {contents && contents.length > 0 ? (
            contents.map(({ type, link, title }: Content) => (
              <Card
                key={link}
                type={type}
                link={link}
                title={title}
                onDelete={refresh}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex pl-80 items-center justify-center pointer-events-none">
              <div className="text-green-400 text-center text-2xl font-bold">
                No content available. <br />
                Click "Add Content" to create a new note.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}