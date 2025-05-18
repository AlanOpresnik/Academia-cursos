import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  icon: LucideIcon;
}

export default function TitleBlock({ icon: Icon, title }: Props) {
  return (
    <div className="flex items-center mb-6 gap-1">
      <div className="p-2 rounded-full bg-violet-400">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-semibold">
            {title}
      </h3>
    </div>
  );
}
