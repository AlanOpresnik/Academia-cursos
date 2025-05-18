import { getHomeCourses } from "@/actions/getHomeCourses";
import ExploreCourses from "./components/ExploreCourses/ExploreCourses";
import ListCourses from "@/components/shared/ListCourses/ListCourses";

export default async function Home() {
  const listCourses = await getHomeCourses()
  console.log(listCourses)
  return (
    <div>
      <ExploreCourses />
      <ListCourses title="Cursos mas populares" courses={listCourses}/>
    </div>
  );
}
