"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "./formCreateCourse.schema";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FormCreateCourse() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const res = await axios.post("/api/course", values);
      toast("Curso creado correctamente 🎉");
      router.push(`/teacher/${res.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso de React.js ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug del curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso-de-React-js" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
