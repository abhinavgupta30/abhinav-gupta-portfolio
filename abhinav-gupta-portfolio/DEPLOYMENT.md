# Deployment guide

## Vercel

1. Push this folder to a GitHub repository.
2. Import that repository in Vercel.
3. Select **Vite** as the framework preset.
4. Set build command to `npm run build`.
5. Set output directory to `dist`.
6. Deploy and test the generated URL.

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## Firebase Hosting

1. Run `npm install` and `npm run build`.
2. Run `firebase init hosting`.
3. Select `dist` as the public directory.
4. Deploy with `firebase deploy`.

## Domain and SEO

The final domain has not been supplied. Once it is known, update canonical URL and `og:url`, and add a sitemap containing the real production URL. Do not publish placeholder canonical URLs.

## Launch checklist

- [ ] Verify email, LinkedIn, GitHub and project destinations.
- [ ] Add and test the final resume PDF.
- [ ] Test recruiter mode and command palette.
- [ ] Test all sections and interactions on mobile.
- [ ] Check the browser console and network panel.
- [ ] Run `npm run check` and `npm run build`.
- [ ] Run Lighthouse on the deployed URL.
- [ ] Configure security headers in the hosting platform.
- [ ] Configure a real form endpoint if a contact form is added.
