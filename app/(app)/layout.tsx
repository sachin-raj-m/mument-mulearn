import { redirect } from "next/navigation"
import { ReactNode } from "react"
import Sidebar from "@/components/layout/Sidebar"
import { createClient } from "@/lib/supabase/server"
import { UserProfile } from "@/types/user"

export default async function AppLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabaseServer = createClient()

  // 1️⃣ Auth check (server-side)
  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // 2️⃣ Fetch profile with role (RLS enforced)
  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile) {
    redirect("/login")
  }

  const typedProfile = profile as UserProfile

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role={typedProfile.role} />

      <main style={{ flex: 1, padding: "1rem" }}>
        <p>Role: {typedProfile.role}</p>
        {children}
      </main>
    </div>
  )
}
