import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { X, Loader2, CheckCircle2, ChevronDown, Search } from "lucide-react";

/* ---------------- EmailJS (client-side only, no backend) ----------------
   Replace these 3 values with your EmailJS keys (emailjs.com).
   The same keys are also used by the static site in static-site/js/script.js. */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

type EmailJs = { init: (o: { publicKey: string }) => void; send: (s: string, t: string, p: Record<string, string>) => Promise<unknown> };

async function loadEmailJs(): Promise<EmailJs> {
  if (EMAILJS_PUBLIC_KEY.startsWith("YOUR_")) {
    throw new Error(
      "EmailJS is not configured yet. Add your EmailJS keys to enable email delivery.",
    );
  }
  const w = window as unknown as { emailjs?: EmailJs };
  if (!w.emailjs) {
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Could not load the email service."));
      document.head.appendChild(s);
    });
  }
  const ejs = (window as unknown as { emailjs: EmailJs }).emailjs;
  ejs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  return ejs;
}

/* ---------------- Context ---------------- */


type RegisterCtx = { open: () => void };
const RegisterContext = createContext<RegisterCtx | null>(null);

export function useRegister() {
  const ctx = useContext(RegisterContext);
  if (!ctx) throw new Error("useRegister must be used within RegisterProvider");
  return ctx;
}

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <RegisterContext.Provider value={value}>
      {children}
      <RegisterModal isOpen={isOpen} onClose={close} />
    </RegisterContext.Provider>
  );
}

/* ---------------- Countries ---------------- */

const COUNTRIES: string[] = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi",
  "Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia",
  "Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast",
  "Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar",
  "Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman",
  "Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar",
  "Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
  "Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen",
  "Zambia","Zimbabwe",
];

/* ---------------- Form State ---------------- */

type FormState = {
  fullName: string;
  designation: string;
  organization: string;
  email: string;
  contactNumber: string;
  country: string;
};

const EMPTY: FormState = {
  fullName: "",
  designation: "",
  organization: "",
  email: "",
  contactNumber: "",
  country: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (!v.fullName.trim() || v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!v.designation.trim()) e.designation = "Designation is required.";
  if (!v.organization.trim()) e.organization = "Organization is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.contactNumber.trim()) e.contactNumber = "Contact number is required.";
  else if (!/^[+()\-\s\d]{6,30}$/.test(v.contactNumber.trim()))
    e.contactNumber = "Enter a valid international phone number.";
  if (!v.country.trim()) e.country = "Please select your country.";
  return e;
}

/* ---------------- Modal ---------------- */

type Status = "idle" | "submitting" | "success" | "error";

function RegisterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset when opening fresh (not on retry after error)
  useEffect(() => {
    if (isOpen && status === "success") {
      // keep success view visible until user closes
    }
    if (isOpen) {
      setTimeout(() => firstFieldRef.current?.focus(), 60);
    }
  }, [isOpen, status]);

  // Lock body scroll + Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
    // Reset only after success; keep data on error so users can retry
    setTimeout(() => {
      if (status === "success") {
        setForm(EMPTY);
        setErrors({});
        setStatus("idle");
        setErrorMessage("");
      }
    }, 300);
  };

  const setField = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setStatus("submitting");
    setErrorMessage("");
    try {
      const emailjs = await loadEmailJs();
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.fullName,
        name: form.fullName,
        from_email: form.email,
        email: form.email,
        reply_to: form.email,
        designation: form.designation,
        organization: form.organization,
        company: form.organization,
        contact_number: form.contactNumber,
        phone: form.contactNumber,
        country: form.country,
        to_email: "contact@walk2talkmedia.com",
        timestamp: new Date().toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }) + " IST",
        subject: "New Summit Registration | Walk2Talk Global Healthcare Summit 2026",
      });
      setStatus("success");
      setForm(EMPTY);
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again or contact us at contact@walk2talkmedia.com.",
      );
    }

  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-navy/50 px-3 py-6 backdrop-blur-sm animate-fade-in sm:items-center sm:px-6"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden rounded-[20px] bg-white shadow-[0_30px_80px_-20px_rgba(11,37,69,0.45)] animate-modal-in"
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={status === "submitting"}
          aria-label="Close registration form"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-charcoal/60 transition-all hover:bg-mist hover:text-navy disabled:opacity-40"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <SuccessView onClose={handleClose} />
        ) : (
          <div className="max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-9 sm:py-10">
            <div className="pr-8">
              <h2
                id="register-title"
                className="font-display text-2xl leading-tight text-navy sm:text-[1.7rem]"
              >
                Register for Walk2Talk Global Healthcare Summit 2026
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                Complete the form below to reserve your seat for the virtual summit.
              </p>
              <span className="mt-4 block h-px w-12 bg-gold" />
            </div>

            <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
              <Field
                label="Full Name"
                error={errors.fullName}
                htmlFor="reg-fullName"
              >
                <input
                  ref={firstFieldRef}
                  id="reg-fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={inputCls(!!errors.fullName)}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Designation" error={errors.designation} htmlFor="reg-designation">
                  <input
                    id="reg-designation"
                    type="text"
                    autoComplete="organization-title"
                    value={form.designation}
                    onChange={(e) => setField("designation", e.target.value)}
                    className={inputCls(!!errors.designation)}
                  />
                </Field>
                <Field label="Organization" error={errors.organization} htmlFor="reg-organization">
                  <input
                    id="reg-organization"
                    type="text"
                    autoComplete="organization"
                    value={form.organization}
                    onChange={(e) => setField("organization", e.target.value)}
                    className={inputCls(!!errors.organization)}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email Address" error={errors.email} htmlFor="reg-email">
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={inputCls(!!errors.email)}
                  />
                </Field>
                <Field label="Contact Number" error={errors.contactNumber} htmlFor="reg-contact">
                  <input
                    id="reg-contact"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={form.contactNumber}
                    onChange={(e) => setField("contactNumber", e.target.value)}
                    className={inputCls(!!errors.contactNumber)}
                  />
                </Field>
              </div>

              <Field label="Country" error={errors.country} htmlFor="reg-country">
                <CountrySelect
                  id="reg-country"
                  value={form.country}
                  onChange={(v) => setField("country", v)}
                  hasError={!!errors.country}
                />
              </Field>

              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-paper shadow-[0_10px_30px_-10px_rgba(11,37,69,0.5)] transition-all hover:-translate-y-0.5 hover:bg-teal hover:shadow-[0_14px_34px_-10px_rgba(0,166,166,0.55)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Register Now"
                )}
              </button>

              <p className="text-center text-xs text-charcoal/55">
                We'll email you further details after your registration is received.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 py-12 text-center sm:px-10 sm:py-14">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h3 className="mt-6 font-display text-2xl text-navy sm:text-[1.7rem]">
        Registration Successful!
      </h3>
      <span className="mx-auto mt-4 block h-px w-12 bg-gold" />
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-charcoal/75">
        Thank you for registering for the Walk2Talk Global Healthcare Summit 2026. Our team has
        received your registration and will contact you shortly with further details.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-8 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-teal"
      >
        Close
      </button>
    </div>
  );
}

/* ---------------- Field primitives ---------------- */

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/70">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-charcoal/40 outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 ${
    hasError ? "border-red-400" : "border-hairline hover:border-charcoal/30"
  }`;
}

/* ---------------- Searchable country select ---------------- */

function CountrySelect({
  id,
  value,
  onChange,
  hasError,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20 ${
          hasError ? "border-red-400" : "border-hairline hover:border-charcoal/30"
        } ${value ? "text-navy" : "text-charcoal/40"}`}
      >
        <span>{value || "Select country"}</span>
        <ChevronDown className={`h-4 w-4 text-charcoal/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-hairline bg-white shadow-[0_18px_40px_-14px_rgba(11,37,69,0.25)]">
          <div className="flex items-center gap-2 border-b border-hairline px-3 py-2">
            <Search className="h-4 w-4 text-charcoal/50" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries…"
              className="w-full bg-transparent py-1 text-sm text-navy placeholder:text-charcoal/40 outline-none"
            />
          </div>
          <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-charcoal/50">No matches</li>
            )}
            {filtered.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors hover:bg-mist ${
                    c === value ? "text-teal" : "text-navy"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
