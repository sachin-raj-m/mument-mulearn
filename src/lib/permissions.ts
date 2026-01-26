import { Role } from '../types/user';

export function hasRole(userRole: Role | Role[], allowedRoles: Role | Role[]): boolean {
  const userRoles = Array.isArray(userRole) ? userRole : [userRole];
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return allowed.some((r) => userRoles.includes(r));
}

export const canManageCheckpoints = (role: Role | Role[]) =>
  hasRole(role, ['buddy', 'campus_coordinator', 'admin']);

export const canViewFeedbackInbox = (role: Role | Role[]) =>
  hasRole(role, ['qa_foreman', 'qa_watcher', 'admin']);

export const canCreateAnnouncements = (role: Role | Role[]) =>
  hasRole(role, ['campus_coordinator', 'admin']);

export const canCreateGlobalAnnouncements = (role: Role | Role[]) =>
  hasRole(role, 'admin');

export const canPromoteUsers = (role: Role | Role[]) =>
  hasRole(role, ['admin', 'campus_coordinator']);
