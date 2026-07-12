import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  Plus,
  Hospital,
  Cpu,
  Landmark,
  FlaskConical,
  GraduationCap,
  Activity,
  Brain,
  Users,
  HeartHandshake,
  Stethoscope,
  Lightbulb,
  Compass,
  Globe2,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";
import logoAsset from "@/assets/walk2talk-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: SummitPage,
});

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#agenda", label: "Agenda" },
  { href: "#speakers", label: "Speakers" },
  { href: "#register", label: "Register" },
];

const AUDIENCES = [
  { icon: Hospital, label: "Healthcare Providers & Health Systems" },
  { icon: Cpu, label: "Digital Health & Technology Leaders" },
  { icon: Landmark, label: "Government & Policymakers" },
  { icon: FlaskConical, label: "Life Sciences & Industry" },
  { icon: GraduationCap, label: "Academia & Research" },
];

const THEMES = [
  { icon: Activity, label: "The future of healthcare delivery and healthcare systems" },
  { icon: Brain, label: "AI and digital transformation in healthcare", teal: true },
  { icon: Users, label: "Workforce resilience and talent challenges" },
  { icon: HeartHandshake, label: "Patient-centered and value-based care models" },
  { icon: Stethoscope, label: "Digital health, telemedicine, and remote care", teal: true },
  { icon: Lightbulb, label: "Healthcare innovation and emerging technologies", teal: true },
  { icon: Compass, label: "Leadership strategies for navigating change" },
  { icon: Globe2, label: "Building accessible, equitable, and sustainable healthcare systems" },
];

type AgendaItem = {
  time: string;
  title: string;
  brief?: string;
  speaker?: { name: string; title: string; org: string };
};

const AGENDA: AgendaItem[] = [
  { time: "5:00 PM – 5:10 PM", title: "Welcome Address by Walk2Talk Media" },
  {
    time: "5:10 PM – 5:15 PM",
    title:
      "Opening Keynote: The Future of Healthcare 2030: Policy, Innovation & System Transformation",
    brief:
      "This keynote will explore how policy, innovation, and strategic leadership can work together to create more accessible, resilient, and sustainable healthcare systems, while preparing organizations and nations for the challenges and opportunities of 2030.",
  },
  {
    time: "5:20 PM – 5:40 PM",
    title: "In Conversation: From Vision to Impact: Leading Change in Healthcare",
    brief:
      "Exploring how healthcare leaders are turning strategic vision into measurable impact through innovation, collaboration, and patient-centered care.",
    speaker: { name: "Walid Achi", title: "Chief Medical Officer", org: "Emirates Hospitals, UAE" },
  },
  {
    time: "5:45 PM – 6:20 PM",
    title: "Panel Discussion: AI, Digital Health & the Future of Patient Care",
    brief:
      "This panel will examine how organizations can leverage innovation responsibly to enhance patient experiences, improve clinical outcomes, and create more connected and data-driven healthcare systems.",
    speaker: {
      name: "Franklin Vibar",
      title: "Chief Information Officer",
      org: "Asian Hospital and Medical Centre",
    },
  },
  {
    time: "6:25 PM – 6:35 PM",
    title: "Special Guest: Building Sustainable & Resilient Healthcare Systems",
    brief:
      "A discussion on the policies, investments, and collaborative efforts required to create healthcare systems that can meet the evolving needs of populations in the years ahead.",
  },
  {
    time: "6:40 PM – 7:00 PM",
    title: "Fireside Chat: What Healthcare Leaders Must Prioritize by 2030",
    brief:
      "This fireside chat will explore the key priorities healthcare organizations should focus on to drive innovation, strengthen resilience, improve patient outcomes, and build sustainable healthcare systems for 2030 and beyond.",
    speaker: {
      name: "Mohamed Nasser",
      title: "General Manager, Middle East & Africa (MEA)",
      org: "Amgen",
    },
  },
  {
    time: "7:00 PM – 7:15 PM",
    title: "Closing Keynote: Building Tomorrow's Healthcare, Today",
    brief:
      "This session will explore how collaboration, innovation, and leadership can help create sustainable, technology-enabled, and human-centered healthcare systems for generations to come.",
  },
  { time: "7:30 PM", title: "Closing Address" },
];

const CHIPS = [
  "Half-Day Virtual Format",
  "2026 → 2030 Horizon",
  "Cross-Sector Leadership",
  "Global Audience",
];

// 27 Aug 2026, 5:00 PM IST = 11:30 UTC
const SUMMIT_UTC = Date.UTC(2026, 7, 27, 11, 30, 0);

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Walk2Talk Media" className={className} />;
}

function Blade({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <polygon points="20,10 90,10 130,190 60,190" fill="var(--ink)" />
      <polygon points="110,10 180,10 220,190 150,190" fill="var(--signal)" />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "bg-paper/95 backdrop-blur border-border" : "bg-paper border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3 pr-4">
          <Logo className="h-8 w-auto md:h-10" />
          <span className="sr-only">Walk2Talk Media</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink transition-colors hover:text-signal"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            className="inline-flex items-center bg-signal px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 hover:bg-ink blade-clip"
          >
            Register Now
          </a>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-paper md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center bg-signal px-5 py-3 text-sm font-semibold text-paper blade-clip"
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const c = useCountdown(SUMMIT_UTC);
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      {/* Background blade */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-[560px] w-[560px] opacity-[0.07] md:-right-16 md:opacity-[0.09]">
        <Blade className="h-full w-full" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, color-mix(in oklab, var(--signal) 8%, transparent), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24">
        <p
          className="font-mono-data text-xs text-slate animate-blade-in"
          style={{ animationDelay: "0.05s" }}
        >
          Virtual Summit · 27 August 2026 · IST
        </p>
        <h1
          className="mt-5 max-w-4xl text-[2.4rem] font-bold leading-[1.05] text-ink md:text-6xl lg:text-7xl animate-blade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Walk2Talk Global Healthcare Summit{" "}
          <span className="text-signal">2026</span>
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg font-medium text-ink md:text-2xl animate-blade-in"
          style={{ animationDelay: "0.28s" }}
        >
          Healthcare 2030: Transforming Care Through Innovation, Technology &amp; Leadership.
        </p>
        <p
          className="mt-4 max-w-2xl text-base text-slate md:text-lg animate-blade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Between 2026 and 2030, aging populations, workforce shortages and rising costs will
          collide with a wave of new technology arriving faster than most institutions can absorb
          it. This is the moment to decide what the next decade of care looks like.
        </p>
        <div
          className="mt-9 flex flex-wrap items-center gap-4 animate-blade-in"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#register"
            className="inline-flex items-center bg-signal px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-ink blade-clip"
          >
            Register Now
          </a>
          <a
            href="#agenda"
            className="inline-flex items-center border-2 border-ink px-7 py-3 text-sm font-semibold text-ink transition-colors hover:border-signal hover:text-signal"
          >
            View Agenda
          </a>
        </div>

        <div
          className="mt-14 animate-blade-in"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="font-mono-data mb-3 text-[0.7rem] text-slate">Countdown to Summit</p>
          <div className="grid max-w-xl grid-cols-4 gap-3 md:gap-5">
            {[
              { v: c.days, l: "Days" },
              { v: c.hours, l: "Hours" },
              { v: c.mins, l: "Minutes" },
              { v: c.secs, l: "Seconds" },
            ].map((u) => (
              <div
                key={u.l}
                className="border border-border bg-mist px-3 py-4 text-center blade-clip"
              >
                <div className="font-mono-data text-3xl font-semibold text-ink md:text-4xl">
                  {String(u.v).padStart(2, "0")}
                </div>
                <div className="font-mono-data mt-1 text-[0.6rem] text-slate">{u.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SectionDivider />
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="relative h-8 w-full" aria-hidden="true">
      <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="h-full w-full">
        <polygon points="0,0 1200,0 1200,32 40,32" fill="var(--ink)" opacity="0.06" />
        <polygon points="80,0 1200,0 1200,32 120,32" fill="var(--signal)" opacity="0.08" />
      </svg>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal">
          <p className="font-mono-data text-xs text-signal">About the Summit</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-ink md:text-5xl">
            An inflection point for global healthcare.
          </h2>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-5">
          <div className="reveal md:col-span-3 space-y-5 text-base leading-relaxed text-slate md:text-lg">
            <p>
              Healthcare is at an inflection point. Between 2026 and 2030, aging populations,
              workforce shortages, and rising costs will collide with a wave of new technology —
              AI-driven diagnostics, decentralized care, digital therapeutics, and remote care —
              arriving faster than most institutions can absorb it. "Healthcare 2030" sets a
              deliberate horizon: close enough to be actionable, far enough to demand real
              strategic thinking. The Walk2Talk Global Healthcare Summit 2026 convenes health
              system leaders, innovators, policymakers, clinicians, and technologists for a
              half-day virtual dialogue on what it will take to build the healthcare systems of
              2030 — systems that are more accessible, intelligent, resilient, and human-centered.
            </p>
            <p>
              The theme "Healthcare 2030: Transforming Care Through Innovation, Technology &amp;
              Leadership" anchors the conversation on how organizations, governments, and industry
              leaders can work together to improve access, strengthen workforce resilience, and
              deploy innovation responsibly. Rather than a one-way broadcast of trends, the summit
              is built as a series of candid formats — panels, fireside chats, one-on-one
              dialogues — designed to surface practical insight, not abstract forecasting.
            </p>
          </div>
          <div className="reveal md:col-span-2">
            <div className="flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="border border-border bg-mist px-4 py-2 text-sm font-medium text-ink blade-clip"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardGrid({
  eyebrow,
  title,
  items,
  cols,
}: {
  eyebrow: string;
  title: string;
  items: { icon: React.ComponentType<{ className?: string }>; label: string; teal?: boolean }[];
  cols: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="reveal">
        <p className="font-mono-data text-xs text-signal">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold text-ink md:text-5xl">{title}</h2>
      </div>
      <div className={`mt-12 grid gap-5 ${cols}`}>
        {items.map(({ icon: Icon, label, teal }, i) => (
          <div
            key={label}
            className="reveal group relative border border-border bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal blade-clip"
            style={{ transitionDelay: `${(i % 4) * 40}ms` }}
          >
            <div
              className={`mb-5 inline-flex h-12 w-12 items-center justify-center border ${
                teal ? "border-teal text-teal" : "border-ink text-ink"
              } transition-colors group-hover:border-signal group-hover:text-signal`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-base font-semibold leading-snug text-ink">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Audiences() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <CardGrid
        eyebrow="Who Should Attend"
        title="Built for leaders shaping the next decade of care."
        items={AUDIENCES}
        cols="sm:grid-cols-2 lg:grid-cols-5"
      />
    </section>
  );
}

function Themes() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <CardGrid
        eyebrow="Key Discussion Themes"
        title="Eight conversations that will define Healthcare 2030."
        items={THEMES}
        cols="sm:grid-cols-2 lg:grid-cols-4"
      />
    </section>
  );
}

function AgendaRow({ item, index }: { item: AgendaItem; index: number }) {
  const [open, setOpen] = useState(false);
  const hasContent = Boolean(item.brief || item.speaker);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = `agenda-panel-${index}`;

  return (
    <div className="reveal border-b border-border">
      <button
        type="button"
        onClick={() => hasContent && setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={hasContent ? id : undefined}
        disabled={!hasContent}
        className={`grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 py-6 text-left md:grid-cols-[220px_1fr_auto] md:gap-8 md:py-7 ${
          hasContent ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <span className="font-mono-data pt-1 text-xs text-slate md:text-sm">{item.time}</span>
        <span className="text-base font-semibold text-ink md:text-xl">{item.title}</span>
        {hasContent ? (
          <span
            className={`ml-auto flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 blade-clip ${
              open ? "border-signal bg-signal text-paper" : "border-ink text-ink"
            }`}
          >
            <Plus
              className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            />
          </span>
        ) : (
          <span className="ml-auto h-10 w-10 shrink-0" aria-hidden="true" />
        )}
      </button>
      {hasContent && (
        <div
          id={id}
          ref={contentRef}
          style={{
            maxHeight: open ? `${contentRef.current?.scrollHeight ?? 400}px` : "0px",
          }}
          className="overflow-hidden transition-all duration-500 ease-out"
        >
          <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[220px_1fr_40px] md:gap-8">
            <div className="hidden md:block" />
            <div className="space-y-3 text-slate md:text-lg md:leading-relaxed">
              {item.brief && <p>{item.brief}</p>}
              {item.speaker && (
                <p className="text-ink">
                  <span className="font-mono-data mr-2 text-xs text-signal">Speaker:</span>
                  <span className="font-semibold">{item.speaker.name}</span>
                  {", "}
                  {item.speaker.title}, {item.speaker.org}
                </p>
              )}
            </div>
            <div className="hidden md:block" />
          </div>
        </div>
      )}
    </div>
  );
}

function Agenda() {
  return (
    <section id="agenda" className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal">
          <p className="font-mono-data text-xs text-signal">Agenda · All times IST (GMT+5:30)</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-ink md:text-5xl">
            A half-day, built for signal over noise.
          </h2>
        </div>
        <div className="mt-12 border-t border-border">
          {AGENDA.map((item, i) => (
            <AgendaRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakerAvatar({ i }: { i: number }) {
  // Abstract geometric avatar in brand colors
  const palette = [
    ["var(--ink)", "var(--signal)"],
    ["var(--signal)", "var(--ink)"],
    ["var(--teal)", "var(--ink)"],
    ["var(--ink)", "var(--teal)"],
  ][i % 4];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <rect width="100" height="100" fill="var(--mist)" />
      <polygon points="15,10 45,10 65,90 35,90" fill={palette[0]} />
      <polygon points="55,10 85,10 105,90 75,90" fill={palette[1]} />
    </svg>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal">
          <p className="font-mono-data text-xs text-signal">Featured Speakers</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold text-ink md:text-5xl">
            Voices shaping Healthcare 2030.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="reveal group border border-border bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-signal blade-clip"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <SpeakerAvatar i={i} />
              </div>
              <div className="p-5">
                <p className="text-lg font-semibold text-ink">Speaker Name</p>
                <p className="mt-1 text-sm text-slate">Job Title, Organization</p>
              </div>
            </div>
          ))}
        </div>
        <p className="reveal font-mono-data mt-8 text-xs text-slate">
          More speakers to be announced
        </p>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section id="register" className="relative overflow-hidden bg-ink py-16 md:py-20">
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 opacity-20"
        aria-hidden="true"
      >
        <Blade className="h-full w-full" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center md:px-8">
        <div>
          <p className="font-mono-data text-xs text-signal">27 August 2026 · Virtual · IST</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold text-paper md:text-5xl">
            Secure your seat for Healthcare 2030.
          </h2>
        </div>
        <a
          href="#register"
          className="inline-flex items-center bg-signal px-8 py-4 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-paper hover:text-ink blade-clip"
        >
          Register Now
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-paper py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-slate">
              Convening the leaders, innovators and policymakers shaping the healthcare systems of
              2030.
            </p>
            <a
              href="mailto:hello@walk2talkmedia.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink hover:text-signal"
            >
              <Mail className="h-4 w-4" /> hello@walk2talkmedia.com
            </a>
          </div>
          <div>
            <p className="font-mono-data text-xs text-slate">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink hover:text-signal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono-data text-xs text-slate">Follow</p>
            <div className="mt-4 flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-ink transition-colors hover:border-signal hover:text-signal blade-clip"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-xs text-slate">
          © 2026 Walk2Talk Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function SummitPage() {
  useReveal();
  useMemo(() => SUMMIT_UTC, []);
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <About />
      <Audiences />
      <Themes />
      <Agenda />
      <Speakers />
      <ClosingCTA />
      <Footer />
    </main>
  );
}
