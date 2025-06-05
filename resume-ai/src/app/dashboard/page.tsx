import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "student") {
    redirect("/dashboard/student");
  } else if (role === "recruiter") {
    redirect("/dashboard/recruiter");
  } else {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Unknown role.</h2>
        <p>Please contact admin.</p>
      </div>
    );
  }
}
