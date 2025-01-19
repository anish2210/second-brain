import { BrainIcon } from "../icons/BrainIcon";
import { DocIcon } from "../icons/DocIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { TweetIcon } from "../icons/TweetIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="bg-green-600 h-screen text-green-100 fixed border-r-2 border-green-400 w-64">
      <div className="flex items-center gap-4 p-4">
        <BrainIcon />
        <div className="font-bold text-xl text-white">Second Brain</div>
      </div>
      <div>
        <SidebarItem icon={<TweetIcon size="md" />} tabName="Twitter"/>
        <SidebarItem icon={<YoutubeIcon size="md"/>} tabName="Youtube"/>
        <SidebarItem icon={<DocIcon size="md" />} tabName="Document"/>
        <SidebarItem icon={<LinkIcon size="md" />} tabName="Links"/>
        <SidebarItem icon={<TagIcon size="md"/>} tabName="Tag"/>
      </div>
    </div>
  );
}
