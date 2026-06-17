# Stack

## Frontend
- **Framework:** Vite + React 18+
- **Styling:** Tailwind CSS v4 (CSS-first config, no tailwind.config)
- **Animations:** CSS-only / Motion (formerly Framer Motion)
- **Icons:** Lucide React
- **Deploy:** Vercel

## Data (no CMS)
All site content lives in root `data/` folder as plain JSON files.
Edit these to update content — no rebuild needed in dev, just save & reload.

| File | What it controls |
|------|-----------------|
| `data/profile.json` | Name, title, tagline, contact info |
| `data/listings.json` | All property listings (add/remove/edit) |
| `data/services.json` | Services offered (buy, sell, rent, etc.) |
| `data/testimonials.json` | Client reviews |

## Structure
```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages (ListingDetail)
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── images/         # Stock photos & listing images
├── data/               # ★ EDIT THIS FOLDER — plain JSON content
│   ├── profile.json
│   ├── listings.json
│   ├── services.json
│   └── testimonials.json
├── assets/             # Aunt's FB post photos per listing
├── docs/               # Project documentation
├── .claude/
│   └── skills/
│       └── frontend-design/SKILL.md
└── index.html
```
