import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";
import { DocIcon } from "../icons/DocIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { TagIcon } from "../icons/TagIcon";
import { TweetIcon } from "../icons/TweetIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const navigate = useNavigate();
  function logout () {
    localStorage.removeItem('token')
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="bg-green-600 h-screen text-green-100 fixed border-r-2 border-green-400 w-64">
      <div className="flex flex-col h-full justify-between">
        <div>
          <a href="/">
            <div className="flex items-center gap-4 p-4">
              <BrainIcon />
              <div className="font-bold text-xl text-white">Second Brain</div>
            </div>
          </a>
          <div>
            <SidebarItem icon={<TweetIcon size="md" />} tabName="Twitter" />
            <SidebarItem icon={<YoutubeIcon size="md" />} tabName="Youtube" />
            <SidebarItem icon={<DocIcon size="md" />} tabName="Document" />
            <SidebarItem icon={<LinkIcon size="md" />} tabName="Links" />
            <SidebarItem icon={<TagIcon size="md" />} tabName="Tag" />
          </div>
        </div>
        <div className="p-4">
          <Button
            variant="secondary"
            text="Logout"
            startIcon={<LogoutIcon size="md" />}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}
