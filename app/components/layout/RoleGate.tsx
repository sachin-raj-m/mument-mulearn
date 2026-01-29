"use client"

import { ReactNode } from "react"
import { Role } from "@/types/user"
import { hasRole } from "@/lib/permissions"

type Props = {
  role: Role
  allow: Role[]
  children: ReactNode
}

export default function RoleGate({ role, allow, children }: Props) {
  if (!hasRole(role, allow)) return null
  return <>{children}</>
}
