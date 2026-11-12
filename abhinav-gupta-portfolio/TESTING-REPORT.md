# QA and implementation report

## Completed in this package

- Kept the supplied portfolio markup and visual system rather than replacing it with a template.
- Extracted the stylesheet into `src/styles/main.css`.
- Renamed the three original inline scripts to descriptive files while preserving their document order.
- Updated page title and description and removed the incorrect GitHub profile URL from `og:url`.
- Added a simple SVG favicon and `robots.txt`.
- Extracted the embedded resume PDF into `public/assets/Abhinav_Gupta_Resume.pdf` and changed the resume action to download that asset.
- Added Vite project scripts, deployment notes and a maintainable README.

## Checks performed

| Check | Result |
|---|---|
| Local HTML/CSS/JS references | Passed; no missing local references |
| JavaScript syntax (`npm run check`) | Passed for all three scripts |
| Resume extraction | Passed; extracted file begins with `%PDF-1.7` |
| HTML structure inspection | Completed; source contains 13 buttons, 20 anchors and no HTML forms |
| Production build (`npm run build`) | Not verified; dependency installation was interrupted in this environment and the Vite executable was unavailable/permission denied |

## Remaining before production launch

1. Run `npm install` in a normal terminal, then `npm run build`.
2. Test the actual site in Chrome/Edge at desktop, tablet and mobile sizes.
3. Verify every project destination, email address, LinkedIn URL and resume content.
4. The supplied page has no HTML contact form. If a form is desired, connect a real service/serverless endpoint and add spam protection.
5. Tailwind, GSAP, Lenis, Lucide, Tone.js and fonts still use the original external CDN references. Review pinning/self-hosting and performance impact before launch.
6. Add the final production domain before setting canonical and `og:url` metadata; no domain was supplied, so none was invented.
7. Run Lighthouse against the deployed site and configure hosting security headers.

This report does not claim browser-level interaction tests or a successful production build.
