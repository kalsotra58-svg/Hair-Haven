# Hair Haven — Premium Hair Restoration Clinic, Jammu (Redesign v2)

Rebuilt premium website for **Hair Haven Transplant Clinic**, Channi Himmat, Jammu.
Light theme · warm off-white canvas · soft blurred emerald/mint/sage colour blobs ·
white cards · forest/emerald brand system · iOS-inspired spacing and typography.

- **Live data only:** all clinic facts (team, services, prices, contact, reviews, gallery,
  Norwood estimator data) were extracted from the original repository
  `manmohan01singh/HAIR-HAVEN`. See `AUDIT.md` for the full audit and flagged issues.
- **Booking:** 3-step request flow (service → preferred date/time → details) with validation,
  booking reference, on-device request history, and a WhatsApp hand-off to the clinic's real
  number (+91 88997 08659). Appointments are confirmed by the clinic personally — the site
  never claims auto-confirmation.
- **Stack:** React 19 + TypeScript + Vite (same stack as the original site). Clinic imagery is
  served from the original repository's public assets.
- **Run:** `npm install && npm run dev` · **Build:** `npm run build`

Roadmap (next phases): React Native (Expo + TypeScript) patient app — *not* a WebView —
with My Hair Journey photo check-ins, documents vault and push reminders; a secure admin
dashboard with role-based access; shared backend. Details in `AUDIT.md` and the project report.
