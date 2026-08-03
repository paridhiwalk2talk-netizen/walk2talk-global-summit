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

## Registration form — send submissions to a Google Sheet

The form posts each registration straight into a Google Sheet using a Google Apps Script Web App. No backend, no database, no npm.

**One-time setup (5 minutes):**

1. Create a Google Sheet. In row 1 add these headers:
   `Timestamp | Name | Designation | Company | Email | Phone | Country | Selected Pass | Message`
2. In the sheet, open **Extensions → Apps Script** and paste:

   ```js
   function doPost(e) {
     var s = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     var d = JSON.parse(e.postData.contents);
     s.appendRow([d.timestamp, d.fullName, d.designation, d.organization,
                  d.email, d.contactNumber, d.country, d.pass, d.message]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Deploy → New deployment → Web app**. Set *Execute as* = **Me**, *Who has access* = **Anyone**. Authorize when prompted.
4. Copy the deployment URL (ends in `/exec`).
5. Open `js/script.js` and set it at the top:
   ```js
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AAAA.../exec";
   ```
6. Save and re-upload `js/script.js`. Every submission now appears as a new row in your sheet.

To also get an email alert, add `MailApp.sendEmail("contact@walk2talkmedia.com", "New Summit Registration", JSON.stringify(d, null, 2));` inside `doPost`.

**Note:** the browser sends the request in `no-cors` mode (required for Apps Script), so the site cannot read the response — a submission is reported as successful once the request is sent. Verify the sheet after your first test submission.


## Editing content

- **Agenda, topics, FAQs, "Why attend", "Who attends":** edit the arrays at the top of `js/script.js`.
- **Speakers:** edit the `<article class="speaker">` blocks directly in `index.html` and drop new headshots into `images/`.
- **Colors, spacing, fonts:** all tokens live at the top of `css/style.css` under `:root`.
- **Countdown date:** change `Date.UTC(2026, 7, 27, 11, 30, 0)` in `initCountdown()` inside `js/script.js`.
