"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { publishCourse } from "./actions";
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
  isPublished: boolean;
}

export default function HeaderCourse({ courseId, isPublished }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async (state: boolean) => {
    setIsLoading(true);

    const result = await publishCourse(courseId, state);

    if (result.success) {
      toast(
        state
          ? "Curso publicado correctamente! 🎉"
          : "Curso despublicado correctamente 👌"
      );
      router.refresh();
    } else {
      toast("UPSS algo falló 😢");
    }

    setIsLoading(false);
  };

  const deleteCourse = async () => {
    try {
      axios.delete(`/api/course/${courseId}`);
      toast("Curso eliminado correctamente");
      router.push("/teacher");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Button onClick={() => router.push("/teacher")}>
            <MoveLeft />
            <span>Volver a todos los cursos</span>
          </Button>
          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                onClick={() => onPublish(false)}
                variant={"outline"}
                disabled={isLoading}
                className=""
              >
                Despublicar <EyeOff className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={() => onPublish(true)} disabled={isLoading}>
                Publicar <Eye className="w-4 h-4" />
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
                  <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esto borrara el curso y todos sus datos permanentemente
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteCourse}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
