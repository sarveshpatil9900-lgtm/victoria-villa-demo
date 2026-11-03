# Victoria Villa Guest House – redesign demo

A one-page, responsive website demo for Victoria Villa Guest House (Sinquerim–Candolim, Goa), built from the content and photos on the current site, victoriavillaguesthousegoa.com.

## How to preview

**Quickest:** double-click `index.html` to open it in your browser.

**With a local server** (closer to how it runs when hosted):

```bash
cd victoria-villa-demo
python3 -m http.server 8000
```

Then open http://localhost:8000.

**To host it:** upload the whole folder (`index.html`, `styles.css`, `script.js`, `images/`) to Netlify Drop, GitHub Pages or any web host. There is no build step.

## What's in it

| Section | Source |
|---|---|
| Header, "Book Your Stay" button | Name and wordmark from the current site |
| Hero | Real verandah photo; "5 minute walk to the beach" and "13 km from Panjim" are stated on the current site |
| About | Rewritten lightly from the current "Relax in our Hotel" text |
| Rooms | The 9 room facilities listed on the current site, word for word |
| Guest review | The one review on the current site (@woodmarie55); only spelling typos were fixed |
| Gallery | 13 of the site's own photos, with a keyboard-friendly viewer |
| Location | Distances and address from the current site, plus a Google Maps search link |
| Contact / booking | Real phone (tap to call), email (tap to email) and address |

## Booking form – demo only

The form is **not** connected to a booking service. It checks the dates and name, then says clearly that nothing was sent and offers an **Email this request** button. That button opens the visitor's email app with the details filled in. To take real bookings, connect a booking engine or a form service and replace the submit handler in `script.js`.

## Placeholders to confirm with the owner

These aren't on the current website, so they appear as yellow placeholder notes rather than guesses:

- Room types, number of rooms and rates
- Check-in and check-out times and house policies
- An embedded map with the exact pin, directions from the airport, and nearby places to visit

The navy "Design demo" banner at the top should be removed before the site goes live.

## Photos

All photos come from the current website. Nothing in any scene was added, removed or regenerated. Each photo was:

- cropped to a consistent shape (3:2, with 4:5 for the two tall photos)
- given gentle tone corrections: a slightly deeper black point, a soft contrast curve, a touch of warmth, +8% colour and light sharpening

The script that did this is not part of the site. Re-export from the original files if you get higher-resolution photos from the owner.

## Design notes

- **Colours:** copper `#a1614a` and sand `#efe4d6` (refined from the current site's `#a1614a` / `#d6baa0`), deep navy `#1d2a3d` and warm white `#fbf7f1`. Body text and buttons meet WCAG AA contrast.
- **Fonts:** Cormorant Garamond for headings and Mulish for body text, both from Google Fonts.
- **Accessibility:** a skip link, visible keyboard focus, descriptive alt text, labelled form fields, and an Escape key that closes the menu and the photo viewer.
- **Motion:** a light fade-in as sections scroll into view, turned off for visitors who choose reduced motion.
