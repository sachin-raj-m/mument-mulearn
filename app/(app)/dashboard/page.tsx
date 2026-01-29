import RoleGate from "@/components/layout/RoleGate"
import { createClient } from "@/lib/supabase/server"
import { UserProfile } from "@/types/user"

export default async function DashboardPage() {
  const supabaseServer = createClient()
  const {
    data: { user },
  } = await supabaseServer.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabaseServer
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const role = (profile as UserProfile).role

  return (
    <>
      <h1>Dashboard</h1>

      <RoleGate role={role} allow={["buddy", "campus_coordinator", "admin"]}>
        <button>Create Checkpoint</button>
      </RoleGate>

      <RoleGate role={role} allow={["qa_foreman", "qa_watcher", "admin"]}>
        <button>Feedback Inbox</button>
      </RoleGate>
    </>
  )
}
