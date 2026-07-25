import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const RegistrationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  designation: z.string().trim().min(2).max(150),
  organization: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  contactNumber: z
    .string()
    .trim()
    .min(6)
    .max(30)
    .regex(/^[+()\-\s\d]+$/, "Invalid phone number"),
  country: z.string().trim().min(2).max(100),
});

const RECIPIENT = "contact@walk2talkmedia.com";

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/register")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = RegistrationSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", details: parsed.error.flatten() },
            { status: 400 },
          );
        }

        const data = parsed.data;
        const submittedAt = new Date();

        // 1) Persist to database (source of truth)
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("registrations").insert({
            full_name: data.fullName,
            designation: data.designation,
            organization: data.organization,
            email: data.email,
            contact_number: data.contactNumber,
            country: data.country,
          });
          if (error) {
            console.error("[register] db insert failed:", error);
            return Response.json(
              { error: "Could not save registration. Please try again." },
              { status: 500 },
            );
          }
        } catch (err) {
          console.error("[register] db error:", err);
          return Response.json(
            { error: "Could not save registration. Please try again." },
            { status: 500 },
          );
        }

        // 2) Best-effort email notification (requires configured email domain)
        try {
          const apiKey = process.env.LOVABLE_API_KEY;
          if (apiKey) {
            const { sendLovableEmail } = await import("@lovable.dev/email-js");
            const senderDomain = process.env.EMAIL_SENDER_DOMAIN;

            const rows: Array<[string, string]> = [
              ["Full Name", data.fullName],
              ["Designation", data.designation],
              ["Organization", data.organization],
              ["Email Address", data.email],
              ["Contact Number", data.contactNumber],
              ["Country", data.country],
              ["Submitted", submittedAt.toUTCString()],
            ];
            const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#0B2545;background:#ffffff;padding:24px">
              <h2 style="font-family:'Playfair Display',Georgia,serif;color:#0B2545;margin:0 0 16px">New Summit Registration</h2>
              <p style="color:#5B6169;margin:0 0 24px">Walk2Talk Global Healthcare Summit 2026</p>
              <table style="border-collapse:collapse;width:100%;max-width:560px">
                ${rows
                  .map(
                    ([k, v]) =>
                      `<tr><td style="padding:10px 12px;border-bottom:1px solid #E5EAF0;color:#5B6169;font-size:13px;width:170px">${escapeHtml(k)}</td><td style="padding:10px 12px;border-bottom:1px solid #E5EAF0;color:#0B2545;font-size:14px;font-weight:500">${escapeHtml(v)}</td></tr>`,
                  )
                  .join("")}
              </table>
            </body></html>`;
            const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

            await sendLovableEmail(
              {
                to: RECIPIENT,
                from: senderDomain
                  ? `Walk2Talk Summit <notify@${senderDomain}>`
                  : `Walk2Talk Summit <notify@${new URL(process.env.SUPABASE_URL ?? "https://walk2talkmedia.com").hostname}>`,
                sender_domain: senderDomain,
                subject: "New Summit Registration | Walk2Talk Global Healthcare Summit 2026",
                html,
                text,
                reply_to: data.email,
              },
              { apiKey },
            );
          }
        } catch (err) {
          // Domain may not be verified yet — submission is still saved.
          console.error("[register] email dispatch failed (non-fatal):", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
