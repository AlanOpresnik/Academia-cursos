import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-semibold text-4xl">Welcome Back! 👋</h1>
      <p className="text-xl">Sign In to continue to your account</p>
      <SignIn/>
    </div>
  );
}
