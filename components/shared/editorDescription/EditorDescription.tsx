'use client'
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";
interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function EditorDescription({ onChange, value }: Props) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
