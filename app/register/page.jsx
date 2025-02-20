import RegisterForm from "./register_form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Keep this as the server component (functional component)
export default async function RegisterPage() {
  // Get the current session using the request headers
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If a session exists, redirect to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Render the registration form if no session exists
  return (
    <div className="container mx-auto">
      <RegisterForm />
    </div>
  );
}