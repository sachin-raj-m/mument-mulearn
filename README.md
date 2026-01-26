# mument-frontend-next
Associated with µment 2.0 organised by µLearn foundation and µLearn CET.

## Structure

```

src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│
│   ├── (public)/
│   │   ├── page.tsx                  # Landing
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── leaderboard/
│   │       └── page.tsx
│
│   ├── (app)/                         # Authenticated users
│   │   ├── layout.tsx                 # Requires login
│   │
│   │   ├── dashboard/
│   │   │   └── page.tsx               # All roles
│   │
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── [userId]/page.tsx      # Limited vs full view
│   │
│   │   ├── daily-updates/
│   │   │   ├── page.tsx
│   │   │   └── [userId]/page.tsx
│   │
│   │   ├── feedback/
│   │   │   ├── submit/page.tsx        # All users
│   │   │   └── inbox/page.tsx         # QA roles / Admin
│   │
│   │   ├── checkpoints/
│   │   │   ├── page.tsx               # View all
│   │   │   └── manage/page.tsx        # Buddy / CC / Admin
│   │
│   │   ├── announcements/
│   │   │   ├── page.tsx               # Read
│   │   │   └── create/page.tsx        # CC / Admin
│   │
│   │   └── admin/
│   │       ├── layout.tsx              # Admin guard
│   │       ├── page.tsx
│   │       ├── users/page.tsx
│   │       └── roles/page.tsx
│
│   └── api/
│       └── ...
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── RoleGate.tsx               # KEY COMPONENT
│   │
│   ├── profile/
│   ├── feedback/
│   ├── checkpoints/
│   └── announcements/
│
├── lib/
│   ├── auth.ts
│   ├── permissions.ts
│   └── supabase.ts
│
├── services/
│   ├── feedback.service.ts
│   ├── checkpoint.service.ts
│   └── announcement.service.ts
│
└── types/
    └── user.ts

```

 - [ ] Landing page - visible for all (entry point).
    - [ ] Login page.
    - [ ] Leaderboard.
 - [x] Dashboard.
    - [ ] Profile.
    - [ ] Daily Updates.
    - [ ] Feedbacks.
    - [ ] Announcements.
    - [ ] Community.