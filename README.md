# Fitpad website

A responsive implementation of the approved Fitpad design, using the supplied logo and all original photos. No framework, package installation, external font service, or build step is required.

## Open and edit

Open `dist/index.html` in a browser. For full clipboard support, serve `dist` over localhost or HTTPS. Example: `python3 -m http.server 8000 --directory dist`.

- `dist/index.html`: page content and semantic markup
- `dist/styles.css`: brand tokens, responsive layouts, animations, reduced-motion support
- `dist/script.js`: menu, active navigation, scroll reveals, inquiry dialog, contact configuration
- `dist/assets/`: original supplied photos and logo

## Contact setup

The user has not supplied a verified email address, WhatsApp number, location, opening hours, prices, class timetable, or social-profile links. These have not been invented. Inquiry buttons currently open a useful copy-only message composer; they do not submit bookings or collect data remotely.

To connect inquiries, set `FITPAD_CONTACT.email` or `FITPAD_CONTACT.whatsapp` at the top of `dist/script.js`. Use a full international number with country code for WhatsApp. WhatsApp takes precedence when both are set. The visitor must send the message in their chosen app, and the team must confirm any reservation. There is no backend, payment flow, or online booking system.

Add the verified address, hours, schedule, and social links when provided. Deploy the contents of `dist` on any static hosting service.

## Features

- Responsive desktop, tablet, and phone layouts
- Sticky navigation, mobile menu, active-section state, anchor navigation
- Scroll progress, staggered hero entrance, scroll reveals, subtle photo/button hover effects
- Reduced-motion support and a looping band that pauses on hover
- Native accessible dialog with Escape, focus return, and keyboard controls
- Semantic headings, skip link, descriptive photo alt text, visible focus states
- Embedded local assets; no third-party scripts, trackers, cookies, or external image requests

Motion and interactive source were checked statically. This environment does not provide an interactive browser preview for a buildless static site.
