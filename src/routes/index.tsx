import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Plus,
  Users,
  Sparkles,
  Cpu,
  Landmark,
  Compass,
  Globe2,
  Linkedin,
  Mail,
  ArrowRight,
} from "lucide-react";
import logoAsset from "@/assets/walk2talk-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: SummitPage,
});

const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#topics", label: "Key Topics" },
  { href: "#speakers", label: "Speakers" },
  { href: "#agenda", label: "Agenda" },
  { href: "#why", label: "Why Attend" },
  { href: "#who", label: "Who Attends" },
  { href: "#faq", label: "FAQ" },
];

const HERO_HIGHLIGHTS = [
  "Global Speakers",
  "Healthcare Leaders",
  "AI & Innovation",
  "Interactive Sessions",
];

const TOPICS = [
  "The future of healthcare delivery and health systems",
  "AI and digital transformation across the care continuum",
  "Workforce resilience and the healthcare talent challenge",
  "Patient-centered and value-based care models",
  "Telemedicine, remote care and connected health",
  "Responsible innovation and emerging medical technology",
  "Leadership strategies for navigating change",
  "Building accessible, equitable and sustainable systems",
];

const SPEAKERS = Array.from({ length: 8 }).map((_, i) => ({
  name: `Speaker ${String.fromCharCode(65 + i)}${String.fromCharCode(66 + i)}${String.fromCharCode(67 + i)}`,
  role: "Chief Executive Officer",
  org: "Organization XYZ",
  seed: i,
}));

type AgendaItem = { time: string; title: string; brief?: string };

const AGENDA: AgendaItem[] = [
  { time: "5:00 – 5:10 PM", title: "Welcome Address by Walk2Talk Media" },
  {
    time: "5:10 – 5:20 PM",
    title:
      "Opening Keynote — The Future of Healthcare 2030: Policy, Innovation & System Transformation",
    brief:
      "How policy, innovation and strategic leadership can work together to create more accessible, resilient and sustainable healthcare systems — and prepare organizations and nations for the opportunities of 2030.",
  },
  {
    time: "5:20 – 5:40 PM",
    title: "In Conversation — From Vision to Impact: Leading Change in Healthcare",
    brief:
      "How healthcare leaders are turning strategic vision into measurable impact through innovation, collaboration and patient-centered care.",
  },
  {
    time: "5:45 – 6:20 PM",
    title: "Panel Discussion — AI, Digital Health & the Future of Patient Care",
    brief:
      "How organizations can leverage innovation responsibly to enhance patient experiences, improve clinical outcomes and build more connected, data-driven healthcare systems.",
  },
  {
    time: "6:25 – 6:35 PM",
    title: "Special Guest — Building Sustainable & Resilient Healthcare Systems",
    brief:
      "The policies, investments and collaborative efforts required to create healthcare systems that can meet the evolving needs of populations in the years ahead.",
  },
  {
    time: "6:40 – 7:00 PM",
    title: "Fireside Chat — What Healthcare Leaders Must Prioritize by 2030",
    brief:
      "The key priorities healthcare organizations should focus on to drive innovation, strengthen resilience, improve patient outcomes and build sustainable healthcare systems for 2030 and beyond.",
  },
  {
    time: "7:00 – 7:15 PM",
    title: "Closing Keynote — Building Tomorrow's Healthcare, Today",
    brief:
      "How collaboration, innovation and leadership can help create sustainable, technology-enabled and human-centered healthcare systems for generations to come.",
  },
  { time: "7:30 PM", title: "Closing Address" },
];

const WHY = [
  {
    icon: Users,
    title: "Executive Networking",
    body: "Convene with hospital CEOs, ministers, investors and technology leaders shaping global healthcare.",
  },
  {
    icon: Compass,
    title: "Leadership Insight",
    body: "Candid dialogue on how executives are navigating change, cost pressure and organizational transformation.",
  },
  {
    icon: Sparkles,
    title: "Frontier Innovation",
    body: "First-hand perspectives on the technologies and care models redefining the next decade.",
  },
  {
    icon: Cpu,
    title: "AI in Practice",
    body: "Move beyond hype: how AI is being deployed responsibly across diagnostics, workflow and patient experience.",
  },
  {
    icon: Landmark,
    title: "Policy & Systems",
    body: "Understand the regulation, financing and public-private collaboration required for resilient systems.",
  },
  {
    icon: Globe2,
    title: "Future of Healthcare",
    body: "A deliberate 2030 horizon — close enough to act on, far enough to demand real strategic thinking.",
  },
];

const WHO = [
  ["Hospital & Health System CEOs", "Chief Medical Officers", "Chief Nursing Officers", "Chief Information / Digital Officers"],
  ["Ministers & Government Policymakers", "Regulators & Public Health Leaders", "Payers & Insurance Executives", "Investors & Healthcare Funds"],
  ["Pharma & Life Sciences Executives", "MedTech & Digital Health Founders", "AI & Data Science Leaders", "Academic & Research Institutions"],
];

const FAQS = [
  {
    q: "When and where is the summit taking place?",
    a: "The Walk2Talk Global Healthcare Summit 2026 is a half-day virtual event on 27 August 2026. All sessions run in Indian Standard Time (IST, GMT+5:30) and are accessible from anywhere in the world.",
  },
  {
    q: "Is there a fee to attend?",
    a: "Registration is by application for qualifying executives, policymakers, clinicians, investors and industry leaders. Confirmed delegates receive their access credentials by email in advance of the summit.",
  },
  {
    q: "Will sessions be recorded?",
    a: "Registered delegates receive on-demand access to session recordings after the live event, subject to speaker permissions.",
  },
  {
    q: "How can my organization become a partner?",
    a: "Walk2Talk Media offers a limited number of curated partnership opportunities across knowledge, technology and industry categories. Reach out via the partnership form or email partnerships@walk2talkmedia.com.",
  },
  {
    q: "How are speakers selected?",
    a: "Speakers are invited based on their leadership role in shaping global healthcare — spanning health systems, government, industry, technology and research — with a focus on candid, senior-level dialogue.",
  },
];

// 27 Aug 2026, 5:00 PM IST = 11:30 UTC
const SUMMIT_UTC = Date.UTC(2026, 7, 27, 11, 30, 0);

function useCountdown(target: number) {
  // Init to zero so SSR HTML matches first client render — avoids hydration mismatch.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs, ready: now !== null };
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return <img src={logoAsset.url} alt="Walk2Talk Media" className={className} />;
}

function SectionHeading({
  eyebrow,
  title,
  align = "center",
  intro,
}: {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  intro?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`reveal ${isCenter ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className={`font-mono-data text-teal ${isCenter ? "" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-4 font-display text-[2.15rem] leading-[1.1] text-navy md:text-5xl ${
          isCenter ? "mx-auto max-w-3xl" : "max-w-3xl"
        }`}
      >
        {title}
      </h2>
      <span className={isCenter ? "gold-rule" : "gold-rule-left"} />
      {intro && (
        <p
          className={`mt-6 text-base leading-relaxed text-charcoal/75 md:text-lg ${
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-hairline bg-paper/90 px-4 py-2.5 backdrop-blur-md transition-all md:px-5 md:py-3 ${
          scrolled ? "shadow-[0_12px_40px_-12px_rgba(11,37,69,0.18)]" : "shadow-[0_6px_24px_-16px_rgba(11,37,69,0.15)]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-1">
          <Logo className="h-7 w-auto md:h-8" />
          <span className="sr-only">Walk2Talk Media</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-3 py-1.5 text-[0.82rem] font-medium text-navy transition-colors hover:text-teal"
            >
              {l.label}
              <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#register"
            className="hidden rounded-full bg-navy px-5 py-2.5 text-[0.8rem] font-semibold text-paper shadow-[0_6px_20px_-8px_rgba(11,37,69,0.45)] transition-all hover:-translate-y-0.5 hover:bg-teal hover:shadow-[0_10px_28px_-8px_rgba(0,166,166,0.5)] md:inline-flex"
          >
            Register
          </a>
          <button
            className="rounded-full border border-hairline p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5 text-navy" /> : <Menu className="h-5 w-5 text-navy" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-hairline bg-paper p-4 shadow-lg lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-3 text-sm font-medium text-navy last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-paper"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ILLUSTRATION ---------------- */

function WorldMapBackdrop() {
  // Decorative dotted world map + pulsing nodes + connection arcs
  const nodes = [
    { cx: 190, cy: 210 },
    { cx: 340, cy: 180 },
    { cx: 520, cy: 200 },
    { cx: 680, cy: 250 },
    { cx: 810, cy: 220 },
    { cx: 280, cy: 340 },
    { cx: 620, cy: 360 },
    { cx: 470, cy: 300 },
  ];
  return (
    <svg
      viewBox="0 0 1000 500"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="haze" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#00A6A6" stopOpacity="0.10" />
          <stop offset="60%" stopColor="#0B2545" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#0B2545" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1000" height="500" fill="url(#haze)" />
      {/* dotted latitude bands */}
      {Array.from({ length: 18 }).map((_, i) =>
        Array.from({ length: 60 }).map((__, j) => {
          const cx = 40 + j * 16;
          const cy = 40 + i * 26;
          // shape a rough continents mask
          const inLand =
            (cx > 120 && cx < 280 && cy > 100 && cy < 340) ||
            (cx > 300 && cx < 520 && cy > 90 && cy < 380 && (cx + cy) % 3 !== 0) ||
            (cx > 560 && cx < 820 && cy > 110 && cy < 360 && (cx * cy) % 7 !== 0) ||
            (cx > 620 && cx < 740 && cy > 360 && cy < 430);
          if (!inLand) return null;
          return (
            <circle
              key={`${i}-${j}`}
              cx={cx}
              cy={cy}
              r={1.2}
              fill="#0B2545"
              opacity={0.28}
            />
          );
        }),
      )}
      {/* Connection arcs */}
      {[
        [nodes[0], nodes[2]],
        [nodes[1], nodes[4]],
        [nodes[2], nodes[6]],
        [nodes[3], nodes[7]],
        [nodes[5], nodes[4]],
      ].map(([a, b], i) => {
        const mx = (a.cx + b.cx) / 2;
        const my = Math.min(a.cy, b.cy) - 60;
        return (
          <path
            key={i}
            d={`M${a.cx},${a.cy} Q${mx},${my} ${b.cx},${b.cy}`}
            fill="none"
            stroke="#00A6A6"
            strokeWidth="1"
            strokeOpacity="0.55"
            className="draw-line"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        );
      })}
      {/* Pulsing nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={4}
            fill="#C9A040"
            className="pulse-node"
            style={{ animationDelay: `${(i % 5) * 0.6}s` }}
          />
          <circle cx={n.cx} cy={n.cy} r={9} fill="none" stroke="#00A6A6" strokeOpacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* soft glow */}
      <div
        className="absolute inset-6 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0,166,166,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(201,160,64,0.28), transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 520 520"
        className="relative h-full w-full animate-float-slow"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B2545" />
            <stop offset="100%" stopColor="#00A6A6" />
          </linearGradient>
          <linearGradient id="pulseG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00A6A6" />
            <stop offset="100%" stopColor="#C9A040" />
          </linearGradient>
        </defs>

        {/* outer rings */}
        <circle cx="260" cy="260" r="230" fill="none" stroke="#E5EAF0" strokeWidth="1" />
        <circle cx="260" cy="260" r="180" fill="none" stroke="#E5EAF0" strokeWidth="1" />
        <circle cx="260" cy="260" r="130" fill="none" stroke="url(#ring)" strokeWidth="1.5" opacity="0.6" />

        {/* orbit nodes */}
        {[
          { a: 0, r: 230, c: "#C9A040" },
          { a: 55, r: 230, c: "#00A6A6" },
          { a: 130, r: 230, c: "#0B2545" },
          { a: 210, r: 230, c: "#00A6A6" },
          { a: 300, r: 230, c: "#C9A040" },
          { a: 30, r: 180, c: "#0B2545" },
          { a: 160, r: 180, c: "#C9A040" },
          { a: 260, r: 180, c: "#00A6A6" },
        ].map((n, i) => {
          const rad = (n.a * Math.PI) / 180;
          const x = 260 + n.r * Math.cos(rad);
          const y = 260 + n.r * Math.sin(rad);
          return (
            <g key={i}>
              <line x1="260" y1="260" x2={x} y2={y} stroke="#E5EAF0" strokeWidth="0.75" />
              <circle cx={x} cy={y} r="6" fill={n.c} className="pulse-node" style={{ animationDelay: `${i * 0.35}s` }} />
            </g>
          );
        })}

        {/* central card with heartbeat + cross */}
        <g transform="translate(160,180)">
          <rect x="0" y="0" width="200" height="160" rx="16" fill="#FFFFFF" stroke="#E5EAF0" />
          <rect x="0" y="0" width="200" height="34" rx="16" fill="#0B2545" />
          <circle cx="18" cy="17" r="4" fill="#C9A040" />
          <circle cx="32" cy="17" r="4" fill="#00A6A6" opacity="0.7" />
          <circle cx="46" cy="17" r="4" fill="#FFFFFF" opacity="0.4" />
          {/* heartbeat */}
          <polyline
            points="16,110 46,110 62,80 78,140 94,90 112,110 184,110"
            fill="none"
            stroke="url(#pulseG)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* medical cross */}
          <g transform="translate(150,52)">
            <rect x="-6" y="-16" width="12" height="32" rx="3" fill="#00A6A6" />
            <rect x="-16" y="-6" width="32" height="12" rx="3" fill="#00A6A6" />
          </g>
          {/* AI chip */}
          <g transform="translate(30,52)">
            <rect x="0" y="0" width="34" height="34" rx="6" fill="#F7FAFC" stroke="#0B2545" />
            <text
              x="17"
              y="22"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              fontSize="12"
              fill="#0B2545"
            >
              AI
            </text>
          </g>
        </g>

        {/* small labels */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#5B6169" letterSpacing="1.5">
          <text x="60" y="120">NETWORK</text>
          <text x="380" y="120">GLOBAL</text>
          <text x="60" y="420">DIGITAL</text>
          <text x="380" y="420">CARE</text>
        </g>
      </svg>
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const c = useCountdown(SUMMIT_UTC);
  return (
    <section id="top" className="relative overflow-hidden bg-paper pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0">
        <WorldMapBackdrop />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 md:grid-cols-2 md:gap-8 md:px-8 md:pb-28 md:pt-8">
        <div>
          <div className="animate-fade-up">
            <Logo className="h-9 w-auto md:h-10" />
          </div>
          <p
            className="mt-8 font-mono-data text-teal animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Virtual Summit · 27 August 2026 · IST
          </p>
          <h1
            className="mt-4 font-display text-[2.2rem] leading-[1.05] text-navy md:text-[3.4rem] lg:text-[3.9rem] animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Walk2Talk Global{" "}
            <span className="italic text-navy/90">Healthcare</span> Summit
            <span className="text-gold"> 2026</span>
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/80 md:text-xl animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            Healthcare 2030: Transforming Care Through Innovation, Technology &amp; Leadership.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_-10px_rgba(11,37,69,0.5)] transition-all hover:-translate-y-0.5 hover:bg-teal hover:shadow-[0_14px_34px_-10px_rgba(0,166,166,0.5)]"
            >
              Register Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#partners"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
            >
              Become a Partner
            </a>
          </div>
          <ul
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 animate-fade-up sm:grid-cols-4"
            style={{ animationDelay: "0.6s" }}
          >
            {HERO_HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-2 text-[0.78rem] font-medium text-charcoal/70">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {h}
              </li>
            ))}
          </ul>

          {/* Countdown */}
          <div
            className="mt-12 animate-fade-up"
            style={{ animationDelay: "0.75s" }}
          >
            <p className="font-mono-data mb-3 text-charcoal/60">Countdown to Summit</p>
            <div className="grid max-w-md grid-cols-4 gap-3">
              {[
                { v: c.days, l: "Days" },
                { v: c.hours, l: "Hours" },
                { v: c.mins, l: "Minutes" },
                { v: c.secs, l: "Seconds" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="rounded-2xl border border-hairline bg-paper/80 px-3 py-4 text-center shadow-[0_6px_18px_-14px_rgba(11,37,69,0.35)] backdrop-blur"
                >
                  <div className="font-display text-3xl font-semibold text-navy md:text-4xl tabular-nums">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="font-mono-data mt-1 text-[0.6rem] text-charcoal/55">{u.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

/* ---------------- OVERVIEW ---------------- */

function Overview() {
  return (
    <section id="overview" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Overview" title="Overview" />
        <div className="relative mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Oversized quote mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[10rem] leading-none text-gold/15 md:text-[14rem]"
          >
            &ldquo;
          </span>
          <div className="reveal">
            <h3 className="font-display text-3xl leading-[1.15] text-navy md:text-[2.6rem]">
              Healthcare Innovation for the Next Decade.
            </h3>
            <p className="mt-6 text-base text-teal font-medium">
              A deliberate 2030 horizon — close enough to act on, far enough to demand real strategic thinking.
            </p>
          </div>
          <div className="reveal space-y-5 text-base leading-relaxed text-charcoal/80 md:text-[1.02rem]">
            <p>
              Healthcare is at an inflection point. Between 2026 and 2030, aging populations,
              workforce shortages and rising costs will collide with a wave of new technology —
              AI-driven diagnostics, decentralized care, digital therapeutics and remote monitoring —
              arriving faster than most institutions can absorb it.
            </p>
            <p>
              The Walk2Talk Global Healthcare Summit 2026 convenes health system leaders,
              innovators, policymakers, clinicians and technologists for a half-day virtual dialogue
              on what it will take to build the healthcare systems of 2030 — systems that are more
              accessible, intelligent, resilient and human-centered.
            </p>
            <p>
              Rather than a one-way broadcast of trends, the summit is built as a series of candid
              formats — panels, fireside chats and one-on-one dialogues — designed to surface
              practical insight, not abstract forecasting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TOPICS ---------------- */

function Topics() {
  const col1 = TOPICS.slice(0, 4);
  const col2 = TOPICS.slice(4);
  return (
    <section id="topics" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="What we'll discuss" title="Key Discussion Topics" />
        <div className="mt-16 grid gap-x-16 gap-y-2 md:grid-cols-2">
          {[col1, col2].map((col, ci) => (
            <ul key={ci} className="space-y-6">
              {col.map((t, i) => (
                <li
                  key={t}
                  className="reveal flex items-start gap-4 border-b border-hairline pb-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span className="font-display text-xl leading-snug text-navy md:text-[1.4rem]">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SPEAKERS ---------------- */

function SpeakerAvatar({ seed }: { seed: number }) {
  // Deterministic geometric avatar
  const bgs = ["#0B2545", "#00A6A6", "#C9A040", "#1F2937"];
  const bg = bgs[seed % bgs.length];
  const alt = bgs[(seed + 2) % bgs.length];
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[18px] bg-mist">
      <svg viewBox="0 0 200 250" className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" aria-hidden="true">
        <rect width="200" height="250" fill="#F7FAFC" />
        <circle cx="100" cy="105" r="55" fill={bg} opacity="0.15" />
        <circle cx="100" cy="105" r="42" fill={bg} />
        <path d="M35 250 Q100 170 165 250 Z" fill={alt} opacity="0.9" />
        <circle cx="100" cy="105" r="42" fill="none" stroke="#C9A040" strokeWidth="1.2" opacity="0.6" />
        <circle cx="160" cy="40" r="4" fill="#C9A040" />
        <circle cx="40" cy="50" r="3" fill="#00A6A6" />
      </svg>
    </div>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Voices shaping Healthcare 2030"
          title="Speakers"
          intro="A curated roster of global leaders from health systems, government, industry and technology. Full speaker line-up to be announced."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((s, i) => (
            <article
              key={i}
              className="reveal group overflow-hidden rounded-[20px] border border-hairline bg-paper shadow-[0_6px_24px_-18px_rgba(11,37,69,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_40px_-18px_rgba(0,166,166,0.35)]"
              style={{ transitionDelay: `${(i % 4) * 60}ms` }}
            >
              <SpeakerAvatar seed={s.seed} />
              <div className="p-5">
                <h3 className="font-display text-lg text-navy">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-teal">{s.role}</p>
                <p className="mt-0.5 text-sm text-charcoal/65">{s.org}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-charcoal/60">
          <span className="font-mono-data text-charcoal/45">Placeholder line-up</span> — speaker profiles will be updated as they are confirmed.
        </p>
      </div>
    </section>
  );
}

/* ---------------- AGENDA ---------------- */

function AgendaRow({ item, index }: { item: AgendaItem; index: number }) {
  const [open, setOpen] = useState(false);
  const hasContent = Boolean(item.brief);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = `agenda-panel-${index}`;

  return (
    <div className="reveal">
      <button
        type="button"
        onClick={() => hasContent && setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={`group flex w-full items-start justify-between gap-6 rounded-2xl border border-hairline bg-paper px-5 py-6 text-left transition-all md:px-7 md:py-7 ${
          hasContent ? "cursor-pointer hover:border-teal hover:bg-mist" : "cursor-default"
        }`}
      >
        <div className="grid flex-1 grid-cols-[110px_1fr] items-start gap-4 md:grid-cols-[180px_1fr] md:gap-8">
          <span className="font-mono-data pt-1 text-teal">{item.time}</span>
          <h3 className="font-display text-lg leading-snug text-navy md:text-[1.35rem]">
            {item.title}
          </h3>
        </div>
        {hasContent && (
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline text-navy transition-all group-hover:border-teal group-hover:text-teal ${
              open ? "rotate-45 bg-teal text-paper !border-teal" : ""
            }`}
          >
            <Plus className="h-4 w-4" />
          </span>
        )}
      </button>
      <div
        id={id}
        ref={contentRef}
        style={{ maxHeight: open && contentRef.current ? contentRef.current.scrollHeight + "px" : "0px" }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        {hasContent && (
          <div className="px-5 pb-6 pt-2 md:px-7">
            <div className="ml-0 border-l-2 border-gold pl-5 md:ml-[180px]">
              <p className="text-base leading-relaxed text-charcoal/80 md:text-[1.02rem]">
                {item.brief}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Agenda() {
  return (
    <section id="agenda" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading
          eyebrow="27 August 2026 · Indian Standard Time"
          title="Agenda"
          intro="A tightly-curated half-day program of keynotes, panels and fireside conversations. Click any session for the brief."
        />
        <div className="mt-16 space-y-4">
          {AGENDA.map((item, i) => (
            <AgendaRow key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY ATTEND ---------------- */

function WhyAttend() {
  return (
    <section id="why" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Why the summit matters" title="Why Attend" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <article
              key={w.title}
              className="reveal group rounded-[20px] border border-hairline bg-paper p-7 shadow-[0_6px_24px_-18px_rgba(11,37,69,0.3)] transition-all hover:-translate-y-1 hover:border-teal hover:shadow-[0_18px_40px_-18px_rgba(0,166,166,0.3)]"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-full border border-hairline text-navy transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-paper">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl text-navy">{w.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{w.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHO SHOULD ATTEND ---------------- */

function WhoShouldAttend() {
  return (
    <section id="who" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Audience" title="Who Should Attend" />
        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-14">
          {WHO.map((col, ci) => (
            <ul key={ci} className="reveal space-y-5" style={{ transitionDelay: `${ci * 80}ms` }}>
              {col.map((item) => (
                <li key={item} className="border-b border-hairline pb-5">
                  <span className="font-display text-lg leading-snug text-navy md:text-xl">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PARTNERS ---------------- */

function PartnerLogo({ i }: { i: number }) {
  // Placeholder SVG "logos" using geometric marks + wordmarks
  const marks = [
    (
      <g key="a">
        <circle cx="18" cy="20" r="12" fill="currentColor" opacity="0.9" />
        <rect x="34" y="10" width="6" height="20" fill="currentColor" />
      </g>
    ),
    (
      <g key="b">
        <polygon points="10,32 22,8 34,32" fill="currentColor" />
        <rect x="42" y="18" width="16" height="4" fill="currentColor" />
      </g>
    ),
    (
      <g key="c">
        <rect x="8" y="12" width="16" height="16" fill="currentColor" />
        <circle cx="38" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="3" />
      </g>
    ),
    (
      <g key="d">
        <path d="M10 28 Q20 6 30 28 Q40 6 50 28" fill="none" stroke="currentColor" strokeWidth="3" />
      </g>
    ),
    (
      <g key="e">
        <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="38" cy="20" r="4" fill="currentColor" />
      </g>
    ),
    (
      <g key="f">
        <rect x="8" y="8" width="10" height="24" fill="currentColor" />
        <rect x="22" y="14" width="10" height="18" fill="currentColor" opacity="0.7" />
        <rect x="36" y="20" width="10" height="12" fill="currentColor" opacity="0.5" />
      </g>
    ),
  ];
  const names = ["Meridian", "Vantage", "Aequita", "Nordic Care", "Helix Bio", "Constella"];
  return (
    <div className="flex h-16 items-center gap-3">
      <svg viewBox="0 0 60 40" className="h-9 w-14 shrink-0">{marks[i % marks.length]}</svg>
      <span className="font-display text-lg tracking-tight">{names[i % names.length]}</span>
    </div>
  );
}

function Partners() {
  return (
    <section id="partners" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Convened with"
          title="Partners"
          intro="A curated group of knowledge, technology and industry partners advancing the summit's mission."
        />
        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="reveal group grid place-items-center rounded-2xl border border-hairline bg-paper px-4 py-8 text-charcoal/40 transition-all hover:-translate-y-1 hover:text-teal hover:shadow-[0_14px_36px_-18px_rgba(11,37,69,0.25)]"
              style={{ transitionDelay: `${(i % 6) * 40}ms` }}
            >
              <PartnerLogo i={i} />
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-charcoal/60">
          Interested in partnering?{" "}
          <a href="#register" className="font-semibold text-teal underline-offset-4 hover:underline">
            Become a partner
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FaqRow({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = `faq-panel-${index}`;
  return (
    <div className="reveal rounded-2xl border border-hairline bg-paper transition-colors hover:border-teal">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
      >
        <span className="font-display text-lg text-navy md:text-xl">{item.q}</span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline text-navy transition-all ${
            open ? "rotate-45 border-teal bg-teal text-paper" : ""
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        id={id}
        ref={ref}
        style={{ maxHeight: open && ref.current ? ref.current.scrollHeight + "px" : "0px" }}
        className="overflow-hidden transition-[max-height] duration-500"
      >
        <p className="px-6 pb-6 text-[0.98rem] leading-relaxed text-charcoal/75">{item.a}</p>
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section id="faq" className="bg-mist py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading eyebrow="Good to know" title="Frequently Asked Questions" />
        <div className="mt-14 space-y-4">
          {FAQS.map((f, i) => (
            <FaqRow key={i} item={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- REGISTER CTA ---------------- */

function RegisterCTA() {
  return (
    <section id="register" className="relative overflow-hidden bg-navy py-24 text-paper md:py-32">
      {/* subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <WorldMapBackdrop />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="font-mono-data text-gold">Register your interest</p>
        <h2 className="mt-5 font-display text-[2.1rem] leading-[1.1] text-paper md:text-5xl">
          Join the executives shaping Healthcare 2030.
        </h2>
        <span className="mx-auto mt-6 block h-px w-16 bg-gold" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
          Registration for the Walk2Talk Global Healthcare Summit 2026 is open by application to
          qualifying executives, policymakers, clinicians, investors and industry leaders.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:register@walk2talkmedia.com?subject=Walk2Talk%20Global%20Healthcare%20Summit%202026%20-%20Registration"
            className="inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-navy"
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:partnerships@walk2talkmedia.com?subject=Walk2Talk%20Global%20Healthcare%20Summit%202026%20-%20Partnership"
            className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-8 py-4 text-sm font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
          >
            Become a Partner
          </a>
        </div>
        <p className="mt-8 font-mono-data text-paper/50">
          Virtual · 27 August 2026 · Indian Standard Time
        </p>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-10 w-auto" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal/70">
              Walk2Talk Media convenes global leaders in healthcare, technology, policy and industry
              through candid, editorial-grade summits and dialogues.
            </p>
          </div>
          <div>
            <p className="font-mono-data text-charcoal/50">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-navy transition-colors hover:text-teal">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono-data text-charcoal/50">Connect</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@walk2talkmedia.com"
                  className="inline-flex items-center gap-2 text-navy transition-colors hover:text-teal"
                >
                  <Mail className="h-4 w-4" /> hello@walk2talkmedia.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-navy transition-colors hover:text-teal"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-6 text-xs text-charcoal/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Walk2Talk Media. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-teal">Privacy Policy</a>
            <a href="#" className="hover:text-teal">Terms</a>
            <a href="#" className="hover:text-teal">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- PAGE ---------------- */

function SummitPage() {
  useReveal();
  return (
    <main className="bg-paper text-charcoal">
      <Nav />
      <Hero />
      <Overview />
      <Topics />
      <Speakers />
      <Agenda />
      <WhyAttend />
      <WhoShouldAttend />
      <Partners />
      <Faq />
      <RegisterCTA />
      <Footer />
    </main>
  );
}
