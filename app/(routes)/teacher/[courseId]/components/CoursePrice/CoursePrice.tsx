"use client";
import React, { useState } from "react";
import TitleBlock from "../TitleBlock/TitleBlock";
import { DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  courseId: string;
  priceCourse: string | null;
}

export default function CoursePrice({ courseId, priceCourse }: Props) {
  const [price, setPrice] = useState<string | undefined>(
    priceCourse || "Gratis"
  );

  const onChangePrice = async () => {
    try {
        axios.patch(`/api/course/${courseId}`, {
        price: price,
      });
      toast("Precio modificado exitosamente 🎉");
    } catch (error) {
      console.log(error);
      toast.error("Precio modificado exitosamente 🎉");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Precio del curso" icon={DollarSign} />
      <Select onValueChange={setPrice} defaultValue={price}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona el precio del curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precio del curso</SelectLabel>
            <SelectItem value="Gratis">Gratis</SelectItem>
            <SelectItem value="19,99">$19,99</SelectItem>
            <SelectItem value="29,99">$29,99</SelectItem>
            <SelectItem value="39,99">$39,99</SelectItem>
            <SelectItem value="49,99">$49,99</SelectItem>
            <SelectItem value="59,99">$59,99</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={onChangePrice} disabled={!price} className="mt-3">
        Guardar precio
      </Button>
    </div>
  );
}
