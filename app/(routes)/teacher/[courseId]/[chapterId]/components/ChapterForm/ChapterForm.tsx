"use client";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { ArrowLeft, CircleAlert, Cog, Eye, EyeOff, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import TitleBlock from "../../../components/TitleBlock/TitleBlock";
import axios from "axios";
import { toast } from "sonner";
import ChapterTitleForm from "./ChapterTitleForm/ChapterTitleForm";
import ChapterVideoForm from "./ChapterVideoForm/ChapterVideoForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  courseId: string;
  chapter: Chapter | null;
}

export default function ChapterForm({ chapter, courseId }: Props) {
  const router = useRouter();

  if (!chapter) {
    return null;
  }

  const onPublish = async (state: boolean) => {
    try {
     await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        isPublished: state,
      });
      toast(
        state ? "Capitulo publicado exitosamente 🎉" : "Capitulo ocultado 👌"
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
     await axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`);
      toast("Capitulo eliminador correctamente 👌");
    } catch (error) {
      toast.error("UPS hubo un error al eliminar el capitulo 😢");
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" p-6 bg-white rounded-md">
        <Button
          className="mb-4"
          variant={"outline"}
          onClick={() => router.push(`/teacher/${courseId}`)}
        >
          <ArrowLeft />
          Volver a la edicion del curso
        </Button>
      </div>
      <div className="py-6 mt-6 p-6 bg-white rounded-md flex justify-between items-center">
        <TitleBlock title="Configuracion del capitulo" icon={Cog} />
        <div className="gap-2 flex items-center">
          {chapter.isPublished ? (
            <div>
              <Button onClick={() => onPublish(false)} variant={"outline"}>
                <EyeOff />
                Ocultar
              </Button>
            </div>
          ) : (
            <Button onClick={() => onPublish(true)}>
              <Eye />
              Publicar
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="" variant={"destructive"}>
                <Trash className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  {" "}
                  <CircleAlert /> Estas seguro?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esto borrara el capitulo y todos sus datos permanentemente
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <ChapterTitleForm courseId={courseId} chapter={chapter} />

      <ChapterVideoForm
        courseId={courseId}
        chapterId={chapter.id}
        videoUrl={chapter.videoUrl}
      />
    </div>
  );
}
