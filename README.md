# Walk2Talk Global Healthcare Summit 2026 — Static Site

Pure HTML, CSS and vanilla JavaScript. No build step, no framework, no backend, no database.

## Run locally

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

## Deploy

Upload the entire folder to any static host: GitHub Pages, Netlify, Vercel Static, Cloudflare Pages, S3, or plain shared hosting.

## Folder structure

```
/
├── index.html
├── favicon.ico
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
├── images/
│   ├── walk2talk-logo.png
│   ├── walid-achi.jpg
│   ├── franklin-vibar.jpg
│   └── speaker-bg.jpg
└── README.md
```

## Registration form — send submissions to your email

The form uses [EmailJS](https://www.emailjs.com) (free tier) so submissions go straight to `contact@walk2talkmedia.com` from the browser, with no backend.

**One-time setup (5 minutes):**

1. Create a free account at https://www.emailjs.com.
2. **Add an Email Service** (Gmail, Outlook, or your own SMTP) that will deliver messages to `contact@walk2talkmedia.com`.
3. **Create an Email Template.** In the template body use these variables:
   - `{{from_name}}` (name)
   - `{{from_email}}` (email)
   - `{{designation}}`
   - `{{organization}}` (company)
   - `{{contact_number}}` (phone)
   - `{{country}}`
   - `{{selected_pass}}`
   - `{{message}}`
   - `{{timestamp}}`
   - `{{subject}}`

   
   In the template settings set:
   - **To Email:** `contact@walk2talkmedia.com`
   - **Subject:** `{{subject}}`
   - **Reply To:** `{{reply_to}}`
4. Copy your **Public Key**, **Service ID** and **Template ID** from the EmailJS dashboard.
5. Open `js/script.js` and replace the three values at the top:
   ```js
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```
6. Save and re-upload `js/script.js`. Done — the form now emails you every submission.

Any other email service works too (Formspree, Web3Forms, Getform, etc.) — just replace the `emailjs.send(...)` call inside `initForm()` with their fetch snippet.

## Editing content

- **Agenda, topics, FAQs, "Why attend", "Who attends":** edit the arrays at the top of `js/script.js`.
- **Speakers:** edit the `<article class="speaker">` blocks directly in `index.html` and drop new headshots into `images/`.
- **Colors, spacing, fonts:** all tokens live at the top of `css/style.css` under `:root`.
- **Countdown date:** change `Date.UTC(2026, 7, 27, 11, 30, 0)` in `initCountdown()` inside `js/script.js`.
