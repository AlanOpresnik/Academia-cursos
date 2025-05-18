import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./formChaptersName.form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Props {
  courseId: string;
  setShowInputChapter: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function FormChaptersName({
  courseId,
  setShowInputChapter,
}: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/course/${courseId}/chapter`, {
        title: values.title,
      });
      toast("Captiulo creado correctamente 🎉");
      setShowInputChapter(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Hubo un error al crear el capitulo 😢");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ej: Introduccion a la programacion..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid} type="submit">
          Crear capitulo
        </Button>
      </form>
    </Form>
  );
}
