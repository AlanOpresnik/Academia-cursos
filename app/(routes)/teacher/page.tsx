import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Header from "./components/Header/Header";

export default async function TeachersPage() {
  const user = await currentUser();

  if (!user) {
    return <RedirectToSignIn />;
  }
  return (
    <div>
      <Header />
    </div>
  );
}
