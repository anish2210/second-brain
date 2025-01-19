import { useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateComponentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
          <Card
            title="first Post"
            link="https://x.com/Anish_2210/status/1880180943199301937"
            type="twitter"
          />
          <Card
            title="first Post"
            link="https://x.com/Anish_2210/status/1880311958324576764/photo/1"
            type="twitter"
          />
          <Card
            title="first Video"
            link="https://www.youtube.com/watch?v=641_goNZGog"
            type="youtube"
          />
        </div>
      </div>
    </div>
  );
}
