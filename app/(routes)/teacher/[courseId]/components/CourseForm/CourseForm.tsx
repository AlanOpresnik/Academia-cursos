"use client";
import { Chapter, Course } from "@prisma/client";
import React from "react";
import TitleBlock from "../TitleBlock/TitleBlock";
import { Cog } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./CourseForm.form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
type CourseFormProps = {
  course: Course;
};

type CourseWhitRelation = Course & { chapters: Chapter[] };

export default function CourseForm({ course }: CourseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      description: course.description || "",
      slug: course.slug || "",
      category: course.category || "",
      level: course.level || "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.patch(`/api/course/${course.id}`, values);
      toast("Curso actualizado correctamente 🎉");
    } catch (error) {
      toast.error("UPS algo a ido mal");
    }
  };
  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock title="Configuracion del curso" icon={Cog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo del curso</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Curso de desarrollo web..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esto vera el usuario como titulo del curso
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url del curso</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Curso-de-desarrollo-web..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Es unica y no se puede modificar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la categoria del curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FrontEnd">FrontEnd</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="FullStack">FullStack</SelectItem>
                      <SelectItem value="InfraEstructura">
                        Infraestructura
                      </SelectItem>
                      <SelectItem value="UX/UI">Diseño UX/UI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel del curso</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el nivel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="principiante">Principiante</SelectItem>
                      <SelectItem value="intermedio">Intermedio</SelectItem>
                      <SelectItem value="experto">Experto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion del curso</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informacion basica del curso..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta descripcion sera visible para los usuarios
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Guardar informacion del curso</Button>
        </form>
      </Form>
    </div>
  );
}
