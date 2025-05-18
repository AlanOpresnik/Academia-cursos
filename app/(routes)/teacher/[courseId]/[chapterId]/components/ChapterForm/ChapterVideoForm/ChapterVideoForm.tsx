"use client";
import React, { useState } from "react";
import TitleBlock from "../../../../components/TitleBlock/TitleBlock";
import { Pencil, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  videoUrl: string | null;
  chapterId: string;
  courseId: string;
}

export default function ChapterVideoForm({
  chapterId,
  videoUrl,
  courseId,
}: Props) {
  const [onEditVideo, setOnEditVideo] = useState(false);
  const router = useRouter();

  const onsubmit = async (url: string) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
        videoUrl: url,
      });
      toast("Video subido correctamente 🎉");
      router.refresh();
    } catch (error) {
      toast.error("Hubo un error al subir el video");
      console.log(error);
    }
  };
  return (
    <div className="mt-6 p-6 bg-white rounded-md">
      <TitleBlock title="Añade o modifica el video" icon={Video} />

      {videoUrl ? (
        <video src={videoUrl} controls className="rounded-md" />
      ) : (
        <p>No hay video</p>
      )}
      <div className="mt-4 p-2 rounded-md border">
        <Button onClick={() => setOnEditVideo(true)} variant={"secondary"}>
          {" "}
          {onEditVideo ? "Arrastra o selecciona el video" : "Editar video"}
          <Pencil className="h-4 w-4" />
        </Button>
        {onEditVideo && (
          <UploadButton
            className="w-full bg-slate-200 rounded-md p-2 mt-2 "
            endpoint={"chapterVideo"}
            onClientUploadComplete={(url) => {
              console.log(url);

              if (url) {
                onsubmit(url[0].serverData.url);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
