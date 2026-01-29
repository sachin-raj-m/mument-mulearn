export type Role =
  | "participant"
  | "buddy"
  | "campus_coordinator"
  | "qa_foreman"
  | "qa_watcher"
  | "admin"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
  campusId?: string
}
