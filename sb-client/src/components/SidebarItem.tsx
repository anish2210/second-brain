import { ReactElement } from "react";

interface SidebarItemProp {
  icon: ReactElement;
  tabName: string;
}

export function SidebarItem(props: SidebarItemProp) {
  return (
    <div className=" cursor-pointer hover:bg-green-400 rounded text-white">
      <div className="flex gap-4 px-6 py-2 items-center hover:scale-110 transition-transform duration-300 ">
        <div>{props.icon}</div>
        <div className="">{props.tabName}</div>
      </div>
    </div>
  );
}
