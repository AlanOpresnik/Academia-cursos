import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  Icon: LucideIcon;
  text: string;
}

export default function IconBadge({ Icon, text }: Props) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-6 h-6 flex items-center justify-center bg-violet-400 rounded-full">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className="text-slate-500">{text}</span>
    </div>
  );
}
