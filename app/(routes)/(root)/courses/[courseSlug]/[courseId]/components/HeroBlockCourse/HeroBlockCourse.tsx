"use client";
import IconBadge from "@/components/shared/IconBadge/IconBadge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  course: Course & { chapters: Chapter[] };
  purchaseCourse: boolean;
}

export default function HeroBlockCourse({ course, purchaseCourse }: Props) {
  const {
    title,
    description,
    id,
    price,
    level,
    imageUrl,
    upadatedAt,
    slug,
    chapters,
  } = course;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const enrollCourse = async () => {
    setIsLoading(true);
    if (price === "Gratis") {
      try {
        await axios.post(`/api/course/${id}/enroll`);

        toast("Inscrito correctamente al curso", {
          description: "Ahora puedes acceder al contenido del curso",
        });
        router.push(`/courses/${slug}/${chapters[0].id}`);
      } catch (error) {
        toast.error("Error al inscribirse al curso");
        console.error("Error al inscribirse al curso", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const redirectToCourse = async () => {
    router.push(`/courses/${slug}/${chapters[0].id}`);
  };

  console.log(purchaseCourse)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-balance text-gray-600 mt-2">{description}</p>

        <div className="flex flex-col gap-3 mt-5 text-gray-600">
          <IconBadge Icon={Timer} text="7h 40min" />

          <IconBadge
            Icon={Calendar}
            text={`Ultima actualizacion: ${new Date(
              upadatedAt
            ).toLocaleDateString("es-ES")}`}
          />
          <IconBadge
            Icon={ChartNoAxesColumn}
            text={`Nivel: ${level || "No definido"}`}
          />
          <p className="text-xl font-semibold my-4">{formatPrice(price)}</p>

          {purchaseCourse ? (
            <Button
              onClick={redirectToCourse}
              className="hover:bg-violet-400 text-white  w-fit font-semibold"
            >
              Ver curso
            </Button>
          ) : (
            <p>
              <Button
                onClick={enrollCourse}
                className="hover:bg-violet-400 text-white font-semibold"
              >
                Inscribirse ahora
              </Button>
            </p>
          )}
        </div>
      </div>
      <Image
        src={imageUrl || "/no-image.png"}
        alt={title}
        width={500}
        height={400}
        className="rounded-md"
      />
    </div>
  );
}
