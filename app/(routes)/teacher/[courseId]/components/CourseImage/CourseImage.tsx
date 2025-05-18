"use client";
import React, { useState } from "react";
import TitleBlock from "../TitleBlock/TitleBlock";
import { FileImage, Pencil } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

interface Props {
  courseId: string;
  imageCourse: string | null;
}

export default function CourseImage({ courseId, imageCourse }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState(imageCourse);

  const onChangeImage = async (imageUrl: string) => {
    console.log(imageUrl);
    try {
      axios.patch(`/api/course/${courseId}`, {
        imageUrl: imageUrl,
      });
      toast("Imagen actualizada exitosamente 🎉");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white h-fit">
      <TitleBlock title="Imagen del curso" icon={FileImage} />
      {isEditing ? (
        <div className="bg-slate-300 p-4 mt-2 rounded-lg">
          <UploadButton
            endpoint={"imageUploader"}
            onClientUploadComplete={(res) => {
              onChangeImage(res[0].ufsUrl);
              setImage(res[0]?.ufsUrl);
              setIsEditing(false);
            }}
            onUploadError={() => {
              toast.error("Ocurrio un error con la imagen 😢");
            }}
          />
        </div>
      ) : (
        <Image
          src={image || "/no-image.png"}
          alt={"Imagen curso"}
          width={500}
          height={250}
          className="rounded-md w-full object-contain h-full"
        />
      )}
      <Button
        onClick={() => setIsEditing(!isEditing)}
        className="w-full mt-4"
        variant={"outline"}
        size={"sm"}
      >
        <Pencil className="w-4 h-4" />
        Editar imagen
      </Button>
    </div>
  );
}
