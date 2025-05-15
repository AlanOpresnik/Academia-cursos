import React from "react";

interface Props {
  params: Promise<{
    courseSlug: string;
  }>;
}

export default async function CourseSlugPage({params}: Props){
  return (
    <div>
      CourseSlugPage
      <div>{(await params).courseSlug}</div>
    </div>
  );
}
