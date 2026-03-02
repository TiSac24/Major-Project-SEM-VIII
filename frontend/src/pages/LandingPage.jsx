import { Link } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Boxes,
  CalendarCheck2,
  Clock,
  LayoutDashboard,
  LogIn,
  Lock,
  Search,
  ShieldCheck,
  Trophy,
} from 'lucide-react';


function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ kicker, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <p className="text-sm font-semibold tracking-wider text-[#2563eb]">{kicker}</p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

function ButtonLink({ to, variant = 'primary', className = '', children }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a]';
  const styles =
    variant === 'primary'
      ? 'bg-[#2563eb] text-white hover:bg-blue-500 focus:ring-[#2563eb] shadow-lg shadow-blue-600/20'
      : 'bg-white/10 text-white hover:bg-white/15 border border-white/15 focus:ring-white/40';

  return (
    <Link to={to} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

function InfoCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb] ring-1 ring-blue-100 transition group-hover:bg-blue-100">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

function StepCard({ step, icon: Icon, title, description }) {
  return (
    <div className="relative z-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wider text-[#2563eb]">STEP {step}</p>
          <h3 className="truncate text-base font-bold text-slate-900">{title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}



const HERO_BG =
  'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=2400&q=70';

export default function LandingPage() {
  const meta = {
    projectName: 'Sports Equipment Management & Slot Booking System',
    collegeName: 'K.R. Mangalam University',
    year: new Date().getFullYear(),
    githubLink: 'https://github.com/TiSac24/Major-Project-SEM-VIII',
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero */}
    
      <header className="relative overflow">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${HERO_BG})` }}
          aria-hidden="true"
        />
        <div
          className=" absolute inset-0 bg-gradient-to-r from-slate-950/95 via-[#0f172a]/85 to-blue-950/80"
          aria-hidden="true"
        />
        <div className="absolute inset-0 opacity-30" aria-hidden="true">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <Container className="relative py-6">
          <nav className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <Trophy className="h-5 w-5 text-white"/>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{meta.projectName}</p>
                <p className="text-xs text-slate-300">College project • Modern SaaS-style UI</p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <ButtonLink to="/login" variant="secondary">
                Login
              </ButtonLink>
              <ButtonLink to="/app" variant="primary">
                Get Started
              </ButtonLink>
            </div>
          </nav>
        </Container>

        <Container className="relative pb-16 pt-12 sm:pb-20 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/15">
                <Clock className="h-4 w-4 text-[#2563eb]" />
                Real-time availability • Fast booking • Admin control
              </div>

              <h1 className="mt-5 animate-fade-in-up text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Manage Sports Equipment &amp; Book Slots Effortlessly
              </h1>
              <p className="mt-5 max-w-xl animate-fade-in-up text-base leading-relaxed text-slate-200 sm:text-lg">
                A sporty, production-ready platform for students to book equipment and time slots in seconds,
                while administrators track inventory, availability, and usage with confidence.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/app" variant="primary" className="animate-fade-in-up">
                  Get Started
                </ButtonLink>
                <ButtonLink to="/login" variant="secondary" className="animate-fade-in-up">
                  Login
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="animate-fade-in-up rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-slate-300">Availability</p>
                    <p className="mt-1 text-2xl font-bold">Live</p>
                    <p className="mt-2 text-xs text-slate-300">Track items instantly</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-slate-300">Slot Booking</p>
                    <p className="mt-1 text-2xl font-bold">Fast</p>
                    <p className="mt-2 text-xs text-slate-300">Book in a few clicks</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-slate-300">Security</p>
                    <p className="mt-1 text-2xl font-bold">Safe</p>
                    <p className="mt-2 text-xs text-slate-300">Role-based access</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs text-slate-300">Dashboard</p>
                    <p className="mt-1 text-2xl font-bold">Smart</p>
                    <p className="mt-2 text-xs text-slate-300">Student + Admin views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
    
    
      {/* About */}
      <section className="border-t border-white/10 bg-[#0f172a] py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker="ABOUT"
            title="About the System"
            description="This system helps students book sports equipment and allows administrators to manage inventory efficiently."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <InfoCard
              icon={Activity}
              title="Real-Time Equipment Tracking"
              description="See availability instantly, reduce conflicts, and keep sports gear organized with live status updates."
            />
            <InfoCard
              icon={CalendarCheck2}
              title="Easy Slot Booking"
              description="Browse sports, pick a convenient time slot, and book equipment with a fast, clean workflow."
            />
            <InfoCard
              icon={ShieldCheck}
              title="Role-Based Access (Student/Admin)"
              description="Students focus on booking. Admins manage inventory, approvals, and usage—securely separated."
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-slate-950/30 py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker="FLOW"
            title="How It Works"
            description="A simple, connected process designed to be fast for students and powerful for administrators."
          />

          <div className="relative mt-12">
            <div
              className="pointer-events-none absolute left-6 right-6 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block"
              aria-hidden="true"
            />
            <div className="grid gap-6 md:grid-cols-4">
              <StepCard
                step="01"
                icon={LogIn}
                title="Login"
                description="Sign in with your student/admin account to access personalized features."
              />
              <StepCard
                step="02"
                icon={Search}
                title="Browse Sports"
                description="Explore sports and equipment lists with clear availability indicators."
              />
              <StepCard
                step="03"
                icon={CalendarCheck2}
                title="Book Slot"
                description="Select a slot, confirm your booking, and get instant status updates."
              />
              <StepCard
                step="04"
                icon={Boxes}
                title="Admin Manages Inventory"
                description="Admins update stock, monitor usage, and manage bookings efficiently."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 bg-slate-950/30 py-16 sm:py-20">
        <Container>
          <SectionHeading
            kicker="FEATURES"
            title="Built for speed, clarity, and control"
            description="A clean feature set that makes slot booking effortless and inventory management reliable."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={Activity}
              title="Equipment Availability Tracking"
              description="Real-time status, clear indicators, and fewer conflicts with live equipment updates."
            />
            <InfoCard
              icon={CalendarCheck2}
              title="Slot Scheduling"
              description="A streamlined booking flow that prevents overlaps and keeps schedules organized."
            />
            <InfoCard
              icon={Boxes}
              title="Inventory Management"
              description="Admins can add, update, and manage equipment with a structured dashboard."
            />
            <InfoCard
              icon={BarChart3}
              title="Usage Analytics"
              description="Basic analytics to understand demand and improve equipment planning over time."
            />
            <InfoCard
              icon={Lock}
              title="Secure Authentication"
              description="Role-based separation between student and admin features to keep operations secure."
            />
            <InfoCard
              icon={LayoutDashboard}
              title="Clean & User-Friendly Interface"
              description="Modern typography, smooth spacing, and responsive layouts across all devices."
            />
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0b1220] py-10">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold">{meta.projectName}</p>
              <p className="mt-2 text-sm text-slate-300">
                {meta.collegeName} • {meta.year}
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-sm text-slate-300">GitHub</p>
              <a
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                href={meta.githubLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-[#2563eb]">●</span>
                {meta.githubLink}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {meta.year} • All rights reserved</p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
              <Link to="/app" className="hover:text-white">
                Get Started
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

