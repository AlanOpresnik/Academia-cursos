"use client";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
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
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  courseId: String;
}

export default function Actions({ courseId }: Props) {
  const router = useRouter();

  const onEdit = () => {
    router.push(`/teacher/${courseId}`);
  };

  const deleteCourse = () => {
    axios.delete(`/api/course/${courseId}`);
    toast("Curso eliminado correctamente 👌");
    router.refresh();
  };

  return (
    <div className="flex gap-2 flex-col items-center w-full lg:max-w-42">
      <Button onClick={onEdit} className="w-full">
        Editar <Edit className="w-4 h-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500"
            variant={"outline"}
          >
            Eliminar <Trash className="w-4 h-4" />
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
            <AlertDialogAction onClick={deleteCourse}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
