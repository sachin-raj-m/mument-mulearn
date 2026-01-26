'use client';
import React, { ReactNode } from 'react';
import { Role } from '../../types/user';
import { hasRole } from '../../lib/permissions';

type RoleGateProps = {
  role: Role | Role[];
  allow: Role | Role[];
  children?: React.ReactNode;
};

export default function RoleGate({ role, allow, children }: RoleGateProps) {
  const allowed = hasRole(role, allow);
  if (!allowed) return null;
  return <>{children}</>;
}
