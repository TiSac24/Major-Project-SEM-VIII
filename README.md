# Sports Equipment Management & Booking System

A modern, full-stack web application for managing sports equipment bookings with role-based access control.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Key Features

### Student Features
- Browse and book available equipment
- Real-time availability updates
- View booking history and status
- Automatic conflict prevention

### Admin Features
- Complete equipment management (CRUD)
- Booking approval workflow
- Equipment issue/return tracking
- Fine management for late returns
- Real-time inventory monitoring

### System Features
- Mock authentication with role-based access
- Real-time updates across all clients
- Booking conflict detection
- Automatic quantity management
- Comprehensive booking lifecycle tracking

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Mock data store (localStorage) - replace with your own backend when ready
- **UI**: Lucide React Icons
- **State**: React Context API

## Project Structure

```
src/
├── components/
│   ├── auth/           # Login & Registration
│   ├── student/        # Student dashboard & features
│   └── admin/          # Admin dashboard & management
├── contexts/           # Auth context
├── lib/               # Supabase client & types
└── App.tsx            # Main app with routing
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Default Login Credentials

The app uses a mock data store (no backend required):

| Role    | Email             | Password     |
|---------|-------------------|--------------|
| Student | `student@test.com` | `Password123!` |
| Admin   | `admin@test.com`   | `Password123!` |

New users can sign up via the registration form. Data persists in localStorage.

### 3. Replace with Your Backend

When ready, replace the mock store in `src/lib/mockData.ts` with your own API/backend calls.

## Booking Workflow

```
1. PENDING    → Student submits booking request
2. APPROVED   → Admin approves request
3. REJECTED   → Admin rejects (with reason)
4. ISSUED     → Admin issues equipment (quantity ↓)
5. RETURNED   → Admin processes return (quantity ↑, optional fine)
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run typecheck    # TypeScript checks
npm run lint         # Lint code
```

## Security Features

- Row Level Security (RLS) on all database tables
- JWT-based authentication
- Role-based authorization
- Students can only access their own data
- Admins have full system access
- Session stored in localStorage

## Data Updates

Data refreshes when you perform actions (e.g. book equipment, approve bookings):
- Equipment availability updates when bookings are issued/returned
- Booking list refreshes after actions

## Deployment

### Frontend
Deploy to Vercel, Netlify, or any static host:
```bash
npm run build
```
Deploy the `dist/` folder.

### Backend
Replace the mock store in `src/lib/mockData.ts` with your own API.

## Data Structure

### Mock Store (`src/lib/mockData.ts`)
- **profiles**: User info with roles (student/admin)
- **equipment**: Sports equipment inventory
- **bookings**: Booking requests and tracking

Replace this file with your own backend integration when ready.

## Troubleshooting

**Can't sign in?**
- Use default credentials: student@test.com / Password123! or admin@test.com / Password123!
- Or sign up through the registration form

**Data resets on refresh?**
- Mock data persists in localStorage - clearing browser data will reset it

## Features Breakdown

### Booking Management
- ✅ Double booking prevention
- ✅ Time slot validation
- ✅ Quantity availability checks
- ✅ Automatic inventory updates
- ✅ Fine tracking for late returns

### Equipment Management
- ✅ Full CRUD operations
- ✅ Category organization
- ✅ Quantity tracking
- ✅ Real-time availability

### User Experience
- ✅ Clean, modern UI
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Clear booking lifecycle
- ✅ Instant feedback

## Contributing

Feel free to fork and customize for your needs!

## License

MIT License - Free to use for any purpose.

---

For setup instructions, see [SETUP.md](./SETUP.md)
