import { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateComponentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    refresh()
  }, [modalOpen])
  
  return (
    <div className="bg-green-600 min-h-screen">
      <div className="">
        <Sidebar />
      </div>

      <div className="ml-64 w-vw h-vh p-4">
        <CreateComponentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">All Notes</div>
          <div className="flex gap-4 justify-end">
            <Button
              onClick={async ()=>{
                const response = await axios.post(`${url}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers:{
                    "Authorization": localStorage.getItem("token")
                  }
                });
                const shareUrl = `${url}/api/v1${response.data.msg}`;
                navigator.clipboard.writeText(shareUrl);
                alert("Share URL copied to clipboard.");
              }}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon size="md" />}
            />
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon size="md" />}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-4 items-start">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
