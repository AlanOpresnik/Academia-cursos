import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExploreCourses() {
  return (
    <div>
      <div className="my-4 mx-6 rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">
          <div className="p-6 flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">
              Explora todos los cursos 👋
            </h1>
            <p className="text-balance max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              esse non neque consectetur officia quam deleniti numquam corrupti
              quas quia veritatis aspernatur quod atque, odit eum impedit animi
              quaerat explicabo.
            </p>
            <Button asChild className="w-fit">
              <Link href={"/courses"}>Empezar a aprender</Link>
            </Button>
          </div>
          <div className="flex items-end">
            <Image
              src={"/explore.jpg"}
              alt="Explora todos los cursos"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
