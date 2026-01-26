'use client';
import React from 'react';
import RoleGate from '../../../src/components/layout/RoleGate';
import { Role } from '../../../src/types/user';

const mockRole: Role[] = ['participant'];

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard. Current role: {mockRole.join(', ')}</p>

      <RoleGate role={mockRole} allow={['buddy', 'campus_coordinator', 'admin']}>
        <button style={{display: 'block', marginTop: 12}}>Create Checkpoint</button>
      </RoleGate>

      <RoleGate role={mockRole} allow={['qa_foreman', 'qa_watcher', 'admin']}>
        <button style={{display: 'block', marginTop: 12}}>Feedback Inbox</button>
      </RoleGate>
    </div>
  );
}
