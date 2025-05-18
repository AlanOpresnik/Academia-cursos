"use client";
import { Chapter } from "@prisma/client";
import React, { useEffect, useState } from "react";
import TitleBlock from "../TitleBlock/TitleBlock";
import {
  GripVertical,
  ListCheck,
  Loader2,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "@hello-pangea/dnd";
import FormChaptersName from "./FormChaptersName/FormChaptersName";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface Props {
  courseId: string;
  chapters: Chapter[] | null;
}

export default function ChaptersBlock({ chapters, courseId }: Props) {
  const [chaptersList, setChaptersList] = useState<Chapter[]>(chapters || []);
  const [showInputChapter, setShowInputChapter] = useState<Boolean>(false);
  const [isUpdating, setIsupdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setChaptersList(chapters ?? []);
  }, [chapters]);

  const onEditChapter = (chapterId: string) => {
    router.push(`/teacher/${courseId}/${chapterId}`);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chaptersList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setChaptersList(items);
    const bulkUpdate = items.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));
    onReorder(bulkUpdate);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsupdating(true);
      await axios.put(`/api/course/${courseId}/chapter/reorder`, {
        list: updateData,
      });
      toast("orden de los captiulos actualizado 🎉");
      router.refresh();
    } catch (error) {
      toast("orden de los captiulos actualizado 🎉");
    } finally {
      setIsupdating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md h-fit relative">
      <TitleBlock title="Capitulos del curso" icon={ListCheck} />
      <div className="flex gap-2 items-center justify-between mb-3">
        <p>Capitulos completos</p>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setShowInputChapter(true)}
        >
          <PlusCircle className="w-4 h-4" />
          Crear capitulo
        </Button>
      </div>
      {showInputChapter && (
        <FormChaptersName
          setShowInputChapter={setShowInputChapter}
          courseId={courseId}
        />
      )}
      {isUpdating && (
        <div className="absolute right-0 top-0 flex items-center justify-center w-full h-full bg-slate-500/20">
          <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >
              {chaptersList?.map((chapter, i) => (
                <Draggable index={i} draggableId={chapter.id} key={chapter.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <p>{chapter.title}</p>
                      </div>
                      <div className="flex gap-2 items-center px-2 py-1">
                        {chapter.isPublished ? (
                          <p className="px-2 py-1 text-emerald-600">
                            Publicado
                          </p>
                        ) : (
                          <p className="px-2 py-1 text-gray-700">
                            Sin publicar
                          </p>
                        )}
                        <div
                          className="cursor-pointer"
                          onClick={() => onEditChapter(chapter.id)}
                        >
                          <Pencil className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
