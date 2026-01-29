import { createClient } from "@/lib/supabase/client"
import { UserProfile } from "@/types/user"

export async function getMyProfile(): Promise<UserProfile | null> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) return null
  return data as UserProfile
}
