import { BookOpen, ChartArea, GraduationCap, House, Settings2, SquareTerminal } from "lucide-react";

export const routes = [
  { title: "Home", url: "/", icon: House },
  { title: "Courses", url: "/courses", icon: SquareTerminal },
  { title: "My Courses", url: "/my-courses", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: Settings2 },
];

export const routesTeacher = [
  { title: "Courses", url: "/teacher", icon: GraduationCap },
  { title: "Analytics", url: "/analytics", icon: ChartArea },

];
